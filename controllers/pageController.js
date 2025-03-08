const nodemailer = require("nodemailer");
require("dotenv").config();

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render("index", {
    page_name: "index",
  });
};
exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};
exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
  <h1>Mail Details </h1>
  <ul>
<li>Name: ${req.body.name}</li>
<li>Email: ${req.body.email}</li>

  </ul>
    <h1>Message </h1>
    <p>${req.body.message}</p>
  `;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: `"Smart EDU Contact Form" <${process.env.EMAIL_USER}>`, // Gönderen adres
        to: process.env.EMAIL_USER, // Alıcı adres (kendi e-posta adresin)
        subject: "Smart EDU Contact Form", // Konu
        html: outputMessage, // HTML gövde
      });

      console.log("Message sent: %s", info.messageId);
    }

    main().catch(console.error);

    req.flash("success", "We recieve your message succesfully");

    res.status(200).redirect("contact");
  } catch (err) {
    req.flash("error", "Something happend :(");
    res.status(200).redirect("contact");
  }
};
