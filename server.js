const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now} ${req.method} ${req.url}`;

  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('unable' );
    }
  });

  next();
})

app.use((req,res,next)=>{
  res.render('maintenance.hbs');
})

app.use(express.static(__dirname));

hbs.registerHelper('getyear', ()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('toUpper',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMsg:'welcome to home page'
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About page'
  });
});


app.get('/bad',(req,res)=>{
  res.send({
    errorMsg:'Error Occur'
  })

});

app.listen(3000,()=>{
  console.log("server is up");
});
