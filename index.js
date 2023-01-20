const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(openTime);
const appRouter = require("./routes/route");
app.use(appRouter);
var currentdate = new Date();
function openTime(req, res, next){
    console.log(req.originalUrl,currentdate.getDay());
    if((currentdate.getHours()>9) && (currentdate.getHours()<17) && (currentdate.getDay() > 0) && (currentdate.getDay() < 6)){
        next();
    }
    else{
        res.sendFile(path.join(__dirname,"views","open.html"))
    }
}
app.get("/views/style.css",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","style.css"))
})
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});