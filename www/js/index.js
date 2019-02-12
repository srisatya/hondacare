app = {
 keluarApp:function(title,msg)
 {
	
  navigator.notification.confirm(
		 msg, // message
         app.onConfirm, // callback to invoke with index of button pressed
         title,           // title
        ['YA','TIDAK']     // buttonLabels
    );
 },
 onConfirm:function(buttonIndex)
 {
	 //alert(buttonIndex);
	 if(buttonIndex == 1)
	 {
		 navigator.app.exitApp();
	 }
 },
   loadAllSound:function()
   {
	  // var st="init,";
	   try{
		  // st +="try";
		if( window.plugins && window.plugins.NativeAudio ) 
		{   
        //st +=", masuk Plugin";
//( id, assetPath, volume, voices, delay, successCallback, errorCallback)
        
            
            if(INTERNALDATA.keanggotaan == "umum")
            {
            window.plugins.NativeAudio.preloadComplex( 'phone1', 'sound/android1.mp3', 1, 1, 0, null,null); 
            window.plugins.NativeAudio.preloadComplex( 'notify1', 'sound/nofity1.mp3', 1, 1, 0, null,null);
            window.plugins.NativeAudio.preloadComplex( 'notify', 'sound/nofity.mp3', 1, 1, 0, null,null);
            window.plugins.NativeAudio.preloadComplex( 'alarm1', 'sound/alarm1.mp3', 1, 1, 0, null,null);
            }
            else
            {
            window.plugins.NativeAudio.preloadComplex( 'phone1', 'sound/phone1.mp3', 1, 1, 0, null,null);
            window.plugins.NativeAudio.preloadComplex( 'notify1', 'sound/nofity1.mp3', 1, 1, 0, null,null);
            window.plugins.NativeAudio.preloadComplex( 'notify', 'sound/nofity.mp3', 1, 1, 0, null,null);
            window.plugins.NativeAudio.preloadComplex( 'alarm1', 'sound/alarm1.mp3', 1, 1, 0, null,null);
            //alert('load sound');
            }
		   //st +=", sukses loaded";
          
        	
	   
        }
	    }catch(err)
	   {
		  //st +='error'; 
	   }
	   
	  //myApp.alert(st);
	
   },
	playNativeSound:function(keyid)
	{
	 window.plugins.NativeAudio.play(keyid);		
	},
	stopNativeSound:function(keyid)
	{
	 window.plugins.NativeAudio.stop(keyid);
    //window.plugins.NativeAudio.unload(keyid);	 
	},
	playNativeSoundLoop:function(keyid)
	{
	 window.plugins.NativeAudio.loop(keyid);
   
	},
	phoneStatus: function()
	{
		PhoneCallTrap.onCall(function(obj) {
    
      var callObj = JSON.parse(obj),
        state = callObj.state,
        callingNumber = callObj.incomingNumber;

    switch (state) {
        case "RINGING":
            console.log("Phone is ringing", callingNumber);
            break;
        case "OFFHOOK":
            console.log("Phone is off-hook");
            break;

        case "IDLE":
            console.log("Phone is idle");
            break;
    }
   });
		
	},
	getAhass:function(){
     myApp.popup('.popup-servis');
       var str='';
       str +='<li><b style="padding-left:10px">Temukan Nama Ahass Anda</b></li>';
        str +='<li><input type="text" name="inputAhass" style="width:100%;height:25px;padding-left:10px" placeholder="Ketik disini Nama/Kode Ahass Anda" onKeyUp=\'app.onKunciLepas("inputAhass")\'/></li>';
        
      
       $('.popup-servis div .navigator ul').html(str);
    },
	onKunciLepas : function(obj)
	{
    var input=$('input[name='+obj+']').val();
    if(input.length > 2)
    {
		//$('.popup-servis div .content ul').html('<li><a href="#">data1</a></li><li><a href="#">data2</a></li>');
		
       var dataString = "skey="+input;
       jsonp.getAhass(dataString,sukses);
       function sukses(data)
       {
           
           //alert(data);
		   
         if(data != ''){
			//alert(data);	
				
            var arr=[];
            arr=JSON.parse(data);
			
             var str='';
             var sisa=0;
                var css;
			if(arr.length > 0)
			{	
					
               for(var i in arr)
                 {
                     sisa=i % 2;
                     if(sisa == 0)
                        css="background-color:silver";
                     else
                         css="background-color:white";
                     
                  str +='<li style="'+css+'"><a href="#" class="list-button item-link" onClick=\'app.pilihArrayAhass("'+arr[i].ahass_code+'","'+arr[i].ahass_name+'","'+arr[i].ahass_address+'","'+arr[i].ahass_position+'")\'>['+arr[i].ahass_code+'] '+arr[i].ahass_name+'</a></li>'; 
                			  
                }
				
                $('.popup-servis div .content ul').html(str);
				
			}	
                
		 }else
		 {
		  $('.popup-servis div .content ul').html(''); 
		 }			 
       }
	   
    }else//length 2
	{
	 $('.popup-servis div .content ul').html('');	
	}
	
	},
	pilihArrayAhass:function(a_code,a_name,a_address,a_pos)
	{
		$('input[name=nama_ahass]').val(a_name);
		$('input[name=kode_ahass]').val(a_code);
		$('input[name=address_ahass]').val(a_address);
		$('input[name=geopos_ahass]').val(a_pos);
		myApp.closeModal('.popup-servis');
	},
	getWilayah:function(){
     myApp.popup('.popup-wilayah');
       var str='';
       str +='<li><b style="padding-left:10px">Tentukan Wilayah Anda</b></li>';
        str +='<li><input type="text" name="inputWilayah" style="width:100%;height:25px;padding-left:10px" placeholder="Ketik disini Nama Kebupaten/Kecamatan Anda" onKeyUp=\'app.onKunciLepas2("inputWilayah")\'/></li>';
        
      
       $('.popup-wilayah div .navigator ul').html(str);
    },
	onKunciLepas2 : function(obj)
	{
    var input=$('input[name='+obj+']').val();
    if(input.length > 2)
    {
		//$('.popup-servis div .content ul').html('<li><a href="#">data1</a></li><li><a href="#">data2</a></li>');
		
       var dataString = "skey="+input;
       jsonp.getWilayah(dataString,sukses);
       function sukses(data)
       {
           
           //alert(data);
		  
         if(data != ''){
			//alert(data);	
				
            var arr=[];
            arr=JSON.parse(data);
			
             var str='';
             var sisa=0;
                var css;
			if(arr.length > 0)
			{	
					
               for(var i in arr)
                 {
                     sisa=i % 2;
                     if(sisa == 0)
                        css="background-color:silver";
                     else
                         css="background-color:white";
                     
                  str +='<li style="'+css+'"><a href="#" class="list-button item-link" onClick=\'app.pilihArrayWilayah("'+arr[i].state+'","'+arr[i].region+'","'+arr[i].city+'","'+arr[i].cstate+'","'+arr[i].cregion+'","'+arr[i].ccity+'")\'>'+arr[i].state+','+arr[i].region+','+arr[i].city+'</a></li>'; 
                			  
                }
				
                $('.popup-wilayah div .content ul').html(str);
				
			}	
                
		 }else
		 {
		  $('.popup-wilayah div .content ul').html(''); 
		 }			 
       }
	   
    }else//length 2
	{
	 $('.popup-wilayah div .content ul').html('');	
	}
	
	},
	pilihArrayWilayah:function(state,region,city,cstate,cregion,ccity){
     $('input[name=wilayah]').val(state+','+region+','+city);
	 $('input[name=wilayah_code]').val(cstate+','+cregion+','+ccity);	 
	  myApp.closeModal('.popup-wilayah');
    },pilihKeluhan:function(skey)
    {
      /* myApp.popup('.popup-keluhan');
       var deretkey=["mogok","banpecah","bensinhabis","remblong","rantaiputus","akirusak"];
       if(app.inArray(skey,deretkey))
       {
       
       var keluhan={
           mogok:'Motor tiba-tiba mogok Tidak tahu kenapa?',
           banpecah:'Ban Motor Pecah di tengah perjalanan',
           bensinhabis:'Bensin Habis ditempat yang tidak dikenal',
           remblong:'Rem motor Blong di tengah perjalanan',
           rantaiputus:'Rantai Putus ditengah Perjalanan',
           akirusak:'Motor tidak bisa di starter karena Aki Rusak/mati'
       }       
       $('textarea[name=keluhan]').val(keluhan[skey]);
      }else
      {
        $('textarea[name=keluhan]').val(skey);  
      }
       
       $('input[name=nopolisi]').val('');
       SUBPAGEOPEN="popup-keluhan";
       */
    
    //var deretkey=["mogok","banpecah","bensinhabis","remblong","rantaiputus","akirusak"];
      
       var keluhan={
           mogok:'Motor tiba-tiba mogok Tidak tahu kenapa?',
           banpecah:'Ban Motor Pecah di tengah perjalanan',
           bensinhabis:'Bensin Habis ditempat yang tidak dikenal',
           remblong:'Rem motor Blong di tengah perjalanan',
           rantaiputus:'Rantai Putus ditengah Perjalanan',
           akirusak:'Motor tidak bisa di starter karena Aki Rusak/mati'
       }       
      
    jsonp.prosesKeluhan(keluhan[skey],NOPOLISI);
    
    },
    getMekanik:function(prostatus,ahass_code)
    {
        myApp.popup('.popup-mekanik');
        var load ='<li >loading...</li>';
        $('.popup-mekanik div .navigator ul').html(load);
        
        jsonp.getMekanik(prostatus,ahass_code,sukses);
        function sukses(data)
        {
           var str='';
           var sisa=0;
           var css;
           if(data == 'none' || data == 'error')
            {
             css="background-color:orange";    
            str +='<li style="'+css+'"><a href="#" class="list-button item-link" onClick=\'app.pilihMekanik("'+prostatus+'","")\'>Pilih Mekanik yang Belum terdaftar</a></li>';    
            }else
            {
              var arr=JSON.parse(data);
              
              for(var i in arr)
              {
                 sisa=i % 2;
                     if(sisa == 0)
                        css="background-color:silver";
                     else
                         css="background-color:white";
                     
                  str +='<li style="'+css+'"><a href="#" class="list-button item-link" onClick=\'app.pilihMekanik("'+prostatus+'","'+arr[i].id+'")\'>'+arr[i].name+' ['+arr[i].id +']</a></li>';   
              }
              css="background-color:orange";
              str +='<li style="'+css+'"><a href="#" class="list-button item-link" onClick=\'app.pilihMekanik("'+prostatus+'","")\'>Pilih Mekanik yang Belum terdaftar</a></li>';
              
           }
           
           $('.popup-mekanik div .navigator ul').html(str);
           // myApp.closeModal('.popup-wilayah');
        }
    },
    pilihMekanik:function(prostatus,id)
    {
     jsonp.ubahStatusLayanan(PROSTATUS,id,function(dat){
         PROSTATUS=dat;
         myApp.closeModal('.popup-mekanik');
     });
    //myApp.closeModal('.popup-mekanik');
    },
	actionExit:function()
	{
	 navigator.notification.confirm('Tekan Tombol OK sekali, untuk menutup layanan ini', confirmed, 'Keluar dari Aplikasi ini?');
	 
		function confirmed(buttonIndex) {
		if(buttonIndex == 1) {
			
			navigator.app.exitApp();
		} 
	}
	},
	resetAkun: function()
	{
		ns.saveData('register','pending');
		ns.saveData('keanggotaan','umum');
		ns.saveData('akun','none');
	},
	getPage:function(page)
	{
	  var rsl=false;
		for(var i in ARRPAGE)
		{
		   if(ARRPAGE[i] == page)
		   {
			   rsl = true;
			   break;
		   }
            			   
		}
		
	  return rsl;	
	},
        hitungTimer:function()
        {
          TMDETIK ++;
          if(TMDETIK == 60)
          {
              TMMENIT ++;
              TMDETIK=0;
          }
          
          if(TMMENIT == 60)
          {
              TMMENIT=0;
             
          }
          
         var strdetik="";
         var strmenit="";
          
          if(TMDETIK < 10)
          {
             strdetik = '0'+TMDETIK.toString(); 
          }else
          {
             strdetik=TMDETIK.toString(); 
          }
          
          if(TMMENIT < 10)
          {
             strmenit = '0'+TMMENIT.toString(); 
          }else
          {
             strmenit=TMMENIT.toString(); 
          }
         
          
          if(TMDETIK < CALLTIME)
          {  
          var label=strmenit+":"+strdetik;
          $('#timelabel').html("CALLING<br>"+label);
          //$('#timelabel').html("CALLING<br>"+label+"<br><span style='font-size:9px'>"+ORDERID+"</span>");
          console.log(TMDETIK);
          TIMERHANDLE=setTimeout(function(){app.hitungTimer();},1000);
          }else
          {
              app.perluasCover();
             /*SCANCOVER =SCANCOVER + SCANSTEP;
             if(SCANCOVER <= SCANCOVERLIMIT){ 
             clearTimeout(TIMERHANDLE);
            
             app.kalkulasiJumlahAgen();
            
             }else
              {
              clearTimeout(TIMERHANDLE);
              TMDETIK=0;
              TMMENIT=0;
              SCANCOVER=5;
              //gagalkan pesanan otomatis mohon buat pesanan lagi
              app.stopNativeSound('phone1');
              myApp.alert("Mohon Maaf, saat ini semua agen dalam keadaan sibuk, Coba ulangi lagi pesanan terima kasih","Honda Care",function(){
                mainView.router.loadPage('menulayanan.html');  
              });
               
           
             }  */  
            
          }    
          
         
        
        },
        kalkulasiJumlahAgen:function()
        {
            var terpilih=[];
            if(ARRAGEN.length > 0)
            {
              for(var i in ARRAGEN)
              {
                if(SCANCOVER == SCANCOVERMIN) 
                {
                 if(parseInt(ARRAGEN[i].jarak) <= SCANCOVER)
                 {
                   console.log(ARRAGEN.length+","+SCANCOVER);
                    terpilih.push({id:ARRAGEN[i].id,kode:ARRAGEN[i].kode,index:ARRAGEN[i].index,jarak:ARRAGEN[i].jarak,waktu:ARRAGEN[i].waktu,nama:ARRAGEN[i].nama});
                 }
                }else
                {
                  var minjarak =  parseInt(SCANCOVER) - parseInt(SCANSTEP);
                    
                   if(parseInt(ARRAGEN[i].jarak) > minjarak && parseInt(ARRAGEN[i].jarak) <= SCANCOVER)
                   //if(parseInt(ARRAGEN[i].jarak) <= SCANCOVER)
                   {
                      console.log(ARRAGEN.length+","+SCANCOVER);
                      terpilih.push({id:ARRAGEN[i].id,kode:ARRAGEN[i].kode,index:ARRAGEN[i].index,jarak:ARRAGEN[i].jarak,waktu:ARRAGEN[i].waktu,nama:ARRAGEN[i].nama});       
                       
                   }  
                    
                }
                 
              }
                 if(terpilih.length > 0)
                 {
                    //myApp.alert("Terpilih "+ terpilih.length+" Agen","Honda Care");
                    //send notifikasi ke agen terpilih
                    
                    $('#timelabel').html("SCAN "+SCANCOVER+" Km <br>"+terpilih.length+" Agen");
                    
                  //  ns.getData("akun",function(data){
                       // alert(data);
                     var akundata=INTERNALDATA.akun;
                      var akun=akundata.split(",");
                      var uname=akun[0];
                      var upass=akun[1];
                      jsonp.kirimNotifikasiHondacare(terpilih,uname,upass);
                      
                        
                   // });
                    
                    
                    
                 }
                 else
                 {
                     app.perluasCover();
                    /*TMDETIK=0;
                    TMMENIT=0;
                    //app.stopNativeSound('phone1');
                    //app.playNativeSoundLoop('phone1');
                    setTimeout(function(){app.hitungTimer();},1500);
                    */
                     
                 }
            }
        },
        perluasCover:function()
        {
            SCANCOVER = parseInt(SCANCOVER) + parseInt(SCANSTEP);
            //alert(SCANCOVER);
             if(SCANCOVER <= SCANCOVERLIMIT){ 
             clearTimeout(TIMERHANDLE);
             /*var posuser=CURPOSITION.latitude+','+CURPOSITION.longitude;
                var dataString={cover:SCANCOVER,step:1,index:0,latlon:posuser};
            jsonp.getAgen(dataString);*/ 
             app.kalkulasiJumlahAgen();
            
             }else
              {
              clearTimeout(TIMERHANDLE);
              TMDETIK=0;
              TMMENIT=0;
              SCANCOVER=SCANCOVERMIN;
              //gagalkan pesanan otomatis mohon buat pesanan lagi
              app.matiScreen();
              app.stopNativeSound('phone1');
              var nof="";
              
              app.agenTerpilih(function(uname,upass,pilih){                  
                  jsonp.tutupPesanan(ORDERID,uname,upass,pilih); 
              });
              
             
              
              if(STATUSAGEN == true)
                 nof="Mohon Maaf, Seluruh Honda Care Agen yang tersedia di Sekitar Anda ("+SCANCOVERLIMIT+" KM ) sedang melayani Pelanggan lainnya, Mohon ulangi lagi pesanan lain waktu,terima kasih";
               else
                 nof="Mohon Maaf, Honda Care Tidak menemukan Agen yang tersedia di Sekitar Anda ("+SCANCOVERLIMIT+" KM ), Coba ulangi lagi pesanan ditempat berbeda. terima kasih"  ;
              
              
              myApp.alert(nof,"Honda Care",function(){
                  
               //clear lookup panngillan
               clearTimeout(LOOKUPHANDLE);
                     
              //cek semua agen terpilih dalam radius
              var terpilih2=[];
              if(ARRAGEN.length > 0)
              {
                  for(var i in ARRAGEN)
                  {
                     if(parseInt(ARRAGEN[i].jarak) <= SCANCOVERLIMIT)
                         terpilih2.push(ARRAGEN[i].id);
                     
                  }
             }     
                 //jsonp.normalisasiAgen(terpilih);
             if(terpilih2.length > 0) 
             {
                 ns.getData("akun",function(data){
                       // alert(data);
                        
                      var akun=data.split(",");
                      var uname=akun[0];
                      var upass=akun[1];
                      jsonp.normalisasiAgen(terpilih2,uname,upass);
                      
                        
                    });
             }
                  
              
              STATUSAGEN=false;
              ARRAGEN=[];
              app.stopNativeSound('phone1');
              
              mainView.router.loadPage('menulayanan.html');  
              });
               
              
           
             } 
            
        },
        getMD5:function()
	{
	  var arr=new Date();
	  var waktu= arr.getFullYear()+'-'+arr.getMonth()+'-'+arr.getDate()+' '+arr.getHours()+':'+arr.getMinutes()+':'+arr.getSeconds()+':'+arr.getMilliseconds();
	  
	  return $.md5(waktu);
	},
        hidupScreen:function()
        {
            WAKEUPHANDLE=setTimeout(function(){
             window.plugins.insomnia.keepAwake();   
            },2000);
        },
        matiScreen:function()
        {
           window.plugins.insomnia.allowSleepAgain();
           clearTimeout(WAKEUPHANDLE);
        },
        agenHitungTimer:function()
        {
            TMDETIK ++;
          if(TMDETIK == 60)
          {
              TMMENIT ++;
              TMDETIK=0;
          }
          
          if(TMMENIT == 60)
          {
              TMMENIT=0;
             
          }
          
         var strdetik="";
         var strmenit="";
          
          if(TMDETIK < 10)
          {
             strdetik = '0'+TMDETIK.toString(); 
          }else
          {
             strdetik=TMDETIK.toString(); 
          }
          
          if(TMMENIT < 10)
          {
             strmenit = '0'+TMMENIT.toString(); 
          }else
          {
             strmenit=TMMENIT.toString(); 
          }
          
          if(TMDETIK < CALLTIME)
          {
          var label=strmenit+":"+strdetik;
          $('#timelabel2').html("PANGGILAN<br>"+label);
          //$('#timelabel').html("CALLING<br>"+label+"<br><span style='font-size:9px'>"+ORDERID+"</span>");
          TIMERHANDLE=setTimeout(function(){app.agenHitungTimer();},1000);
          }else
          {
              app.stopNativeSound('phone1');
              clearTimeout(TIMERHANDLE);
              TMDETIK=0;
              TMMENIT=0;
              myApp.confirm("Waktu Panggilan telah selesai. Apakah Anda akan Melayani Pesanan ini?","Honda Care",function(){
               jsonp.agenTerimaPesanan();   
              },function(){
               //jsonp.agenTolakPesanan();  
               
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
              
          }
            
        },
        agenTerpilih : function(callback)
        {
             var terpilih2=[];
              if(ARRAGEN.length > 0)
              {
                  for(var i in ARRAGEN)
                  {
                     if(parseInt(ARRAGEN[i].jarak) <= SCANCOVERLIMIT)
                         terpilih2.push(ARRAGEN[i].id);
                     
                  }
             }     
                 //jsonp.normalisasiAgen(terpilih);
             if(terpilih2.length > 0) 
             {
                 //ns.getData("akun",function(data){
                       // alert(data);
                      var akundata=INTERNALDATA.akun;  
                      var akun=akundata.split(",");
                      var uname=akun[0];
                      var upass=akun[1];
                      callback(uname,upass,terpilih2);
                      
                        
                    //});
             }
        },
        initialDataInternal:function()
        {
           // {register:'',keanggotaan:'',akun:''};
           ns.getData('register',sukses);
           function sukses(data)
           {
               INTERNALDATA.register = data;
           }
           ns.getData('keanggotaan',sukses2);
           function sukses2(data2)
           {
               INTERNALDATA.keanggotaan = data2;
           }
           
           ns.getData('akun',sukses3);
           function sukses3(data3)
           {
               INTERNALDATA.akun = data3;
           }
           
        },
        fillDatauser:function()
        {
         //home_ahass_name,home_agen_name,home_today,home_done,home_cancel,home_ahass_klaim,home_mekanik_klaim
         var labeltype={M001:'UMUM',M002:'AGEN AHASS',M003:'AGEN OWNERSHIP'};
         
         //$('.panel_profile p #panel_photo').show();
         
         
        if(DATAUSER.member_type == "M001")
        {
            if(DATAUSER.nama_lengkap == false)
              {
                  $('.panel_profile p #panel_name').html(DATAUSER.users.name);
              }else
              {
                 $('.panel_profile p #panel_name').html(DATAUSER.nama_lengkap);   
              }
                 
                 $('.panel_profile p #panel_membertype').html(labeltype[DATAUSER.member_type]);
                 $('.panel_profile p #panel_mobile').html(DATAUSER.users.mobile);
                //alert(DATAUSER.member_type+","+DATAUSER.users.mobile);
        }else
        {
           if(DATAUSER.nama_lengkap == false)
              {
                  $('.panel_profile p #panel_name').html(DATAUSER.users.name);
               }else
                {
                 $('.panel_profile p #panel_name').html(DATAUSER.nama_lengkap);   
                }
         
                 $('.panel_profile p #panel_membertype').html(labeltype[DATAUSER.member_type]);
                 $('.panel_profile p #panel_mobile').html(DATAUSER.users.mobile); 
            
            
            
            $('.home_ahass_name').html(DATAUSER.ahass_name);        
             if(DATAUSER.nama_lengkap == false)
           {
                  $('.home_agen_name').html(DATAUSER.users.name);         
             }
             else
              {
                 $('.home_agen_name').html(DATAUSER.nama_lengkap);         
             }
     
            var d=new Date();
            var arrmonth=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','Novermber','Desember'];
             var hari=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
             var fulldate = hari[d.getDay()]+" , "+d.getDate()+" "+arrmonth[d.getMonth()]+" "+d.getFullYear();
            $('.home_today').html(fulldate);
            $('.home_done').html(DATAUSER.total_done+'/'+DATAUSER.total_call);
            $('.home_cancel').html(DATAUSER.total_cancel+'/'+DATAUSER.total_call);
            $('.home_ahass_klaim').html('Rp '+app.formatUang(parseInt(DATAUSER.klaimpending.ahass)));
            $('.home_mekanik_klaim').html('Rp '+app.formatUang(parseInt(DATAUSER.klaimpending.mekanik)));
        }    
         
        //alert(DATAUSER.img)
        if(typeof DATAUSER.img != "undefined")
		{
			if(DATAUSER.img == false)
			$('.panel_profile #panel_img').attr("src",IMGSERVER+"images/users/userdummy.jpg");		
				else
            $('.panel_profile #panel_img').attr("src",IMGSERVER+DATAUSER.img);
		}
	    else
		{
		 $('.panel_profile #panel_img').attr("src",IMGSERVER+"images/users/userdummy.jpg");	
		}
		 	
     
        if(DATAUSER.users.user_live_status)
        {
          var st=DATAUSER.users.user_live_status;
          if(st == "on")
          $('.panel_profile #panel_status').html("Status : "+st.toUpperCase()).css({'background-color':'green','color':'#eee'});
          else
          $('.panel_profile #panel_status').html("Status : "+st.toUpperCase()).css({'background-color':'gray','color':'#eee'});    
        }
         
         
         
        // var labeltype={M001:'UMUM',M002:'AGEN AHASS',M003:'AGEN OWNERSHIP'};
        
     
        
            
        },
        formatUang:function(angka)
        {
           var uang=angka.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1.'); 
           return uang;
        },
        sendSMS:function(telp,msg,nama)
        {
            var options = {
                replaceLineBreaks: false, // true to replace \n by a new line, false by default
                android: {
                    //intent: 'INTENT'  // send SMS with the native android SMS messaging
                    intent: '' // send SMS without open any other app
                }
            };
           sms.hasPermission(function(){
               
            sms.send(telp, msg, options,function(){
                 myApp.hideIndicator();
                myApp.alert("Pesan Anda telah terkirim ke "+nama,"Honda Care",function(){
                    myApp.closeModal('.popup-sms');
                });
            }, function(){
                 myApp.hideIndicator();
                myApp.alert("Pesan Anda gagal terkirim ","Honda Care");
            });
               
               
               
           }, function(){
               myApp.hideIndicator();
               myApp.alert("Proses Pengiriman SMS tidak di ijinkan","Honda Care");
           }); 
            
            
            
            
            
            
        },
        getImage:function(){
            window.imagePicker.getPictures(
            function(results) {
             if(results.length > 0)
             {
                //alert(results[0]);
		//for (var i = 0; i < results.length; i++) {
		$('#previewing').attr('src',results[0]);
                IMGOBJ = results[0];
		//}
                
             }
            }, function (error) {
		alert('Error: ' + error);
            },{
		maximumImagesCount: 1
            }
             );
        },
        uploadImage:function()
        {     
         app.image2Canvas(IMGOBJ,function(data){
             alert(data);
         });
         //alert();
            
        },
        image2Canvas:function(url,callback)
        {            
         var image = new Image();
         image.onload = function () 
         {
         var canvas = document.createElement('canvas');
         
         var lebar=200;
         var tinggi=lebar/image.naturalWidth * image.naturalHeight;
         canvas.width = lebar; // or 'width' if you want a special/scaled size
         canvas.height = tinggi; // or 'height' if you want a special/scaled size
         
         canvas.getContext('2d').drawImage(this, 0, 0,lebar,tinggi);
         var dataURI = canvas.toDataURL();
         callback(dataURI);
         /*
         callback(canvas.toDataURL());
         */
         };
         image.src = url;   
        },
        getFile: function()
        {
            fileChooser.open(function(uri){
                alert(uri)
            }, function(err){
                alert('error')
            });
        },
        detekVersion:function()
        {
         var arrver=device.version.split('.');
         
            if(arrver[0] == "4" && arrver[1] == "4")
            {
	    console.log("termasuk");
            return false;
            }else
            {
	    console.log("tidak termasuk");
            return true;
            }
        },
        uploadProses:function()
        {
            
            var bar = $('.bar');
            var percent = $('.percent');
            //var status = $('#status');
           
            
            //myApp.showIndicator();
            $('#avatar').ajaxForm({
              beforeSend: function() {
                //status.empty();
                var percentVal = '0%';
                bar.width(percentVal)
                percent.html(percentVal);
                },
                 uploadProgress: function(event, position, total, percentComplete) {
                  var percentVal = percentComplete + '%';
                  bar.width(percentVal)
                  percent.html(percentVal);
                },
                 success: function() {
                     var percentVal = '100%';
                     bar.width(percentVal)
                     percent.html(percentVal);
                },
                complete: function(xhr) {
		//status.html(xhr.responseText);
               myApp.hideIndicator();
                myApp.alert(xhr.responseText,"Honda Care",function(){
                   myApp.closeModal('.popup-upload'); 
                   setTimeout(function(){app.reloadDatauser()},1500);
                });
                
                }
            }); 
            
        },
        imagePreview:function()
        {
        $('#panel_upload_submit').hide();    
         $("#file").change(function()
         {     
        $("#message").empty(); // To remove the previous error message
        var file = this.files[0];
        var imagefile = file.type;
        var match= ["image/jpeg","image/png","image/jpg"];
        if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2])))
        {
        $('#previewing').attr('src','img/userdummy.jpg');
        $("#message").html("<p id='error'>Maaf, Tipe file tidak diijinkan</span>");
       
        return false;
        }
        else
        {
        var reader = new FileReader();
        reader.onload = app.imageIsLoaded;
        reader.readAsDataURL(this.files[0]);
        //alert(this.files[0]);
        }
        
        });        
        
        },
        imageIsLoaded:function(e)
        {
           $("#file").css("color","green");
            $('#image_preview').css("display", "block");           
           // 
            $('#previewing').attr('src', e.target.result);           
            
            $('#previewing').attr('width', '200px');
            $('#previewing').css('max-width', '250px'); 
            $('#panel_upload_submit').show();
            //alert(e.target.result);
        },
        getDirectory:function(uri)
        {
            myApp.showIndicator();
            $('.panel_old_version .panel_open').hide();
            $('.panel_old_version .panel_directory').show();
           
           RUNURI=uri;
           
           window.resolveLocalFileSystemURL(uri,app.dirEntry, function(){alert("fail");});
            
        },
        dirEntry:function(fileSystem)
        {
            
        var directoryReader = fileSystem.createReader();
        directoryReader.readEntries(function (entries) {
        var i;
        var str="";
        //var objectType;
        //alert(entries.length)
        
        
        if(RUNURI == cordova.file.externalRootDirectory)
        {}else
        {  
            var newuri = app.prevPath(RUNURI) ;
           str +="<div class='row'>";
           str +="<div class='col-100' style='font-size:14pt'><a href='#' class='button button-small button-fill color-red' onClick=\"app.getDirectory('"+newuri+"')\">Up Level</a></div>";
           str +="</div>";  
        }
        
        
        for (i = 0; i < entries.length; i++) {
            
           
          if(entries[i].isDirectory)
          {
             str +="<div class='row'>";
             str +="<div class='col-100' style='font-size:14pt'><a href='#' onClick=\"app.getDirectory('"+entries[i].toURI()+"')\">"+entries[i].name+"</a></div>";
             str +="</div>";
                     
          }else
          {
              
              
           //str +=entries[i].name+"\n";
         var namafile=entries[i].toURI().split('.') ;
         if(namafile[1] == 'jpg' || namafile[1] == 'png' || namafile[1] == 'jpeg')
         {
              //app.resizedataURL(entries[i].toURI(),100,100,function(newdata)
              //{
              str +="<div class='row'>"; 
              
              str +="<div class='col-100'><img src='"+entries[i].toURI()+"' alt='Honda care' style='max-width:100%' onClick=\"app.putImage('"+entries[i].toURI()+"')\"/></div>"; 
              
             // str +="<div class='col-50'>"+entries[i].name+"</div>";
              str +="</div>";
              //});
         }
          
          }
           
           
           
            }
           
             $('.panel_old_version .panel_directory .isi').html(str);
             myApp.hideIndicator();
             }, function () {
              alert("fail");
                });
           
            
            
        },
        resizedataURL:function(datas, wantedWidth,callback)
       {
        // We create an image to receive the Data URI
        //var img = document.createElement('img');
        var img = new Image();
        // When the event "onload" is triggered we can resize the image.
        img.onload = function()
            {        
                // We create a canvas and get its context.
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                // We set the dimensions at the wanted size.
                var tinggi = wantedWidth/img.naturalWidth * img.naturalHeight;
                
                canvas.width = wantedWidth;
                canvas.height = tinggi;

                // We resize the image with the canvas method drawImage();
                ctx.drawImage(this, 0, 0, wantedWidth, tinggi);

                var dataURI = canvas.toDataURL();
                callback(dataURI);
                /////////////////////////////////////////
                // Use and treat your Data URI here !! //
                /////////////////////////////////////////
            };

        // We put the Data URI in the image's src attribute
        img.src = datas;
       },
       putImage:function(uri)
       {
          $('#image_preview2').css("display", "block");
            $('#previewing2').attr('src', uri);
            $('#previewing2').attr('width', '200px');
            $('#previewing2').css('max-width', '250px');
            
             $('.panel_old_version').show();   
            $('.panel_old_version .panel_open').show();
            $('.panel_old_version .panel_directory').hide();            
         $('.popup-upload div div .panel_new_version').hide();  
       },
       base64ToBlob:function(base64, mime) 
        {
        mime = mime || '';
         var sliceSize = 1024;
        var byteChars = window.atob(base64);
        var byteArrays = [];

            for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
              var slice = byteChars.slice(offset, offset + sliceSize);

             var byteNumbers = new Array(slice.length);
             for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
             }

             var byteArray = new Uint8Array(byteNumbers);

                 byteArrays.push(byteArray);
             }

                  return new Blob(byteArrays, {type: mime});
        },
        reloadDatauser: function()
        {
            jsonp.getDatauser(sukses)
            function sukses(data)
            {
            DATAUSER={};
            DATAUSER=JSON.parse(data);
             // alert(data);
            app.fillDatauser();//online
            }
        },
        prevPath:function (pf)
	{
	  var arr= pf.split('/');
	  var newarr=[];
	   // console.log(arr);
		//console.log(arr.length);
		if(arr[arr.length - 1] == "")
		{
			for(var i =0; i < arr.length - 2  ;i++)
			{
					newarr[i] = arr[i];
			}	
	 
		}else
		{
		    for(var i =0; i < arr.length - 1  ;i++)
			{
					newarr[i] = arr[i];
			}	
		}
		//console.log(newarr);
		var strpath=newarr.join('/');
		return strpath+'/';
	},
        drawStatistik: function()
        {
          
            var awal=$('#myDateAwal').val();
            var akhir=$('#myDateAkhir').val();
            DATEAWAL=awal;
            DATEAKHIR=akhir;
            
            
           var info ="Layanan : <br>";
            info +="<p style='font-size:11px'>";
            info +="<b>per "+moment(awal).format('DD/MM/YYYY')+" - "+moment(akhir).format('DD/MM/YYYY')+"</b><br>";
           
           
          if(typeof STATISTIK.call_send != 'undefined')
          {
            var calling=app.paparkanData(STATISTIK.call_send,STATISTIK.labels);
            var skey1 = calling.skey;
            var snilai1=calling.snilai;            
            HISTORY_CHART1.data.labels=skey1;  
            HISTORY_CHART1.data.datasets[0].data=snilai1;
            HISTORY_CHART1.data.datasets[0].label="Call";
            info +="<i>Total Panggilan :"+STATISTIK.call_send.length+"</i><br>";
            
        }else
        {   
            HISTORY_CHART1.data.datasets[0].data=[];
            HISTORY_CHART1.data.datasets[0].label="Call";
            info +="<i>Total Panggilan :0</i><br>";
        }
          if(typeof STATISTIK.order_done != 'undefined')
          { 
            var calling=app.paparkanData(STATISTIK.order_done,STATISTIK.labels);
            var skey1 = calling.skey;
            var snilai1=calling.snilai;            
            HISTORY_CHART1.data.labels=skey1;  
            HISTORY_CHART1.data.datasets[1].data=snilai1;
            HISTORY_CHART1.data.datasets[1].label="Done";
            info +="<i>Selesai dikerjakan :"+STATISTIK.order_done.length+"</i><br>";
         }else
         {
          
            HISTORY_CHART1.data.datasets[1].data=[];
            HISTORY_CHART1.data.datasets[1].label="Done";
            info +="<i>Selesai dikerjakan :0</i><br>";
         }
           
         if(typeof STATISTIK.order_cancel != 'undefined')
          { 
            var calling=app.paparkanData(STATISTIK.order_cancel,STATISTIK.labels);
            var skey1 = calling.skey;
            var snilai1=calling.snilai;            
            HISTORY_CHART1.data.labels=skey1;  
            HISTORY_CHART1.data.datasets[2].data=snilai1;
            HISTORY_CHART1.data.datasets[2].label="Cancel";
            info +="<i>Batal dikerjakan :"+STATISTIK.order_cancel.length+"</i><br>";
         }else
         {
           
            HISTORY_CHART1.data.datasets[2].data=[];
            HISTORY_CHART1.data.datasets[2].label="Cancel";
            info +="<i>Batal dikerjakan :0</i><br>"; 
         }
            
            HISTORY_CHART1.update();
            info +="</p>";
            $('.history-description').html(info);
            
            //isi table dengan claim_pending
            //claim
            //app.daftarLayanan();
                
        },
        resetStatistik:function(id)
        {
            var ctx = $(id);
	/*var nlabel=["1/5/2018","2/5/2018","3/5/2018","4/5/2018","5/5/2018"];
	var data1=[12, 19, 3, 5, 2, 3];
	var data2=[3, 2, 1, 5, 4, 1];*/
	var nlabel=[];
	var data1=[];
        var data2=[];
        var data3=[];
    HISTORY_CHART1 = new Chart(ctx, {
    type: 'line',
    data: {
        labels: nlabel,
        datasets: [{
            label: '-',
            data: data1, 
            borderColor: "#8ff78f",
            pointBorderColor: "#8ff78f",
            backgroundColor:"#8ff78f",
            borderWidth: 1,
	    fill:false
        },{
            label: '-',
            data: data2, 
            borderColor: "#5ed5f7",
            pointBorderColor: "#5ed5f7",
            backgroundColor:"#5ed5f7",
            borderWidth: 1,
	    fill:false
        },{
            label: '-',
            data: data3, 
            borderColor: "#f57272",
            pointBorderColor: "#f57272",
            backgroundColor:"#f57272",
            borderWidth: 1,
	    fill:false
        }]
    },
    options: {
        responsive: false,
       /* maintainAspectRatio: false,*/
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },display: true,
                  scaleLabel: {
                      display: true,
                       labelString: "Jumlah"
                  }
            }],
			xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: "tanggal"
                        }
                    }],
        }
    }
})
        },
        inArray:function(key,arr)
        {
            var rsl=false;
            for(var i in arr)
            {
                if(key == arr[i])
                {
                    rsl=true;
                    break;
                }
            }
            return rsl;
        },
        arrayIndex:function(key,arr)
        {
            var index=0;
            for(var i in arr)
            {
                if(key == arr[i])
                {
                    index=i;
                    break;
                }
            }
            return index;
        },
        arrayIndexLabel:function(key,arr,label)
        {
            var index=-1;
            for(var i in arr)
            {
                if(key == arr[i][label])
                {
                    index=i;
                    break;
                }
            }
            return index;
        },
        paparkanData:function(data,labels)
        {
            
           var call_send=data;
           // console.log(call_send)
            var skey1=[];
            var snilai1=[];
           
               
           
            
            if(call_send.length > 0)
            {
                for(var i in call_send)
                {
                    var ndate = call_send[i].postdate.split(' ');
                    
                    
                    if(!app.inArray(ndate[0],skey1))
                    {
                     //
                      skey1.push(ndate[0]);
                      snilai1.push(1);
                    }else
                    {
                     var index=app.arrayIndex(ndate[0],skey1);
                      snilai1[index] +=1;
                    }    
                    
                }
                
            } 
            
            var skey2=[];
            var snilai2=[];
            for(var j in labels)
            {
              if(app.inArray(labels[j],skey1))
              {
                 skey2.push(labels[j]);
                 var index=app.arrayIndex(labels[j],skey1);
                  snilai2.push(snilai1[index]);
              }else
              {
                  skey2.push(labels[j]);
                  snilai2.push(0);
              }
            }
            
            var obj={skey:skey2,snilai:snilai2};
            return obj;
        },
        drawStatistikPanggil: function()
        {
            var awal=$('#myDateAwal').val();
            var akhir=$('#myDateAkhir').val();
            
           var info ="Panggilan : <br>";
            info +="<p style='font-size:11px'>";
            info +="<b>per "+moment(awal).format('DD/MM/YYYY')+" - "+moment(akhir).format('DD/MM/YYYY')+"</b><br>";
           
           
          if(typeof STATISTIK.call_send != 'undefined')
          {
            var calling=app.paparkanData(STATISTIK.call_send,STATISTIK.labels);
            var skey1 = calling.skey;
            var snilai1=calling.snilai;            
            HISTORY_CHART1.data.labels=skey1;  
            HISTORY_CHART1.data.datasets[0].data=snilai1;
            HISTORY_CHART1.data.datasets[0].label="Call";
            info +="<i>Total Panggilan :"+STATISTIK.call_send.length+"</i><br>";
            
          }else
          {
            
            HISTORY_CHART1.data.datasets[0].data=[];
            HISTORY_CHART1.data.datasets[0].label="Call";
            info +="<i>Total Panggilan :0</i><br>";
          }
          if(typeof STATISTIK.call_accept != 'undefined')
          { 
            var calling=app.paparkanData(STATISTIK.call_accept,STATISTIK.labels);
            var skey1 = calling.skey;
            var snilai1=calling.snilai;            
            HISTORY_CHART1.data.labels=skey1;  
            HISTORY_CHART1.data.datasets[1].data=snilai1;
            HISTORY_CHART1.data.datasets[1].label="Terima";
            info +="<i>Panggilan diterima :"+STATISTIK.call_accept.length+"</i><br>";
          }else
          {
            
            HISTORY_CHART1.data.datasets[1].data=[];
            HISTORY_CHART1.data.datasets[1].label="Terima";
            info +="<i>Panggilan diterima :0</i><br>";
          }
           
         if(typeof STATISTIK.call_cancel != 'undefined')
          { 
            var calling=app.paparkanData(STATISTIK.call_cancel,STATISTIK.labels);
            var skey1 = calling.skey;
            var snilai1=calling.snilai;            
            HISTORY_CHART1.data.labels=skey1;  
            HISTORY_CHART1.data.datasets[2].data=snilai1;
            HISTORY_CHART1.data.datasets[2].label="Tolak";
            info +="<i>Panggilan ditolak :"+STATISTIK.call_cancel.length+"</i><br>";
         } else
         {
           
            HISTORY_CHART1.data.datasets[2].data=[];
            HISTORY_CHART1.data.datasets[2].label="Tolak";
            info +="<i>Panggilan ditolak :0</i><br>";
         }
            
            HISTORY_CHART1.update();
            info +="</p>";
            $('.history-description').html(info);
            //app.daftarPanggilan();   
        },
        loadDrawStatistik:function(awal,akhir)
        {
        myApp.showIndicator();
        jsonp.getStatistik(awal,akhir,function(data){
            if(data != 'none' || data != 'error')
            {
              
                app.drawStatistik();
                
            }  
            
        });
        },
        daftarLayanan:function()
        {
          var head='<tr>';
          head +='<th class="label-cell">Status</th>'; 
          head +='<th class="label-cell">Nama</th>';          
          head +='<th class="label-cell">Tanggal</th>';
	  head +='<th class="label-cell">Jam</th>'; 
          head +='</tr>';
          $('.history_table_head').html(head);
         
           if(typeof STATISTIK.order_done != "undefined")
           {
               var order_done =STATISTIK.order_done;
                var body='';
               for(var i in order_done)
               {
                body +='<tr>';
                body +='<td class="label-cell" style="background-color:#4caf50"><a href="#" onClick=\'app.openDetail("'+order_done[i].orderid+'")\' style="color:#eee;font-weight:bold">Selesai</a></td>';
                body +='<td class="label-cell">'+order_done[i].username+'</td> '; 
                var tgl=order_done[i].postdate.split(' ');
                
                body +='<td class="label-cell">'+tgl[0]+'</td>';
		body +='<td class="label-cell">'+tgl[1]+'</td>';
                body +='</tr>';
               }
               $('.history_table_body').html(body);
           }
           
           if(typeof STATISTIK.order_cancel != "undefined")
           {
               var order_cancel =STATISTIK.order_cancel;
                var body='';
               for(var i in order_cancel)
               {
                body +='<tr>';
                body +='<td class="label-cell"  style="background-color:#f44336"><a href="#" onClick=\'app.openDetail("'+order_done[i].orderid+'")\' style="color:#eee;font-weight:bold">Batal</a></td>';
                body +='<td class="label-cell">'+order_cancel[i].username+'</td> '; 
                var tgl=order_cancel[i].postdate.split(' ');
                
                body +='<td class="label-cell">'+tgl[0]+'</td>';
		body +='<td class="label-cell">'+tgl[1]+'</td>';
                body +='</tr>';
               }
               $('.history_table_body').append(body);
           }
           
        },
        daftarPanggilan:function()
        {
          var head='<tr>';
          head +='<th class="label-cell">Status</th>'; 
          head +='<th class="label-cell">Nama</th>';          
          head +='<th class="label-cell">Tanggal</th>';
	  head +='<th class="label-cell">Jam</th>'; 
          head +='</tr>';
          $('.history_table_head').html(head);
          
          if(typeof STATISTIK.call_send != "undefined")
           {
               var call_send =STATISTIK.call_send;
                var body='';
             
               for(var i in call_send)
               {
              body +='<tr>';
              body +='<td class="label-cell" colspan="4">'+call_send[i].orderid+'</td>';
              body +='</tr>';
                body +='<tr>';
                body +='<td class="label-cell"  style="background-color:#4caf50"><a href="#" style="color:#eee;font-weight:bold">Send</a></td>';
                body +='<td class="label-cell">'+call_send[i].username+'</td> '; 
                var tgl=call_send[i].postdate.split(' ');                
                body +='<td class="label-cell">'+tgl[0]+'</td>';
		body +='<td class="label-cell">'+tgl[1]+'</td>';
                body +='</tr>';
                
                if(typeof STATISTIK.call_accept != "undefined")
                {
                   var call_accept =STATISTIK.call_accept;
                   var index=app.arrayIndexLabel(call_send[i].orderid,call_accept,'orderid');
                  if(index != -1)
                  {
                   body +='<tr>';
                    body +='<td class="label-cell"  style="background-color:#009688"><a href="#" style="color:#eee;font-weight:bold">Accept</a></td>';
                    body +='<td class="label-cell">'+call_accept[index].username+'</td> '; 
                    var tgl=call_accept[index].postdate.split(' ');                
                    body +='<td class="label-cell">'+tgl[0]+'</td>';
                    body +='<td class="label-cell">'+tgl[1]+'</td>';
                    body +='</tr>';
                  }
                
               }
               
                if(typeof STATISTIK.call_cancel != "undefined")
                {
                    var call_cancel =STATISTIK.call_cancel;
                  var index=app.arrayIndexLabel(call_send[i].orderid,call_cancel,'orderid');
                  if(index != -1)
                  {
                    body +='<tr>';
                    body +='<td class="label-cell"  style="background-color:#ff5722"><a href="#" style="color:#eee;font-weight:bold">Cancel</a></td>';
                    body +='<td class="label-cell">'+call_cancel[index].username+'</td> '; 
                    var tgl=call_cancel[index].postdate.split(' ');                
                    body +='<td class="label-cell">'+tgl[0]+'</td>';
                    body +='<td class="label-cell">'+tgl[1]+'</td>';
                    body +='</tr>';
                }
                }
                
                if(typeof STATISTIK.call_ignore != "undefined")
                {
                     var call_ignore =STATISTIK.call_ignore;
                   var index=app.arrayIndexLabel(call_send[i].orderid,call_ignore,'orderid');
                  if(index != -1)
                  {
                    body +='<tr>';
                    body +='<td class="label-cell"  style="background-color:#f44336"><a href="#" style="color:#eee;font-weight:bold">Ignore</a></td>';
                    body +='<td class="label-cell">'+call_ignore[index].username+'</td> '; 
                    var tgl=call_ignore[index].postdate.split(' ');                
                    body +='<td class="label-cell">'+tgl[0]+'</td>';
                    body +='<td class="label-cell">'+tgl[1]+'</td>';
                    body +='</tr>';
                   }
                }
                
              
                
                if(typeof STATISTIK.call_proses != "undefined")
                {
                     var call_proses =STATISTIK.call_proses;
                   var index=app.arrayIndexLabel(call_send[i].orderid,call_proses,'orderid');
                  if(index != -1)
                  {
                    body +='<tr>';
                    body +='<td class="label-cell"  style="background-color:#8bc34a"><a href="#" style="color:#eee;font-weight:bold">Process</a></td>';
                    body +='<td class="label-cell">'+call_proses[index].username+'</td> '; 
                    var tgl=call_proses[index].postdate.split(' ');                
                    body +='<td class="label-cell">'+tgl[0]+'</td>';
                    body +='<td class="label-cell">'+tgl[1]+'</td>';
                    body +='</tr>';
                }
                }
                
                if(typeof STATISTIK.call_done != "undefined")
                {
                   var call_done =STATISTIK.call_done;
                   var index=app.arrayIndexLabel(call_send[i].orderid,call_done,'orderid');
                  if(index != -1)
                  {
                    body +='<tr>';
                    body +='<td class="label-cell"  style="background-color:#607d8b"><a href="#" style="color:#eee;font-weight:bold">Selesai</a></td>';
                    body +='<td class="label-cell">'+call_done[index].username+'</td> '; 
                    var tgl=call_done[index].postdate.split(' ');                
                    body +='<td class="label-cell">'+tgl[0]+'</td>';
                    body +='<td class="label-cell">'+tgl[1]+'</td>';
                    body +='</tr>';
                }
                }
                
                
                
               }
               
               $('.history_table_body').html(body);
           }
          
        
        },
        setAgenStatus:function()
        {
              // alert('test'+INTERNALDATA.keanggotaan);
         if(INTERNALDATA.keanggotaan != "umum")
         {
               //myApp.popup('.popup-agen-live');
              var st=DATAUSER.users.user_live_status;
              //alert(st);
              if(st == "on")
                 {
                   myApp.popup('.popup-agen-live');
                  }else
                  {
                   jsonp.setAgenLive('cuti','');  
                  }
        }
        },
        openDetail:function(orderid)
        {
            CURORDERID=orderid;
            myApp.popup('.popup-order-detail');
        },
        tambahSP:function()
        {
            var rno = app.getMD5();
            var sp="<tr id='sp_item"+rno+"'>";
            sp +="<td style='width:50%'><input type='text'  style='width:100%' placeholder='Nama Spare Part' name='nama_sp[]'></td>";
            sp +="<td>:</td>";
            sp +="<td style='width:30%'><input type='number' style='width:100%' placeholder='Harga Spare Part' name='harga_sp[]'></td>";
            sp +="<td><a href='#'  onClick=\"app.hapusSP('sp_item"+rno+"')\"><img src='img/hapus.png' /></a></td>";
            sp +="</tr>";
            $('.popup-order-sparepart-body').append(sp);
        },
        tambahSP_M:function()
        {
            var rno = app.getMD5();
            var sp="<tr id='sp_item"+rno+"'>";
            sp +="<td style='width:50%'><input type='text'  style='width:100%' placeholder='Nama Spare Part' name='nama_sp2[]'></td>";
            sp +="<td>:</td>";
            sp +="<td style='width:30%'><input type='number' style='width:100%' placeholder='Harga Spare Part' name='harga_sp2[]'></td>";
            sp +="<td><a href='#' onClick=\"app.hapusSP('sp_item"+rno+"')\"><img src='img/hapus.png' /></a></td>";
            sp +="</tr>";
            $('.manual-order-sparepart-body').append(sp);
        },
        hapusSP:function(obj)
        {
            $('#'+obj).remove();
        },
        gantiSP:function(param)
        {
           DATASP="";
           var arrnama=[];
            $("input[name='nama_sp[]']").map(function(){
               
               arrnama.push($(this).val()); 
                
              }).get();
            
               var arrharga=[];   
              $("input[name='harga_sp[]']").map(function(){
              
               arrharga.push($(this).val());              
                
              }).get(); 
           
         if(arrnama.length > 0)
         {
             var data_sp=[];
              
             for(var i in arrnama)
             {
                if(arrnama[i] == "" || arrharga[i] == "")
                {
                    
                }else
                {   
                 console.log(arrnama[i]+","+arrharga[i]);
                 var spnama=arrnama[i];
                 var spharga=arrharga[i];
                 data_sp.push({nama:spnama,harga:spharga});
                }
             }
            console.log(JSON.stringify(data_sp));
             DATASP = JSON.stringify(data_sp);
             
             jsonp.ubahStatusLayanan(PROSTATUS,'',function(dat){
             PROSTATUS = dat; 
             myApp.closeModal('.popup-order-sparepart');
              }); 
             
         }else
         {
            jsonp.ubahStatusLayanan(PROSTATUS,'',function(dat){
             PROSTATUS = dat; 
             myApp.closeModal('.popup-order-sparepart');
              }); 
         }
           
           
        },
        getSP : function()
        {
             
           var arrnama=[];
            $("input[name='nama_sp2[]']").map(function(){
               
               arrnama.push($(this).val()); 
                
              }).get();
            
               var arrharga=[];   
              $("input[name='harga_sp2[]']").map(function(){
              
               arrharga.push($(this).val());              
                
              }).get(); 
           
         if(arrnama.length > 0)
         {
             var data_sp=[];
              
             for(var i in arrnama)
             {
                if(arrnama[i] == "" || arrharga[i] == "")
                {
                    
                }else
                {   
                 console.log(arrnama[i]+","+arrharga[i]);
                 var spnama=arrnama[i];
                 var spharga=arrharga[i];
                 data_sp.push({nama:spnama,harga:spharga});
                }
             }
           
             
          }
          return data_sp;
        }
        ,
        notifikasiAgen: function(strpesan)
        {
            
        
          var mtype=INTERNALDATA.keanggotaan;
          if(mtype != "umum")
          {
            
            DATAAGEN=strpesan;
             var dat=JSON.parse(strpesan);
             if(app.inArray(dat.orderid,ARRAYORDERID)){
                 
             }else
             {
               ARRAYORDERID.push(dat.orderid);  
             
             
             //window.screenLocker.unlock(function(){ }, function(e){},10);
		
               //bagkground notification
		//cordova.plugins.backgroundMode.moveToForeground();
		setTimeout(function(){
			mainView.router.loadPage("agen_waiting.html");
			app.playNativeSoundLoop('phone1');
                        //app.hidupScreen();
			
			//alert("sound play");
			},1500);
		
		
                
            } //end detek order id
              
          }
            
            
        },
        daftarInvoice:function()
        {
          myApp.hideIndicator();
          var head='<tr><th colspan="4" ><h2>INVOICE</h2></th></tr>';
          head+='<tr>';          
          head +='<th class="label-cell">Pelanggan</th>'; 
          head +='<th class="label-cell">Agen</th>'; 
          head +='<th class="label-cell">Tanggal</th>';
	  head +='<th class="label-cell">Jam</th>'; 
          head +='</tr>';
          $('.history_table_head').html(head);
          
          if(typeof STATISTIK.invoice != "undefined")
           {
               
                var body=''; 
                var invoice=STATISTIK.invoice;
              for(var i in invoice)
                {
                     if(invoice[i].spare_part == "")
                    {
                        console.log("kosong");
                    }
                    else
                    {
                         var sp=invoice[i].spare_part.split('~');
                          var dbarang;
                         for(var j in sp)
                         {
                             dbarang = sp[j].split("=");
                             //       console.log("Nama :"+dbarang[0]+", Harga : Rp "+dbarang[1]);
		   
                         }
                     }
                     
               body += '<tr>';
               body += '<td colspan="4" class="label-cell"  style="background-color:teal"><a href="#" onClick=\'app.openDetail("'+invoice[i].service_order_num+'")\' style="color:#eee;font-weight:bold">'+invoice[i].invoice_no+'</a></td>';              
               body += '</tr>';
               body += '<tr>';
               body +='<td class="label-cell">'+invoice[i].pelanggan+'</td>';
               body += '<td class="label-cell">'+invoice[i].agen+'</td>';  
                var tgl=invoice[i].service_order_register.split(' ');
                
                body +='<td class="label-cell">'+tgl[0]+'</td>';
		body +='<td class="label-cell">'+tgl[1]+'</td>';
               body += '</tr>';
                     
                }
                
              
                
               $('.history_table_body').html(body);
               //myApp.alert(invoice.length);
           }
        },
        cekSpeech:function()
        {
         window.plugins.speechRecognition.isRecognitionAvailable(
            function(available){
              if(available)
              {
                //myApp.alert("diijinkan listening","Honda care");
                app.cekPermission();
              }else
              {
                 // myApp.alert("tidak diijinkan listening","Honda care");
              }
              
            },function(err){
               
              //myApp.alert("Speech tidak dikenali","Honda Care"); 
            })            
        },
        cekPermission:function()
        {
          window.plugins.speechRecognition.hasPermission(function (isGranted){
            if(isGranted){
                   // Do other things as the initialization here
                  // myApp.alert("Siap Mendengar1","Honda care");
                   app.startListening();
              }else{
                    // You need to request the permissions
                    app.mintaPermission();
                }
                }, function(err){
                    console.log(err);
                });  
            
        },
        mintaPermission:function()
        {
            window.plugins.speechRecognition.requestPermission(function (){
        // Requested
       // myApp.alert("Siap Mendengar2","Honda care");
          app.startListening();
            }, function (err){
         // Opps, nope
               });
        },
        startListening:function()
        {
            var settings = {
                  language: "id-ID", matches: 5, prompt: "", showPopup: false
                };
                app.showToast("mendengarkan");
                window.plugins.speechRecognition.startListening(function(result){
                                // By default just 5 options
                // ["Hello","Hallou", "Hellou" ...]
                     
                    var anggota=INTERNALDATA.keanggotaan;
                    if(anggota == "umum")
                    {
                       // alert(result.toString());
                       app.showToast(result.toString());
                       
                    if(PAGEOPEN == "home" || PAGEOPEN == "history")
                    {
                       
                       // app.stopListening();   
                       
                        if(app.inArrayText("mogok",result))
                           mainView.router.loadPage("menulayanan.html?keluhan=mogok");
                        else if(app.inArrayText("ban pecah",result))
                           mainView.router.loadPage("menulayanan.html?keluhan=banpecah");
                       else if(app.inArrayText("bensin habis",result))
                           mainView.router.loadPage("menulayanan.html?keluhan=bensinhabis");
                       else if(app.inArrayText("rem blong",result))
                           mainView.router.loadPage("menulayanan.html?keluhan=remblong");
                       else if(app.inArrayText("rantai putus",result))
                           mainView.router.loadPage("menulayanan.html?keluhan=rantaiputus");
                       else if(app.inArrayText("aki rusak",result))
                           mainView.router.loadPage("menulayanan.html?keluhan=akirusak");
                       else
                           mainView.router.loadPage("menulayanan.html?keluhan="+result[0]);
                       
                       
                         
                    }else if(PAGEOPEN == "menulayanan")
                    {                        
                                                
                        if(SUBPAGEOPEN == "popup-keluhan")
                        {
                            if(app.inArrayText("panggil",result)) 
                            {
                               //app.stopListening(); 
                             app.kirimKeluhan();
                             }else{
                             $('input[name=nopolisi]').val(result[0]);
                             }
                        }else
                        {
                           // app.stopListening();
                            var skey="";
                          if(app.inArrayText("mogok",result))
                           skey="mogok";
                        else if(app.inArrayText("ban pecah",result))
                           skey="banpecah";
                       else if(app.inArrayText("bensin habis",result))
                          skey="bensinhabis";
                       else if(app.inArrayText("rem blong",result))
                           skey="remblong";
                       else if(app.inArrayText("rantai putus",result))
                           skey="rantai putus";
                       else if(app.inArrayText("aki rusak",result))
                           skey="akirusak";
                       else
                           skey=result[0];  
                         
                          app.pilihKeluhan(skey);  
                        }
                        
                    }
                        
                    }else
                    {
                        if(app.inArray("transaksi",result))
                        {
                            //app.stopListening();
                            mainView.router.loadPage("history.html");
                        }
                        
                    }
                     
                     
                //myApp.alert(result.toString(),"Honda Care");
                      }, function(err){
                      app.stopListening();
                    }, settings);
            
        },
        stopListening:function()
        {
            window.plugins.speechRecognition.stopListening(function(){
                     app.showToast("berhenti");
                    }, function(err){
                         console.log(err);
                });
        },
        inArrayText:function(key,arr)
        {
            var rsl=false;
            for(var i in arr)
            {
                var deret=arr[i].toLowerCase();
                var ind = key.toLowerCase();
                var st = deret.search(ind);
                if(st > -1)
                {
                    rsl=true;
                    break;
                }
            }
            return rsl;
        },
        kirimKeluhan:function()
        {
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
            
        },
        showToast:function(msg)
        {
            window.plugins.toast.showWithOptions(
              {
                   message: msg,
                    duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
                    position: "center"
                    
                },
                 function(){}, // optional
                 function(){}    // optional
                 );
            
        },
        data_hc:function(ktp)
        {
       
            var info;
            jsonp.getDataHC(ktp,function(data){
                //$('.shbc_id').html(data);
               if(data == "error" || data == "none")
                {
                    $('.shbc_id').html("tidak ada");
                  
                }else
                {
                    info =JSON.parse(data);
                    var str=info.nama;
                       str +="<br>";
                       str +=info.id_customer_bali;
                       $('.shbc_id').html(str);
                       
                       app.generateQRCode(info.id_customer_bali)
                       
                }
                
            })
        },
        generateQRCode:function(content)
        {
           var options = {width: 256,
                height: 256,	
                colorDark: "#000000",
                colorLight: "#ffffff",
                };

        cordova.plugins.qrcodejs.encode('TEXT_TYPE', content,
        function(decodeImg){
            IDBARCODE=decodeImg;
        },function(err){
            IDBARCODE="";
        },options);

        },
        mapLokasiUser:function(latcenter,loncenter)
        {
            var map;   
                //var marker1;

               // setTimeout(function(latcenter,loncenter){
                 //myApp.panel.close('left');   
                    //-8.495941,115.2449249
                    //alert(DATAUSER.users.user_position);

               /*
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
                */
                //alert(latcenter+','+loncenter)

                myApp.showIndicator(); 
                //$('.pesan').html(plat+","+plng+'<br>');
                var div = document.getElementById("map_canvas5");
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

                     var judul="Posisi bisa digeser";
                     //var snip=snap;
                    // Add a maker
                    
                            
                            
                            map.addMarker({
                            position: {lat: latcenter, lng: loncenter},
                            title: judul,
                            snippet: "Tekan dan geser untuk merubah posisi, ["+latcenter+","+loncenter+"]",
                            icon: { url: 'img/usermarker.png'},
                            draggable:true
                          }, function(marker) {

                                 //set getautocomplete
                                 jsonp.getAutocomplete("#info_alamat","Lokasi Anda",map,marker);
                                 
                                 jsonp.getAddressFromLat(latcenter+","+loncenter,function(addr){                       
                                            $('#info_alamat').val('');
                                            $('#lok_alamat').html(addr);
                                           setTimeout(function(){marker.setSnippet(addr);},1500) 
                                 })
                                 
                                 
                                 

                                  marker.on(plugin.google.maps.event.MARKER_DRAG_END,function(value){
                                     // infouser.latlon_awal = value.lat+","+value.lng;
                                  marker.setSnippet("Tekan dan geser untuk merubah posisi, ["+value.lat+","+value.lng+"]");
                                  jsonp.getAddressFromLat(value.lat+","+value.lng,function(addr){                       
                                            $('#info_alamat').val('');
                                             $('#lok_alamat').html(addr);
                                            setTimeout(function(){marker.setSnippet(addr);},1500)
                                     }) 
                                     
                                     
                                     
                                      CURPOSITION.latitude = value.lat;
                                      CURPOSITION.longitude = value.lng;
                                     marker.showInfoWindow();
                                       })
                                   marker.showInfoWindow();




                          });  
                        
                        
                        
                   
                    
                    
                    
                    
                    


                  });



                });

               // },1500); 
        }

 
};

