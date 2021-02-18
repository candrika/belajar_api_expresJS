import  express from 'express';
import Router  from './routes/routes.js';
var app=express();

app.use(Router);
// app.use(bodyParser.json());

//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});