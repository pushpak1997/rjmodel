const http = require("http");
const path = require("path");
const fs = require("fs");

const express = require("express");

const app = express();


var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json())


const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

httpServer.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.set('view engine', 'ejs');
// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
app.get('/', function(req, res) {
    myvar="";
    output_img="";
    output_text1="";
    output_text2="";
    res.render('index',{input:myvar,output:output_img,text1:output_text1,text2:output_text2});
});

const axios = require('axios');


app.post('/upload',function(req,res){
    console.log(req.body.img_url);
    myvar=req.body.img_url;

    axios.get('https://picsum.photos/v2/list?page=2&limit=2')
    .then(response => {
        console.log("hhhhhh");
        // console.log(response.data);
        // console.log("hhhhhh");
        data={output_img:response.data[0].download_url,
        output_text1:response.data[0].author,
        output_text2:response.data[0].author}
        return data;
        
    }).then((data)=>res.render('index',{input:myvar,output:data.output_img,text1:data.output_text1,text2:data.output_text2}))
    .catch(error => {
        // console.log("aaa");
        console.log(error);
    });

    
});

