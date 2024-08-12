const midtransClient = require("midtrans-client");
const {orders} = require('../../models')
const generateTransaction = (req, res) => {
  console.log(req.body);
  
  const {items,customer,quantity,totalPrice} = req.body  
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
          gross_amount: totalPrice,
        },
        credit_card: {
          secure: true,
        },
        item_details : {
          id : items.id,
          name : items.name,
          quantity : quantity,
          price : items.price,
          total : totalPrice
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
          username : customer.name,
          product_id : items.id,
          name : items.name,
          quantity : quantity,
          order_id : parameter.transaction_details.order_id,
          email : customer.email,
          token : transactionToken,
          total : totalPrice
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
