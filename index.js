const express=require('express');
const app=express();
const port=8000;
const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));



const expressLayouts=require('express-ejs-layouts');
app.use(express.static('assets'));
app.use(expressLayouts);
//extract style and scripts from subpages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`error is :${err}`);
    }
    console.log(`port is running on:${port}`);



})