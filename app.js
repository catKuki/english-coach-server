const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
const PORT = 3000;
const bodyParser = require('body-parser');
const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });
const chatId = process.env.CHAT_ID;
app.use(bodyParser.json());
app.use(cors());
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  console.log(`Received message: ${messageText} from chat ID: ${chatId}`);

  bot.sendMessage(chatId, `You said: ${messageText}`);
});




app.get('/hello', (req, res) => {
  res.send('Hello World!');
});
app.post('/send-message', (req, res) => {
  const message = req.body.message;
  bot.sendMessage(chatId, message)
    .then(() => {
      res.status(200).send('Message sent successfully');
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      res.status(500).send('Failed to send message');
    });
});
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});