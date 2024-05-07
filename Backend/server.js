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
  methods: ['POST', 'GET'],
  credentials: true
}));


app.use('/api', routes);

app.use('/uploads', express.static('uploads'));

app.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: 'Success', Message: 'Вы успешно вышли из системы' });
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

// Простой маршрут для обработки загрузки файла
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('File uploaded:', req.file);
  res.json({ message: 'File uploaded successfully!' });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('All tables were created successfully.');
  } catch (error) {
    console.error('Error occurred while creating tables:', error);
  }
})();


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
