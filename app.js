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
    let pass='jh08d8610';
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
        subject: 'Thank You ...Amazing Content are just on the way',
        text: 
`Hii ${fname} Thanks for subscribing to My NewsLetter!

Here are some less Known Intersting Facts. Hope you will enjoy XD....

1.The junction joining the 2.2 with the PAN loop is actually known as "Frust Corner".
       
2.There once existed an underground tunnel between PAN loop and the Prison cells near the Nehru Museum.


3.Cheddis was closed only 2 times since its inception. Once during the sikh riots in 1984 and another due to a police raid because of 
          the rise of drug smugglers. Apart from these 2 incidents it is open 365 days of the year since 1951.

4.HOW ILLU BEGAN ?
 Back in 1981, some innovative and supremely bored guys at Azad decided to celebrate diwali by lighting scores of diyas on giant chatais.
 In characteristic fashion, Nehru hall decided to make a GC event out of it- calling it the Bigyan sinha memorial cup. 
 Somewhere down the line the name was changed. . . but the insti still gives a Bigyan sinha memorial prize to the guy with the second 
 highest CG in B.tech (hons) at the end of the 8th sem. As to how this idea came to someone and what it was like being in the earlier 
 Illu teams, we can only guess/ask an alum.

5.Long time back, when the mess workers of RK Hall were on an indefinite strike, there was a student named Anton Pios who cooked food for 
 everyone in the mess on that day and served them too. This was a bold move proving that the students can survive the worst of the conditions.
 This day somehow was etched in the history of RK Hall and is celebrated every year as Anton Pios day where all the students were 
 served food by the seniors. Anton Pios day in my 2nd year at RK will forever be remembered as the day of 'maximum dal intake' in my life. 
 One crazy tradition that probably i'll never experience.,
        
6. Nehru Hall has been named after Motilal Nehru, not Jawahar Lal Nehru.
        
7.There is a house named "Bomb house" in the campus (near the Prembazar entrance gate) which was used to store bombs during the World war by
 the Britishers. Although it looks quite commonplace from exterior, it has very thick walls and a reinforced underground storage chamber beneath.
 Since formation of IIT Kgp, it is being used as a staff quarter.

8.There is one more museum in KGP campus, It's near Rural Development Centre ( see a Jail wall infont of RDC & try to find out entrance gate), 
 which open only on Tuesday from 9 30 AM to 11 30 AM. There is also Hijli women Jail, which is of Britishers time.
        
9.That the road that runs besides the gymkhana and jnan ghosh is actually called the PEPSI road because of its typical shape closely resembling 
 the symbol of PEPSI.
        
And the Last one 🙃
  If you are good at nothing, still you will end up being good at something! The adrenaline for winning the general championship makes you 
  voluntarily to do something or seniors may induce that thing in you in some cases.
        `
        };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.sendFile(__dirname+"/failure.html")

        } else {
          
            const jsonData =JSON.stringify(data);
            const url='https://us1.api.mailchimp.com/3.0/lists/fb90c4a88f'
            const options={
                method:"POST",
                auth:"anuragpandey:cefd61d45cce368585e1fb8fabc43f0c-us1"
            }
            
            const request= https.request(url,options,function(response){
                if(response.statusCode==200){
                    res.sendFile(__dirname+"/success.html")
                } else{
                    res.sendFile(__dirname+"/failure.html")
                }
                
                response.on("data",function(data){
                    
                })
            })
            
            request.write(jsonData)
            request.end()
            
            res.sendFile(__dirname+"/success.html")
        }
      });

    // Using MailChimp to store emails 

});

app.post("/goback", function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT ||3001,function(){
    console.log("App is running on 3001")
})

//31dc884997467b367d3910767ac31f8c-us1

//fb90c4a88f