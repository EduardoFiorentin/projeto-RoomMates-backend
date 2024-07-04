import express from 'express';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const port = process.env.PORT || 3333;

app.get('/', (req, res) => {
  res.send('Olá, idiota!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
