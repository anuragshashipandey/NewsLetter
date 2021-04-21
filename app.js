const express=require("express")
const request=require("request")
const bodyParser=require("body-parser")
const https=require("https")
const nodemailer = require('nodemailer');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post("/", function(req,res){
    let pass="";
    let fname=req.body.fname;
    let lname=req.body.lname;
    let email=req.body.email;
    let data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    }


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'newsletteriitkgp@gmail.com',
          pass: pass
        }
      });
      
      let mailOptions = {
        from: 'newsletteriitkgp@gmail.com',
        to: email,
        subject: 'Thank You ...Amazing Gossips are just on the way',
        text: `Hii ${fname}That was easy!`,
        attachment:''
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.sendFile(__dirname+"/failure.html")
        } else {
            res.sendFile(__dirname+"/success.html")
        }
      });

    // Using MailChimp to store emails 
    // const jsonData =JSON.stringify(data);
    // const url='https://us1.api.mailchimp.com/3.0/lists/fb90c4a88f'
    // const options={
    //     method:"POST",
    //     auth:"anuragpandey:31dc884997467b367d3910767ac31f8c-us1"
    // }
    
    // const request= https.request(url,options,function(response){
    //     if(response.statusCode==200){
    //         res.sendFile(__dirname+"/success.html")
    //     } else{
    //         res.sendFile(__dirname+"/failure.html")
    //     }
        
    //     response.on("data",function(data){
            
    //     })
    // })
    
    // request.write(jsonData)
    // request.end()
    
});

app.post("/goback", function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT ||3001,function(){
    console.log("App is running on 3001")
})

//31dc884997467b367d3910767ac31f8c-us1

//fb90c4a88f