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
    var city = req.body.cityName+"";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apiKey;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on('data',function(data){
            const jsonData = JSON.parse(data);
            const temp = jsonData.main.temp;
            const country = jsonData.sys.country;
            const imageId = jsonData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+imageId+"@2x.png";
            res.write("<h1> The temperature in "+city+", "+country+" is "+temp+" degree celcius"+"</h1>");
            res.write("<img src='"+imageUrl+"'></img>");
            res.send();
        });
    });
});