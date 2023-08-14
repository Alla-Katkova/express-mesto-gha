const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app.listen(PORT, () => {
//   console.log('3000 портик');
// });

// app.get('/', (req, res) => {
//   res.send('HI')
// })

app.use((req, res, next) => {
  req.user = {
    _id: '64d7daef2a91bb0b9e14fe26', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

// если запрос идет на неизвестный роут
// app.use('*', (req, res) => {
//   res.status(404).send({ message: 'Страница не найдена' });
// });

app.listen(PORT);
