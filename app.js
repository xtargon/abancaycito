const dashboard = require('./dashboard');
var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var moment = require('moment');
const fileUpload = require('express-fileupload')
const md5 = require('md5');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const pug = require('pug')
const User_acces = require('./Schemas/main_user').User
const Business_model = require('./Schemas/business').Business
const article_model = require('./Schemas/articles_of_sales').Articles
const sold_model = require('./Schemas/ventas_schema').sold
const sold_img = require('./Schemas/sold_img').sold_imagen
const sold_archive = require('./Schemas/sold_archive').sold_archive
const semana_model = require('./Schemas/semanas').semana
const orders_model = require('./Schemas/orders').orders
const work_model = require('./Schemas/work').work
const archived_restorant_model = require('./Schemas/archived_restorant').archived_restorant
const imagenes_beef = require('./Schemas/img_pluaded').imgbef
const Cookie_Acces = require('./middliwares/session-cookies')
const cookieSession = require('cookie-session');
const Router = express.Router();
app.use('/static', express.static('public'));
app.set('port', process.env.PORT || 3000);

app.set('trust proxy', 1)

app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieSession({
  name: 'session',
  keys: ['rastKey1', 'rastKey2']
}))

mongoose.connect('mongodb+srv://xtargon_abancaycito:232325252626a@abancaycito.h2al1.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

io.on('connection', function (socket) {

	socket.on('login_arrow',  function (request) {

			User_acces.findOne({ mail:request.mail},(err, docs)=>{
			if(docs){
				socket.emit('mail_acces', docs.name);
			}
			else{
			    	var date = {
    					message: 'No haz registrado este mail rufian'
  					};
			    socket.emit('mail_not_acces', date);
			}
	    })
	})

	socket.on("fresh_works", (dat_x)=>{
		console.log(dat_x);
	})

	socket.on('find_catalogue',(data_id)=> {
		imagenes_beef.find({property: data_id}).exec((err, docs)=>{
			socket.emit("this_catalogue", docs)
		})
	})

	socket.on("this_remove", (dat)=>{
		imagenes_beef.deleteOne({_id: dat}).exec((err)=>{
			socket.emit("remove_ready", dat)
		})
	})

	socket.on("this_sold_remove", (dat)=>{
		sold_model.deleteOne({_id: dat}).exec((err)=>{
			socket.emit("remove_sold_ready", dat)
		})
	})

	socket.on("dlt_work", (id_work)=>{
		work_model.deleteOne({_id: id_work}).exec((err)=>{
			if (err) {
				console.log("error")
			}
		})
	})

	socket.on("edit_this_user", (data_edit)=>{
		User_acces.findOne({_id: data_edit.my_id}).exec((err, doc)=>{
			doc.user = data_edit.user;
			doc.name = data_edit.name;
			doc.mail = data_edit.mail;
			doc.phone = data_edit.phone;
			console.log(data_edit.my_id)
			doc.save().then(
				socket.emit("edit_ready")
			)
		})
	})

	socket.on('business_arrow',  function (request_business) {

		var My_user = request_business.user_business;
		Business_model.findOne({ author:My_user},(err, docs)=>{
			docs.name = request_business.name_business;
			docs.description = request_business.description_business;
			docs.location_business = request_business.location_business;
			docs.phone = request_business.phone_business;
			docs.open = request_business.open_business;
			docs.close = request_business.close_business;

			docs.save().then(
 				socket.emit('dates_changed', docs)
 			);
		});
	});

	socket.on('add_article_arrow',  function (request_article) {

		const new_Article = new article_model({
		 	belonging: request_article.user_business,
		 	name: request_article.Name_article,
		 	description: request_article.description_article,
		 	price: request_article.price_article


		 });

		 new_Article.save().then(
		 	socket.emit('add_ok_articel', new_Article)
		 );
	});


	socket.on('add_img_arrow',  function (dates) {
		const beef = new imagenes_beef({
		 	Ruta:dates.Ruta,
		 	property: dates.user_business
		 });

		 beef.save().then(
		 	socket.emit('add_ok_img', beef)
		 );

		console.log("la ruta es: "+ dates.Ruta)
	});

	socket.on('edit_logo_img_arrow',  function (dates) {
		Business_model.findOne({ author:dates.user_business},(err, docs)=>{
			docs.logo = dates.Ruta;

			docs.save().then(
 				socket.emit('dates_changed', docs)
 			);
		});

		console.log("la ruta es: "+ dates.Ruta)
	});

	socket.on('search_A_top5',  function (request_top) {
		Business_model.find({ dedicated:request_top}).limit(5).exec((err, docs)=>{
 			socket.emit('top', docs)
        console.log(request_top)
		});
	});

	socket.on('search_item',  function (request) {
		article_model.findById({ _id:request}).exec((err, docs)=>{
 				socket.emit('ok_find_item', docs)
		});
	});

	socket.on('sss',  function (dat) {
		var sa = moment().format('Do, h:mm:ss a');

		const new_order = new orders_model({
		 	order: dat.name,
		 	location: dat.direction,
		 	state: "pendiente",
		 	belong:dat.belong,
		 	date: sa
	 	});

		 new_order.save().then(
		 	console.log(new_order.order + "Para:" + new_order.location + "y esta: " + new_order.state)
		 );
	});

	socket.on('suming', (data_today)=>{
		var sa = moment().format('Do');
		var insert_sold = new semana_model({
			ident: data_today.bussines,
			dia: data_today.to_day,
			num_day: sa
		});
		insert_sold.save().then(
			console.log(data_today.to_day)
		)

	})

	/*socket.on('sold_show', (ram)=>{
			console.log("ram");-----------------------------------------------------------------------------------------------------
	})*/


	socket.on('otro',  function (dat) {
		orders_model.find({belong:dat}).sort({date: 'desc'}).exec(function(err, docs) {

			console.log(docs)
			socket.emit('news', docs)

		})
	});
	socket.on('otro_archived',  function (dat) {
		archived_restorant_model.find({belong:dat}).exec(function(err, docs) {
			console.log(docs + "rou")
			socket.emit('news_archived', docs)

		})
	});

	socket.on('order_archive_arrow',  function (cops) {

		orders_model.findById({_id:cops}).exec(function(err, docs) {
		var sa = moment().format('Do, h:mm:ss a');
    console.log(docs.order + "dfsd")

		const new_archived_restorant = new archived_restorant_model({
		 	order: docs.order,
		 	location: docs.location,
		 	state: "pendiente",
		 	belong:docs.belong,
		 	date: sa
	 	});
			new_archived_restorant.save().then(
        orders_model.deleteOne({_id:cops}, (err)=>{
          if (err) return handleError(err)
            console.log("las fark")
            socket.emit("s5s")
       })
      )
		})
	})
	socket.on("order_delete_arrow", (element_delete)=>{
	    orders_model.deleteOne({_id:element_delete}, (err)=>{
	      if (err) return handleError(err)
	        console.log("element delete")
	        socket.emit("s5s")
	   })
	})

	socket.on("find_graphics", (ident)=>{
	  semana_model.find({ident:ident}).sort({num_day: 'desc'}).exec((err, docs)=>{
	    if(docs){
	        console.log("estos son las ventas: " + docs + "---//---")
	        socket.emit("sold_graphics", docs)
	    }
	    if(err){
	      console.log("error en el fin de las grafcas")
	    }
	  })

	})

	socket.on("checked_data", (data)=>{
					var pasword = md5(data.pass);
					const new_user = new User_acces({
					 	user: data.user,
					 	name: data.name,
					 	mail: data.mail,
					 	phone: data.phone,
					 	password: pasword,
					 	type: data.type
					 });

					 new_user.save().then(
					 	socket.emit("fine_user_add")
					 );

	})

	socket.on("find_sold", (data)=>{
		console.log("hay sonido");
		sold_img.find({item_belong: data}).exec((err, docs)=>{
			socket.emit("this_sold", docs)
			console.log("imgs: " + docs)
		})
	})

	socket.on("find_sold_info", (data)=>{
		console.log("hay sonido");
		sold_model.find({_id: data}, (err, docs)=>{
			socket.emit("this_sold_info", docs)
			console.log("imgs: " + docs)
		})

	})

	socket.on("sold", (data)=>{
			var now_id = data.id_session;
			var real = data.realData;
			sold_model.find({_id: real}, (err, doc)=>{
				var sa = moment().format('Do, h:mm:ss a');
				sold_archive_db = new sold_archive({
				 	name:doc.name,
				 	description: doc.description,
				 	phone: doc.phone,
				 	price: doc.price,
				 	author: now_id,
				 	date: sa,
				 	before_id: real
				});
				 sold_archive_db.save().then(
				 	delete_ready(real)
				 );
		})
		function delete_ready(doc) {
			sold_model.deleteOne({_id: doc}, (err)=>{
				if (err){
					console.log("ha ocurrido un error en el delete");
				}
				var message_sold = "Genial! has vendido un producto.";
				fres_my_sold(now_id);
			})
		}
	})

	function fres_my_sold(data){
		sold_model.find({author: data}, (err, doc)=>{
			if (doc != "") {
				socket.emit("fresh_docs", doc);
			}
			
		});
	}

	socket.on("find_carousel", (data)=>{
		findCarousel(data);
	})

	socket.on("find_carousel_info", (data)=>{
		findCarouselInfo(data);
	})

	socket.on("find_author", (data_id)=>{
		User_acces.findOne({_id:data_id}, (err, doc)=>{
			socket.emit("this_author", doc)
		});
	})

	function findCarousel(data) {
		sold_img.find({item_belong: data}).exec((err, docs)=>{
			if (docs != "") {
				socket.emit("this_carousel", docs);
			}
			
		});
	}

	function findCarouselInfo(data) {
		sold_model.find({_id: data}, (err, doc)=>{
			socket.emit("this_carousel_info", doc)
		})
	}

  ///
})





app.set('view engine', 'pug');

app.get('/', function (req, res) {
	Business_model.find( (err, docs)=>{
		if(docs) {
			  res.render('index')
		}
		else{
			res.send("No se encontraron los parametros en la base de datos")
		}
	});

})

app.get('/tienda', (req, res)=>{
	var log = req.session.user_id;
	if(log == undefined){
		sold_model.find().sort({date: 'desc'}).exec(function(err, items) {
			if (items) {
				res.render('store_login', {documents: items});
			}
		});
		console.log(log);
	}
	if (log != undefined) {
			sold_model.find().sort({date: 'desc'}).exec(function(err, items) {
				if (items) {
					res.render('store', {documents: items});
				}
			});
			console.log(log);
	}
})

app.get('/trabajo', (req, res)=>{
	var log = req.session.user_id;
	work_model.find().sort({date: 'desc'}).exec(function(err, items) {
		if(log == undefined){
			res.render("session_work", {works: items});
		}
		if(log != undefined){
			res.render("work", {works: items});
		}
	});
	
})

app.get('/login', (req, res)=>{
	res.render("login_extra");
})

app.get('/home', (req, res)=>{
	var log = req.session.user_id;

	if(log == undefined){
		res.render("login_extra");
		console.log(log);
	}
	if (log != undefined) {
		sold_model.find({author:log}).sort({date: 'desc'}).exec(function(err, items) {
			if (err) {console.log("a ocurrido un error en la busqueda de las ventas");}
			work_model.find({belong:log}).sort({date: 'desc'}).exec(function(err2, jobs) {
				if(err2){
					console.log("a ocurrido un error en la busqueda de tus trabajos");
				}
				res.render('store-lobby', {venta: items, power: log, jobs: jobs});
			})
		})
	}
  	
})
 



app.get('/upload', function (req, res) {

  res.render('upload')
})

app.get('/exit', function (req, res) {

	if (req.session.user_id != "") {
		req.session.user_id = undefined;
		res.redirect("/")
	}
	else{
		res.redirect("/")
	}
})

app.get('/community', function (req, res) {

  res.render('community')
})

app.get('/bienes', function (req, res) {

  res.render('next_cap')
})

app.get("/sdf", (req,res)=>{
	var MousePosition = require("graphics/mouse").Position
var map = require("graphics/signal/map")
var plainText = require("graphics/element").plainText
var render = require("graphics/render")

// Lift the stream of mouse positions through the plainText
// function
var main = map(MousePosition(), plainText)

// render the stream of mouse position as text
render(main)
})

app.post('/upload_Catalogue', function (req, res, next) {
	console.log(req.body.user_image_Catalogue);
	let EDFile = req.files.file
		EDFile.mv(`./public/img_main_file/${EDFile.name}`,err => {
		if(err) return res.status(500).send({ message : err })
	})
		var Ruta = `/static/img_main_file/${EDFile.name}`
		const beef = new imagenes_beef({
		 	Ruta:Ruta,
		 	property: req.body.user_image_Catalogue
		 });

		 beef.save().then(
		 	console.log("Imagen subida")

		 );
})

app.post('/upload_logo', function (req, res, next) {
	let EDFile = req.files.file
		EDFile.mv(`./public/img_main_file/${EDFile.name}`,err => {
		if(err) return res.status(500).send({ message : err })
	})
		var Ruta = `/static/img_main_file/${EDFile.name}`
		Business_model.findOne({ author:req.body.user_image_bussines},(err, docs)=>{
			docs.logo = Ruta;

			docs.save().then(
 				console.log("Logo cambiado para " + docs.name + "en " + Ruta)
 			);
		});
})



app.get('/restaurante', function (req, res) {

	Business_model.find({dedicated: "Restaurante"}, (err, docs)=>{
		if(docs) {
			  var inf_location = "Restaurantes";
			  res.render('all_bussiness', {restaurant_dates: docs, inf: inf_location});
		}
		else{
			res.send("No se encontraron los parametros en la base de datos")
		}
	});
})

app.get('/hotel', function (req, res) {

	Business_model.find({dedicated: "Hotel"}, (err, docs)=>{
		if(docs) {
			  var inf_location = "Hoteles";
			  res.render('all_bussiness', {restaurant_dates: docs, inf: inf_location});
		}
		else{
			res.send("No se encontraron los parametros en la base de datos")
		}
	});
})

app.get('/licor', function (req, res) {

	Business_model.find({dedicated: "Bar"}, (err, docs)=>{
		if(docs) {
			  var inf_location = "Licorerias";
			  res.render('all_bussiness', {restaurant_dates: docs, inf: inf_location});
		}
		else{
			res.send("No se encontraron los parametros en la base de datos")
		}
	});
})

app.get('/cafe', function (req, res) {

	Business_model.find({dedicated: "Cafeteria"}, (err, docs)=>{
		if(docs) {
			  var inf_location = "Cafeterias";
			  res.render('all_bussiness', {restaurant_dates: docs, inf: inf_location});
		}
		else{
			res.send("No se encontraron los parametros en la base de datos")
		}
	});
})

app.get("/vistazo/:business", function(req, res) {

	Business_model.findOne({ name:req.params.business},(err, docs)=>{

		if(docs) {
			article_model.find({belonging:docs.author}, (err, articles_in_sales)=>{
				imagenes_beef.find({property:docs.author}, (err, img_beef)=>{
					if(img_beef != ""){

						res.render('restaurant', {restaurant_dates: docs, product: articles_in_sales, Catalogue:img_beef});
					}
					else{
						img_beef = [
									  {
									    _id: 'none',
									    Ruta: '/static/img_main_file/logo_abc_wall.png',
									    property: 'none',
									  }
									];
						res.render('restaurant', {restaurant_dates: docs, product: articles_in_sales, Catalogue:img_beef});
					}
					
				})
			})
		}
		else{
			res.send("No se encontraron los parametros en la base de datos")
		}
	});
})

app.post('/Check_dates', (req, res)=>{
	console.log(req.body)
 	const username = req.body.username;
 	const name = req.body.name;
 	const phone = req.body.phone;
 	const mail = req.body.mail;
 	const password = req.body.password;
 	res.render('check_dates', {Username: username, Pass: password, Name: name, Mail: mail, Phone: phone});
})

app.post("/new_work", (req, res) =>{
	var sa = moment().format('Do, h:mm:ss a');
	var new_work = new work_model({
		affair: req.body.affair_work,
		phone: req.body.phone_work,
		location: req.body.location_work,
		earn: req.body.earn_work,
		belong: req.session.user_id,
		date: sa
	});
	new_work.save().then(
		res.redirect("/dashboard")
	);
})

app.post('/login', function (req, res) {

	const mail = req.body.mail;
 	const password = md5(req.body.password);


	User_acces.findOne({ mail:mail, password:password},(err, docs)=>{

		if(docs){
			now_id = docs._id
			req.session.user_id = now_id;
			req.session.name = docs.name;
			req.session.phone = docs.phone;
			req.session.user = docs.user;
			req.session.mail = docs.mail;

			if (now_id == req.session.user_id) {
				res.redirect('/dashboard')
				console.log(req.session.user_id)
			}
		}
		else{
			res.redirect("/")
		}
	})
})

app.post('/log_ajax', (req,res)=>{
		console.log(req.body.data_mail)
		var data_password = md5(req.body.data_pass)
		User_acces.findOne({ mail:req.body.data_mail, password:data_password},(err, docs)=>{

		if(docs){
			now_id = docs._id
			req.session.user_id = now_id;
			req.session.name = docs.name;
			req.session.phone = docs.phone;
			req.session.user = docs.user;
			req.session.mail = docs.mail;
			res.redirect("/store")
		}
		else{
			console.log("something bad has happened")
		}
	})
})

app.post('/upload_item', (req,res)=>{

	var sa = moment().format('Do, h:mm:ss a');

	let EDFile = req.files.file
		EDFile.mv(`./public/img_main_file/${EDFile.name}`,err => {
		if(err) return res.status(500).send({ message : err })
	})
	var Ruta = `/static/img_main_file/${EDFile.name}`;
		const tree = new sold_model({
		 	name:req.body.name,
		 	description: req.body.des,
		 	phone: req.session.phone,
		 	price: req.body.price,
		 	author: req.session.user_id,
		 	date: sa,
		 	principal_rute: Ruta,
		 	categorie: req.body.cat
		 });
		var tree_id = "";
		 tree.save().then(
		 	tree_id = tree._id
		 );

		const sold_tree = new sold_img({
			ruta:Ruta,
			item_belong: tree_id,
			author: req.session.user_id,
			date: sa
		})

		sold_tree.save().then(
			res.redirect("/home")
	    )
})

app.post('/upload_new_item', (req,res)=>{
	var sa = moment().format('Do, h:mm:ss a');

	let EDFile = req.files.file
		EDFile.mv(`./public/img_main_file/${EDFile.name}`,err => {
		if(err) return res.status(500).send({ message : err })
	})
	var Ruta = `/static/img_main_file/${EDFile.name}`;

	const sold_tree = new sold_img({
		ruta:Ruta,
		item_belong: req.body.ident,
		author: req.session.user_id,
		date: sa
	})

	sold_tree.save().then(
		res.end()
	)
})

app.use('/dashboard', dashboard);
app.use('/dashboard', Cookie_Acces);

server.listen(app.get('port'), () => {
  console.log('listening on *:3000');
});
