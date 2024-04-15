const Professor = require('../models/Professor');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const generateUniqueToken = () => {
  return uuidv4();
};

const sendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await Professor.findOne({ where: { email_professor: email } });
  if (!user) return res.status(404).send('Пользователь с таким email не найден');
  
  const resetToken = uuidv4();
  await user.update({ resetToken });
  
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,
    },
  });

  const resetLink = `http://localhost:5173/token-validation?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Сброс пароля',
    text: `Для сброса пароля перейдите по ссылке: ${resetLink}`,
  };

  

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Ошибка отправки письма:', error);
      res.status(500).send('Ошибка отправки письма');
    } else {
      console.log('Письмо успешно отправлено:', info.response);
      res.send('Письмо успешно отправлено');
    }
  });
};

const feedBack = async (req, res) => {
  const { name, email, message } = req.body;
  // const user = await Professor.findOne({ where: { email_professor: email } });
  // if (!user) return res.status(404).send('Пользователь с таким email не найден');
  
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,
    },
  });
  console.log(email)
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'FeedBack: ' + name,
    text: message + "\n\nAutor: " + email,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Ошибка отправки письма:', error);
      res.status(500).send('Ошибка отправки письма');
    } else {
      console.log('Письмо успешно отправлено:', info.response);
      res.send('Письмо успешно отправлено');
    }
  });
};

module.exports = { sendEmail, feedBack };
