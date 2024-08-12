/*Install midtrans-client (https://github.com/Midtrans/midtrans-nodejs-client) NPM package.
npm install --save midtrans-client*/

//SAMPLE REQUEST START HERE

const midtransClient = require("midtrans-client");
const {orders} = require('../../models')
const generateTransaction = (req, res) => {
  const {items,customer} = req.body  
    try {
      const generateOrderId = () => {
        const now = Date.now();
        const randomPart = Math.floor(Math.random() * 100000);
        return `${now}-${randomPart}`;
    }
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
    
      let parameter = {
        transaction_details: {
          order_id: generateOrderId(),
          gross_amount: items.price,
        },
        credit_card: {
          secure: true,
        },
        item_details : {
          id : items.id,
          name : items.name,
          quantity : 1,
          price : items.price,
          total : items.price
        },
        customer_details: {
          first_name: customer.name,
          email: customer.email,
        },
        enabled_payments :['kredivo','other_qris','shopee_pay','gopay']
      };
    
      snap.createTransaction(parameter).then(async(transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        const data = {
          product_id : items.id,
          name : items.name,
          quantity : 1,
          order_id : parameter.transaction_details.order_id,
          email : customer.email,
          token : transactionToken
        }
  
        await orders.create(data)
        console.log("transactionToken:", transactionToken);
        return res.json({
          token : transactionToken
        })
      });
    } catch (error) {
      return res.status(500).json({
        message : 'error whwn get transaction token',
        errors : error
      })
    }


};

module.exports = generateTransaction
