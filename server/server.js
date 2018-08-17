const path = require('path');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
const express = require('express');

var app = express();

app.use(express.static(publicPath));

app.listen(port, ()=>{
  console.log("Server started on port 3000");
});

app.get('/', (req, res)=>{
  res.status(200).send('Up and running');
});

console.log(__dirname + '/../public');
console.log(publicPath);
