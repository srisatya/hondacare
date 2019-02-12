// Initialize app
myApp = new Framework7({
    animateNavBackIcon: false,//true
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
	swipeBackPage: false, //false
	swipeBackPageThreshold: 1,
	swipePanel: "left",
	swipePanelCloseOpposite: true,
	pushState: true,
	pushStateRoot: undefined,
	pushStateNoAnimation: false,
	pushStateSeparator: '#!/',
    template7Pages: false
    });


// If we need to use custom DOM library, let's save it to $$ variable:
$$ = Dom7;

// Add view
mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});




// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
	
	$('#index_status').html("cek");
	ns.setInitData('register','pending',function(st,d){
	  if(st == "ok")
	  {
		  $('#index_status').html(d);
		  ns.setInitData('keanggotaan','umum',function(st2,d2){
			  if(st2 == "ok")
			  {
				  $('#index_status').html(d2);
				  ns.setInitData('akun','none',function(st3,d3){
					  if(st3 == "ok")
					  {
						  $('#index_status').html("verifikasi akun");
						  push.push_message_init();
						 
						  
					  }
					  
				  });
			  }
		  });
	  }
	});
	

	controlNavigasi();
	
	
	
	cordova.plugins.backgroundMode.enable();
	cordova.plugins.backgroundMode.setDefaults({
		title: 'Honda Care',
		text: 'Keep Alive..',
		//icon: 'icon' // this will look for icon.png in platforms/android/res/drawable|mipmap
		//color: String // hex format like 'F14F4D'
		resume: true,
		hidden: true,
		bigText: false
	})

	//cordova.plugins.backgroundMode.overrideBackButton();
	cordova.plugins.backgroundMode.excludeFromTaskList();

	cordova.plugins.backgroundMode.on('activate', function() {
	   cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
	});
	
		//loadsound
	//app.loadAllSound();
	//loadsound
	//app.phoneStatus();
	
	$$('.navbar').hide();
        
        
	
	//initial URI
        
        app.loadAllSound();
	RUNURI=cordova.file.externalRootDirectory;
	
	
	
});


//fungsi-fungsi panel

 $$('#panel_photo').on('click', function () {    
  myApp.popup(".popup-upload");
    
    
    
     if(app.detekVersion() == true)
         {
            // alert('new');
            var akun=INTERNALDATA.akun.split(',');
            $('#up_username').val(akun[0]);
            $('#up_password').val(akun[1]); 
            
          $('.panel_new_version').show();  
          $('.panel_old_version').hide();
         }else
         {
            // alert('old');
          
          $('.panel_old_version').show();   
            $('.panel_old_version .panel_open').show();
            $('.panel_old_version .panel_directory').hide();
            
         $('.popup-upload div div .panel_new_version').hide();   
         }    
   });
   
   
   $$('#panel_upload_open').on('click', function () {
    
    //app.getDirectory(cordova.file.externalRootDirectory + "DCIM/Camera");
    app.getDirectory(cordova.file.externalRootDirectory);
    //app.getFile();
    
   });

    $$('#panel_upload_kembali').on('click', function () {    
          $('.panel_old_version').show();   
            $('.panel_old_version .panel_open').show();
            $('.panel_old_version .panel_directory').hide();            
         $('.popup-upload div div .panel_new_version').hide();  
    
   });
   
   
   $("#avatar2").submit(function(e){
    e.preventDefault();
    var uri=$('#previewing2').attr('src');
    //alert(uri);
    myApp.showIndicator();
    app.image2Canvas(uri,function(newdata){
       //myApp.hideIndicator();
       //alert(newdata);
      // var block = newdata.split(";");       
      // var contentType = block[0].split(":")[1];
      // var realdata =block[1].split(",")[1];
       //alert(newdata);
      // var blob=app.base64ToBlob(realdata,contentType);
       //var fd = new FormData(form2);
       //fd.append("file", blob);
       //var akun=INTERNALDATA.akun.split(',');
       //var dataObj ={file:newdata,username:akun[0],password:akun[1]};
      
       jsonp.uploadImageBlob(newdata);
                
                
    });
});


$$('.popup-keluhan').on('popup:opened', function () {
   $$('#btnbicarakeluhan').on('click',function(){
      //app.cekSpeech();
      app.startListening();
});  
})


$$('.popup-pengajuan-klaim').on('popup:opened', function () {
    
  var body='';
  //var statusklaim=false;
  var totalklaim=0;
  var arrids=[];
  if(typeof STATISTIK.claim_pending != "undefined")
           {
          var claim_pending =STATISTIK.claim_pending;
          for(var i in claim_pending)
          {
          body +='<tr>';
          //str.substr(1, 4);
          var orderid=claim_pending[i].orderid;
          if(parseInt(claim_pending[i].total) > 0){
          var total=app.formatUang(parseInt(claim_pending[i].total));
          arrids.push(orderid);
          
          body +='<td class="label-cell">'+orderid.substr(1,4)+'xxx</td>';
          body +='<td class="label-cell">'+claim_pending[i].username+'</td> ';         
          body +='<td class="label-cell">'+claim_pending[i].postdate+'</td>';
	  body +=' <td class="numeric-cell">'+total+'</td>';
          body +=' </tr>';
          totalklaim +=parseInt(claim_pending[i].total);
          }
          }
          body +='<tr>';
          body +='<td class="label-cell" ><b>TOTAL KLAIM</b></td>';
          var strtotalklaim =app.formatUang(parseInt(totalklaim)); 
	  body +=' <td class="numeric-cell"><b>'+strtotalklaim+'</b></td>';
          body +=' <td class="label-cell"></td>';
          body +=' <td class="label-cell"></td>';
          body +=' </tr>';
         
          
           }else
           {
           body +='<tr>'; 
           body +='<td class="label-cell" colspan="4">Tidak Ada Layanan Honda Care yang bisa di Klaim ke Astra</td>';
           body +=' </tr>';
               
           }
         $('#panel_totalklaim').val(totalklaim);
         $('#panel_ids').val(arrids.join('~'));  
           
    $('.panel_klaim_table_body').html(body); 
    
   
 
});


$$('#btn_panel_pengajuan_klaim').on("click",function(){
      
      var totalklaim=$('#panel_totalklaim').val();
      var strids=$('#panel_ids').val();
     if(parseInt(totalklaim) > 0)
     {
         //var strids = arrids.join("~");
         jsonp.pengajuanKlaim(strids,totalklaim);
     }else
     {
        myApp.alert("Tidak Ada Klaim yang dapat di ajukan","Honda Care",function(){
            myApp.closeModal(".popup-pengajuan-klaim");
        }) 
     }    
     
   });   
   
   
   
   $$('.popup-konfirmasi-klaim').on('popup:opened', function () {
    $('.panel_konfirm_table_body').html('');
  jsonp.getKlaim2Konfirm(function(data){
     var body='';
     if(data != 'none' || data != 'error')
     {
      //alert(data)  
//'{"id":"2","claim_ids":"","claim_request":"70000","claim_release":"0","claim_saldo":"0","user_id":"2","postdate":"2018-05-22 13:57:28","status":"send","nama_lengkap":"desaksri"}'})
     var info=JSON.parse(data);
     //alert(info.id);
     
      body +='<tr>';
       body +='<td class="label-cell"><a href="#" class="button button-fill button-small color-teal" onClick=\'jsonp.setUserKlaimKonfirm("'+info.id+'")\'>Konfirmasi</a></td>';
       body +='<td class="label-cell"><h2>'+info.id+'</h2></td>';
       body +='<td class="label-cell">'+info.nama_lengkap+'</td>';
         body +='<td class="label-cell">'+info.postdate+'</td>';
          body +='<td class="numeric-cell">'+app.formatUang(parseInt(info.claim_request))+'</td>';
           body +='<td class="numeric-cell">'+app.formatUang(parseInt(info.claim_release))+'</td>';
            body +='<td class="numeric-cell">'+app.formatUang(parseInt(info.claim_saldo))+'</td>';
           
            body +='</tr>';
    
     
     $('.panel_konfirm_table_body').html(body);
     }else
     {
       myApp.alert("Tidak ada Klaim yang harus dikonfirmasi","Honda Care");  
     }    
  })  
    
});

$$('#btnagenoff').on('click', function () { 
    var alasan=$('textarea[name=alasan]').val();
    jsonp.setAgenLive('on',alasan);
});

$$('#panel_profil').on('click', function () {  
    myApp.closePanel();
     setTimeout(function(){mainView.router.loadPage("profil.html");},500)
});
$$('#panel_setting').on('click', function () { 
    myApp.closePanel();
   setTimeout(function(){mainView.router.loadPage("setting.html");},500) 
});
$$('#panel_refresh').on('click', function () {  
    app.reloadDatauser();
});

$$('#btn-order-detail').on('click', function () {
    $('.popup-order-detail-body').html('');
    myApp.closeModal('.popup-order-detail');
});



$$('.popup-order-detail').on('popup:opened', function () {   
    $('#btn-order-detail').hide();
     $('.popup-order-detail-body').html('');
    jsonp.getOrderDetail(CURORDERID,function(data){
        var body="";
        if(data != "none" || data != "error")
        {
          var info=JSON.parse(data);          
             // body += info.service_order_num+"\n";
          var oid=info.invoice_no;
         // var sp_orderid = oid.substr(0,8)+' '+oid.substr(8,8)+' '+oid.substr(16,8)+' '+oid.substr(24,8);
          body +='<tr>';
          body +='<td></td><td></td><td></td><td></td>';          
          body +='</tr>';
          body +='<tr>';
          body +='<td colspan="2" style="text-align:left" valign="top">'+info['ahassname']+'</td>';    
          body +='<td colspan="2" style="text-align:right" valign="top"><h2>INVOICE</h2></td>';
          body +='</tr>';
          body +='<tr>';
          body +='<td colspan="4" style="height:30px">&nbsp;</td>';
          body +='</tr>';
          body +='<tr>';
          body +='<td colspan="2" style="text-align:left" valign="top">'+info['ahassaddress']+'<br>Agen Phone :'+info['agenphone']+'</td>';  
          var tgl=info['service_order_register'].split(' ');
          body +='<td colspan="2" style="text-align:right" valign="top">No:'+oid.substr(0,8)+'***<br>Tgl :'+tgl[0]+'</td>';
          body +='</tr>';
          body +='<tr>';
          body +='<td colspan="4" style="height:30px">&nbsp;</td>';
          body +='</tr>';
          body +='<tr>';
          body +='<tr>';
          body +='<td colspan="2" style="text-align:left" valign="top"><b>Info Pelanggan</b>';
          body +='<br>Nama :'+info['username'];
          body +='<br>Plat :<b>'+info['plat_no']+'</b>';
          body +='<br>Alamat :'+info['user_alamat'];
          body +='<br>Telp :'+info['userphone'];
          body +='</td>';
          body +='<td colspan="2" style="text-align:left" valign="top"><b>Info Agen</b>';
          body +='<br>Nama :'+info['agenname'];
          body +='<br>Tipe :'+info['agentype'];
          body +='<br>Alamat :'+info['agen_alamat'];
          body +='<br>Telp :'+info['agenphone'];
          body +='</td>';
          body +='</tr>';
          body +='<tr>';
          body +='<td colspan="4" style="height:40px">&nbsp;</td>';
          body +='</tr>';
          var ket=info['keluhan'].split('~');
          body +='<tr>';
          body +='<td colspan="4" style="text-align:left"><p><b>* Info Tambahan</b>:</p><p><b>Keluhan : </b>';
          body +='<br> '+ket[1];
          body +='<br><b>Posisi Map</b><br>';
          body +='Pelanggan :'+info['user_position']+' | '+'Agen :'+info['agen_position']+'<br>';
          body +='<b>Jarak/waktu</b><br>'+info['service_order_description'];
          body +='</p></td>';
          body +='</tr>';
          body +='<tr>';
          body +='<td colspan="4" style="height:30px">&nbsp;</td>';
          body +='</tr>';
          body +='<tr>';
          body +='<td colspan="2" style="border:1px solid silver;text-align:left" valign="top"><b>Keterangan</b></td>';
          body +='<td colspan="2" style="border:1px solid silver;text-align:right" valign="top"><b>Harga</b></td>';
          body +='</tr>';
          
          body +='<tr>';
          body +='<td colspan="2" style="border:1px solid silver;text-align:left" valign="top">Jasa Honda Care</td>';
          body +='<td colspan="2" style="border:1px solid silver;text-align:right" valign="top">Gratis</td>';
          body +='</tr>';
          
          
          if(info['spare_part']!= "")
          {
            var sp=info['spare_part'].split('~');
            var total=0;
            
            for(var i in sp)
            {
                var barang=[];
                barang=sp[i].split('=');
          body +='<tr>';
          body +='<td colspan="2" style="border:1px solid silver;text-align:left" valign="top">'+barang[0]+'</td>';
          body +='<td colspan="2" style="border:1px solid silver;text-align:right" valign="top">Rp '+app.formatUang(parseInt(barang[1]))+'</td>';
          body +='</tr>'; 
                
               total += parseInt(barang[1]);
            }
            
           if(total > 0) 
           {
          body +='<tr>';
          body +='<td colspan="2" style="border:1px solid silver;text-align:left" valign="top"><b>Total Biaya</b></td>';
          body +='<td colspan="2" style="border:1px solid silver;text-align:right" valign="top">Rp '+app.formatUang(total)+'</td>';
          body +='</tr>';    
               
           }
            
          }
          
            
         $('.popup-order-detail-body').html(body);
         
         
        }else
        {
            myApp.alert("Maaf, Data rinci tidak dapat ditampilkan","Honda Care");
        }
        
         $('#btn-order-detail').show();
         
         
         
    });
    
   
    
});

app.uploadProses();
app.imagePreview();

//end fungsi panel



 myApp.onPageInit('*', function (page) {
	 
	  myApp.params.swipePanel = false;
	  //PAGEOPEN=page.name;
          PAGEOPENBEFORE = PAGEOPEN;
	  var hal=app.getPage(page.name)
	  if(hal)
	  {
		  PAGEOPEN = page.name;
	  }
	  
    
     //selain   
    
	   
      if(page.name == "proses" || page.name == "setting" || page.name == "map" || page.name == "lokasiuser" )
	  {
              //var str='';
              for(var i in ARRPAGE)
              {
                  var css = ARRPAGECSS[ARRPAGE[i]];
                  if(ARRPAGE[i] == PAGEOPEN)
                  {
                      $$('.'+css).show();
                     // str +='.'+css+'-show()<br>';
                  }
                  else
                  {
                      $$('.'+css).hide();
                     // str +='.'+css+'-hide()<br>';
                  }
              }
              
              //$('.pesan').html('PAGEOPEN='+PAGEOPEN+'<br>LAST PAGE ='+PAGEOPENBEFORE);
	  }else
	  {
		for(var i in ARRPAGE)
                {
                  var css = ARRPAGECSS[ARRPAGE[i]];
                  $$('.'+css).show();
                  
                }
	  }
	  
         
          
	  //all pre text
	  //set for languange porpuse
	 if(page.name == "login")
	 {		 
		$('#login_lupa_password').html(lang._text('login_lupa_password'));
	 }
	//
	  
          if(page.name == "login" || page.name == "signup" || page.name == "forgotpassword" || page.name == "resetpassword")
          {
           $$('.navbar').hide();
          }else
          {
            $$('.navbar').show();
          }
	 
 });
 
/* $$('.popup-tambahdata-kendaraan').on('popup:opened', function () {
	
     
     
	  

  })*/
 
 myApp.onPageInit('datamotor', function (page) {
     
    jsonp.getMotorType("#plus_model");
    jsonp.getMotorWarna("#plus_warna");
    
    if(typeof page.query.aksi != "undefined")
    {
        var arrinfo=page.query.arrinfo.split('~');//plat0~model1~warna2~table3~db/db24~rangka5~platid6~nomesin7~type8~manufac9
       $('input[name=plus_platno]').val(arrinfo[0])
       $('input[name=plus_warna]').val(arrinfo[2]);
       
       if(arrinfo[7] == "")
            $('input[name=plus_nomesin]').val(arrinfo[5]);
       else
           $('input[name=plus_nomesin]').val(arrinfo[7]);
         
       $('input[name=plus_tipe]').val(arrinfo[8]);
       $('input[name=plus_model]').val(arrinfo[1]);       
       $('input[name=tabel]').val(arrinfo[3]);
       $('input[name=koneksi]').val(arrinfo[4]);
       $('input[name=platid]').val(arrinfo[6]);
    }
    
    
    $$('#btn_plus_simpan').on("click",function(){
        
		 var platno=$('input[name=plus_platno]').val();
		 if(platno.length > 5)
		 {
		  var nomesin=$('input[name=plus_nomesin]').val();
		  var mwarna=$('input[name=plus_warna]').val();
		  var mtipe=$('input[name=plus_tipe]').val();
		  var mmodel=$('input[name=plus_model]').val();
		  var strdata="platno="+platno+"&nomesin="+nomesin+"&mwarna="+mwarna+"&mtipe="+mtipe+"&mmodel="+mmodel;
	//myApp.alert(strdata)	
        if(typeof page.query.aksi != "undefined")
        {
           var tabel= $('input[name=tabel]').val();
           var koneksi=$('input[name=koneksi]').val();
           var platid=$('input[name=platid]').val();
           jsonp.editDataMotorBaru(strdata+"&tabel="+tabel+"&koneksi="+koneksi+"&platid="+platid);
        }else
        {
         jsonp.simpanDataMotorBaru(strdata);   
        }
         
		}else{
		
         myApp.alert("Maaf, No Polisi sangat dibutuhkan","Honda Care");
		}
                
         
        });
    
 })
 
 
  myApp.onPageInit('lokasiuser', function (page) {
     
     //myApp.alert("Map Page testing") 
     //jsonp.getMotorType(".popup-tambahdata-kendaraan div p div ul li div div div #plus_model");
     //jsonp.getMotorWarna(".popup-tambahdata-kendaraan div p div ul li div div div #plus_warna");
     
     setTimeout(function(){clearPage('lokasiuser');},1500)
	 
    $$('#btnlokasi_next').on("click",function(){
        
        var plt = $('select[name=lok_platno]').val();
        var arrinfo = plt.split('~');
        NOPOLISI = arrinfo[0];
        //myApp.alert(plt);
        if(plt != 'none')
        {
         mainView.router.loadPage("menulayanan.html");
        }
         
    });
    
    $$('#btnlokasi_tambahdata').on("click",function(){
        
         mainView.router.loadPage("datamotor.html?")
         
    });
    $$('#clear_text_alamat').on("click",function(){
        
        $('#info_alamat').val('');
    });
    
    $$('#btn_datamotoredit').on("click",function(){
        var arrinfo = $('select[name=lok_platno]').val();
        mainView.router.loadPage("datamotor.html?aksi=edit&arrinfo="+arrinfo)
        
    })
    
    
      //load platno terdaftar
    jsonp.getPlatno2lok(function(dat){});
     
        $$('#lok_platno').on('change',function(){
	  // var platno=$('select[name=lok_platno]').val();       
	  // myApp.alert(platno);
          
          })
     
    $('#btn_continue').hide();
    
    
        
    
    
    gpsDetect.checkGPS(function(on){
     
     if(on)
     {
        if(typeof page.query.datamotor != 'undefined')
        {
            app.mapLokasiUser(CURPOSITION.latitude,CURPOSITION.longitude);
        }else
        {
          navigator.geolocation.getCurrentPosition(function(pos){
           GPSSTATUS=true;
         
          CURPOSITION.latitude = pos.coords.latitude;
          CURPOSITION.longitude = pos.coords.longitude;
          //alert(pos.coords.latitude +','+pos.coords.longitude);
          
          app.mapLokasiUser(pos.coords.latitude,pos.coords.longitude);
      
      
          
          
      }, function(err){
           GPSSTATUS=false;
          myApp.alert("Maaf koordinat tidak bisa ditentukan, mohon pindah ke tempat lebih banyak sinyal GPS","Honda Care",function(){
              mainView.router.loadPage("home.html")
          });
      });
        }
         
	 
                 
         
         
	 
     }else
     {
      GPSSTATUS=false;
     // setTimeout(function(){ },1500);
      myApp.alert("Mohon Aktifkan Layanan GPS Anda terlebih dahulu!","Honda Care",function(){
          
          mainView.router.loadPage("home.html")
      });
      
     }    
     
 }, function(err){     
     GPSSTATUS=false;
    setTimeout(function(){ mainView.router.loadPage("home.html")},1500);
     myApp.alert("Maaf aplikasi ini membutuhkan layanan GPS","Honda Care");
     
 }); 
 
 
 
 
                
     
     //jsonp.getMotorType("#plus_model");
     //jsonp.getMotorWarna("#plus_warna");
     
     
     
  });
 
 
 
 
 //login page
 myApp.onPageInit('login', function (page) {
  
$$('.navbar').hide();
	$$('#btnlogin').on('click', function () {
		var proses=true;
		var ktp=$('input[name=lidentitas]').val();
		var uname=$('input[name=lusername]').val();
                var upass=$('input[name=lpassword]').val();
		if(ktp != '' && ktp.length > 8)
		{ 
			  if(uname != '' && uname.length > 5)
				{
                                    if(upass != '' && upass.length > 5)
                                          {
                                         proses=true;
                                          }else
                                          {
                                          proses=false;
                                          myApp.alert("Mohon ketik Kata Sandi!","Perhatian!");	
                                          }
				}else
				{
				proses=false;
				myApp.alert("Mohon isi Nama Pengguna!","Perhatian!");	
				}	
			
		}else
                  {
                    /*  if(INTERNALDATA.keanggotaan == "")
                      {
                             var buttons = [
                                          {
                                              text: 'AHASS',
                                              onClick: function () {
                                                  myApp.alert('Button1 clicked');
                                              }
                                          },
                                          {
                                              text: 'FREELANCE',
                                              onClick: function () {
                                                  myApp.alert('Button2 clicked');
                                              }
                                          },
                                          {
                                              text: 'UMUM',
                                              color: 'red',
                                              onClick: function () {
                                                  myApp.alert('Cancel clicked');
                                              }
                                          },
                                      ];
                                      myApp.actions(buttons);
                          
                      }else
                      { */  
                      
                            if(INTERNALDATA.keanggotaan == "umum")
                            {                              
                              proses=false;
                              myApp.alert("Mohon ketik No Identitas Anda!","Perhatian!");
                            }else
                            {
                              proses = true;  
                              //myApp.alert(INTERNALDATA.keanggotaan,"Perhatian!");
                            }
                      
                     //}
		  }		
		
		if(proses){
               if(INTERNALDATA.keanggotaan == "umum")
                      { 
                     
                        var param="ktp="+ktp+"&uname="+uname+"&upass="+upass+"&device_id="+DEVICEID;
                      }else{    
                        var param="uname="+uname+"&upass="+upass+"&device_id="+DEVICEID; 
                      }
                
                
                
		jsonp.login(param,sukses);
		function sukses(st,pesan,info)
		{
			if(st == 'ok')
			{
				ns.saveData('register','approve');
				ns.saveData('akun',info);
                                var sin_tipe={M001:'umum',M002:'ahass',M003:'freelance'};
                                var tipeanggota = sin_tipe[pesan];
                                ns.saveData('keanggotaan',tipeanggota);
                                INTERNALDATA.keanggotaan = tipeanggota;
                                INTERNALDATA.akun=info;
                                INTERNALDATA.register='approve';
                                
                                if(tipekeanggotaan == "umum")
                                {
                                    mainView.router.loadPage("front.html");
                                }
                                else
                                {
                                    mainView.router.loadPage("home.html");
                                }
                                
			}else
			{
				myApp.alert(pesan,"Perhatian!");
			}
			
		}
		}//proses true
		
	});
	
	$$('#btntest').on('click', function () {
		//myApp.showIndicator();
       // mainView.router.loadPage("home.html"); 
      // ns.saveData('register','pending');
	  var str="";
	  ns.getData('register',function(d){ 
	   str +=d+'\n';
		ns.getData('akun',function(d1){
			str += d1+'\n';	   
				ns.getData('keanggotaan',function(d2){
					str += d2+'\n';
					alert(str);
				});
			});
	  ;}) 
	  
	  
	  //ns.saveData('register','pending');
	  
    });
	
	$$('#btn2signup').on('click', function () {
		
                //mainView.router.loadPage("signup.html");
		ns.getData('register',sukses);
		
		function sukses(data)
		{
			//if(data == 'pending')
			//{			
			mainView.router.loadPage("signup.html");
			//}else
                       // {
                        // myApp.alert("Anda Sudah terdaftar, bersama dengan piranti ini","Honda Care");
                       // }    
			
		}
	
	   });

});
 
 


// Now we need to run the code that will be executed only for About page.


myApp.onPageInit('forgotpassword', function (page) {  

$$('.navbar').hide();
  $$('#btnfpassword').on('click', function () {
      var uname=$('input[name=fusername]').val();
      var umobile=$('input[name=fmobile]').val();
      var proses=true;
      if(uname != "" && uname.length > 2)
      {
        proses=true;   
      }else
      {
          proses=false;
          myApp.alert("Mohon Ketik Nama Pengguna","Perhatian");
      }    
    
      if(proses){
          if(umobile != "" && umobile.length > 8)
            {
                proses=true;   
            }else
             {
               proses=false;
                     myApp.alert("Mohon Ketik Nomor mobile yang digunakan sewaktu mendaftar","Perhatian");
             }    
      }    
      
      if(proses){
          var param="uname="+uname+"&umobile="+umobile+"&device_id="+DEVICEID;
           jsonp.forgotpassword(param);
         }
  });  

});

myApp.onPageInit('resetpassword', function (page) { 
    $$('.navbar').hide();
  $$('#btnrpassword').on('click', function () {
      
      var pass=$('input[name=rpassword]').val();
      var cpass=$('input[name=rcpassword]').val();
      var proses=true;
      if(pass != "" && pass.length > 5)
      {
          if(pass == cpass)
          {
            var  param ="upass="+pass+"&device_id="+DEVICEID;
            proses=true;
            jsonp.resetpassword(param);
          }else
          {
            proses=false;
            myApp.alert("Kata Sandi anda tidak cocok (min : 6 karakter), mohon diperbaiki","Perhatian");  
          }   
      }else
      {
          proses=false;
          myApp.alert("Mohon Ketik Kata Sandi yang baru","Perhatian");
      }    
    
     
      if(proses){
      jsonp.resetpassword(param);
         }
      
  });    

});

myApp.onPageInit('front', function (page) {
 $$('.navbar').hide(); 
 app.loadAllSound();
    if(INTERNALDATA.keanggotaan == "umum")
     {
      		 
         
        /*if(typeof DATAUSER.input != "undefined")
	 {
	    if(DATAUSER.nama_lengkap == false)
              {
                 $('.apk_id').html(DATAUSER.users.name);
              }else
              {
                 $('.apk_id').html(DATAUSER.nama_lengkap);   
              }
              
                //load data Honda Care Server
                 app.data_hc(DATAUSER.users.ktp);
              
	 }else
	 {*/
        
       setTimeout(function(){
           jsonp.getDatauser(function(data){
                
                DATAUSER=JSON.parse(data);
                if(DATAUSER.nama_lengkap == false)
                {
                    //$('.apk_id').html(DATAUSER.users.name);
                }else
                {
                  // $('.apk_id').html(DATAUSER.nama_lengkap);   
                }
           
                //load data Honda Care Server
                  app.data_hc(DATAUSER.users.ktp);
                
            })
           
           
       },1500) 
            
            
	 //}
         
     
     //link action 
      $$('.btn_barcode').on("click",function(){
         
          if(IDBARCODE != "")
          {
            myApp.popup('.popup-barcode');
            $('.popup-barcode div p img').attr('src',IDBARCODE)
          }
        })  
        
      $$('.shbc_id').on("click",function(){
          //app.showToast('Nanti,Koneksi ke Data SHBC');
          mainView.router.loadPage("shbc.html");
        })   
      $$('#btn_front2home').on("click",function(){
           mainView.router.loadPage("home.html");
        })    
        
      $$('#btn_front2call').on("click",function(){
            window.plugins.CallNumber.callNumber(function(result){
                console.log("berhasil:"+result);
            },function(result){
                console.log("gagal:"+result);
            }, "0361438008", true);
        })    
      
      $$('#btn_front2akun').on("click",function(){
         mainView.router.loadPage("profil.html");
        })    
       
        $$('#btn_front2history').on("click",function(){
          mainView.router.loadPage("history.html");
         //app.playNativeSoundLoop('phone1');
        })  
         
     }else
     {
      mainView.router.loadPage('home.html');   
     }
    
})

myApp.onPageInit('shbc', function (page) {
    
    $$('.navbar').hide(); 
    if(INTERNALDATA.keanggotaan == "umum")
     { 
         app.data_hc(DATAUSER.users.ktp);
       
        $$('.btn_barcode').on("click",function(){
         
          if(IDBARCODE != "")
          {
            myApp.popup('.popup-barcode');
            $('.popup-barcode div p img').attr('src',IDBARCODE)
          }
        })
        
        
        $$('#btn_shbc_hc').on("click",function(){
         mainView.router.loadPage("home.html");
        }) 
        $$('#btn_shbc_mr').on("click",function(){
         app.showToast('Silakan Unduh Aplikasi SHBC di Playstore');
        }) 
        $$('#btn_shbc_kat').on("click",function(){
         app.showToast('Silakan Unduh Aplikasi SHBC di Playstore');
        }) 
        $$('#btn_shbc_jar').on("click",function(){
         app.showToast('Silakan Unduh Aplikasi SHBC di Playstore');
        }) 
        
        $$('#btn_shbc_ber').on("click",function(){
         mainView.router.loadPage("home.html");
        }) 
        $$('#btn_shbc_kom').on("click",function(){
         app.showToast('Silakan Unduh Aplikasi SHBC di Playstore');
        }) 
        $$('#btn_shbc_riw').on("click",function(){
         app.showToast('Silakan Unduh Aplikasi SHBC di Playstore');
        }) 
        $$('#btn_shbc_akun').on("click",function(){
         app.showToast('Silakan Unduh Aplikasi SHBC di Playstore');
        }) 
         
     }
    
});

myApp.onPageInit('home', function (page) {    
   //myApp.alert("welcome Home screen!");
   //setting remote
   //alert(WDOGTIME);
   //init data
   //app.loadAllSound();
     if(INTERNALDATA.keanggotaan != "umum")
     { 
      app.loadAllSound();
      $('.btn_speak').hide();
       setTimeout(function(){jsonp.agenMonitoringCall();},1600)
       
       if(INTERNALDATA.keanggotaan == "freelance")
       {
        
        var options = {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0
        };
           gpsDetect.checkGPS(function(on){     
                    if(on)
                    {
                        if(CURPOSITION.latitude == 0 && CURPOSITION.longitude == 0)
                         {
                             myApp.showIndicator();
                                navigator.geolocation.getCurrentPosition(function(pos){
                                          GPSSTATUS=true;
                                          CURPOSITION.latitude = pos.coords.latitude;
                                          CURPOSITION.longitude = pos.coords.longitude;
                                          var newlatlon=CURPOSITION.latitude+","+CURPOSITION.longitude;
                                           jsonp.setAgenLokasi2(newlatlon);

                                           myApp.hideIndicator();
                                             }, function(err){
                                               GPSSTATUS=false;
                                                myApp.hideIndicator();
                                                myApp.alert("Signal GPS lemah, Mohon Pindah ke tempat yang lebih terbuka!","Honda Care",function()
                                                 {
                                                     navigator.app.exitApp();
                                                 });

                                          },options);
                                 
                       }  

                    }else
                    {
                     GPSSTATUS=false;
                     
                     myApp.alert("Mohon Aktifkan Layanan GPS Anda terlebih dahulu!","Honda Care",function()
                     {
                         navigator.app.exitApp();
                     });

                    }})
           
       }
       
     }
   
   
   //detek keanggotaan
   app.stopNativeSound('phone1');
   app.stopNativeSound('alarm1');
   ns.getData('keanggotaan',function(data){
     
     $('.umum').hide();
     $('.ahass').hide();
     $('.freelance').hide();
     //execute
     $('.'+data).show();
     TIPE_KEANGGOTAAN=data;
       
   });
  
  if(typeof DATAUSER.input != "undefined")
	 {
	app.fillDatauser();//offline
	 }else
	 {
            jsonp.getDatauser(sukses)
            function sukses(data)
            {
     
            DATAUSER=JSON.parse(data);
             // alert(data);
            app.fillDatauser();//online
            }
	 }
 // if(typeof DATAUSER.input !== "undefined")
 // { 
  
  //}else
  //{
     //app.fillDatauser();//offline
 // }    
    $$('.btn_speak').on("click",function(){
     app.cekSpeech();
   }) 
   
   $$('.btnkeluar').on('click', function () {
	  app.keluarApp("Perhatian","Apakah Anda mau keluar dari aplikasi ini?");
	});
 
   $$('#umum_hondacare').on('click', function () {
	 
       mainView.router.loadPage("lokasiuser.html");
         
     }); 
    
   $$('#umum_history').on('click', function () {
	 
       //mainView.router.loadPage("history.html");
	    window.plugins.CallNumber.callNumber(function(result){
                console.log("berhasil:"+result);
            },function(result){
                console.log("gagal:"+result);
            }, "0361438008", true);
	   
         
     });
     
    $$('#ahass_history').on('click', function () {    
        mainView.router.loadPage("history.html");
    });
    
    $$('#freelance_history').on('click', function () {
        mainView.router.loadPage("history.html");
    }); 
 
 
    if(AGENHANDLE == "self")
        {
            $('#btn_swap img').attr('src','img/swap_owner.png');  
        }else if(AGENHANDLE == "ahass")
        {
            $('#btn_swap img').attr('src','img/swap_ahass.png');
        }
   
    $$('#btn_swap').on("click",function(){
        //app.playNativeSound('notify');
     
        if(AGENHANDLE == "self")
        {

            myApp.confirm("Rubah Status ke Layanan AHASS!","Honda Care",function(){

                 AGENHANDLE = "ahass";
               
                $('#btn_swap img').attr('src','img/swap_ahass.png');  
                 

            })

        }else if(AGENHANDLE == "ahass")
        {
            myApp.confirm("Rubah Status ke Layanan OWNERSHIP!","Honda Care",function(){
                   AGENHANDLE = "self";
                  
                  $('#btn_swap img').attr('src','img/swap_owner.png');  
                  

              })
        }
       
   }) 
    
    $$('#btn_relokasi').on("click",function(){
        mainView.router.loadPage("setting.html");
    })
    
    $$('#btn_morder').on("click",function(){
        mainView.router.loadPage("manualorder.html");
    })
    
    $$('#btn_info').on("click",function(){
       mainView.router.loadPage("manuallog.html"); 
    })
        
      
   
});

myApp.onPageInit('manuallog', function (page) { 
    
   jsonp.manual_orderinfo(function(data,pesan){
       
       if(data == "ok")
       {
           var info=JSON.parse(pesan);
            $('.manual_table_body').html('');
            for(var i in info)
            {
             var str="";
             str +='<tr><td class="label-cell"><b>'+info[i].invno+'</b></td></tr>';
             str +="<tr>";
             str +='<td class="label-cell">'+info[i].username+'</td>';
             str +='<td class="label-cell">'+info[i].service_order_register+'</td>';
             
             if(info[i].service_order_description == "pendaftaran manual")
                 str +='<td class="label-cell"><a href="#" class="button button-fill button-small color-red">manual</a></td>';
             else
                 str +='<td class="label-cell"><a href="#" class="button button-fill button-small color-green">Mobile</a></td>';
             
             var st = info[i].service_order_status;
             
             if(st == "pending")
               str +='<td class="label-cell"><a href="#" class="button button-fill button-small color-orange">pending</a></td>';             
             else
               str +='<td class="label-cell"><a href="#" class="button button-fill button-small color-gray">'+st+'</a></td>';  
               
             str +="</tr>";
             $('.manual_table_body').append(str);
            
             }
        }else
        {
            $('.manual_table_body').append('<tr><td class="label-cell" colspan="4">Maaf tidak ada data ditemukan</td></tr>');
        }
   });
    
    
    $$('#btn_mlback').on("click",function(){
        
        mainView.router.loadPage("home.html");
    })
    
});

myApp.onPageInit('signup', function (page) {   

					//initial
					$$('.navbar').hide();
					$$('.umum').show();
					$$('.umumfree').hide();
					$$('.ahass').hide();
					$$('.umumfreeahass').hide();
					$$('.umumonly').hide();


					$$('#keanggotaan').on('change',function(){
						var tipe=$('select[name=keanggotaan]').val();
						if(tipe == "umum")
							myApp.alert("Anda akan terdaftar sebagai pengguna/pelanggan Honda Care","Informasi");
						else if(tipe == "ahass")
							myApp.alert("Anda akan terdaftar sebagai AHASS Penyedia Layanan Honda Care","Informasi");
						else if(tipe == "freelance")
							myApp.alert("Anda akan terdaftar sebagai Agen Ownership Mekanik Penyedia Layanan Honda Care, dibawah AHASS tempat anda bernaung","Informasi");
					})

					//tgllahir fill
					var myCalendar = myApp.calendar({
						input: '#tgllahir',
						//value:[new Date(1990,0,1)],
							value:'',
						dateFormat:'dd/mm/yyyy',
						closeOnSelect:true
						
					}); 




					$$('#step1').on('click',function(){
							SUBPAGEOPEN="step1";
						var name=$('input[name=name]').val();
						var pass=$('input[name=pass]').val();
						var cpass=$('input[name=cpass]').val();
						var email=$('input[name=email]').val();
						var mobile=$('input[name=mobile]').val();
						var ktp=$('input[name=ktp]').val();
						var tipe=$('select[name=keanggotaan]').val();
						var proses=false;
						if(name != "" && name.length > 3)
						{
							proses=true;
						}else
						{
							proses=false;
							myApp.alert("Mohon Ketik Nama terang anda!","Honda Care");		
						}
						
						if(proses){
						  if(pass != "" && pass.length > 5)
						  {
							 proses=true;	  
						  }else
						  {
							  proses = false;
							  myApp.alert("Kata sandi harus unik dan minimal terdiri dari 6 karakter!","Honda Care");
						  }
						}
						
						
						
						if(proses){
						  if(pass == cpass)
						  {
							 proses=true;	  
						  }else
						  {
							  proses = false;
							  myApp.alert("Kata sandi anda tidak cocok","Honda Care");
						  }
						}
							
							if(proses)
							{
						  if(ktp != "" && ktp.length > 10)
						  {
							 proses=true;	  
						  }else
						  {
							  proses = false;
							  myApp.alert("kami butuh ID identitas (KTP)","Honda Care");
						  }
						}
							
						
						if(proses){
						  if(mobile != "" && mobile.length > 8)
						  {
							 proses=true;	  
						  }else
						  {
							  proses = false;
							  myApp.alert("Mohon Ketik No HP yang benar","Honda Care");
						  }
						}
						
						
						
						if(proses)
						{
						$$('.umum').hide();
						if(tipe == "umum")
						{
						$$('.ahass').hide();
						$$('.umumonly').show();
						$$('.umumfree').show();
						$$('.umumfreeahass').show();
						}else if(tipe == "ahass")
						{
						$$('.ahass').show();
						$$('.umumonly').hide();
						$$('.umumfree').hide();
						$$('.umumfreeahass').show();	
						}else if(tipe == "freelance")
						{
						$$('.umumonly').hide();	
						$$('.ahass').show();
						$$('.umumfree').show();
						$$('.umumfreeahass').show();	
						}
						SUBPAGEOPEN="step2";
						}//end proses
						
						
						
					});


					$$('#sback').on('click',function(){
						$$('.umum').show();
						$$('.umumfree').hide();
						$$('.ahass').hide();
						$$('.umumfreeahass').hide();
						$$('.umumonly').hide();	
					});

					//munculkan popup mencari nama ahass
					$$('#nama_ahass').on('click',function(){
						app.getAhass();
							SUBPAGEOPEN="nama_ahass";
					});


					$$('#wilayah').on('click',function(){
						app.getWilayah();
							SUBPAGEOPEN="nama_wilayah";
					});



					//click pendaftaran

					$$('#pendaftaran').on('click',function(){
						var proses=true;
						var param=[];
						var tipe=$('select[name=keanggotaan]').val();	
						var wilayah=$('input[name=wilayah]').val();
						var wilayah_code=$('input[name=wilayah_code]').val();
						param.push({col:'name',val:$('input[name=name]').val()});
						param.push({col:'pass',val:$('input[name=pass]').val()});
						param.push({col:'email',val:$('input[name=email]').val()});
							param.push({col:'ktp',val:$('input[name=ktp]').val()});
						param.push({col:'mobile',val:$('input[name=mobile]').val()});
						param.push({col:'keanggotaan',val:tipe});
						param.push({col:'onesignal_id',val:OSID});
						param.push({col:'device_id',val:DEVICEID});
						//mobile feature
						param.push({col:'device_model',val:device.model});
						param.push({col:'device_platform',val:device.platform});
						param.push({col:'device_version',val:device.version});
						param.push({col:'device_manufacturer',val:device.manufacturer});
						
						if(tipe == "umum")
						{
						param.push({col:'kelamin',val:$('input[name=jkelamin]:checked').val()});	
						param.push({col:'tgllahir',val:$('input[name=tgllahir]').val()});
						//param.push({col:'ktp',val:$('input[name=ktp]').val()});
						param.push({col:'shid',val:$('input[name=shid]').val()});
						
						
						}else if(tipe == "ahass")
						{
						var nama_ahass=$('input[name=nama_ahass]').val();
						 if(proses){	
							if(nama_ahass == "")
							{
								proses = false;
								myApp.alert("Mohon tentukan Nama dan Kode Ahass anda!","Honda Care");
							}else
							{
								param.push({col:'nama_ahass',val:nama_ahass});	
								param.push({col:'kode_ahass',val:$('input[name=kode_ahass]').val()});
								param.push({col:'address_ahass',val:$('input[name=address_ahass]').val()});
								param.push({col:'geopos_ahass',val:$('input[name=geopos_ahass]').val()});
								proses = true;
								
							}}
						}else if(tipe == "freelance")
						{
						param.push({col:'kelamin',val:$('input[name=jkelamin]:checked').val()});
						param.push({col:'tgllahir',val:$('input[name=tgllahir]').val()});
						//param.push({col:'ktp',val:$('input[name=ktp]').val()});
						param.push({col:'shid',val:$('input[name=shid]').val()});
						
						var nama_ahass=$('input[name=nama_ahass]').val();
						 if(proses){	
							if(nama_ahass == "")
							{
								proses = false;
								myApp.alert("Mohon tentukan Nama dan Kode Ahass anda!","Honda Care");
							}else
							{
								param.push({col:'nama_ahass',val:nama_ahass});	
								param.push({col:'kode_ahass',val:$('input[name=kode_ahass]').val()});
								param.push({col:'address_ahass',val:$('input[name=address_ahass]').val()});
								param.push({col:'geopos_ahass',val:$('input[name=geopos_ahass]').val()});
								proses = true;
								
							}}
							
						}		
						
						
						if(proses){
							if(wilayah == "")
							{
								proses = false;
								myApp.alert("Mohon tentukan tempat domisili anda!","Honda Care");
							
							}else
							{
								
								param.push({col:'wilayah',val:wilayah});
								param.push({col:'wilayah_code',val:wilayah_code});
								proses=true;
							}}
						
						
						if(proses)
						{
							//alert(JSON.stringify(param));
							jsonp.pendaftaran(param);
						}
						
						
					 });//click pendaftaran

});



///last onerror


myApp.onPageInit('thankyou', function (page) {
	
	var tipe=page.query.tipe;
        var uname=page.query.uname;
        var upass=page.query.upass;
        var ahass=page.query.ahass;
        var pesan='';
        
        if(tipe == "umum")
        {
            pesan = lang._text("pesan_anggota_umum");
            pesan = pesan.replace('[UNAME]',uname);
        }
        else if(tipe == "ahass")
        {
            pesan = lang._text("pesan_agen_ahass");
             pesan = pesan.replace('[UNAME]',uname);
             pesan = pesan.replace('[AHASS]',ahass);
        }
        else if(tipe == "freelance")
        {
            pesan = lang._text("pesan_agen_freelance");
            pesan = pesan.replace('[UNAME]',uname);
            pesan = pesan.replace('[AHASS]',ahass);
        }
        
	$('.pesan').html(pesan);
	
});
//halaman menulayanan
myApp.onPageInit('menulayanan', function (page) {
app.stopNativeSound('phone1');
app.stopNativeSound('alarm1');
SUBPAGEOPEN="";
//ARRAGEN=[];
 //cek status GPS
 gpsDetect.checkGPS(function(on){
     
     if(on)
     {
     
      //proses gps geolocation
      //put value to CURPOSITION={latitude:0,longitude:0};
      navigator.geolocation.getCurrentPosition(function(pos){
      GPSSTATUS=true;
         
          //CURPOSITION.latitude = pos.coords.latitude;
          //CURPOSITION.longitude = pos.coords.longitude;
          //alert(pos.coords.latitude +','+pos.coords.longitude);
          
      //cek dari voice recognize
      
      if(typeof page.query.keluhan != 'undefined')
      {
        var keluhan=page.query.keluhan;
        var skey=keluhan;
                
        if(skey == "")
        {
         myApp.popup('.popup-keluhan');
         $('textarea[name=keluhan]').val('');
         $('input[name=nopolisi]').val('');
         SUBPAGEOPEN="popup-keluhan";
        }else
        {
         app.pilihKeluhan(skey);
        }
        
      }
          
          
      }, function(err){
           GPSSTATUS=false;
          myApp.alert("Maaf koordinat tidak bisa ditentukan, mohon pindah ke tempat lebih banyak sinyal GPS","Honda Care");
      });
      
      
      
     }else
     {
      GPSSTATUS=false;
      setTimeout(function(){ mainView.router.loadPage("home.html")},1500);
      myApp.alert("Mohon Aktifkan Layanan GPS Anda terlebih dahulu!","Honda Care");
      
     }    
     
 }, function(err){     
     GPSSTATUS=false;
    setTimeout(function(){ mainView.router.loadPage("home.html")},1500);
     myApp.alert("Maaf aplikasi ini membutuhkan layanan GPS","Honda Care");
     
 });
    
 $$('.btn_speak').on("click",function(){
     app.cekSpeech();
   }) 
   
  
    
$$('#popupkeluhan').on('click',function(){
	myApp.popup('.popup-keluhan');
         $('textarea[name=keluhan]').val('');
         $('input[name=nopolisi]').val(NOPOLISI);
         SUBPAGEOPEN="popup-keluhan";
});

$$('#btnkirimkeluhan').on('click',function(){
    
    if(GPSSTATUS){
    
    var keluhan = $('textarea[name=keluhan]').val();
    var nopolisi=$('input[name=nopolisi]').val();
    var proses=true;
   // alert(keluhan.length);
    if( keluhan != '' && keluhan.length > 3)
    { proses=true;}
    else
    { myApp.alert('Mohon Ketik Keluhan Anda','Perhatian');
      proses=false;
    }
    
    if(proses)
    {
     if(nopolisi != '' && nopolisi.length > 3)
    { proses=true;}
    else
    { myApp.alert('Kami memerlukan info Plat Nomor anda','Perhatian');proses=false;}   
    }
        
    if(proses)
    {
        SUBPAGEOPEN="";
	myApp.closeModal('.popup-keluhan');
        jsonp.prosesKeluhan(keluhan,nopolisi);
        
    }
    
    }else{
        myApp.alert("Mohon Aktifkan Layanan GPS terlebih dahulu!","Honda Care");
    }
    
    
});



$$('#btnclosekeluhan').on('click',function(){
      SUBPAGEOPEN="";
      myApp.closeModal('.popup-keluhan');
});
	
});

myApp.onPageInit('mintalayanan2', function (page) {
    
    var keluhan = page.query.keluhan;
    var nopolisi = page.query.nopolisi
    var param = page.query.param;
    var dat=JSON.parse(param);
    var agenid=dat['agen_id'];
    var agencode=dat['agen_code'];
    var jarak=dat['order_jarak'];
    var waktu=dat['order_waktu'];
    var agenname=dat['agen_name'];
    var orderid_lama=dat['orderid'];
    
    app.stopNativeSound('phone1');
    KELUHAN = keluhan;
    NOPOLISI=nopolisi;
    ARRAGEN=[];
    
    var offset=$('#logoradar2').offset();
    var atas=offset.top;
    var kiri=offset.left;
    $('#timelabel2').hide();
    setTimeout(function(){
    var lebar = $('#logoradar2').width() ;
    var tinggi = $('#logoradar2').height() ;
    kiri = kiri + (lebar/2) - 15;
    atas = atas + 55 ;
    //alert(atas+","+kiri+","+lebar+","+tinggi);
    $('#timelabel2').show();
    $('#timelabel2').css({top:atas+'px'});
    
    //perlihatkan keluhan
    $('#mintalayanan_keluhan2').html(keluhan+"<br> untuk kendaraan dengan No Polisi :"+nopolisi);
       
   },1500);
   TMDETIK=0;
   TMMENIT=0;
   //1.convert latitude,longitude to address
   //2. scanning agen
   //3. notifikasi agen
   ARRAGEN=[];
  var terpilih=[];
  terpilih.push({id:agenid,kode:agencode,index:0,jarak:jarak,waktu:waktu,nama:agenname});
  ARRAGEN=terpilih;

 var akundata=INTERNALDATA.akun;
                      var akun=akundata.split(",");
                      var uname=akun[0];
                      var upass=akun[1];
                      jsonp.kirimNotifikasiHondacare2(terpilih,uname,upass,orderid_lama);
   
   // $('#logoradar').css({left:kiri + lebar ,top: atas + 10});
   
   $$('#userbtncancel3').on('click',function(){
      
             clearTimeout(TIMERHANDLE);
              TMDETIK=0;
              TMMENIT=0;
              SCANCOVER=5;
              //gagalkan pesanan otomatis mohon buat pesanan lagi
              app.matiScreen();
              app.stopNativeSound('phone1');
              
              var pilih=[];
                 pilih.push(agenid);
              var akundata=INTERNALDATA.akun;  
                      var akun=akundata.split(",");
                      var uname=akun[0];
                      var upass=akun[1];                  
                  jsonp.tutupPesanan(ORDERID,uname,upass,pilih);
                  
                  var notifi ="Anda telah melakukan pembatalan terhadap Pesanan anda sendiri, terima kasih";
                   myApp.alert(notifi,"Honda Care",function(){
                  
                    //clear lookup panngillan
                 clearTimeout(LOOKUPHANDLE);
                 
                 jsonp.normalisasiAgen(pilih,uname,upass);
                 mainView.router.loadPage("menulayanan.html");
                });
                  
              
      
           
      
    });
    
});
myApp.onPageInit('mintalayanan', function (page) {
    
    var keluhan = page.query.keluhan;
    var nopolisi = page.query.nopolisi;
    app.stopNativeSound('phone1');
    KELUHAN = keluhan;
    NOPOLISI=nopolisi;
    ARRAGEN=[];
    
    var offset=$('#logoradar').offset();
    var atas=offset.top;
    var kiri=offset.left;
    $('#timelabel').hide();
    setTimeout(function(){
    var lebar = $('#logoradar').width() ;
    var tinggi = $('#logoradar').height() ;
    kiri = kiri + (lebar/2) - 15;
    atas = atas + 55 ;
    //alert(atas+","+kiri+","+lebar+","+tinggi);
    $('#timelabel').show();
    $('#timelabel').css({top:atas+'px'});
    
    //perlihatkan keluhan
    $('#mintalayanan_keluhan').html(keluhan+"<br> untuk kendaraan dengan No Polisi :"+nopolisi);
       
   },1500);
   TMDETIK=0;
   TMMENIT=0;
   //1.convert latitude,longitude to address
   //2. scanning agen
   //3. notifikasi agen
   var posuser=CURPOSITION.latitude+','+CURPOSITION.longitude;
   var dataString={cover:SCANCOVER,step:1,index:0,latlon:posuser};
   ARRAGEN=[];
   jsonp.getAgen(dataString);
   
   // $('#logoradar').css({left:kiri + lebar ,top: atas + 10});
   
   $$('#userbtncancel').on('click',function(){
      
             clearTimeout(TIMERHANDLE);
              TMDETIK=0;
              TMMENIT=0;
              SCANCOVER=5;
              //gagalkan pesanan otomatis mohon buat pesanan lagi
              app.matiScreen();
              app.stopNativeSound('phone1');
              
              
              app.agenTerpilih(function(uname,upass,pilih){                  
                  jsonp.tutupPesanan(ORDERID,uname,upass,pilih);
                  
                  var notifi ="Anda telah melakukan pembatalan terhadap Pesanan anda sendiri, terima kasih";
                   myApp.alert(notifi,"Honda Care",function(){
                  
                    //clear lookup panngillan
                 clearTimeout(LOOKUPHANDLE);
                 jsonp.normalisasiAgen(pilih,uname,upass);
                 mainView.router.loadPage("menulayanan.html");
                });
                  
              });
      
           
      
    });
    
});

myApp.onPageInit('agen_waiting', function (page) {
    // run createContentPage func after link was clicked
    
    
    //clearTimeout(AGENMONITORHANDLE);
    
    
    //set init data
    var pesan='';
   
    if(DATAAGEN != ""){
    var arrdata=JSON.parse(DATAAGEN);
    pesan="Pelanggan dengan nama "+arrdata['namapelanggan']+" memerlukan segera layanan Honda Care.<br>Dengan Keluhan <i>&quot "+arrdata['keluhan']+" &quot</i> <br> No Polisi:"+arrdata['nopolisi'];
    $('#agenwaiting_keluhan').html(pesan);
    ORDERID=arrdata['orderid'];
    var offset=$('#logoradar2').offset();
    var atas=offset.top;
    var kiri=offset.left;
    $('#timelabel2').hide();
  
    setTimeout(function(){
   //set posisi text timer
    var lebar = $('#logoradar2').width() ;
    var tinggi = $('#logoradar2').height() ;
    kiri = kiri + (lebar/2) - 15;
    atas = atas + 55 ;
    //alert(atas+","+kiri+","+lebar+","+tinggi);
    $('#timelabel2').show();
    $('#timelabel2').css({top:atas+'px'});
       
       
       
    TMDETIK=0;
    TMMENIT=0;
    app.agenHitungTimer();
    jsonp.agenLookup(arrdata); 
       
   },1500);
   
    
    }
    
    $$('#agen_btnaccept').on('click',function(){
      app.stopNativeSound('phone1');
       jsonp.agenTerimaPesanan();
    });
    
    $$('#agen_btntolak').on('click',function(){     
      app.stopNativeSound('phone1');
      
     myApp.prompt('Berikan Alasan Kenapa Anda menolak Pesanan ini?', 'Honda Care', 
      function (value) {
         if(value.length > 6)
         {
          jsonp.agenTolakPesanan(value); 
         }else
         {
          myApp.alert("Mohon Maaf, Kami tidak menerima Alasan Anda, Mohon ketik alasan yang masuk akal","Honda Care");
         }    
      });
      
      
       
    });
    
});



myApp.onPageInit('proses', function (page) {

//alert(page.query.data);
var arrdata=JSON.parse(page.query.data); 

var pos = arrdata['agen_position'].split(";");
    var userpos=pos[0];
    var agenpos=pos[1];
  //  $('.pesan #keterangan').append(plat+","+plng+'<br>');
 $('pesan #keterangan').html("user:"+userpos+"<br>Agen:"+agenpos);
   var sp_orderid = ORDERID.substr(0,8)+' '+ORDERID.substr(8,8)+' '+ORDERID.substr(16,8)+' '+ORDERID.substr(24,8);
   
   if(arrdata['member_type'] == "M002")
   $('#pro_orderid').html('Agen : AHASS '+arrdata['ahass_name']+'<br><i style="font-size:smaller">'+sp_orderid+'</i>');
   else if(arrdata['member_type'] == "M003")
   $('#pro_orderid').html('Agen : OWNERSHIP '+arrdata['ahass_name']+'<br><i style="font-size:smaller">'+sp_orderid+'</i>');    
   else if(arrdata['member_type'] == "M001")
   $('#pro_orderid').html('Pelanggan Honda Care<br><i style="font-size:smaller">'+sp_orderid+'</i>');    
   
   $('.pesan').html('<div class="row">');
   if(arrdata['img'] == "")
   {
   $('.pesan').append('<div class="col-15"><img src="img/userdummy.jpg" width="80px" style="max-width:100%"></div>');
   }else
   {
   
   $('.pesan').append('<div class="col-15"><img src="'+IMGSERVER+arrdata['img']+'" width="80px" style="max-width:100%"></div>');
   }
   
   $('.pesan').append('<div class="col-85" id="keterangan">');
   if(arrdata['nama_lengkap'] == "")
   $('.pesan').append('Nama : '+arrdata['name']+'<br>');
   else
   $('.pesan').append('Nama : '+arrdata['nama_lengkap']+'<br>');    
   
   $('.pesan').append('Mobile : '+arrdata['mobile']+'<br>');
   PHONENUMBER =arrdata['mobile'];
   $('.pesan').append('Jarak Tempuh : '+arrdata['description']+'<br>');
   $('.pesan').append('</div>');
   
   $('.pesan').append('</div>');
//var userpos = page.query.userpos;
//var agenpos = page.query.agenpos;



var user = userpos.split(',');
var agen = agenpos.split(',');
var latuser = parseFloat(user[0]);
var lonuser=parseFloat(user[1]);
var latagen = parseFloat(agen[0]);
var lonagen=parseFloat(agen[1]);

var latcenter;
var loncenter;
var map;

ns.getData('keanggotaan',sukses);
function sukses(data)
{
    if(data == "umum")
    {
      latcenter = latagen;
      loncenter = lonagen;
      jsonp.getAddressFromLat(agenpos,function(address){
        $('.pesan #keterangan').append("Alamat mendekati :"+ address);
      })
    }else
    {
       latcenter = latuser;
       loncenter = lonuser; 
       jsonp.getAddressFromLat(userpos,function(address){
        $('.pesan #keterangan').append("Alamat mendekati :"+ address);
      })
    }
 

setTimeout(function(){
	
myApp.showIndicator(); 	
var plat=latcenter;
var plng=loncenter;
//$('.pesan #keterangan').append(plat+","+plng+'<br>');
//$('.pesan #keterangan').append(latagen+","+lonagen+'<br>');
//$('.pesan #keterangan').append(latuser+","+lonuser+'<br>');
var div = document.getElementById("map_canvas1");
map = plugin.google.maps.Map.getMap(div);

map.one(plugin.google.maps.event.MAP_READY, function() {
myApp.hideIndicator();
var css=ARRPAGECSS[PAGEOPENBEFORE];
$$('.'+css).hide();
// $('.pesan').append(latagen+","+lonagen+'<br>');   
  
 // Move to the position with animation
  map.animateCamera({
    target: {lat: plat, lng: plng},
    zoom: 12,
    tilt: 0,
    bearing: 0,
    duration: 2000
  }, function() {
    var judulagen="";
    var snipagen="";
    var juduluser="";
    var snipuser="";
    var agenicon="";
    if(INTERNALDATA.keanggotaan == "umum")
    {
      if(arrdata['member_type']=="M002")
      {
      judulagen ="AGEN AHASS RESMI ";
      snipagen =arrdata['ahass_name'];
      agenicon = "img/agenmarker.png";
      }else if(arrdata['member_type']=="M003")      
      {
      judulagen =arrdata['name']; 
      snipagen ="Dibawah "+arrdata['ahass_name'];
      agenicon = "img/freemarker.png";
      }      
      juduluser ="Anda!";
      snipuser ="Pelanggan Honda care";
    }else//ahass atau freelance
    {
      if(arrdata['member_type_agen']=="M002")
      {  
      judulagen ="AGEN AHASS RESMI ";      
      snipagen =arrdata['ahass_name'];
      agenicon = "img/agenmarker.png";
      }else if(arrdata['member_type_agen']== "M003")
      {
      var namaanda=INTERNALDATA.akun.split(",");
      judulagen =namaanda[0];      
      snipagen ="Dibawah "+arrdata['ahass_name']; 
      agenicon = "img/freemarker.png";    
      }
      
      //alert(arrdata['member_type']+","+judulagen+","+snipagen+","+agenicon)
      
      juduluser ="Pelanggan: a/n " + arrdata['name'];
      snipuser ="mobile :" + arrdata['mobile'];  
    }


    
     
    // Add a maker
    
    
    map.addMarker({
      position: {lat: latagen, lng: lonagen},
      title: judulagen,
      snippet: snipagen,
      icon: { url: agenicon}
    }, function(marker) {

      // Show the info window
      if(INTERNALDATA.keanggotaan == "umum")
             marker.showInfoWindow();

    });  
    map.addMarker({
      position: {lat: latuser, lng: lonuser},
      title: juduluser,
      snippet: snipuser,
      icon: { url: 'img/usermarker.png'}
    }, function(marker) {

      // Show the info window
      if(INTERNALDATA.keanggotaan != "umum")
          marker.showInfoWindow();

    });
    
    
    
  });
    
    

});
	
},1500);   
    
    
}//sukses data
	



/////////////////
//proses lookup 

PROSTATUS='approve';
$('#prostatus').html('PESANAN DITERIMA');
$('#prolanjut').html('lanjutkan KE PROSES');
if(INTERNALDATA.keanggotaan == "umum")
{
    $('#prolanjut').hide();
    $('#procancel').hide();
}
else
{
    $('#prolanjut').show();
    $('#procancel').show();
}

jsonp.prosesLookup();

$$('#pro_btnpath').on('click', function () {
// create map path
jsonp.getMapPolyline(map,agen,user);
//window.open("https://www.google.com/maps/dir/?api=1&origin="+agen+"&destination="+user);

/*var awal =[latagen,lonagen];
var akhir= [latuser,lonuser];
launchnavigator.navigate(
 awal,
 akhir,
  function(){
     // alert("Plugin success");
  },
  function(error){
     myApp.alert("Gagal membuka Jalur Map","Honda Care");
  });
*/
})

$$('#procancel').on('click', function () {

myApp.confirm("Apakah benar anda mau membatalkan Pesanan ini?","Honda Care",function(){
  jsonp.agenCancelOrder();
    
})


})

$$('#prolanjut').on('click', function () {
   if(PROSTATUS == 'approve')
   {
       //prostatus='proses';
       myApp.confirm("Apakah Status Service akan di tingkatkan ke Tahap Proses?","Honda Care",function(){
       if(INTERNALDATA.keanggotaan == "ahass")
       {
          app.getMekanik(PROSTATUS,DATAUSER.users.ahass_code);
       }else
       {
          jsonp.ubahStatusLayanan(PROSTATUS,'',function(dat){
            
               PROSTATUS = dat; 
           });
       }
       
       });
       
   }else if(PROSTATUS == 'proses')
   {
       //prostatus='done';
       myApp.confirm("Apakah Anda Sudah Selesai Melakukan Service?","Honda Care",function(){
       
           myApp.popup('.popup-order-sparepart'); 
         /*jsonp.ubahStatusLayanan(PROSTATUS,'',function(dat){
             PROSTATUS = dat; 
          });          
         */   
       
       });
       
   }else if(PROSTATUS == 'done')
   {
       
     
            DATAUSER={};
            mainView.router.loadPage("home.html");
           
       
   }
});
//reset button
$$('#pro_btnreset').on('click', function () {
  map.moveCamera({
  target:{lat: latcenter, lng: loncenter}  
 });
});

$$('#pro_btncall').on('click', function () {

   var noawal=arrdata['mobile'];
    var dawal= noawal.substr(0,2);
    var telp=noawal;
    if(dawal == '62')
    {
    telp ='0'+noawal.substr(2,telp.length);
    }
    
if(telp != "")
{
    
window.plugins.CallNumber.callNumber(function(){
    
}, function(){
    myApp.alert("Gagal melakukan panggilan","Honda Care");
}, telp, true);



}else
{
    if(INTERNALDATA.keanggotaan == "umum")
    myApp.alert("Maaf Panggilan Gagal, Pelanggan tidak mengisi nomor Mobile dengan Benar","Honda Care");
    else
    myApp.alert("Maaf Panggilan Gagal, Agen tidak mengisi nomor Mobile yang benar","Honda Care");    
}    

});

$$('#pro_btnsms').on('click', function () {
   
    
    myApp.popup('.popup-sms');
  
  
  
});

//send sms

$$('#panel_btnkirim').on('click',function()
    {
      var noawal=arrdata['mobile'];
      var pelanggan=arrdata['name'];
      var dawal= noawal.substr(0,2);
        var telp=noawal;
        if(dawal == '62')
        {
        telp ='0'+noawal.substr(2,telp.length);
        }  
        
       var txtinput=$('#panel_txtsms').val();
       if(txtinput != "")
       {
           if(txtinput.length <= 80)
           {
             myApp.showIndicator();
             app.sendSMS(telp,txtinput,pelanggan);
           }else
           {
             myApp.alert("Maksimum 80 karakter diijinkan","Honda Care");
           }    
       }else
       {
         myApp.alert("Mohon Ketik Pesan Anda!","Honda Care");  
       }    
    });




	
});	
	


myApp.onPageInit('history', function (page) { 
    
    var tgl= new Date();
    var hari = tgl.getDate();
    var bulan = tgl.getMonth()+1;
    var tahun =tgl.getFullYear();
    
    
    var awal = moment(tahun+"-"+bulan+"-1").format('YYYY-MM-DD');
    var akhir = moment().format('YYYY-MM-DD');
    //alert(awal+'\n'+akhir);
     app.resetStatistik('#myChart');
     
    
    setTimeout(function(){
    $('#myDateAwal').val(awal);
    $('#myDateAkhir').val(akhir);
    //alert(DATEAWAL+","+DATEAKHIR);
    },500);
   // var pan=Object.keys(STATISTIK).length;
   // alert(pan);
 
        
    if(typeof STATISTIK.input != "undefined")
    {
        if(typeof DATEAWAL != "undefined")
        {
            if(DATEAWAL == awal && DATEAKHIR == akhir){
            app.drawStatistik();
             }else{
             app.loadDrawStatistik(awal,akhir);
             }
        }else
        {
           app.loadDrawStatistik(awal,akhir);
        }
        
      //alert("ada");
    }else
    {
       app.loadDrawStatistik(awal,akhir);
    }   
    
    //myApp.showIndicator();
   setTimeout(function(){       
       app.daftarInvoice();
   },2000);
    
  $$('.btn_speak').on("click",function(){
     app.cekSpeech();
   }) 
   
$$('#btn_refresh_invoice').on('click',function(){
    var awal=$('#myDateAwal').val();
        var akhir=$('#myDateAkhir').val();
         
        myApp.showIndicator();
        jsonp.getStatistik(awal,akhir,function(data){
            if(data != 'none' || data != 'error')
            {
               myApp.hideIndicator();   
                app.daftarInvoice();
                
            }  
            
        });
})

    $$('#btn_history_layanan').on('click',function(){
        var awal=$('#myDateAwal').val();
        var akhir=$('#myDateAkhir').val();
         
        myApp.showIndicator();
        jsonp.getStatistik(awal,akhir,function(data){
            if(data != 'none' || data != 'error')
            {
                
                app.drawStatistik();
                
            }  
            
        });
    })
    
    $$('#btn_history_panggilan').on('click',function(){
        var awal=$('#myDateAwal').val();
        var akhir=$('#myDateAkhir').val();
        
         
        myApp.showIndicator();
        jsonp.getStatistik(awal,akhir,function(data){
            if(data != 'none' || data != 'error')
            {
               
                app.drawStatistikPanggil();                
            }  
            
        });
    });
    
    if(INTERNALDATA.keanggotaan == 'ahass')
    {
       $('#btn_pengajuan_klaim').show();
       $('#btn_klaim_confirm').show();
    }else
    {
       $('#btn_pengajuan_klaim').hide(); 
       $('#btn_klaim_confirm').hide();
    }
    
     $$('#btn_klaim_confirm').on('click',function(){
        
     });
     
     $$('#btn_pengajuan_klaim').on('click',function(){
         myApp.popup('.popup-pengajuan-klaim');
     });
     
     $$('#btn_klaim_confirm').on('click',function(){
         myApp.popup('.popup-konfirmasi-klaim');
     });
    
});


myApp.onPageInit('setting', function (page) {
/* WDOGTIME= SETTINGS.WDOGTIME.value;
      CALLTIME=SETTINGS.CALLTIME.value;
      SCANCOVERMIN=SETTINGS.SCANCOVERMIN.value;
      SCANSTEP=SETTINGS.SCANSTEP.value;
      IMGSERVER=SETTINGS.IMGSERVER.value
     
     */
    
    
var body="";
var wdog=parseInt(WDOGTIME) / 60000;
body +='<div class="data-table card">';
body +='<table>';
body +='<thead>';
body +='<tr>';
body +='<th>Setting</th><th>Read only</th>';
body +='</tr>';
body +='</thead>';
body +='<tbody id="setting-body">';
body +='<tr>';
body +='<td>Waktu Monitor</td><td>'+wdog+' Menit</td>';
body +='</tr>';
body +='<tr>';
body +='<td>Waktu Panggilan</td><td>'+CALLTIME+' Menit</td>';
body +='</tr>';
body +='<tr>';
body +='<td>Scan Area Minimal</td><td>'+SCANCOVERMIN+' Km</td>';
body +='</tr>';
body +='<tr>';
body +='<td>Pertambahan Cakupan</td><td>'+SCANSTEP+' Km</td>';
body +='</tr>';
body +='<tr>';
body +='<td>Scan Area Maksimal</td><td>'+SCANCOVERLIMIT+' Km</td>';
body +='</tr>';


body +='</tbody>';
body +='</table>';
body +='</div>';
$('.setting_form').html(body);

cordova.getAppVersion.getVersionNumber(function (version) {
body="";
body +='<tr>';
body +='<td>App Ver. No</td><td>'+version+'</td>';
body +='</tr>';
$('#setting-body').append(body);
 });
 
cordova.getAppVersion.getVersionCode(function (version) {
 body="";
 body +='<tr>';
body +='<td>App Ver. Code </td><td>'+version+'</td>';
body +='</tr>';
$('#setting-body').append(body);
 });




var map;   
var marker1;

var anggota = INTERNALDATA.keanggotaan;
if(anggota == 'freelance')
{
$('.set_freelance').show();

setTimeout(function(){
 //myApp.panel.close('left');   
    //-8.495941,115.2449249
    //alert(DATAUSER.users.user_position);

   
if(typeof DATAUSER.users.user_position != "undefined")
{
  var userposition;
  var latcenter;
  var loncenter;
  var snap=DATAUSER.users.user_description;
 
   //alert(DATAUSER.users.user_position)
  if( DATAUSER.users.user_position == null || DATAUSER.users.user_position == "")
  {
   latcenter=-8.495941;
   loncenter=115.2449249;   
  
  }else
  {
   userposition =DATAUSER.users.user_position.split(',');
   latcenter=userposition[0];
   loncenter=userposition[1];
    
   }
    
}

$('.setting_gps_info').html("Latlon :"+latcenter+","+loncenter);
//alert(latcenter+','+loncenter)
 
myApp.showIndicator(); 
//$('.pesan').html(plat+","+plng+'<br>');
var div = document.getElementById("map_canvas2");
map = plugin.google.maps.Map.getMap(div);

map.one(plugin.google.maps.event.MAP_READY, function() {
myApp.hideIndicator();
var css=ARRPAGECSS[PAGEOPENBEFORE];
$$('.'+css).hide();
// $('.pesan').append(latagen+","+lonagen+'<br>');   
  
 // Move to the position with animation
  map.animateCamera({
    target: {lat: latcenter, lng: loncenter},
    zoom: 12,
    tilt: 0,
    bearing: 0,
    duration: 2000
  }, function() {
  
     var judul="posisi Anda";
     //var snip=snap;
    // Add a maker
    map.addMarker({
      position: {lat: latcenter, lng: loncenter},
      title: judul,
      snippet: "["+latcenter+","+loncenter+"]",
      draggable:true,
      icon: { url: 'img/freemarker.png'}
    }, function(marker) {

            jsonp.getAddressFromLat(latcenter+","+loncenter,function(addr){                   
                                           
                                             $('.setting_gps_info').html(addr);
                                            setTimeout(function(){marker.setSnippet(addr);},1500)
                                     }) 
                                     
             marker1=marker;
             marker.on(plugin.google.maps.event.MARKER_DRAG_END,function(value){
                                     // infouser.latlon_awal = value.lat+","+value.lng;
                                  marker.setSnippet("Tekan dan geser untuk merubah posisi, ["+value.lat+","+value.lng+"]");
                                  jsonp.getAddressFromLat(value.lat+","+value.lng,function(addr){                       
                                            //$('#info_alamat').val('');
                                             $('.setting_gps_info').html(addr);
                                            setTimeout(function(){marker.setSnippet(addr);},1500)
                                     }) 
                                     
                                     
                                     
                                      CURPOSITION.latitude = value.lat;
                                      CURPOSITION.longitude = value.lng;
                                     marker.showInfoWindow();
                                       })
    });        
    
    
  });
    
    

});
	
},1500); 
    
}else
{
//umum dan ahass
$('.set_freelance').hide();
}





$$('#btn_set_lokasi').on('click',function(){
    
    gpsDetect.checkGPS(function(on){
     
     if(on)
     {
     myApp.showIndicator();
      //proses gps geolocation
      //put value to CURPOSITION={latitude:0,longitude:0};
      var options = {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0
        };
      navigator.geolocation.getCurrentPosition(function(pos){
      GPSSTATUS=true;
         
          CURPOSITION.latitude = pos.coords.latitude;
          CURPOSITION.longitude = pos.coords.longitude;
          //alert(pos.coords.latitude +','+pos.coords.longitude);
          //simpan alamat GPS ke USERID
          map.animateCamera({
            target:{lat: pos.coords.latitude, lng: pos.coords.longitude},
            zoom: 12,
            tilt: 0,
            bearing: 0,
            duration: 2000
            },
            function(){
                 myApp.hideIndicator();
                marker1.setPosition({lat: pos.coords.latitude, lng: pos.coords.longitude} );
                marker1.setSnippet(pos.coords.latitude+","+pos.coords.longitude);
                jsonp.getAddressFromLat(pos.coords.latitude+","+pos.coords.longitude,function(addr){                   
                                           
                                             $('.setting_gps_info').html(addr);
                                            setTimeout(function(){marker1.setSnippet(addr);},1500)
                                     }) 
            });
          
          
      }, function(err){
          myApp.hideIndicator();
           GPSSTATUS=false;
          myApp.alert("Maaf koordinat tidak bisa ditentukan, mohon pindah ke tempat lebih banyak sinyal GPS","Honda Care");
      },options);
      
      
      
     }else
     {
      GPSSTATUS=false;
     
      myApp.alert("Mohon Aktifkan Layanan GPS Anda terlebih dahulu!","Honda Care");
      
     }    
     
 }, function(err){     
     GPSSTATUS=false;
   
     myApp.alert("Maaf aplikasi ini membutuhkan layanan GPS","Honda Care");
     
 });
}) 
 
 $$('#btn_simpan_lokasi').on('click',function(){
     var newlatlon=CURPOSITION.latitude+","+CURPOSITION.longitude;
     jsonp.setAgenLokasi(newlatlon);
 });
 
    
});


myApp.onPageInit('profil', function (page) {
    
    //isi awal
   setTimeout(function(){jsonp.getProfil()},1500);
    
    
    $$('#btn_profil_simpan').on('click',function(){
       
        var nama =$('input[name=p_nama').val();
        var sid=$('input[name=p_sametonid').val();
        var ktp=$('input[name=ktp').val();
        var alamat=$('input[name=p_alamat').val();
        var email=$('input[name=p_email').val();
        var mobile=$('input[name=p_mobile').val();
        var password=$('input[name=p_password').val();
        var cpassword=$('input[name=cp_password').val();
        var dataString={};
        var proses = false;
        if(nama != "" && nama.length > 5)
        {
            if(mobile != "" && mobile.length > 7)
            {
                proses = true;
                if(password != "" || password.length > 0)
                {
                    if(password == cpassword)
                    {
                       if(password.length > 5)
                        {
                          proses=true;  
                        }else
                        {
                          password="";
                         proses=false;
                         myApp.alert("Kata sandi minimal 6 karakter","Honda Care");  
                        }
                        
                    }else
                    {
                       password="";
                       proses=false;
                       myApp.alert("Kata sandi baru tidak cocok","Honda Care");     
                    }
                }
                
                dataString={name:nama,alamat:alamat,sid:sid,email:email,mobile:mobile,password:password,ktp:ktp}                
                if(proses)
                jsonp.setProfil(dataString);
                
                
            }else
            {
              myApp.alert("Mohon Kolom Mobile dengan No HP aktif anda","Honda Care");   
            }
        }else
        {
            myApp.alert("Mohon isi Kolom Nama Lengkap (min 6 karakter)","Honda Care");
        }
        
    })
    
});


myApp.onPageInit('manualorder', function (page) {





var btnstatus = "step1";
var btnstatus_before="step1";
$('.mstep1').show();
$('.mstep2').hide();
$('.mstep3').hide();
$('.mstep4').hide();

var USERID='';
var DATA_SP2=[];

$('#btn_mmanual').on("click",function(){
    
    
    if(btnstatus == "step1")
    {
        btnstatus_before=btnstatus;
        var platno =$('#m_platno').val();
        if(platno != "" && platno.length > 3)
        {
           jsonp.getUserInfo(platno,function(data,pesan){
               //var info =JSON.parse(pesan);
               //alert(data);
               if(data == "ok")
               {
                    $('.mstep1').hide();
                     $('.mstep2').show();
                     $('.mstep3').hide();
                     $('.mstep4').hide();
                     btnstatus="step2";
                     
                     $("#btn_mmanual").text('Lanjutkan Pemesanan');
                     var info =JSON.parse(pesan);
                     var str="";
                     if(info.length > 0)
                     {
                            for(var i in info)
                            {
                                str +="<option value='"+info[i].userid+"'>"+info[i].username+" (mail:"+info[i].email+", hp:"+info[i].mobile+")</option>";
                            }
                            
                         $("#m_userid").html(str);
                     }
                     
               }else
               {
                   $('.mstep1').hide();
                    $('.mstep2').hide();
                    $('.mstep3').show();
                    $('.mstep4').hide();
                    btnstatus="step3";
                    $("#btn_mmanual").text('Lanjutkan Pemesanan/Pendaftaran'); 
               }
               
           }); 
        }else
        {
            myApp.alert("Mohon Ketik No Polisi dengan Benar","Perhatian");
        }
        
       /* $('.mstep1').hide();
        $('.mstep2').show();
        $('.mstep3').hide();
        btnstatus="step2";
        $(this).text('Proses Pemesanan');
        */
    }else if(btnstatus == "step2" )
    {
                    btnstatus_before=btnstatus;
                    btnstatus = "step4";
                    USERID = $('#m_userid').val();
                    $('.mstep1').hide();
                    $('.mstep2').hide();
                    $('.mstep3').hide();
                    $('.mstep4').show();
                    
                    $("#btn_mmanual").text('Proses Pemesanan');
                    //alert(btnstatus);
                    
    }else if(btnstatus == "step3")
    {
        /*m_username2,m_password,m_cpassword,m_ktp,m_mobile,m_email*/
        
        var m_username2 = $('#m_username2').val();
        var m_password = $('#m_password').val();
        var m_cpassword = $('#m_cpassword').val();
        var m_ktp = $('#m_ktp').val();
        var m_mobile = $('#m_mobile').val();
        var m_email = $('#m_email').val();
         var m_gender = $('#m_gender').val();
        var pro=false;
        if(m_username2 != "" && m_username2.length > 3)
        {
            if(m_password != "" && m_password.length > 6)
            {
                    if(m_password == m_cpassword)
                    {
                        if(m_email != "" && m_email.length > 8)
                        {
                            pro=true;
                        }else
                        {

                            myApp.alert("Mohon Ketik Alamat Email anda","Perhatian!");
                        }
                    }else
                    {

                        myApp.alert("Kata Sandi tidak Cocok","Perhatian!");
                    }
            }else
            {

                myApp.alert("Mohon Ketik Kata Sandi (lebih dari 3 karakter)","Perhatian!");
            }
        }else
        {
            
            myApp.alert("Mohon Ketik Nama Penguna (lebih dari 3 karakter)","Perhatian!");
        }
        
        
        if(pro){
            var posisi = CURPOSITION.latitude+","+CURPOSITION.longitude;
            var dataString="username="+m_username2+"&password="+m_password+"&email="+m_email+"&mobile="+m_mobile+"&ktp="+m_ktp+"&gender="+m_gender+"&posisi="+posisi;
                   jsonp.mpendaftaran(dataString,function(status,pesan,userid){                       
                   
                     if(status == "ok")
                     {
                         USERID = userid;
                         
                            $('#m_username2').val('');
                            $('#m_password').val('');
                            $('#m_cpassword').val('');
                            $('#m_ktp').val('');
                            $('#m_mobile').val('');
                            $('#m_email').val('');
                         
                        $('.mstep1').hide();
                        $('.mstep2').hide();
                        $('.mstep3').hide();
                        $('.mstep4').show();
                        btnstatus_before=btnstatus;
                        btnstatus = "step4";
                        $("#btn_mmanual").text('Proses Pemesanan');
                    }else if(status == "no")
                    {
                        myApp.alert(pesan,"Honda Care");
                    }else
                    {
                       myApp.alert('Kesalahan terjadi saat koneksi, Mohon Ulangi lagi!',"Honda Care"); 
                    }
                    
                    })
               }           
                    
                    
    }else if(btnstatus == "step4")
    {
        //alert(btnstatus);
      //mulai pemesanan 
      //table servises_order claim_order
        var agenhandle=AGENHANDLE;
        var datasp=app.getSP();
        var agenakun = INTERNALDATA.akun;
        var userid=USERID;
        var posisi=CURPOSITION.latitude+","+CURPOSITION.longitude;
        var keluhan = $('#m_keluhan').val();
        var platno=$('#m_platno2').val();
        var proses=false;
                if(platno != "" && platno.length > 4)
                {
                    if(keluhan != "" && keluhan.length > 3)
                    {
                        proses=true;
                     }else
                    {
                        proses=false;
                      myApp.alert("Mohon Ketik Keluhan Kendaraan Anda","Honda Care")
                    }
                }else
                {
                    proses=false;
                      myApp.alert("Mohon Ketik Ulang No Polisi (minimum 5 karakter)","Honda Care")
                }
       
        if(proses){
                    var dataString="platno="+platno+"&userid="+userid+"&agenakun="+agenakun+"&agenhandle="+agenhandle+"&posisi="+posisi+"&keluhan="+keluhan+"&datasp="+JSON.stringify(datasp);
                    jsonp.mpemesanan(dataString,function(data,pesan){

                        if(data == "ok")
                        {
                            myApp.alert(pesan,"Honda Care",function(){
                                mainView.router.loadPage('home.html');
                            })
                        }else
                        {
                            myApp.alert(pesan,"Honda Care",function(){
                                mainView.router.loadPage('home.html');
                            })
                        }

                    })
            }
       
    }
    
})

$("#btn_pengguna_baru").on("click",function(){
                   $('.mstep1').hide();
                    $('.mstep2').hide();
                    $('.mstep3').show();
                    $('.mstep4').hide();
                    btnstatus="step3";
                    $("#btn_mmanual").text('Lanjutkan Pemesanan/Pendaftaran'); 
});

$('#btn_mback').on("click",function(){ 
    
    if(btnstatus == "step2" || btnstatus == "step3")
    {
        $('.mstep1').show();
        $('.mstep2').hide();
        $('.mstep3').hide();
         $('.mstep4').hide();
         btnstatus_before=btnstatus;
        btnstatus="step1";
        $('#btn_mmanual').text('Lanjutkan');
    }else if(btnstatus == "step4")
    {
        if(btnstatus_before == "step2")
        {
           btnstatus_before=btnstatus; 
                $('.mstep1').hide();
                    $('.mstep2').show();
                    $('.mstep3').hide();
                    $('.mstep4').hide();
                    btnstatus="step2";
                    $("#btn_mmanual").text('Lanjutkan Pemesanan');
        }else if(btnstatus_before == "step3")
        {
            btnstatus_before=btnstatus;
                    $('.mstep1').hide();
                    $('.mstep2').hide();
                    $('.mstep3').show();
                    $('.mstep4').hide();
                    btnstatus="step3";
                    $("#btn_mmanual").text('Lanjutkan Pemesanan/Pendaftaran');
        }
        
    }
    
})

$('#btn_platno_hapus').on("click",function(){    
   $('#m_platno').val('');
})

$('#btn_mbatal').on("click",function(){    
    mainView.router.loadPage("home.html");
})

});




function controlNavigasi()
{
  document.addEventListener("backbutton", function (e) {
	//alert(PAGEOPEN);
	
    if(PAGEOPEN == 'signup')
	{
         if(SUBPAGEOPEN == 'step1'){   
	 			
	mainview.router.loadPage("login.html");
		
         }else if(SUBPAGEOPEN == 'step2')
         {
           $$('.umum').show();
            $$('.umumfree').hide();
            $$('.ahass').hide();
            $$('.umumfreeahass').hide();
            $$('.umumonly').hide();	  
         }
         /*
         else if(SUBPAGEOPEN == 'nama_ahass')
         {
            myApp.closeModal('.popup-servis'); 
            SUBPAGEOPEN = 'step2';
         }else if(SUBPAGEOPEN == 'nama_wilayah')
         {
            myApp.closeModal('.popup-wilayah'); 
            SUBPAGEOPEN = 'step2';
         }*/
         
         
	}else if(PAGEOPEN == 'login')
	{
		app.actionExit();
		
	}else if(PAGEOPEN == 'home')
	{
            if(INTERNALDATA.keanggotaan == "umum")
            {
               mainView.router.loadPage("front.html"); 
            }else
            {
               app.actionExit();
            }
            
            
	}else if(PAGEOPEN == 'menulayanan')
	{
		if(SUBPAGEOPEN == "")
                {
                  mainView.router.loadPage("home.html");  
                }else
                {
                  myApp.closeModal('.popup-keluhan');
                  SUBPAGEOPEN="";
                }
	}else if(PAGEOPEN == 'forgotpassword')
        {
          mainView.router.loadPage("login.html");  
        }else if(PAGEOPEN == 'resetpassword')
        {
          mainView.router.loadPage("forgotpassword.html");  
        }else if(PAGEOPEN == 'history')
        {
          mainView.router.loadPage("home.html");  
        }else if(PAGEOPEN == 'setting')
        {
           mainView.router.loadPage("home.html");  
        }else if(PAGEOPEN == 'profil')
        {
          mainView.router.loadPage("home.html");   
        }else if(PAGEOPEN == 'shbc')
        {
            mainView.router.loadPage("front.html"); 
        }else if(PAGEOPEN == 'signup')
        {
            mainView.router.loadPage("login.html");
        }else if(PAGEOPEN == 'front')
        {
            app.actionExit();
        }
        else if(PAGEOPEN == 'map')
        {
            mainView.router.loadPage("front.html");
        }
        else if(PAGEOPEN == 'lokasiuser')
        {
            mainView.router.loadPage("home.html");
        }
        else if(PAGEOPEN == 'proses')
        {
            myApp.alert("Maaf, Permintaan sedang diproses. Mohon menunggu sampai proses selesai","Honda Care");
        }else if(PAGEOPEN == 'datamotor')
        {
            mainView.router.loadPage("lokasiuser.html?datamotor=true");
            //mainView.router.loadPage("lokasiuser.html?datamotor=true");
	    //setTimeout(function(){clearPage('lokasiuser');},1500)
			
                        
             //
        }else if(PAGEOPEN == 'manuallog')
        {
             mainView.router.loadPage("home.html");
        }else if(PAGEOPEN == 'manualorder')
        {
             mainView.router.loadPage("home.html");
        }
	
	  
  });
  
}

function clearPage(pageopen)
{
	
	for(var i in ARRPAGE)
              {
                  var css = ARRPAGECSS[ARRPAGE[i]];
                  if(ARRPAGE[i] == "lokasiuser")
                  {
                      $$('.'+css).show();
                     // str +='.'+css+'-show()<br>';
                  }
                  else
                  {
                      $$('.'+css).hide();
                     // str +='.'+css+'-hide()<br>';
                  }
              }
}



