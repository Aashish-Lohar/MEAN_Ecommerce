const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: Stripe } = require('stripe');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({origin:true,credentials:true}));

const stripe = require('stripe')('sk_test_51MMW2PSARWQdi33XLmVEx64xS8hfJyBpdPc6TShnDiVDFZkvRGFFSyJ1BozvRB7juT92UelqJ3mc7iNi2u5oOXUd00XaQxqQgS');

app.post('/checkout',async(req,res,next)=>{
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.items.map((item)=>({
                price_data: {
                    currency: 'INR', 
                    product_data: {
                        name: item.name,
                        images: [item.product]
                    }, 
                    unit_amount: item.price*1000
                },
                quantity: item.quantity,
            })),
            mode:"payment",
            success_url:"http://localhost:4242/success.html",
            cancel_url:"http://localhost:4242/cancel.html"
          });

          res.status(200).json(session);
        
    } catch (error) {
        next(error)
    }
})

app.listen(4242,()=>console.log('server is running on 4242'));