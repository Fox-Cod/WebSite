const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/router');
const model = require('./models/model')
const sequelize = require('./database');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 8081;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/api', routes);

app.use('/uploads', express.static('uploads'));

app.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ success: true });
});

const uploadDir = path.join(__dirname, 'uploads');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.post('/upload', (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ message: 'Размер файла превышает допустимый лимит в 5MB.' });
      }
      return res.status(500).json({ message: 'Ошибка загрузки файла.', error: err.message });
    } else if (err) {
      return res.status(500).json({ message: 'Произошла ошибка.', error: err.message });
    }

    await postResourcesFiles(req, res);
  });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Todas as tabelas foram criadas com sucesso.');
  } catch (error) {
    console.error('Ocorreu um erro ao criar as tabelas:', error);
  }
})();

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
