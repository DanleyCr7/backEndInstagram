const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
// divide para poder receber pelo protocolo htpp e procolo webSocket que faz
// a requisição em tempo real
const server = require('http').Server(app);
// permite fazer alterações em tempo real(socket.io)
const io = require('socket.io')(server);

mongoose.connect('mongodb://localhost:27017/backend',
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
);

// repassado socket io para todas as rotas em tempo real
app.use((req, res, next) => {
  req.io = io;
  // next força as linhas seguintes executarem caso haja alguma intercepção
  next();
});

app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));


app.use(require('./routes'));

server.listen(3001);
