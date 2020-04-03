const express= require('express');
const hbs= require('hbs');
const fs= require('fs');

const app= express();
const port= process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear();
})
hbs.registerHelper('upper', (text)=> {
  return text.toUpperCase();
});
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=> {
  var now= new Date().toString();
  var log= `${now}: ${req.method}, ${req.url}`;
  fs.appendFileSync('server.log', log +'\n');
  console.log(log);
  next();
});

// app.use((req, res, next)=> {
//   res.render('maintenance.hbs')
// })

app.get('/', (req, res)=> {
  res.render('home.hbs', {
    pageTitle: 'home page',
    welcomeMessage: 'welcome to my website'
  });
});

app.get('/about', (req, res)=> {
  res.render('about.hbs', {
    pageTitle: 'about page',
  });
});

app.get('/project', (req, res)=> {
  res.render('project.hbs', {
    pageTitle: 'project page',
    welcomeMessage: 'Welcome to the project page'
  });
});

app.listen(port, ()=> {
  console.log(`server is up on port ${port}`);
});
