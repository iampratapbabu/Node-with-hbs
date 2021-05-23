const express = require("express");
const morgan = require('morgan');
const hbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');

const app=express();
app.use(express.json());

//setting storage engine
const storage = multer.diskStorage({
	destination:"./public/uploads",
	filename:(req,file,cb)=>{
		return cb(null,`${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`);
	}
	
});

//init upload
const upload = multer({
	storage:storage
	
});



app.use(express.static('./public'));

//MIDDLEWARES
if(process.env.NODE_ENV="development"){
	app.use(morgan('dev'));
};



//view engines
app.set('view engine','hbs');

app.engine('hbs',hbs({
		extname:'hbs',
	layoutDir:`${__dirname}/views/layout`,
	layoutDir:`${__dirname}/views/partials`,
	defaultLayout:'index'

}));

//HOME ROUTE
app.get('/',(req,res)=>{
  res.render("body1",{
		layout:"index",
		name:"tej"
		
	});
});

//name ke through hm parameter paas kr rhe hain isse index.hbs file me jahan name variable hoga
//wahan 'tej' show hoga

//yahan agar hm body2 render krenge to body ka content show hoga



//yaha get request ke through frontend show krenge upload krne ke liye
app.get('/file',(req,res)=>{
	res.render("fileupload",{
	layout:"index"
	
    });
});

//jaise hi upload route pe post request hoga ye function activate hoga
//uploading file route
app.post('/uploads', async (req,res,next)=>{
	res.render("fileupload",{
		layout:"index"
		
	});
	await upload.single('myImage')(req, res, function (error) {
		if (error) {
		  console.log(`upload.single error: ${error}`);
		  return res.sendStatus(500);
		}
	});
	console.log(req.file);
	res.status(200).json("file uploaded");
	
});




//view engine routes
app.get('/home',(req,res)=>{
	res.render('home',{
		layout:"index"
	});
});

//isi tarah alag alag route pr alag alag file render kr skte hain









module.exports = app;
