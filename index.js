const express= require('express');
const bodyParser =require('body-parser');
const mysql =require('mysql');

const app=express();

app.use(bodyParser.json());

const connects =mysql.createConnection({
	host:'localhost',
	user:'dikaeka',
	password:'passku',
	database:'sekolah_sma_yossudarso'
});

connects.connect((err)=>{
  if(err)throw err;
  console.log('Mysql Connectd..');	
});

// => to get response app.get('endpoint name',(req,res)=>{actions});
app.get('/api/users',(req, res) => {
  var sql = "SELECT * FROM user";
  var query = connects.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//get single data
app.get('/api/user/:id',(req, res) => {
  var sql = "SELECT * FROM user WHERE user_id="+req.params.id;
  var query = connects.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//post {product_name: req.body.product_name, product_price: req.body.product_price};
app.post('/api/post',(req,res)=>{
	var input = {username: req.body.username, password: req.body.password, id_user_group:req.body.group_id};
	var sql   = "INSERT INTO user SET ?";
	var query = connects.query(sql,input,(err,results)=>{
		if(err) throw err;
		res.send(JSON.stringify({"Status":200,"error":null,"message":"Data inserted"}));
	});
});

//put product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"'
app.put('/api/update/:id',(req,res)=>{
	var input = {username: req.body.product_name, password: req.body.password, id_user_group:req.body.group_id};
	var sql   = "UPDATE user SET username='"+req.body.username+"', password='"+req.body.password+"' WHERE user_id="+req.params.id;
	var query = connects.query(sql,input,(err,results)=>{
		if(err) throw err;
		res.send(JSON.stringify({"Status":200,"error":null,"message":"Data updated","response":results}));
	});
});

//delete 
app.delete('/api/delete/:id',(req,res)=>{
	var sql = "DELETE FROM user WHERE user_id="+req.params.id;
	var query=connects.query(sql,(err,results)=>{
		if(err) throw err;
		res.send(JSON.stringify({"Status":200,"error":null,"message":"Data deleted","response":results}))
	});
});

//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});