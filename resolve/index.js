let express = require("express")
let app = express();
let cors = require("cors")
let fs = require("fs")
let login = false
let user = ""
app.use(function(req ,res , next){
    next(); 
}); 
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.post("/register",function(req , res){
    let newuser = req.body ;
    if(newuser.username == "" || newuser.fristname == "" || newuser.password == ""  ){
        res.writeHead(404)
        res.send("should not leave any field is empty")
    }else{
        fs.readFile("users.txt","utf-8",function(err ,data){
            if(err){
                adduser = [newuser];
                fs.writeFileSync("users.txt",JSON.stringify(adduser));
                res.send("user was registered successfully");
            }else{
              let  users = JSON.parse(data);
              users.push(newuser);
              fs.writeFileSync("users.txt",JSON.stringify(users));
              res.send("user was registered successfully");
            }
        })
    }

})

app.post("/login",function(req ,res){

    let user = req.body ;
    if(user.username == "" ||  user.password == ""  ){
        res.writeHead(404)
        res.send("should not leave any field is empty")
    }else{
        fs.readFile("users.txt","utf-8",function(err ,data){
            if(err){
                res.send("user is not registered");
            }else{
              let  users = JSON.parse(data);
              for(i = 0 ; i < users.length ; i++){
                if(users[i].username==user.username && users[i].password==user.password ){
                    res.send("logged in successfully   user = "+ users[i].username );
                }else{
                    res.writeHead(402)
                    res.send(" invalid credentials ");
                }
             }
             
             
            }
        })
    }
})

app.post("/todo",function(req ,res){

    let todo = req.body ;
    if(todo.username == "" ||  todo.title == ""  ){
        res.writeHead(404)
        res.send("should not leave any field is empty")
    }else{
        
        fs.readFile("todo.txt","utf-8",function(err ,data){
            if(err){
                addtodo = [todo];
                fs.writeFileSync("todo.txt",JSON.stringify(addtodo));
                res.send("todo created  successfully");
            }else{
              let  todos = JSON.parse(data);
              todos.push(todo);
              fs.writeFileSync("todo.txt",JSON.stringify(todos));
              res.send("todo created  successfully");
            }
        })
    }
})

app.get("/todo",function(req ,res){
  
        fs.readFile("todo.txt","utf-8",function(err ,data){
            if(err){
                res.send("todo is empty");
            }else{
              res.send(data);
            }
        })
    
})
app.get("/todo/:id",function(req ,res){
  
    fs.readFile("todo.txt","utf-8",function(err ,data){
        if(err){
            res.send("todo is empty");
        }else{
            let qury = JSON.parse(data)
          res.send(JSON.stringify(qury[parseInt(req.params.id)]));
        }
    })

})
app.listen(4000,function(){
    console.log("server running at port 4000")
})