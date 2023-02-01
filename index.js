const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { json } = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function(){
    console.log("Server started on port number 3000");
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/weather.html");
});

app.post("/",function(req,res){
    // get city name    
    var city = req.body.cityName+"";
    // url for Open Weather Map
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apiKey;
    
    // HTTP get request
    https.get(url,function(response){
        console.log(response.statusCode);
        
        // on data received on JSON data
        response.on('data',function(data){
            const jsonData = JSON.parse(data);
            const temp = jsonData.main.temp;
            const country = jsonData.sys.country;
            
            /*(@theSmitChawda) Smit's edit*/
            //fetch the image id form the json data (inside the weather array)
            
            const image_id= jsonData.weather[0].icon;
            //create a different url for the image
            
            const image_url= "http://openweathermap.org/img/wn/"+image_id+"@2x.png";
            //instead of using just res.send once, you can use res.write as many times as needed and then just do res.send to send all the writes at once.
            
            res.write("<h1> The temperature in the "+city+" is "+temp+" °C </h1>");
            res.write("<img src='"+image_url+"'></img>");
            
            /*(@theSmitChawda) Smit's edit end*/
            res.send();
        });
    });
    
});
