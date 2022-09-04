import express, { Router } from "express";
import mysql   from "mysql2"
import bodyparser from "body-parser";
import cors from "cors"

// connect to mysql

const db =mysql.createPool({
  host:"localhost",
  user:"root",
  password:"vino1999",
  database:"student_management"
});

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json())
app.use(bodyparser.text())

const port=9000 ||8080;

// Student register Router

app.post("/api/Register", async(req,res)=>{
   const firstName=req.body.firstName;
   const lastName=req.body.lastName;
   const email=req.body.email;
   const DOB=req.body.DOB;
   const education=req.body.education;
   const location=req.body.location;
   const about=req.body.about;
  
   db.query("SELECT * FROM student WHERE email = ? ", [email],(error,result)=>{
    console.log((result.length))
    console.log(error)
    if(result.length===0){
      const sqlInsert="INSERT INTO student(firstName,lastName,email,DOB,education,location,about) VALUES (?,?,?,?,?,?,?)";
         db.query(sqlInsert,[firstName,lastName,email,DOB,education,location,about],(error,result)=>{
         if(error){
           console.log(error)
           }
        else{
            res.send("Success")
        }
       })
      }
      else{
        res.send("Error")
      }

    }) 
});
 
// Student edit Route

app.post("/api/Update",(req,res)=>{
  const firstName=req.body.firstName;
   const lastName=req.body.lastName;
   const email=req.body.email;
   const DOB=req.body.DOB;
   const education=req.body.education;
   const location=req.body.location;
   const about=req.body.about;
   console.log(firstName)
   console.log(email)

   const sqlUpdate="UPDATE student SET firstName=?,lastName= ?,DOB=?,education=?,location= ?,about= ? WHERE email=?"

   db.query(sqlUpdate,[firstName,lastName,DOB,education,location,about,email],(error,result)=>{
    if(error){
      console.log(error)
    }
    else{
      console.log(result)
      res.send(result)
    }
   })

})

// Student getData Route

app.get("/api/getData",(req,res)=>{
  const getStudent="SELECT * FROM student";
  db.query(getStudent,(error,result)=>{
    if(error){
      console.log(error)
    }
    else {
     
      res.send(result)
    }
  })
})

// Delete student Data Route

app.post("/api/deleteData",(req,res)=>{
 const email= req.body.email;
 console.log(email)

 const sqlDelete="DELETE FROM student WHERE email = ?  "
 db.query(sqlDelete,[email],(error,result)=>{
  if(error){
    console.log(error)
  }
  else{
    console.log("Deleted")
    res.send("Deleted")
  }
 })
})
 

app.listen(port,()=>{
    console.log("server is running"+" "+port)
})
