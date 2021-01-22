var fs = require("fs")
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

const jwt = require('jsonwebtoken');
const secret = process.env.EMAIL_SECRET || 'secret';

const {
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN
} = process.env;

var auth = {
  auth: {
    api_key: MAILGUN_API_KEY,
    domain: MAILGUN_DOMAIN
  }
}
var nodemailerMailgun = nodemailer.createTransport(mg(auth));


function confirmPay(obj) {
  console.log({name:obj.user.dataValues.name, amount:obj.amount});
  
  const token = jwt.sign({id:obj.user.dataValues.id, amount:obj.amount, action: 'confirmPay', }, secret)

  var modelEmail = fs.readFileSync("./src/mailmodel/confirmPay.html", 'utf8', function (err, data) {
    if (err) console.error(err);
    return data
  })

  var datatemplate = `<a style="padding:0.5em; display:inline-block; text-decoration:none; background-color: #f8582c; color:#ffffff; margin:.5em; border-radius:.5em;"href="${process.env.CALLBACK_URL_BASE || 'http://localhost:3000'}/confirmpay?token=${token}"> CONFIRMAR</a>`
  modelEmail = modelEmail.replace("%username%", obj.user.dataValues.name.toUpperCase());
  modelEmail = modelEmail.replace("%dollar%", obj.amount);
  modelEmail = modelEmail.replace("%resetlink%", datatemplate)


   nodemailerMailgun.sendMail({
    from: 'epayco@epayco.com',
    to: obj.user.dataValues.email,
    subject: 'Confirmacion de pago',
    html: modelEmail
  }, function (err, info) {
    if (err) {
      console.error('Error: ' + err);
    } else {
      console.error('Response: ' + info);
    }
  }); 

  return modelEmail;
}
module.exports = {
  confirmPay
}