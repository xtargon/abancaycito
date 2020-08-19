  var socket = io();
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });

var user_mail_dates = "";
var text = "";
var g ="2";
!function (r) { r.fn.FeedEk = function (t) { var a, i = r.extend({ MaxCount: 5, ShowDesc: !0, ShowPubDate: !0, DescCharacterLimit: 0, TitleLinkTarget: "_blank", DateFormat: "", DateFormatLang: "en" }, t), e = r(this).attr("id"), n = ""; r("#" + e).empty(), null != i.FeedUrl && (r("#" + e).append('<img src="loader.gif" />'), r.ajax({ url: "https://feed.jquery-plugins.net/load?url=" + encodeURIComponent(i.FeedUrl) + "&maxCount=" + i.MaxCount + "&dateCulture=" + i.DateFormatLang + "&dateFormat=" + i.DateFormat, dataType: "json", success: function (t) { r("#" + e).empty(), null != t.data && (r.each(t.data, function (t, e) { n += '<li><div class="itemTitle"><a href="' + e.link + '" target="' + i.TitleLinkTarget + '" >' + e.title + "</a></div>", i.ShowPubDate && (a = new Date(e.publishDate), n += '<div class="itemDate">', 0 < r.trim(i.DateFormat).length ? n += e.publishDateFormatted : n += a.toLocaleDateString(), n += "</div>"), i.ShowDesc && (n += '<div class="itemContent">', 0 < i.DescCharacterLimit && e.description.length > i.DescCharacterLimit ? n += e.description.substring(0, i.DescCharacterLimit) + "..." : n += e.description, n += "</div>") }), r("#" + e).append('<ul class="feedEkList">' + n + "</ul>")) } })) } }(jQuery);


function start_bussines() {
  var doc = document.getElementById('logo_upload').value;
  if (doc == "") {
    alert("debes alegirn una imagen primero")
  }
  else{
        var name_item = document.getElementById("name").value;
        var description_item = document.getElementById("des").value;
        var dedicated_item = document.getElementById("dedicated").value;
        var open_item = document.getElementById('open').value;
        var close_item = document.getElementById('close').value;
        var phone_item = document.getElementById('phone').value;
        var location_item = document.getElementById('log').value;
        var formData = new FormData(document.getElementById("upload_logo"));
        formData.append('name', name_item);
        formData.append('des', description_item);
        formData.append('dedicated', dedicated_item);
        formData.append('open', open_item);
        formData.append('close', close_item);
        formData.append('phone', phone_item);
        formData.append('log', location_item);

        $.ajax({
           url: "/dashboard/add_business",
           type: "post",
           dataType: "html",
           data: formData,
           cache: false,
           contentType: false,
           processData: false
        }).done(function(res){
          alert("bien")
        });
        location.href = "/dashboard";
  }
}

$('.dl').click(function(){ 

    var correo = document.getElementById("c_e_a").value;
    var pass = document.getElementById("pass_a").value;
    
    $.ajax({ 
      url: '/log_ajax', 
      type: 'POST', 
      cache: false, 
      data: { data_mail: correo, data_pass: pass}, 
      success: function(data){ 
       alert('Success!')
       location.href = "/home"; 
      } 
      , error: function(jqXHR, textStatus, err){ 
       location.href = "/home";  
      } 
    }) 
});

function add_new_work() {
        var f = $(this);
        var formData = new FormData(document.getElementById("form_new_work"));
        $.ajax({
           url: "/new_work",
           type: "post",
           dataType: "html",
           data: formData,
           cache: false,
           contentType: false,
           processData: false
        }).done(function(res){
          show_menssagge_1();
        });
}

function show_master() {
    var html = `<div class="overlay" id="overlay">
                    <div class="popup user_admin" id="popup">
                        <a href="#" id="cerrar_popup_origin" class="btn-cerrar-popup">
                          <i class="fas fa-times">
                          </i>
                        </a>
                        <div>
                        <div class="view_admin_2">
                            <img class="admin_img_2" src="/static/img_main_file/admin.jpg">
                            <div class="inf_admin_2">
                                <h3 class="name_admin_2"> Gabriel Alejo Carruyo Finol </h3>
                                <h5>
                                    <i class="material-icons _admin_mail_2"> email </i>
                                    <p class="this_inf_admin"> Abancaycito.official@gmail.com </p>
                                </h5>
                                <h5>
                                  FACEBOOK: <a class="social_redirect" href="https://www.facebook.com/Xtargon/">Gabriel CF</a>
                                </h5>
                                <hr>
                                <h5>
                                    <i class="material-icons _admin_mail_2"> call </i>
                                    <p class="this_inf_admin"> +51 976 431 101 </p>
                                </h5>
                                <h5>
                                  INSTAGRAM: <a class="social_redirect" href="https://www.instagram.com/gabo_finol/">@gabo_finol</a>
                                </h5>
                            </div>
                          </div>
                        </div>
                    </div>
                </div> `;
      $(".see").append(`${html}`)
      var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
      overlay = document.getElementById('overlay'),
      popup = document.getElementById('popup');

      var btnCerrarPopup = document.getElementById('cerrar_popup_origin');

      overlay.classList.add('active');
      popup.classList.add('active');

      btnCerrarPopup.addEventListener('click', function(e){
      $(".overlay").remove();
      e.preventDefault();
      overlay.classList.remove('active');
      popup.classList.remove('active');
    });
}

function show_menssagge_1() {
    var html = `<div class="overlay" id="overlay">
                    <div class="popup user_light" id="popup">
                        <a href="#" id="cerrar_popup_origin" class="btn-cerrar-popup">
                          <i class="fas fa-times">
                          </i>
                        </a>
                        <h4>
                         Exelente! Ya tienes un articulo en la lista de trabajos.
                        </h4>
                        <hr>
                        <h5>
                          Ahora debes esperar un interesado perfecto para este puesto de trabajo.
                        </h5>
                    </div>
                </div> `;
      $(".see").append(`${html}`)
      var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
      overlay = document.getElementById('overlay'),
      popup = document.getElementById('popup');

      var btnCerrarPopup = document.getElementById('cerrar_popup_origin');

      overlay.classList.add('active');
      popup.classList.add('active');

      btnCerrarPopup.addEventListener('click', function(e){
      $(".overlay").remove();
      e.preventDefault();
      overlay.classList.remove('active');
      popup.classList.remove('active');
    });
}

$('.jobs_show').click(function(e){ 
  jobs_show();
})

function jobs_show(){
    $('.jobs_show').remove();
    $('.options_home').append(`<a class='offers_show' onclick="offers_show()"><i class='material-icons'> art_track </i></a>`);
    $(".my_jobs").css('display', 'inline-block');
    $(".my_offers").css('display', 'none');
    $(".unreal").css('visibility', 'hidden');
    $(".unreal_jobs").css('visibility', 'visible');
}
function offers_show(){
    $('.offers_show').remove();
    $('.options_home').append(`<a class='jobs_show' onclick="jobs_show()"><i class='material-icons'> business_center </i></a>`);
    $(".my_offers").css('display', 'inline-block');
    $(".my_jobs").css('display', 'none');
    $(".unreal_jobs").css('visibility', 'hidden');
    $(".unreal").css('visibility', 'visible');
}

function remove_work(dlt) {
  socket.emit("dlt_work", dlt);
  $("#"+dlt+"").remove();
}

function add_pic_now(data_id2) {
        var f = $(this);
        var formData = new FormData(document.getElementById("upload_picture_form"));
        formData.append('ident', data_id2);
        $.ajax({
           url: "/upload_new_item",
           type: "post",
           dataType: "html",
           data: formData,
           cache: false,
           contentType: false,
           processData: false
        }).done(function(res){
                  $(".info_venta_todo").remove();
                  $(".options_sold").remove();
                  $(".img_venta").remove();
                  $(".overlay").remove();
                  $(".xo").css('display', 'inline-block');
                  socket.emit('find_sold', data_id2)
                  socket.emit('find_sold_info', data_id2)
        });
}

function edit_user_arraw(userId) {
        var name = document.getElementById("e_m_n").value;
        var user = document.getElementById("e_m_u").value;
        var phone = document.getElementById("e_m_p").value;
        var mail = document.getElementById('e_m_m').value;
        var my_id = document.getElementById('user_business').value;

        var data = {
          name : name,
          user: user,
          phone: phone,
          mail: mail,
          my_id: my_id
        };
        socket.emit("edit_this_user", data)
}

socket.on("edit_ready", function() {
  alert("haz cambiado tu información personal!");
})

$('.unreal_sold').click(function(e){ 

        var total_one = "";
        jQuery('input[type=file]').change(function(){
          var filename = jQuery(this).val().split('\\').pop();
          var idname = jQuery(this).attr('id');
          console.log(jQuery(this));
          console.log(filename);
          console.log(idname);
          total_one = `/static/img_main_file/img_uploaded/${filename}`;
          document.getElementById('file_text').value = filename;
        });

        var name_item = document.getElementById("name").value;
        var description_item = document.getElementById("des").value;
        var price_item = document.getElementById("price").value;
        var categ = document.getElementById('categ').value;

        var cabanet = "";

        if (categ == 1) {
         cabanet= "Tegnologia";
        }

        if (categ == 2) {
          cabanet= "Cocina";
        }

        if (categ == 3) {
          cabanet= "Automoviles";
        }

        if (categ == 4) {
          cabanet= "Ropa y Accesorios";
        }

        if (categ == 5) {
          cabanet= "Casa y Hogar";
        }

        e.preventDefault();
        var f = $(this);
        var formData = new FormData(document.getElementById("form-sold"));
        formData.append('name', name_item);
        formData.append('des', description_item);
        formData.append('cat', cabanet);
        formData.append('price', price_item);
            //formData.append(f.attr("name"), $(this)[0].files[0]);
        $.ajax({
           url: "/upload_item",
           type: "post",
           dataType: "html",
           data: formData,
           cache: false,
           contentType: false,
           processData: false
        }).done(function(res){
               alert("Genial! tienes un producto en la tienda.")
               location.href = "/home";
         });
});


$('#divRss').FeedEk({
    FeedUrl : 'https://peru.com/feed/actualidad',
    MaxCount : 10,
    ShowDesc : true,
    ShowPubDate:true,
    DescCharacterLimit:100,
    TitleLinkTarget:'_blank',
    DateFormat : 'MM/dd/yyyy',
    DateFormatLang : 'es'
  });


function showsing(){
	$(".container").css('display', 'inline-block');
	$(".container2").css('display', 'none');
}


function clisesing(){
	$(".container").css('display', 'none');
}

function showlog(){
	$(".container2").css('display', 'inline-block');
	$(".container").css('display', 'none');
}

function clisesing2(){
	$(".container2").css('display', 'none');
}

 function mostrarContrasena(){
    var tipo = document.getElementById("password");
    if(tipo.type == "password"){
        tipo.type = "text";
    }else{
        tipo.type = "password";
    }
}



/*function render(data) {
	var html = data.map(function(elem, index){
    	return(`<div>
        <strong>${elem}</strong>:
      </div>`)
    }).join(" ");
}*/

  $(".back_solds").click(function() {
  dlt_yes();
  });

function add_work_form() {
    $(".add_work").css('display', 'inline-block');
    $(".all_works").css('display', 'none');
    $(".unreal_back").css('visibility', 'visible');
    $(".unreal_add").css('visibility', 'hidden');
};

function show_works() {
    $(".add_work").css('display', 'none');
    $(".all_works").css('display', 'block');
    $(".unreal_back").css('visibility', 'hidden');
    $(".unreal_add").css('visibility', 'visible');
}

function show_register_other() {
    $(".store_3").css('display', 'none');
    $(".r_d").css('display', 'inline-block');
}
  
function show_login_other() {
    $(".store_3").css('display', 'inline-block');
    $(".r_d").css('display', 'none');
}

  function dlt_yes(argument) {
    $(".info_venta_todo").remove();
    $(".img_venta").remove();
    $(".options_sold").remove();
    $(".all_sold").css('display', 'inline');
    $(".this_sold").css('display', 'none');
    $(".xo").css('display', 'none');
  }

  $(".dlt_picture").click(function() {
    var item_id = this.id;
    alert(item_id);
  });

  socket.on("this_sold", function(data){
          sold_this_img(data)
})

/*socket.on("fresh_docs", function(data) { 
        if (data != "") {
          alert("brrr" + data);
        }
      var fresh_dcs = data.map(function(elem, index){

         return(`
          <div class="venta" onclick="show_sold('${elem._id}');">
            <div class="fresh">
              <div class="venta_name">
                <h2> ${elem.name} </h2>
                <hr>
                <h5> ${elem.description} </h5>
                <p class="p_venta"> ${elem.date} <p>
              </div>
            </div>
          </div>`)
      });
      $(".all_sold").append(`${fresh_dcs}`)

});
*/
$(".venta").click(function() {
    var item_id = this.id;
    show_sold(item_id)
});

function view_user(user_id) {
  socket.emit("find_author", user_id);
};

socket.on("this_author", function(data_user) {
  var this_user = `<div class="overlay" id="overlay">
                    <div class="popup user_light" id="popup">
                        <a href="#" id="cerrar_popup_origin" class="btn-cerrar-popup">
                          <i class="fas fa-times">
                          </i>
                        </a>
                        <h4>
                        <i class="Small material-icons whant_white">assignment_ind</i>
                        ${data_user.name}
                        </h4>
                        <hr>
                        <h5 class="this_author_inf">
                        <i class="Small material-icons whant_white">call</i>
                        ${data_user.phone}
                        </h5>
                        <h5 class="this_author_inf">
                        <i class="Small material-icons whant_white">contact_mail</i>
                        ${data_user.mail}
                        </h5>
                        <h5 class="this_author_inf">
                        <i class="Small material-icons whant_white">account_box</i>
                        ${data_user.type}
                        </h5>
                    </div>
                </div> `;
      $(".see").append(`${this_user}`)
      var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
      overlay = document.getElementById('overlay'),
      popup = document.getElementById('popup');

      var btnCerrarPopup = document.getElementById('cerrar_popup_origin');

      overlay.classList.add('active');
      popup.classList.add('active');

      btnCerrarPopup.addEventListener('click', function(e){
      $(".overlay").remove();
      e.preventDefault();
      overlay.classList.remove('active');
      popup.classList.remove('active');
    });
})


function show_sold(data_id){
    $(".xo").css('display', 'inline-block');
      socket.emit('find_sold', data_id)
      socket.emit('find_sold_info', data_id)
}

socket.on("this_sold_info", function(data){
  var html = data.map(function(elem, index){
          return(`<div class="info_venta_todo">
                    <h3>${elem.name}</h3>
                    <hr>
                    <h5>${elem.description}</h5>
                    <p>${elem.date}</p>
            </div>
            <div class="options_sold">
               <a class="clickme waves-effect waves-light btn" onclick="add_a_pic('${elem._id}')"><i class="material-icons left">add_a_photo</i>Añadir</a>
               <br>
               <div class="two_option">
                 <a class="waves-effect waves-light btn yes_sold" onclick="sold('${elem._id}')"><i class="material-icons left">beenhere</i>Vendido</a>
               </div>
               <br>
               <div class="tree_option">
                 <a class="waves-effect red darken-3 waves-light btn not_sold" onclick="dlt_sold('${elem._id}')"><i class="material-icons left">delete_forever</i>Eliminar</a>
               </div>
            </div>`)
    }).join(" ")

      $(".xo").append(`${html}`);
})

function view_corousel(params) {
  socket.emit("find_carousel", params)
  socket.emit("find_carousel_info", params)
}

function find_catalogue(data_id) {
socket.emit("find_catalogue", data_id);
}

socket.on("this_catalogue", function(docs) {
  show_catalogue(docs);
})

function show_catalogue(docs) {
  var html = docs.map(function(elem, index){
     return(`
             <a class="remove_item_catalogue" onclick="remove_item_this('${elem._id}')">
                <i class="medium material-icons">delete_forever</i>
             </a>
             <img src=${elem.Ruta} class="demoImgcatalogue">
             <br>
             `)
  }).join(" ")
    var this_user = `<div class="overlay" id="overlay">
                    <div id="popup_catalogue" class="popup user_light">
                        <a href="#" id="cerrar_popup_origin" class="btn-cerrar-popup">
                          <i class="fas fa-times">
                          </i>
                        </a>
                        <h3 class="mi_catalogo">Mi catalogo</h3>
                        <hr/>
                        <div class="mi_catalogue">
                    </div>
                </div> `;
      $(".see2").append(`${this_user}`)
      var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
      overlay = document.getElementById('overlay'),
      popup = document.getElementById('popup_catalogue');

      var btnCerrarPopup = document.getElementById('cerrar_popup_origin');

      overlay.classList.add('active');
      popup.classList.add('active');

      btnCerrarPopup.addEventListener('click', function(e){
      $(".overlay").remove();
      e.preventDefault();
      overlay.classList.remove('active');
      popup.classList.remove('active');
    });
    $(".mi_catalogue").append(`${html}`)
}

function remove_item_this(adc) {
  socket.emit("this_remove", adc)
}

function dlt_sold(id_sold) {
  dlt_yes();
  $("#"+id_sold+"").remove();
  socket.emit("this_sold_remove", id_sold)
  var user = document.getElementById('power').value;
  socket.emit("fresh_items", user)
    $("#"+id_sold+"").remove();
}

socket.on("remove_ready", function(ass) {
   $(".overlay").remove();
  var user_id = document.getElementById("user_business").value;
  find_catalogue(user_id)
})

socket.on("this_carousel", function(img_carousel) {
    $(".principal_store").css('visibility', 'hidden');
    $(".principal_store_carousel").css('visibility', 'visible');
    $(".unreal").css('display', 'none');
    $(".unreal_carousel").css('display', 'inline-block');
    var html = img_carousel.map(function(elem, index){



          return(`<a class="carousel-item" href="#one!">
              <img src=${elem.ruta} class="one_dimencion">
          </a>`)
    }).join(" ")

      $(".carousel").append(`${html}`);

    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems,{
      duration:500
    });
})

function back_carousel() {
    $(".principal_store").css('visibility', 'visible');
    $(".principal_store_carousel").css('visibility', 'hidden');
    $(".unreal").css('display', 'inline-block');
    $(".unreal_carousel").css('display', 'none');
    $(".info_venta_todo").remove();
    $(".carousel-item").remove();
    $(".sword_name").remove();
    $(".carouselInfo").remove();
}

socket.on("this_carousel_info", function(dat) {
    var html = dat.map(function(elem, index){
          return(`<div class="carouselInfo">
              <h5>${elem.description}</h4>
              <hr>
              <p class="inf_date">
              <i class="material-icons">today</i>
              ${elem.date}
              </p>
              <p class="inf_cat">
              <i class="material-icons">style</i>
              ${elem.categorie}
              </p>
              <p class="inf_price">
              <i class="material-icons">monetization_on</i>
              ${elem.price}
              </p>
              <p class="inf_phone">
              <i class="material-icons">call</i>
              ${elem.phone}
              </p>
              <p class="inf_push_user"><i class="material-icons" onclick="view_user('${elem.author}')">assignment_ind</i></p>
              
          </div>`)
    }).join(" ")

    var name = dat.map(function(elem, index){
          return(`<div class="sword_name">${elem.name}<hr></div>`)
    }).join(" ")

      $(".inf").append(`${html}`);
      $(".store_4").append(`${name}`);
})




function sold_this_img(dates){
    $(".this_sold").css('display', 'inline-block');
    $(".all_sold").css('display', 'none');
                
    var html2 = dates.map(function(elem, index){
        return(`<img src="${elem.ruta}" class="img_venta">`);
        
    }).join(" ");

    $(".pictures").append(`${html2}`);
  }

function sold(data1) {
      dlt_yes();
  
  var power = $("input:hidden").val();

  var data2 ={
    id_session: power,
    realData: data1
  };
  alert(data2.realData + " ++ + + + + + ++++++ ++ +++++ + + + + +++ + + +" + data2.id_session)
  socket.emit("sold", data2)
}

function dlt_picture(data) {
  alert(data +" se esta borrando");
}


function add_a_pic(data_id){
      $(".options_sold").css('visibility', 'hidden');
      $(".add_picture").append(`<div class="overlay" id="overlay">
            <div class="popup" id="popup">
              <a href="#" id="cerrar_popup_origin" class="btn-cerrar-popup">
                  <i class="fas fa-times">
                  </i>
              </a>

              <div class="contenedor-inputs">
                <form action="/upload_new_item" method="POST" id="upload_picture_form" enctype='multipart/form-data'>
                  <label for="input_photo2" class="lab">Escoger una imagen</label>
                  <input type='file'class="input_photo" id="input_photo2" name="file">
                  <input type="text" id="file_text2">
                </form>
                <button class="btn-submit" class="ready_upload" id="ready_upload" onclick="add_pic_now('${data_id}')">Añadir esta imagen</button>
              </div>
          </div>
        </div> `);

      var total_one = "";
      jQuery('input[type=file]').change(function(){
        var filename = jQuery(this).val().split('\\').pop();
        var idname = jQuery(this).attr('id');
        console.log(jQuery(this));
        console.log(filename);
        console.log(idname);
        total_one = `/static/img_main_file/img_uploaded/${filename}`;
        document.getElementById('file_text2').value = filename;
      });

      var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
      overlay = document.getElementById('overlay'),
      popup = document.getElementById('popup');

      var btnCerrarPopup = document.getElementById('cerrar_popup_origin');

      overlay.classList.add('active');
      popup.classList.add('active');

      btnCerrarPopup.addEventListener('click', function(e){
      $(".options_sold").css('visibility', 'visible');
      $(".overlay").remove();
      e.preventDefault();
      overlay.classList.remove('active');
      popup.classList.remove('active');
    });
}


socket.on('mail_acces', function(data) {
  user_mail_dates = data;
  $(".password_acces").css('display', 'inline-block');
  $( ".message-container" ).html("Hola " + user_mail_dates);
  var my_mail = document.getElementById('mail_input').value;

    $(".see").append(`<div class="overlay" id="overlay">
                          <div class="popup" id="popup">
                              <a href="#" id="cerrar_popup_origin" class="btn-cerrar-popup">
                                <i class="fas fa-times">
                                </i>
                              </a>
                              <h3>${user_mail_dates}</h3>
                              <div class="contenedor-inputs">
                                  <form action="/login" method="POST">
                                    <input type="hidden" value=${my_mail} name="mail">
                                    <input type='password', placeholder='password', name="password", id="password_input_origin", class="password_acces">
                                    <button class="btn-submit" id="button_origin">Iniciar sesion</button>
                                  </form>
                              </div>
                          </div>
                      </div> `);

      var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
      overlay = document.getElementById('overlay'),
      popup = document.getElementById('popup');

      var btnCerrarPopup = document.getElementById('cerrar_popup_origin');

      overlay.classList.add('active');
      popup.classList.add('active');

      btnCerrarPopup.addEventListener('click', function(e){
      e.preventDefault();
      overlay.classList.remove('active');
      popup.classList.remove('active');
    });
});



function aero_list() {

  var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
  overlay = document.getElementById('overlay'),
  popup = document.getElementById('popup');

  var btnCerrarPopup = document.getElementById('cerrar_popup');

  overlay.classList.add('active');
  popup.classList.add('active');

  btnCerrarPopup.addEventListener('click', function(e){
    e.preventDefault();
    overlay.classList.remove('active');
    popup.classList.remove('active');
  });
}

function aero_list2() {

  var btnAbrirPopup = document.getElementById('btn-abrir-popup20'),
  overlay = document.getElementById('overlay20'),
  popup = document.getElementById('popup20');

  var btnCerrarPopup = document.getElementById('cerrar_popup20');

  overlay.classList.add('active');
  popup.classList.add('active');

  btnCerrarPopup.addEventListener('click', function(e){
    e.preventDefault();
    overlay20.classList.remove('active');
    popup20.classList.remove('active');
  });
}

function aero_list3() {

  var total_one = "";
  jQuery('input[type=file]').change(function(){
    var filename = jQuery(this).val().split('\\').pop();
    var idname = jQuery(this).attr('id');
    console.log(jQuery(this));
    console.log(filename);
    console.log(idname);
    total_one = `/static/img_main_file/img_uploaded/${filename}`;
    document.getElementById('file_text_edit_logo').value = filename;
  });

  var btnAbrirPopup = document.getElementById('btn-abrir-popup30'),
  overlay = document.getElementById('overlay30'),
  popup = document.getElementById('popup30');
  $("#popup40").css('display', 'none');

  var btnCerrarPopup = document.getElementById('cerrar_popup30');

  overlay.classList.add('active');
  popup.classList.add('active');

  btnCerrarPopup.addEventListener('click', function(e){
    e.preventDefault();
    $("#popup40").css('display', 'inline-block');
    overlay.classList.remove('active');
    popup.classList.remove('active');
  });
}

function show_next_cap() {
  $(".build_main_create").css('display', 'none');
  $(".next_steps").css('display', 'inline-block');
}

socket.on('mail_not_acces', function(data) {
  user_mail_dates = "No se encontro este mail en la base de datos";

  $(".not_mail_in_DB").css('display', 'inline-block');
  $( ".message-container" ).html(user_mail_dates);
  $(".password_acces").css('display', 'none');
});

function show_setting_control(data) {
    $(".done_changed").css('display', 'block');
    alert(data.name);
}

function not_view(){
  $(".done_changed").css('display', 'none');
}

socket.on('dates_changed', function(data) {
  show_setting_control(data);
});

function mail_arrow() {

	var date = {
    mail: document.getElementById('mail_input').value
  };
  socket.emit('login_arrow', date);
}

function password_arrow() {

  var dates = {
    mail: document.getElementById('mail_input').value,
    password: document.getElementById('password_input').value
  };
  socket.emit('login_arrow_definitive', dates);
}

function myFunction() {

  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
/*$(document).ready(function(){
})*/

function show_bussiness(){
  $(".build_main").css('display', 'inline-block');
  $(".orders_dashboard").css('display', 'none');
  $(".dashboard_garfics").css('display', 'none');
}

function show_orders(){
  $(".build_main").css('display', 'none');
  $(".inner").css('display', 'none');
  $(".orders_dashboard").css('display', 'inline-block');
  $(".dashboard_garfics").css('display', 'none');
  var bussines = document.getElementById('this_restaurant').value;
  socket.emit('otro', bussines);
  $("#sdf").remove();
}

function business_arrow(){

  var dates_bussines = {
       name_business :document.getElementById('business_name').value,
       location_business : document.getElementById('location_business').value,
       description_business : document.getElementById('description_business').value,
       open_business : document.getElementById('open_business').value,
       phone_business : document.getElementById('phone_business').value,
       close_business : document.getElementById('close_business').value,
       user_business : document.getElementById('user_business').value
  };
  socket.emit('business_arrow', dates_bussines);
}

function add_article_arrow(){

  var dates_article = {
       Name_article :document.getElementById('NameArticleAdd').value,
       description_article : document.getElementById('DescripcionArticleAdd').value,
       price_article : document.getElementById('PriceArticleAdd').value,
       user_business : document.getElementById('user_business').value
  };
  socket.emit('add_article_arrow', dates_article);
}

socket.on('add_ok_articel', function(data) {
  alert("añadiste un articulo a la lista")
});

socket.on('add_ok_img', function(data) {
  alert("añadiste una imagen al portal");
  img_upload_ok = document.getElementById('img_upload_ok');
  img_upload_ok.classList.add('Img_Uploaded_ok');
});
var total_one = "";
jQuery('input[type=file]').change(function(){
  var filename = jQuery(this).val().split('\\').pop();
  var idname = jQuery(this).attr('id');
  console.log(jQuery(this));
  console.log(filename);
  console.log(idname);
  var input = document.getElementById('file_text').value = filename;
  total_one = `/static/img_main_file/img_uploaded/${filename}`;
});

function ADI() {
   var input = document.getElementById('file_text').value = "";
  alert("haz añadido una imagen al catalogo")

}

jQuery('input[type=file]').change(function(){
  var filename = jQuery(this).val().split('\\').pop();
  var idname = jQuery(this).attr('id');
  console.log(jQuery(this));
  console.log(filename);
  console.log(idname);
  var input = document.getElementById('file_text_edit_logo').value = filename;
  total_one = `/static/img_main_file/img_uploaded/Logos/${filename}`;
});

function UDI() {
  alert("haz cambiado el logo de tu negocio")
}

function UDP() {
  var input = document.getElementById('file_text_edit_logo').value = "";
  alert("haz cambiado el logo de tu negocio")
}

show_bussiness();

    $(function(){
        $("#changeQuote").on("submit", function(e){
            e.preventDefault();
            var f = $(this);
            var formData = new FormData(document.getElementById("changeQuote"));
            //formData.append(f.attr("name"), $(this)[0].files[0]);
            $.ajax({
                url: "/test",
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function(res){
                    socket.emit('test', res);
              });
        });

        $("#upload_Catalogue").on("submit", function(e){
            e.preventDefault();
            var f = $(this);
            var formData = new FormData(document.getElementById("upload_Catalogue"));
            //formData.append(f.attr("name"), $(this)[0].files[0]);
            $.ajax({
                url: "/upload_Catalogue",
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function(res){
                   alert("done")
              });
        });

       $("#upload_logo").on("submit", function(e){
            e.preventDefault();
            var f = $(this);
            var formData = new FormData(document.getElementById("upload_logo"));
            //formData.append(f.attr("name"), $(this)[0].files[0]);
            $.ajax({
                url: "/upload_logo",
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function(res){
                   alert("done")
              });
        });

    });
var ff ="";
var item_price_ok ="";
var item_prise="";
var g = "";
var p = "";
var f3f=undefined;
var zx="";
var b ="";
var o = "";
$(document).ready(function(){
  $(".art_new").click(function() {
      var item_id = this.id;
      socket.emit('search_item', item_id);

  });
})
   var total_price = "";
  socket.on('ok_find_item', function(data) {
        var content = data.name;
         ff = ff + "," +content;
        var input = document.getElementById('input_delivery').value =  ff;
        item_price_ok =item_price_ok + "," + data.price;

  });

var thisbusiness = "";
function partir(){
  function dividirCadena(cadenaADividir,separador, prices) {
   var arrayDeCadenas = cadenaADividir.split(separador);
   var arrayDeprecios = prices.split(separador);

   for (var i=0; i < arrayDeCadenas.length; i++) {
      for (var i=0; i < arrayDeprecios.length; i++) {
          p = arrayDeprecios[i];
          zx = zx + p;
          g = g + arrayDeCadenas[i]+ "<div id='show_price'>" + p + "</div>"+"<hr>";

        if (p!="") {
          b = b + arrayDeCadenas[i] +" : "+ p + "<br>";
        }
        else{
          b="";
        }


      }
   }
    thisbusiness = document.getElementById('this_restaurant').value;


  arrayDeprecios="";
  arrayDeCadenas="";
  item_price_ok="";
  ff = "";




      $(".see_check").append(`<div class="overlay" id="overlay">
                          <div class="popupcheck" id="popupcheck">
                              <a href="#" id="cerrar_popup_origin" class="btn-cerrar-popup">
                                <i class="fas fa-times">
                                </i>
                              </a>
                              <h3></h3>
                              <div class="contenedor-inputs_check">
                                <h1> Su lista de pedidos </h1>
                                <div id="sd">

                                </div>

                                <hr>
                              </div>
                              <input type="text" placeholder="Coloca acá tu direccion" id="location_order">
                              <button class="btn" onclick="detoditoxd()">send</button>
                          </div>
                      </div> `);

      document.getElementById("sd").innerHTML = g;



      g="";
      p="";
      total_price = "";
      var elements = document.getElementById("input_delivery").value = "";
      var btnAbrirPopup = document.getElementById('btn-abrir-popup');
      overlay = document.getElementById('overlay');
      popup = document.getElementById('popupcheck');

      var btnCerrarPopup = document.getElementById('cerrar_popup_origin');

      overlay.classList.add('active');
      popup.classList.add('active');

    btnCerrarPopup.addEventListener('click', function(e){
      e.preventDefault();
      overlay.classList.remove('active');
      popup.classList.remove('active');
    });



      var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
      overlay = document.getElementById('overlay'),
      popup = document.getElementById('popupcheck');

      var btnCerrarPopup = document.getElementById('cerrar_popup_origin');

      overlay.classList.add('active');
      popup.classList.add('active');

      btnCerrarPopup.addEventListener('click', function(e){
      e.preventDefault();
      overlay.classList.remove('active');
      popup.classList.remove('active');
    });

  }
    var coma = ",";
  input = document.getElementById('input_delivery').value;
  dividirCadena(input, coma, item_price_ok);












      $(".see_check").append(`<div class="overlay" id="overlay">
                          <div class="popupcheck" id="popupcheck">
                              <a href="#" id="cerrar_popup_origin" class="btn-cerrar-popup">
                                <i class="fas fa-times">
                                </i>
                              </a>
                              <h3>${user_mail_dates}</h3>
                              <div class="contenedor-inputs_check">
                                <h5>none datas</h5>
                              </div>
                          </div>
                      </div> `);

      var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
      overlay = document.getElementById('overlay'),
      popup = document.getElementById('popupcheck');

      var btnCerrarPopup = document.getElementById('cerrar_popup_origin');

      overlay.classList.add('active');
      popup.classList.add('active');

      btnCerrarPopup.addEventListener('click', function(e){
      e.preventDefault();
      overlay.classList.remove('active');
      popup.classList.remove('active');
    });
}





  $(".menu-show").click(function(event){
    event.preventDefault();
    $("nav").toggleClass("menushow");
  });



   $(".principal_box").click(function(event){
        $(".restaurant_top_5").css('display', 'inline-block');
        $(".restaurant_top_5_hoteles").css('display', 'none');
        $(".restaurant_top_5_bar").css('display', 'none');
        $(".restaurant_top_5_cafe").css('display', 'none');
        var dates_bussines = "Restaurante";
        socket.emit('search_A_top5', dates_bussines);

  });
    $(".principal_box_hotel").click(function(event){
        $(".restaurant_top_5_hoteles").css('display', 'inline-block');
        $(".restaurant_top_5_bar").css('display', 'none');
        $(".restaurant_top_5_cafe").css('display', 'none');
        $(".restaurant_top_5").css('display', 'none');
        var dates_bussines = "Hotel";
        socket.emit('search_A_top5', dates_bussines);

  });

    $(".principal_box_bar").click(function(event){
              $(".restaurant_top_5_bar").css('display', 'inline-block');
        $(".restaurant_top_5_hoteles").css('display', 'none');
        $(".restaurant_top_5_cafe").css('display', 'none');
        $(".restaurant_top_5").css('display', 'none');
        var dates_bussines = "Bar";
        socket.emit('search_A_top5', dates_bussines);
  });


    $(".principal_box_cafe").click(function(event){
              $(".restaurant_top_5_cafe").css('display', 'inline-block');
        $(".restaurant_top_5_hoteles").css('display', 'none');
        $(".restaurant_top_5_bar").css('display', 'none');
        $(".restaurant_top_5").css('display', 'none');
        var dates_bussines = "Cafeteria";
        socket.emit('search_A_top5', dates_bussines);
  });

    $(".principal_box_trabajo").click(function(event){
      location.href = "/trabajo";
  });

    $(".principal_box_bienes").click(function(event){
      location.href = "/bienes";
  });

socket.on('top', function(data) {
   var arrayDeCadenas = data;

   var g ="2";

   for (var i=0; i < arrayDeCadenas.length; ) {
      g = arrayDeCadenas[i];
          $(".other").append(`

                        <div class="card" id="gardd">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator img_top_show" src="${g.logo}" >
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">${g.name}<i class="iconmore material-icons">more_vert</i>

                              </span>
                              <a href='/vistazo/${g.name}' class="cls"> Echar un vistazo</a>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">${g.name}<i class="iconmore material-icons">close</i></span>
                              <p>${g.description}</p>

                                <hr>
                              </p>
                              <p>

                                  <i class="material-icons icon">phone</i>
                                  ${g.phone}
                              </p>
                              <p>

                                <i class="material-icons icon">room</i>
                                ${g.location_business}
                              </p>
                              <p>

                                  <i class="material-icons icon">alarm</i>
                                  ${g.open}
                              </p>

                            </div>
                            <hr>
                          </div>

      `);
     i++;
   }

});


    $(".cerrar_section").click(function(event){
        $(".restaurant_top_5").css('display', 'none');
        $(".restaurant_top_5_hoteles").css('display', 'none');
        $(".restaurant_top_5_bar").css('display', 'none');
        $(".restaurant_top_5_cafe").css('display', 'none');
        $(".card").remove();
  });
      function detoditoxd(){

        var overlay_prymary = document.getElementById('overlay');
        var popup_primary = document.getElementById('popupcheck');

        overlay_prymary.classList.remove('active');
        popup_primary.classList.remove('active');

        var bussines = document.getElementById('this_restaurant').value;
        socket.emit('otro', bussines);
          var thislocation = document.getElementById('location_order').value;

          f3f ={
            name:b,
            belong: thisbusiness,
            direction: thislocation

          };
        socket.emit('sss', f3f);
          var fecha = new Date();
          var semana = ["domingo" , "lunes" , "martes" , "miercoles" ,  "jueves" , "viernes" , "sabado"];
          var hoyx=semana[fecha.getDay()];
          frak = {
            to_day: hoyx,
            bussines:bussines
          };
        socket.emit('suming', frak);
        b="";

        var audio = document.getElementById("audio");

        audio.play();

      $(".see_check").append(`<div class="overlayx" id="overlayx">
                          <div class="popupcheckn" id="popupcheckn">
                              <a href="#" id="cerrar_popup_originx" class="btn-cerrar-popup">
                                <i class="fas fa-times">
                                </i>
                              </a>

                              <h2>ahora estaremos prosesando su pedido,  gracias</h2>

                          </div>
                      </div> `);

      overlay = document.getElementById('overlayx');
      popup = document.getElementById('popupcheckn');

      var btnCerrarPopupx = document.getElementById('cerrar_popup_originx');


      overlay.classList.add('active');
      popup.classList.add('active');

      btnCerrarPopupx.addEventListener('click', function(e){
        e.preventDefault();
        overlay.classList.remove('active');
        popup.classList.remove('active');
      });

      }


      function rex(e){
        alert(e);
      }

      socket.on('news', function(data) {
        render(data)
      });

      function render(data) {
        var html = data.map(function(elem, index){
                return(`<div class="only_order">
                  <strong>${elem.order}</strong>
                  <hr>
                  Fecha del pedido: ${elem.date}
                  <hr>
                  Dirección del cliente: ${elem.location}
                  <hr>
                  <div class="options_order">
                    <a class="" onclick="archive_order('${elem._id}')">
                      <i class="material-icons option_check_order">archive</i>
                    </a>

                    <a class="" onclick="delete_order('${elem._id}')">
                      <i class="material-icons option_delete_order">delete_forever</i>
                    </a>

                  </div>
                </div>`)
          }).join(" ")

             $(".orders_dashboard").append(`
                                <div id="sdf">
                                ${html}
                                </div> `)


      }



      function render_orders_archived(data) {
        var html = data.map(function(elem, index){
                return(`<div class="only_order">
                  <strong>${elem.order}</strong>
                  <hr>
                  Fecha del pedido: ${elem.date}
                  <hr>
                  Dirección del cliente: ${elem.location}
                  <hr>
                  <div class="options_order">
                    <a class="" onclick="delete_order_archived('${elem._id}')">
                      <i class="material-icons option_delete_order">delete_forever</i>
                    </a>

                  </div>
                </div>`)
          }).join(" ")

             $(".inner").append(`
                                <div id="adf">
                                ${html}
                                </div> `)


      }

var type_user = "";

$(".choose_standard").on("click", function() {
  $(".choose_admin_business").css('display', 'none');
  type_user = "standard";
  alert(type_user);
})

$(".choose_admin_business").on("click", function() {
  $(".choose_standard").css('display', 'none');
  type_user = "ejecutive";
  alert(type_user);
})

$(".save_user").on("click", function() {
  var name_check = document.getElementById('name_check').value;
  var pass_check = document.getElementById('password').value;
  var user_check = document.getElementById('user_check').value;
  var mail_check = document.getElementById('mail_check').value;
  var phone_check = document.getElementById('phone_check').value;
  var all_data = name_check + " - " +pass_check+ " - " +user_check+ " - " +mail_check+ " - " +phone_check;
  if (type_user == "") {
    alert("Debes elegir un tipo de usuario antes de registrarte")
  }
  else{
    data = {
      type : type_user,
      name : name_check,
      user : user_check,
      pass : pass_check,
      mail : mail_check,
      phone : phone_check
    };
    socket.emit("checked_data", data)
    location.href = "/login";
  }

})

socket.on("fine_user_add", (data)=>{

  $(".alert").css('display', 'inline-block');


  $(".form").css('display', 'none');

})

socket.on("bad_user_add", (data)=>{

  $(".bad_alert").css('display', 'inline-block');


  $(".form").css('display', 'none');

})

socket.on('s5s', function(data) {
show_orders();
});

socket.on("refresh_orders", function() {
    alert("ras")
})

function archive_order(idx){
  socket.emit('order_archive_arrow', idx);
}

socket.on('news_archived', function(data) {
  render_orders_archived(data);
});

socket.on('no_archived', function(data) {
  archived_show();
});

function delete_order(idx){
  socket.emit('order_delete_arrow', idx);
}

function delete_order_archived(idx){
  socket.emit('order_archived_delete', idx);
}

function archived_show(idx){
 $(".orders_dashboard").css('display', 'none');
 $(".inner").css('display', 'inline-block');
  $(".dashboard_garfics").css('display', 'none');
var bussines = document.getElementById('this_restaurant').value;
 socket.emit('otro_archived', bussines);
 $("#adf").remove();
}

function grafics_show(idx){
 $(".orders_dashboard").css('display', 'none');
 $(".inner").css('display', 'none');
 $(".build_main").css('display', 'none');
 $(".dashboard_garfics").css('display', 'inline-block');
var bussines = document.getElementById('this_restaurant').value;
 //socket.emit('otro_archived', bussines);
 //$("#adf").remove();
 sort();
}

function archived_hidden(idx){
  $(".orders_dashboard").css('display', 'inline-block');
 $(".inner").css('display', 'none');

}

function diaSemana(){
  var fecha = new Date();
  var semana = ["domingo." , "lunes." , "martes." , "miercoles." ,  "jueves." , "viernes." , "sabado."];
  alert( semana[fecha.getDay()] );
};




//diaSemana(dia, mes,anio);

function iniciar_gps(){
    var map = document.getElementById('map');

    function localizacion(x){
        var ol = x.coords.latitude;
        var lo = x.coords.longitude;

        map.innerHTML =  "<p> la latitud es: "+ ol +"</p>"+"<p> la longitud es: "+ lo +"</p>";
    }

    function alerror(){
      alert("error");
    }

      navigator.geolocation.getCurrentPosition(localizacion, alerror);

}



var morris1 = Morris.Donut({
  element: 'myfirstchart',
  data: [
    {label: "ventas lunes", value: 500},
    {label: "ventas martes", value: 450},
    {label: "ventas miercoles", value: 320},
    {label: "ventas jueves", value: 320},
    {label: "ventas viernes", value: 320},
    {label: "ventas sabado", value: 320},
    {label: "ventas domingo", value: 310}
  ]
});

$("#botoncito").on("click", function() {

sort();

})

$("#sssss").on("click", function() {

diaSemana();

})

socket.on("sold_graphics", function(graphics) {
  var lunes = 0;
  var martes = 0;
  var miercoles = 0;
  var jueves = 0;
  var viernes = 0;
  var sabado = 0;
  var domingo = 0;
  var arrayofsold = graphics;

  for (var i=0; i < arrayofsold.length; ) {
     g = arrayofsold[i];

     if(g.dia == "lunes"){
       lunes++;
     }

     if(g.dia == "martes"){
       martes++;
     }

     if(g.dia == "miercoles"){
       miercoles++;
     }

     if(g.dia == "jueves"){
       jueves++;
     }

     if(g.dia == "viernes"){
       viernes++;
     }

     if(g.dia == "sabado"){
       sabado++;
     }

     if(g.dia == "domingo"){
       domingo++;
     }
     i++;
   }
   var newdata = [
   {label: "ventas lunes", value: lunes},
   {label: "ventas martes", value: martes},
   {label: "ventas miercoles", value: miercoles},
   {label: "ventas jueves", value: jueves},
   {label: "ventas viernes", value: viernes},
   {label: "ventas sabado", value: sabado},
   {label: "ventas domingo", value: domingo}
 ];

   morris1.setData(newdata);

   var suma = lunes + martes + miercoles + jueves + viernes + sabado + domingo;

   var total= "El total de ventas de esta semana es de: " + suma;
   document.getElementById("total_ventas").innerHTML = total;

})

function sort() {
    var bussines = document.getElementById('this_restaurant').value;
    socket.emit('find_graphics', bussines);
}

sort();

function sold_show() {
   $(".principal_store").css('visibility', 'hidden');
   $(".sold_store").css('visibility', 'visible');
   $(".unreal").css('visibility', 'hidden');
   $(".unreal2").css('visibility', 'visible');
   $(".unreal3").css('visibility', 'visible');
}


function buy_show() {
   $(".sold_store").css('visibility', 'hidden');
   $(".principal_store").css('visibility', 'visible');
   $(".unreal2").css('visibility', 'hidden');
   $(".unreal3").css('visibility', 'hidden');
   $(".unreal").css('visibility', 'visible');
}







/*-  
  <div class="add_picture">
      <form method="POST" enctype='multipart/form-data' id="add_picture">
        <input type="text">
       </form>
  </div>  
-*/




















//https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
