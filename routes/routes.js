import express from 'express';
import bodyParser from 'body-parser';


import {connects} from '../config/dbcon.js';
import user from '../models/user.js';


const router = express.Router();
router.use(bodyParser.json());

connects.connect((err)=>{
  if(err)throw err;
  console.log('Mysql Connectd..');	
}); 


//get data
router.get('/api/users',(req, res) => {
  var sql = "SELECT * FROM user";
  var query = connects.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// get single data
router.get('/api/user/:id',(req, res) => {
  var sql = "SELECT * FROM user WHERE user_id="+req.params.id;
  var query = connects.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//post {product_name: req.body.product_name, product_price: req.body.product_price};
router.post('/api/post',(req,res)=>{
	var input = {username: req.body.username, password: req.body.password, id_user_group:req.body.group_id};
	var sql   = "INSERT INTO user SET ?";
	var query = connects.query(sql,input,(err,results)=>{
		if(err) throw err;
		res.send(JSON.stringify({"Status":200,"error":null,"message":"Data inserted"}));
	});
});

//put product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"'
router.put('/api/update/:id',(req,res)=>{
	var input = {username: req.body.product_name, password: req.body.password, id_user_group:req.body.group_id};
	var sql   = "UPDATE user SET username='"+req.body.username+"', password='"+req.body.password+"' WHERE user_id="+req.params.id;
	var query = connects.query(sql,input,(err,results)=>{
		if(err) throw err;
		res.send(JSON.stringify({"Status":200,"error":null,"message":"Data updated","response":results}));
	});
});

//delete 
router.delete('/api/delete/:id',(req,res)=>{
	var sql = "DELETE FROM user WHERE user_id="+req.params.id;
	var query=connects.query(sql,(err,results)=>{
		if(err) throw err;
		res.send(JSON.stringify({"Status":200,"error":null,"message":"Data deleted","response":results}))
	});
});

export default router;