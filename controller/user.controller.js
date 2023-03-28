const User = require("../model/user");
const { validationResult } = require("express-validator/check");
const nodeMailer = require("nodemailer");

var sentOtp;

const userLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errorMessage: errors.array()[0].msg });
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (user != null) {
          if (password == user.password) {
            if (user.isVerified == "true") {
              res.status(200).json({ msg: "User found successfully!" });
            } else {
              res.status(200).json({ msg: "You are not verified user!" });
            }
          } else {
            res.status(200).json({ msg: "Password is incorrect!" });
          }
        } else {
          res.status(200).json({ msg: "Email id is not registered" });
        }
      })
      .catch();
  }
};

const userRegister = (req, res, next) => {
  const { name, email, phoneNumber, password } = req.body;

  User.findOne({ email: email }).then((result) => {
    if (result == null) {
      const user = new User({
        name,
        email,
        phoneNumber,
        password,
        isVerified: "false",
      });

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errorMessage: errors.array()[0].msg });
      }

      user
        .save()
        .then((user) => {
          sentOtp = Math.floor(1000 + Math.random() * 9000);
          res.cookie("OTP", sentOtp);
          res.cookie("id", user.id);
          console.log("Sent OTP: ", sentOtp);
          var transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
              user: "anasmemon7864@gmail.com", //ENTER YOUR EMAIL ADDRESS HERE, From which you want to send email!
              pass: "aczq aqoc xbni smnr", //Google password
            },
          });

          var mailOptions = {
            from: "anasmemon7864@gmail.com",
            to: user.email,
            subject: "Successfully Registered!",
            text: `OTP for verification: ${sentOtp}`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          res.status(201).json({
            message: "Thai gaiu ben",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
      res.status(200).json({msg : "Already registered"})
    }
  });
};

const registerOtp = (req, res, next) => {
  const { otp } = req.body;
  const getCookieOtp = req.cookies.OTP;
  const getCookieId = req.cookies.id;

  if (otp == getCookieOtp) {
    User.findByIdAndUpdate(getCookieId, {
      isVerified: "true",
    }).then((updated) => {
      res.status(201).json({
        msg: "Registerd, You can login now",
      });
    });
  }
};

module.exports = {
  userRegister,
  userLogin,
  registerOtp,
};
