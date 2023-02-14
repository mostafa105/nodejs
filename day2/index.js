let http = require("http");
let fs =  require("fs");
const { json } = require("stream/consumers");

let products  = JSON.parse(fs.readFileSync("products.json","utf-8"));
console.log(products);

let server =http.createServer(function(req ,res){

    urls = req.url.split("/")
    if(urls[1]=="home"){
        res.write("<h1>welcome to our APIs</h1>");
    }else if(urls[1]=="products"){
        if(urls.length > 2){
            res.write(JSON.stringify(products[parseInt(urls[2]-1)]))
        }else{
            res.write(JSON.stringify(products));
            
        }
        
    }else{
        res.writeHead("404");
        res.write("<h1> not found   errer 404</h1>")
    }
    
    res.end()
});
 server.listen(4000, function(){
    console.log(" server running  at port 4000");
 });