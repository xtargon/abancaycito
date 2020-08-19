const express = require('express')
const Business_model = require('./Schemas/business').Business
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
const orders_model = require('./Schemas/orders').orders
const User_acces = require('./Schemas/main_user').User
var moment = require('moment');
const article_model = require('./Schemas/articles_of_sales').Articles
const imagenes_beef = require('./Schemas/img_pluaded').imgbef

var now_id;

router.get('/', function(req, res) {
	
	now_id = req.session.user_id;

	if(now_id == undefined){
		res.redirect("/exit")
	}

	if(now_id != undefined)
	{

		User_acces.findOne({_id:now_id}, (err,docs)=>{
			if(docs.type == "standard"){
				var Dates_user = req.session
				res.render("only_user_dashboard", {dates_user: Dates_user})
			}
			if (docs.type == "ejecutive") {
				var Dates_user = req.session
				var session_id = req.session.user_id
				Business_model.findOne({author:session_id}, (err, business)=>{
					if (business) {
						article_model.find({belonging:docs._id}, (err, articles_in_sales)=>{
							imagenes_beef.find({property:docs._id}, (err, img_beef)=>{
									if(img_beef != ""){

										res.render('dashboard', {dates_user: Dates_user, business_dates: business, product: articles_in_sales, Catalogue:img_beef});
									}
									else{
										img_beef = [
												{
													_id: 'none',
													Ruta: '/static/img_main_file/logo_abc_wall.png',
													property: 'none',
												}
											];
										res.render('dashboard', {dates_user: Dates_user, business_dates: business, product: articles_in_sales, Catalogue:img_beef});
									}
											
							})
								})
									
								} 
								else{
									var businessdates =  {
							    		name: "",
							    		description: "",
							    		location_business: "",
							    		phone: "",
							    		open: "",
							    		close: ""
							  		}; 
									res.render('add_buid', {dates_user: Dates_user, business_dates: businessdates});
								}
					    	});
			}
		})


	}
});

router.post('/add_business', function(req, res) {
 	console.log(req.body)

 	var sa = moment().format('Do, h:mm:ss a');

	
	if (req.files.file == null) {
		res.redirect("/dashboard")
	}
	if (req.files.file != null) {
		let EDFile = req.files.file
			EDFile.mv(`./public/img_main_file/${EDFile.name}`,err => {
			if(err) return res.status(500).send({ message : err })
		})
		var Ruta = `/static/img_main_file/${EDFile.name}`;

		var new_business = new Business_model({
	 		name: req.body.name,
	 		description: req.body.des,
	 		location_business: req.body.log,
	 		phone: req.body.phone,
	 		open: req.body.open,
	 		close: req.body.close,
	 		author: req.body.user_image_bussines,
	 		dedicated: req.body.dedicated,
	 		portada:Ruta
	 	});
	 	new_business.save().then(
	 		res.redirect("/dashboard")
	 	);
	}
});

router.post('/upload',(req,res,next) => {
    let EDFile = req.files.file
    EDFile.mv(`./public/img_main_file/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })
 		res.redirect("/dashboard")
    })
})

router.post('/upload_logo',(req,res,next) => {
    let EDFile = req.files.file
    EDFile.mv(`./public/img_main_file/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })
 		res.redirect("/dashboard")
    })
})



module.exports = router;