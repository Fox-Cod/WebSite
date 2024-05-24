const { Users } = require('../models/model')
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const sendEmail = async (req, res) => {
  const { email } = req.body;
  console.log('email;', email)
  const user = await Users.findOne({ where: { email } });
  if (!user) return res.status(404).send('Usuário com este email não encontrado');
  
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

  const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Redefinir senha',
    text: `Para redefinir sua senha, siga este link: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erro ao enviar e-mail:', error);
      res.status(500).send('Erro ao enviar e-mail');
    } else {
      console.log('E-mail enviado com sucesso:', info.response);
      res.send('E-mail enviado com sucesso');
    }
  });
};

const feedBack = async (req, res) => {
  const { name, email, message } = req.body;

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

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'FeedBack: ' + name,
    text: message + "\n\nAutor: " + email,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erro ao enviar e-mail:', error);
      res.status(500).send('Erro ao enviar e-mail');
    } else {
      console.log('E-mail enviado com sucesso:', info.response);
      res.send('E-mail enviado com sucesso');
    }
  });
};

module.exports = { sendEmail, feedBack };
