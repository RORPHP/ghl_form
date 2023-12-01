const express = require('express')
const cors = require('cors')
const fs = require('fs')
const parser = require('body-parser')

const app = express();

app.use(parser.json())
app.use(cors())


app.post('/token/save',(req,res)=>{
  	fs.writeFile(`${__dirname}/private/credentials/token.json`,JSON.stringify(req.body.token),'utf8', function (err) {
     	if (err) return console.log(err);
  		res.json({response:'Authorisation successfull'})
  	})
})

app.get('/token/get',(req,res)=>{
  	fs.readFile(`${__dirname}/private/credentials/token.json`, 'utf8', function(err, data){ 
	    if (err) return console.log(err);
  		res.json({token:data})
	}); 
})

app.listen(3001,() => {
	console.log('Server is up')
})