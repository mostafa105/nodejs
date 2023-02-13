const fs = require('fs');
fs.readFile("students.txt","utf-8",function(err , data){
    if(err){
        if(process.argv[2]=="add")
        {
            let data = [{"id":1,"name":process.argv[3],"degree":process.argv[4]}];
            fs.writeFileSync("students.txt",JSON.stringify(data));
            console.log(data);
        }else {
            console.log("undefind file text")
        }
    }else{
      
        if(process.argv[2]=="add")
        {
            let data=JSON.parse( fs.readFileSync("students.txt",'utf-8'))
            let newobject = {"id":data.length+1,"name":process.argv[3],"degree":process.argv[4]}
            data.push(newobject);
            fs.writeFileSync("students.txt",JSON.stringify(data));
            console.log(data);
        }
        
        else if(process.argv[2]=="edit")
        {
            let data=JSON.parse( fs.readFileSync("students.txt",'utf-8'))
            for( i = 0 ; i < data.length ;i++){
               if (data[i].id == process.argv[3]){
                    data[i].name =process.argv[4];
                    data[i].degree =process.argv[5];
                fs.writeFileSync("students.txt",JSON.stringify(data));
                console.log(data);
               }
            }
           
            
        }
        else if(process.argv[2]=="del")
        {
            let data=JSON.parse( fs.readFileSync("students.txt",'utf-8'))
            for( i = 0 ; i < data.length ;i++){
               if (data[i].id == process.argv[3]){
                data.splice(i,1)
                fs.writeFileSync("students.txt",JSON.stringify(data));
                console.log(data);
               }
            }
           
        }
        else
        {
            console.log('err');
        }

    }
})

