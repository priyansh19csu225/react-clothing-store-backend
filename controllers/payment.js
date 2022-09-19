const stripe = require("stripe")(process.env.STRIPE_KEY);
const { SUCCESS, SERVER_ERROR } =
  require("../utils/config").STATUS_CODES;
const messageBundle = require("../locales/en");

const payment = (request, response) => {
  stripe.paymentIntents.create({
    // source: request.body.tokenId,
    amount: request.body.amount,
    // "line_items.price": request.body.amount,
    // success_url: 'https://example.com/success',
    // cancel_url: 'https://example.com/cancel',
    currency: "usd",
    // mode: 'payment',
  },(stripeErr , stripeRes) => {
    if(stripeErr){
      response.status(SERVER_ERROR).json({ message: messageBundle["ErrorMessageDefault"] , error : stripeErr });
      console.log(stripeErr);
    }
    else{
      response.status(SUCCESS).json({ message: messageBundle["payment.success"] , payment : stripeRes });
    }
  });
};

module.exports = { payment };
