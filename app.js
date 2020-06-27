const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();

//350faf995e76413d08b1e256d7abf24f
app.use(bodyparser.urlencoded({extended:true}));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.use(express.static("public"));



app.post("/",function(req,res){

    const query = req.body.cityName;
    const apikey = "350faf995e76413d08b1e256d7abf24f";

    const unit = "metric";
    url = ("https://api.openweathermap.org/data/2.5/weather?q=" +query +"&appid=" +apikey + "&units=" +unit);
    
    https.get(url, function(response){
    
        console.log(response.statuscode);

    response.on("data",function(data){
        const weatherdata = JSON.parse(data);
        const temp = weatherdata.main.temp;
        const weatherdescription = weatherdata.weather[0].description;
        const icon = weatherdata.weather[0].icon;

        const imageurl ="http://openweathermap.org/img/wn/" +icon + "@2x.png";
        res.write("<h1>The Temperature of " + " " +query+ " " + "is " +temp +" degree celsius </h1>");
        res.write("<p>The Weather Condition of " + " " +query + " " + "is " +weatherdescription+"<p>");
        res.write("<img src ="+imageurl + ">");
    })
    })
}) 


app.listen(3000,function(){
    console.log("The server is running on port 3000");
});