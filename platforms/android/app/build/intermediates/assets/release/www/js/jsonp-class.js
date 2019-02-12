jsonp = {
  //server : "https://hondacare.mjsgroups.com/integrasi/",
  //server : "https://dealerhondabali.com/hondacare_apk/integrasi/",
  server : "https://dealerhondabali.com/integrasi/",
   
 
	pendaftaran : function(param)
	{
		//alert(dataString);
		var keanggotaan="";
		var uname="";
		var upass="";
                var ahass="";
		var datas=[];
		for(var i in param)
		{
			datas.push(param[i].col+"="+param[i].val);
			if(param[i].col == "keanggotaan")
				keanggotaan = param[i].val;
			
			if(param[i].col == "name")
				uname = param[i].val;
			
			if(param[i].col == "pass")
				upass = param[i].val;
                        
                        if(param[i].col == "nama_ahass")
				ahass = param[i].val;
			 
		}
		var dataString = datas.join("&");
		//var dataString = "test madman";
		//alert(dataString);
		var server=jsonp.server;
		
		$.ajax({
		type: "POST",
		url:server + "pendaftaran.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
			
		myApp.showIndicator();
					
		},
		success: function(data)
                {
		
		
			
	     if(data.status == "ok")
		  {	
	        //set register
			
	  
            myApp.alert("Proses pendaftaran anda telah Berhasil","Selamat");	  
	    mainView.router.loadPage("thankyou.html?tipe="+keanggotaan+"&uname="+uname+"&upass="+upass+"&ahass="+ahass);
			
		  }else if(data.status == "no")
		  {	
			myApp.alert(data.pesan,"Perhatian");	  
			//mainView.router.loadPage("login.html");  
		  }	 
         
		 //alert(data.pesan);
		  
		  myApp.hideIndicator();
		},
		error : function(err)
		{
		  myApp.hideIndicator();
		  myApp.alert("Maaf,Ada Kesalahan dalam proses Pendaftaran, mohon kontak WA admin di +6282144650639","Perhatian");
		  mainView.router.loadPage("login.html"); 
		},
		dataType:"jsonp"
		});
		
		
	},
	getAhass : function(dataString,callback)
	{
	
		var server=jsonp.server;	
		
		$.ajax({
		type: "POST",
		url:server + "getAhass.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
			
		myApp.showIndicator();
					
		},
		success: function(data){
		myApp.hideIndicator();	
	     if(data.status == "ok")
		  {		          
			callback(data.pesan);			
		  }else
		  {			
			 callback('');
		  }	  
		  
		},
		error : function(err)
		{
		  myApp.hideIndicator();
		  callback('');
		},
		dataType:"jsonp"
		});
		
		
	}
	,
	getWilayah : function(dataString,callback)
	{
	
		var server=jsonp.server;	
		
		$.ajax({
		type: "POST",
		url:server + "getWilayah.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
			
		myApp.showIndicator();
					
		},
		success: function(data){
		myApp.hideIndicator();	
	     if(data.status == "ok")
		  {		          
			callback(data.pesan);			
		  }else
		  {			
			 callback('');
		  }	  
		  
		},
		error : function(err)
		{
		  myApp.hideIndicator();
		  callback('');
		},
		dataType:"jsonp"
		});
		
		
	},
	login:function(dataString,callback)
	{
	   var server=jsonp.server;	
		//alert(dataString);
		$.ajax({
		type: "POST",
		url:server + "login3.php?callback=?",
		timeout:10000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
			
		myApp.showIndicator();
					
		},
		success: function(data){
		myApp.hideIndicator();	
	     if(data.status == "ok")
		  {	
                       var datas="device_id="+DEVICEID;
                       WDOGHANDLE = jsonp.watch_dog(datas);
                       
		       callback(data.status,data.pesan,data.info);			
		  }else
		  {			
                       callback(data.status,data.pesan,data.info); 
		  }	  
		  
		},
		error : function(err)
		{
		  myApp.hideIndicator();
		  callback('no',"Terjadi kesalahan saat proses, mohon kontak admin");
		},
		dataType:"jsonp"
		});
	
	},
	autologin:function(dataString,callback)
	{
	   var server=jsonp.server;	
		//alert(dataString);
		$.ajax({
		type: "POST",
		url:server + "login.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
			
		//myApp.showIndicator();
					
		},
		success: function(data){
		//myApp.hideIndicator();	
	     if(data.status == "ok")
		  {	
                       var datas="device_id="+DEVICEID;
                       WDOGHANDLE = jsonp.watch_dog(datas);
                      
			callback(data.status,data.pesan);			
		  }else
		  {			
			callback(data.status,data.pesan); 
		  }	  
		  
		},
		error : function(err)
		{
		  //myApp.hideIndicator();
		  callback('no',"Terjadi kesalahan saat proses, mohon kontak admin");
		},
		dataType:"jsonp"
		});
	
	},
	forgotpassword:function(dataString)
	{
	   var server=jsonp.server;	
		//alert(dataString);
		$.ajax({
		type: "POST",
		url:server + "forgotpassword.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
			
		myApp.showIndicator();
					
		},
		success: function(data){
		myApp.hideIndicator();	
	     if(data.status == "ok")
		  {		          
		     mainView.router.loadPage("resetpassword.html");				
		  }else
		  {			
			myApp.alert(data.pesan,'Honda Care'); 
		  }	  
		  
		},
		error : function(err)
		{
		  myApp.hideIndicator();
		  myApp.alert("Terjadi kesalahan saat proses, mohon kontak admin","Honda Care");
		},
		dataType:"jsonp"
		});
	
	},
	resetpassword:function(dataString)
	{
	   var server=jsonp.server;	
		//alert(dataString);
		$.ajax({
		type: "POST",
		url:server + "resetpassword.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
			
		myApp.showIndicator();
					
		},
		success: function(data){
		myApp.hideIndicator();	
	     if(data.status == "ok")
		  {	
                       ns.saveData('register','pending');
                       ns.saveData('akun',data.pesan);
                       mainView.router.loadPage("login.html");
		  }else
		  {			
			myApp.alert(data.pesan,'Honda Care');
                        mainView.router.loadPage("forgotpassword.html");
		  }	  
		  
		},
		error : function(err)
		{
		  myApp.hideIndicator();
		  myApp.alert("Terjadi kesalahan saat proses, mohon kontak admin","Honda Care");
		},
		dataType:"jsonp"
		});
	
	},
     watch_dog:function(dataString)
	{
	   var server=jsonp.server;	
		//alert(dataString);
                
		$.ajax({
		type: "POST",
		url:server + "watch_dog.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
					
		},
                success:function(data){
	     
                 setTimeout(function(){ jsonp.watch_dog(dataString)},WDOGTIME);
		},
		error : function(err)
		{
                   setTimeout(function(){ jsonp.watch_dog(dataString)},WDOGTIME);  
		},
		dataType:"jsonp"
		});
	
	},
        prosesKeluhan : function (keluhan,nopolisi)
        {
          mainView.router.loadPage('mintalayanan.html?keluhan='+keluhan+'&nopolisi='+nopolisi);
        },
	getAgen:function(dataString)
	   {
	   var server=jsonp.server;	
		//alert(dataString);
        
        
		$.ajax({
		type: "POST",
		url:server + "getAgen.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
			console.log('scanning');
                         console.log("SCAN "+SCANCOVER+" Km");
                        $('#timelabel').html("SCAN "+SCANCOVER+" Km <br>"+PERSENLOADING.toFixed(0)+" %");
                       
                            
		},
         success:function(data){
		if(data.status == 'ok')
		{	
                        //ARRAGEN=[];
			var index=parseInt(data.index);
			var limit = parseInt(data.limit);
                  console.log(index+"|"+limit);
            //$('#timelabel').html(index+"|"+limit);
	        if(index <= limit)
		    {
			 dataString.index = index;
			 //DINDEX=index;
			 var pesan=JSON.parse(data.pesan);
			 for(var i in pesan)
			 {
			  if(pesan[i].jarak == 'none'){
                              console.log('Re-Scanning '+ index);
                          }else{	 
			    console.log(pesan[i].index+','+pesan[i].jarak+' Km,'+pesan[i].waktu+' Menit,'+pesan[i].nama);
                            ARRAGEN.push({id:pesan[i].id,kode:pesan[i].kode,index:pesan[i].index,jarak:pesan[i].jarak,waktu:pesan[i].waktu,nama:pesan[i].nama});
			  }  
                              
			 }
		 //console.log('arragen :'+ARRAGEN.length);
                       if(index >= limit)
                       {
                          console.log('stop proses dalam');
                          ORDERID=app.getMD5();//
                          PERSENLOADING=0;
                          app.hidupScreen();
                          //app.hitungTimer();//terpakai
                          app.kalkulasiJumlahAgen();
                          
                          
                       }else
                       {
                         
                         console.log("SCAN "+SCANCOVER+" Km ,"+index+"|"+limit);
			 jsonp.getAgen(dataString);
                         PERSENLOADING = index/limit * 100;
                         $('#timelabel').html("SCAN "+SCANCOVER+" Km <br>"+PERSENLOADING.toFixed(0)+" %");
                          
                       }
                          
		    }else
		    {
			 //DINDEX=index;	
			console.log('stop proses luar');
                        //notifikasi agen yang terlibat
                        //app.hitungTimer();
		    }
		 
		}else if(data.status == 'no')
		{
                        app.matiScreen();
			myApp.alert("Maaf tidak agen yang ditemukan","Honda care",function()
                        {
                          mainView.router.loadPage("menulayanan.html");  
                        });
			 console.log('agen kosong');
		}
                 
		},
		error : function(err)
		{
                    console.log('error');
                    jsonp.getAgen(dataString);
		},
		dataType:"jsonp"
		});
	
	},
        kirimNotifikasiHondacare : function(terpilih,uname,upass)
        {
                 /* STATUSAGEN=true;
                    TMDETIK=0;
                    TMMENIT=0;
                    //app.stopNativeSound('phone1');
                    if(SCANCOVER == 5)
                    {
                    app.playNativeSoundLoop('phone1');
                    LOOKUPHANDLE=setTimeout(function(){jsonp.lookupPanggilan();},1000);
                      }
                    app.hitungTimer();
                    */
           
           var dataString = "data="+JSON.stringify(terpilih)+"&username="+uname+"&password="+upass+"&orderid="+ORDERID+"&keluhan="+KELUHAN+"&nopolisi="+NOPOLISI+"&position="+CURPOSITION.latitude+","+CURPOSITION.longitude+"&cover="+SCANCOVER;
            //alert(dataString);
            var server=jsonp.server;        
            
            $.ajax({
		type: "POST",
		url:server + "panggil.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
		console.log('send noti');
                myApp.showIndicator();
		},
         success:function(data){
              
              myApp.hideIndicator();
               console.log(data);
		if(data.status == 'ok')
		{                 
		 
                 
                    STATUSAGEN=true;
                    TMDETIK=0;
                    TMMENIT=0;
                    app.stopNativeSound('phone1');
                    app.playNativeSoundLoop('phone1');
                    //if(SCANCOVER == 5){
                    
                    LOOKUPHANDLE=setTimeout(function(){jsonp.lookupPanggilan();},1000);
                      //}
                    app.hitungTimer();
                   
                   // lookup
                                     
		}else if(data.status == 'no')
		{
                   console.log(data.pesan); 
		}
                 //myApp.alert(data.pesan,"Honda Care");
             
		},
		error : function(err)
		{
                    console.log('error');
                 myApp.hideIndicator();
		},
		dataType:"jsonp"
		});
               
        },
        kirimNotifikasiHondacare2 : function(terpilih,uname,upass,orderid_lama)
        {
                 /* STATUSAGEN=true;
                    TMDETIK=0;
                    TMMENIT=0;
                    //app.stopNativeSound('phone1');
                    if(SCANCOVER == 5)
                    {
                    app.playNativeSoundLoop('phone1');
                    LOOKUPHANDLE=setTimeout(function(){jsonp.lookupPanggilan();},1000);
                      }
                    app.hitungTimer();
                    */
           
           var dataString = "data="+JSON.stringify(terpilih)+"&username="+uname+"&password="+upass+"&orderid="+ORDERID+"&keluhan="+KELUHAN+"&nopolisi="+NOPOLISI+"&position="+CURPOSITION.latitude+","+CURPOSITION.longitude+"&cover="+SCANCOVER+"&orderid_lama="+orderid_lama;
            //alert(dataString);
            var server=jsonp.server;        
            
            $.ajax({
		type: "POST",
		url:server + "panggil.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
		console.log('send noti');
                myApp.showIndicator();
		},
         success:function(data){
              
              myApp.hideIndicator();
               console.log(data);
		if(data.status == 'ok')
		{                 
		 
                 
                    STATUSAGEN=true;
                    TMDETIK=0;
                    TMMENIT=0;
                    app.stopNativeSound('phone1');
                    app.playNativeSoundLoop('phone1');
                    //if(SCANCOVER == 5){
                    
                    LOOKUPHANDLE=setTimeout(function(){jsonp.lookupPanggilan2();},1000);
                      //}
                    //app.hitungTimer();
                   
                   // lookup
                                     
		}else if(data.status == 'no')
		{
                   console.log(data.pesan); 
		}
                 //myApp.alert(data.pesan,"Honda Care");
             
		},
		error : function(err)
		{
                    console.log('error');
                 myApp.hideIndicator();
		},
		dataType:"jsonp"
		});
               
        },//end method
        normalisasiAgen:function(agens,uname,upass)
        {
          var dataString = "data="+JSON.stringify(agens)+"&username="+uname+"&password="+upass+"&orderid="+ORDERID;
          var server=jsonp.server;        
            
            $.ajax({
		type: "POST",
		url:server + "normalisasiagen.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
		
                myApp.showIndicator();
		},
         success:function(data){              
              myApp.hideIndicator();
		},
		error : function(err)
		{                
                 myApp.hideIndicator();
		},
		dataType:"jsonp"
		});
          
        },
        lookupPanggilan:function()
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
             var dataString="";
             if(terpilih2.length > 0)
             {
                 dataString = "data="+JSON.stringify(terpilih2)+"&orderid="+ORDERID;
             }
             
             var server=jsonp.server;        
            
            $.ajax({
		type: "POST",
		url:server + "lookuppanggilan.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
		
                //myApp.showIndicator();
		},
         success:function(data){              
               // myApp.hideIndicator();
                if(data.status == "ok")
                {
                //ditemukan record orderid di service order;
                app.stopNativeSound('phone1');
                TMDETIK=0;
                TMMENIT=0;
                SCANCOVER=SCANCOVERMIN;
                clearTimeout(LOOKUPHANDLE);
                clearTimeout(TIMERHANDLE);
                //goto Agen Terpilih
                //var agendata=JSON.parse(data.pesan);
                mainView.router.loadPage("proses.html?data="+data.pesan);
                
                }else
                {
                LOOKUPHANDLE=setTimeout(function(){jsonp.lookupPanggilan();},2000);
                }
              
		},
		error : function(err)
		{
                 //myApp.hideIndicator();   
                 LOOKUPHANDLE=setTimeout(function(){jsonp.lookupPanggilan();},2000);
		},
		dataType:"jsonp"
		});
             
            
        },
        lookupPanggilan2:function()
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
             
             var dataString="";
             if(terpilih2.length > 0)
             {
                 dataString = "data="+JSON.stringify(terpilih2)+"&orderid="+ORDERID;
             }
             
             var server=jsonp.server;        
            
            $.ajax({
		type: "POST",
		url:server + "lookuppanggilan.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
		
                //myApp.showIndicator();
		},
         success:function(data){              
               // myApp.hideIndicator();
                if(data.status == "ok")
                {
                //ditemukan record orderid di service order;
                app.stopNativeSound('phone1');
                TMDETIK=0;
                TMMENIT=0;
                SCANCOVER=SCANCOVERMIN;
                clearTimeout(LOOKUPHANDLE);
                clearTimeout(TIMERHANDLE);
                //goto Agen Terpilih
                //var agendata=JSON.parse(data.pesan);
                mainView.router.loadPage("proses.html?data="+data.pesan);
                
                }else
                {
                LOOKUPHANDLE=setTimeout(function(){jsonp.lookupPanggilan2();},2000);
                }
              
		},
		error : function(err)
		{
                 //myApp.hideIndicator();   
                 LOOKUPHANDLE=setTimeout(function(){jsonp.lookupPanggilan2();},2000);
		},
		dataType:"jsonp"
		});
             
            
        },
        agenLookup:function(arrdata)
        {
            var server=jsonp.server;        
            var dataString ="orderid="+arrdata['orderid'];
            $.ajax({
		type: "POST",
		url:server + "agenlookup.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
		
                //myApp.showIndicator();
		},
         success:function(data){              
                
                if(data.status == "ok")
                {
                 //ditemukan record orderid di service order;
                
                app.stopNativeSound('phone1');
                TMDETIK=0;
                TMMENIT=0;
                clearTimeout(LOOKUPHANDLE);
                clearTimeout(TIMERHANDLE);
                 myApp.alert("Maaf, Pesanan Layanan Honda Care sudah di Handel oleh Agen lain, Terima kasih sudah bersedia menunggu","Honda Care");
                }else
                {
                LOOKUPHANDLE=setTimeout(function(){jsonp.agenlookup();},1000);
                }
              
		},
		error : function(err)
		{                
                 LOOKUPHANDLE=setTimeout(function(){jsonp.agenlookup();},1000);
		},
		dataType:"jsonp"
		});
        },
        agenTerimaPesanan: function()
        {
          //ahass,mekanik,total,onesignal_id,senderid,acceptid,orderid,nopolisi,keluhan,namaagen,namapelanggan,position,jarak,waktu 
          if(DATAAGEN != ""){
          var arrdata=JSON.parse(DATAAGEN);
           }
           
           if(INTERNALDATA.keanggotaan == "freelance")
           {
           var dataString="data="+JSON.stringify(arrdata)+"&agenhandle="+AGENHANDLE;    
           }else
           { 
           var dataString="data="+JSON.stringify(arrdata)+"&agenhandle="+AGENHANDLE;
           }
           
           
           
            var server=jsonp.server;     
            
            $.ajax({
		type: "POST",
		url:server + "agenterimapesanan.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
		
                myApp.showIndicator();
		},
         success:function(data){              
                myApp.hideIndicator();
                if(data.status == "ok")
                {
                 //ditemukan record orderid di service order;
                
                app.stopNativeSound('phone1');
                TMDETIK=0;
                TMMENIT=0;
                clearTimeout(LOOKUPHANDLE);
                clearTimeout(TIMERHANDLE);
                
                mainView.router.loadPage("proses.html?data="+data.pesan);
                
                }else
                {
                app.stopNativeSound('phone1');
                TMDETIK=0;
                TMMENIT=0;
                clearTimeout(LOOKUPHANDLE);
                clearTimeout(TIMERHANDLE);    
               
                if(data.pesan == "terlayani"){
                myApp.alert("Maaf, Pesanan Layanan Honda Care sudah di Handel oleh Agen lain, Terima kasih sudah bersedia menunggu","Honda Care",function(){
                mainView.router.loadPage("home.html");
                });
                }else if(data.pesan == "tutup")
                {
                myApp.alert("Maaf, Pesanan Layanan Honda Care sudah di tutup oleh Pelanggan sendiri karena menunggu terlalu lama, Mohon lain kali ditanggapi lebih cepat, Terima Kasih","Honda Care",function(){
                mainView.router.loadPage("home.html");    
                });
                 }
               
                }//status no
              
		},
		error : function(err)
		{
                    myApp.hideIndicator();
                 app.stopNativeSound('phone1');
                TMDETIK=0;
                TMMENIT=0;
                clearTimeout(LOOKUPHANDLE);
                clearTimeout(TIMERHANDLE);    
                    
                myApp.alert("Maaf, Pesanan Layanan Honda Care tidak merespon, Terima kasih sudah bersedia menunggu","Honda Care",function(){
                  
                mainView.router.loadPage("home.html");
                });
		},
		dataType:"jsonp"
		});
           
           
           
        },
        agenTolakPesanan: function(alasan)
        {
           //ahass,mekanik,total,onesignal_id,senderid,acceptid,orderid,nopolisi,keluhan,namaagen,namapelanggan,position 
          
            
            
          if(DATAAGEN != ""){
          var arrdata=JSON.parse(DATAAGEN);
           }
           
           var dataString="data="+JSON.stringify(arrdata)+"&alasan="+alasan;
           
            var server=jsonp.server;     
            
            $.ajax({
		type: "POST",
		url:server + "agentolakpesanan.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
		
                myApp.showIndicator();
		},
         success:function(data){              
                myApp.hideIndicator();
                if(data.status == "ok")
                {
                 //ditemukan record orderid di service order;
                
                app.stopNativeSound('phone1');
                TMDETIK=0;
                TMMENIT=0;
                clearTimeout(LOOKUPHANDLE);
                clearTimeout(TIMERHANDLE);
              
                 if(alasan == "Pelanggan Melakukan pembatalan Sendiri")
                 {
                myApp.alert("Maaf, Pengguna telah membatalkan Pesanan secara sepihak, terima kasih telah menunggu","Honda Care",function(){
                        
                        mainView.router.loadPage("home.html");
                 });
                }else{
                mainView.router.loadPage("home.html");
                }
                
                }else
                {
                app.stopNativeSound('phone1');
                TMDETIK=0;
                TMMENIT=0;
                clearTimeout(LOOKUPHANDLE);
                clearTimeout(TIMERHANDLE);    
               
                if(data.pesan == "terlayani"){
                myApp.alert("Pesanan Layanan Honda Care sudah di Handel oleh Agen lain, Terima kasih sudah bersedia menunggu","Honda Care",function(){
                mainView.router.loadPage("home.html");
                });
                }else if(data.pesan == "tutup")
                {
                myApp.alert("Pesanan Layanan Honda Care sudah di tutup oleh Pelanggan sendiri karena menunggu terlalu lama, Terima Kasih","Honda Care",function(){
                mainView.router.loadPage("home.html");    
                });
                 }
               
                }//status no
              
		},
		error : function(err)
		{
                    myApp.hideIndicator();
                 app.stopNativeSound('phone1');
                TMDETIK=0;
                TMMENIT=0;
                clearTimeout(LOOKUPHANDLE);
                clearTimeout(TIMERHANDLE);    
                    
                myApp.alert("Maaf, Pesanan Layanan Honda Care tidak merespon, Terima kasih sudah bersedia menunggu","Honda Care",function(){
                  
                mainView.router.loadPage("home.html");
                });
		},
		dataType:"jsonp"
		});
        },
        tutupPesanan:function(orderid,uname,upass,pilih)
        {
            var server=jsonp.server;
            var strpilih = pilih.join(",");
            var dataString ="orderid="+orderid+"&username="+uname+"&password="+upass+"&agens="+strpilih;
            $.ajax({
		type: "POST",
		url:server + "tutuppesanan.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
		
                myApp.showIndicator();
		},
         success:function(data){            
                
                myApp.hideIndicator();
              
		},
		error : function(err)
		{                
                 myApp.hideIndicator();
		},
		dataType:"jsonp"
		});
        },
        prosesLookup:function()
        {
            var server=jsonp.server;
          
            var dataString ="orderid="+ORDERID;
            $.ajax({
		type: "POST",
		url:server + "proseslookup.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
		
		},
         success:function(data){            
                if(data.status == 'ok')
                {
                    if(INTERNALDATA.keanggotaan == "umum")
                    {
                    $('#prostatus').html("PESANAN :"+ data.pesan);
                    }
                    else{
                        
                        if(data.msg == "done")
                        {
                            PROSTATUS='done';
                        $('#prolanjut').html('Kembali ke Beranda');
                        $('#prostatus').html("PESANAN : SELESAI-DIKERJAKAN");  
                        }else if(data.msg == "progress"){
                            PROSTATUS='proses';
                        $('#prolanjut').html('Lanjutkan untuk Penyelesaian');
                        $('#prostatus').html("PESANAN : DIPROSES");
                         }else if(data.msg == "approve")
                         {
                           PROSTATUS='approve';
                           $('#prolanjut').html('lanjutkan KE PROSES');
                           $('#prostatus').html("PESANAN DITERIMA");
                         }    
                    }
                        
                
                    if(data.msg == "done")
                    {
                      clearTimeout(PROSESHANDLE);
                      SCANCOVER=SCANCOVERMIN;
                      app.playNativeSound('alarm1');
                     if(INTERNALDATA.keanggotaan == "umum")
                     {
                         DATAUSER={};
                         var mail="";
                         if(data.mail == "ok")
                             mail=" Invoice telah Kami kirim ke email Anda,";
                        
                             
                        myApp.alert("Salam satu Hati, Mekanik kami telah menyelesaikan permasalahan anda hari ini,"+mail+" terima kasih telah menggunakan layanan Honda Care","Honda Care",function(){
                            mainView.router.loadPage("home.html");
                        });
                     }else
                     {
                       DATAUSER={};  
                       myApp.alert("Salam satu Hati, Terima Kasih telah memberi Pelayanan terhadap Pelanggan,","Honda Care",function(){
                        mainView.router.loadPage("home.html");
                        });  
                     }
                        
                    }else if(data.msg == "cancel")
                    {
                     clearTimeout(PROSESHANDLE);
                     if(INTERNALDATA.keanggotaan != "umum")
                     {
                        jsonp.agenTolakPesanan("Pelanggan Melakukan pembatalan Sendiri");
                       /* myApp.alert("Maaf, Pengguna telah membatalkan Pesanan secara sepihak, terima kasih telah menunggu","Honda Care",function(){
                        
                        mainView.router.loadPage("home.html");
                        });*/
                     }else
                     {
                        mainView.router.loadPage("home.html"); 
                     }
                        
                    }else if(data.msg == "request_progress")
                    {
                        clearTimeout(PROSESHANDLE);
                       if(INTERNALDATA.keanggotaan == "umum")
                       {
                          myApp.confirm("Agen meminta konfirmasi anda, bahwa masalah Kendaraan anda akan segera dikerjakan, apakah anda menyetujuinya?","Honda Care",function()
                          {
                           jsonp.userUbahStatuslayanan('progress');   
                          },function(){
                            // PROSESHANDLE= setTimeout(function(){jsonp.prosesLookup();},2000); 
                            jsonp.userCancelPermintaan('approve');
                          });
                       }else
                       {
                           PROSESHANDLE= setTimeout(function(){jsonp.prosesLookup();},2000); 
                       }
                
                    }else if(data.msg == "request_done")
                    {
                        clearTimeout(PROSESHANDLE);
                        if(INTERNALDATA.keanggotaan == "umum")
                        {
                            myApp.confirm("Agen meminta konfirmasi anda, bahwa masalah kendaraan sudah teratasi, Apakah Anda Menyetujuinya?","",function()
                            {
                             jsonp.userUbahStatuslayanan('done');   
                            },function(){
                             //PROSESHANDLE= setTimeout(function(){jsonp.prosesLookup();},2000);   
                             jsonp.userCancelPermintaan('progress');
                            });
                            
                        }else
                       {
                           PROSESHANDLE= setTimeout(function(){jsonp.prosesLookup();},2000); 
                       }
                    }else
                    {
                     PROSESHANDLE= setTimeout(function(){jsonp.prosesLookup();},2000);   
                    }
                }else
                {
                   PROSESHANDLE= setTimeout(function(){jsonp.prosesLookup();},2000); 
                }
                
              
		},
		error : function(err)
		{                
                 PROSESHANDLE= setTimeout(function(){jsonp.prosesLookup();},2000);
		},
		dataType:"jsonp"
		});
        },
        ubahStatusLayanan:function(prostatus,mekanik,callback)
        {
            var server=jsonp.server;
            var akun=INTERNALDATA.akun.split(",");
            var uname=akun[0];
            var upass=akun[1];
            var newstatus;
            if(prostatus == "approve")
                newstatus = "proses";
            else if(prostatus == "proses")
                newstatus = "done";
            
            var dataString ="orderid="+ORDERID+"&prostatus="+newstatus+"&username="+uname+"&password="+upass+"&mekanikid="+mekanik+"&deviceid="+DEVICEID+"&data_sp="+DATASP+"&agenhandle="+AGENHANDLE+"&member_type="+INTERNALDATA.keanggotaan;
            
            $.ajax({
		type: "POST",
		url:server + "ubahstatuslayanan.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                  app.playNativeSound('notify1');
                  /*if(data.pesan == 'proses')
                  {
                      
                      
                  $('#prolanjut').html('Lanjutkan untuk Penyelesaian');
                  $('#prostatus').html("PESANAN : DIPROSES");
                  
                  
                  }
                  else if(data.pesan == 'done')
                  {
                  $('#prolanjut').html('Kembali ke Beranda');
                  $('#prostatus').html("PESANAN : SELESAI-DIKERJAKAN");
                  }
                  */
                  myApp.alert("Anda telah meminta perubahan status ke "+data.pesan+" mohon tunggu konfirmasi dari Pengguna","Honda Care",function(){
                      
                      callback(data.pesan);
                  });
                  
                }else
                {
                  app.playNativeSound('notify');
                  myApp.alert("Maaf, Status Layanan tidak bisa diubah ke "+data.pesan+". Karena ada kesalahan proses.","Honda Care",function(){
                      callback('gagal');
                  }) 
                }
                
              
		},
		error : function(err)
		{ 
                  app.playNativeSound('notify');   
                 myApp.hideIndicator("Maaf, Koneksi data terputus, mohon kontak admin","Honda Care",function(){
                      callback('gagal');
                 });
                 
		},
		dataType:"jsonp"
		});
        },
        remoteConfig: function(callback)
        {
            var server=jsonp.server;
            
            var dataString ="";
            $.ajax({
		type: "POST",
		url:server + "remoteconfig.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                 
                 callback(JSON.parse(data.pesan));
                }else
                {
                 callback('') ;
                }
                
              
		},
		error : function(err)
		{ 
                myApp.hideIndicator(); 
                callback('error') ; 
		},
		dataType:"jsonp"
		});
        },
        getDatauser:function(callback)
        {
            var server=jsonp.server;
            
            var akun=INTERNALDATA.akun.split(',');
            var uname=akun[0];
            var upass=akun[1];
            var dataString ="uname="+uname+"&upass="+upass+"&deviceid="+DEVICEID;
            //console.log(dataString);
            $.ajax({
		type: "POST",
		url:server + "datauser.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                 callback(data.pesan);                 
                }else
                {
                 callback('none');
                }
                
              
		},
		error : function(err)
		{ 
                myApp.hideIndicator(); 
                 callback('error');
		},
		dataType:"jsonp"
		});
        },
        getMekanik:function(prostatus,ahass_code,callback)
        {
            var server=jsonp.server;
            
                
            var dataString ="prostatus="+prostatus+"&ahass_code="+ahass_code;
            //console.log(dataString);
            $.ajax({
		type: "POST",
		url:server + "getmekanik.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                 callback(data.pesan);                 
                }else
                {
                 callback('none');
                }
                
              
		},
		error : function(err)
		{ 
                myApp.hideIndicator(); 
                 callback('error');
		},
		dataType:"jsonp"
		});
        },
        uploadImageBlob:function(base64)
        {
            
          var server =jsonp.server + "fileuploadbase64.php";
            $('#status2').html('progress');
            var akun=INTERNALDATA.akun.split(',');
            
           $.post( server , { username: akun[0], password: akun[1],file:base64 })
            .done(function( data ) {
                myApp.hideIndicator();
                $('#status2').html(data);
                myApp.alert("Photo profile telah berhasil diunggah","Honda Care",function(){
                    myApp.closeModal('.popup-upload');
                    setTimeout(function(){app.reloadDatauser()},1500);
                })
              }) .fail(function() {
                  myApp.hideIndicator();
                 $('#status2').html('error');
                  myApp.alert("Gagal mengunggah photo profile","Honda Care",function(){
                    myApp.closeModal('.popup-upload');
                   
                })
           });
            
        },
        userUbahStatuslayanan:function(pstatus)
        {
            var server=jsonp.server;
            
            
            var dataString ="orderid="+ORDERID+"&prostatus="+pstatus+"&agenhandle="+AGENHANDLE;
            
            $.ajax({
		type: "POST",
		url:server + "userubahstatuslayanan.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                  //app.playNativeSound('notify1');
                  PROSESHANDLE= setTimeout(function(){jsonp.prosesLookup();},2000); 
                }else
                {
                  //app.playNativeSound('notify');
                  myApp.alert("Maaf, Status Layanan tidak bisa diubah ke "+data.pesan+". Karena ada kesalahan proses.","Honda Care",function(){
                  PROSESHANDLE= setTimeout(function(){jsonp.prosesLookup();},2000); 
                  }) 
                }
                
              
		},
		error : function(err)
		{ 
                // app.playNativeSound('notify');   
                 myApp.hideIndicator("Maaf, Koneksi data terputus, mohon kontak admin","Honda Care",function(){
                  PROSESHANDLE= setTimeout(function(){jsonp.prosesLookup();},2000); 
                 });
                 
		},
		dataType:"jsonp"
		});
        },
        getStatistik:function(awal,akhir,callback)
        {
            var server=jsonp.server;
            
            var akun=INTERNALDATA.akun.split(',');
            
            var dataString ="uname="+akun[0]+"&upass="+akun[1]+"&awal="+awal+"&akhir="+akhir;
            
            $.ajax({
		type: "POST",
		url:server + "statistik.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                  
                  STATISTIK=JSON.parse(data.pesan);
                  //console.log(STATISTIK); 
                  callback(data.pesan);
                }else
                {
                   callback('none');
                }
                
              
		},
		error : function(err)
		{ 
                 myApp.hideIndicator();   
                 callback('error');
                 
		},
		dataType:"jsonp"
		});
            
        },
        pengajuanKlaim:function(ids,total)
        {
            //`id`, `claim_ids`, `claim_request`, `claim_release`, `claim_saldo`, `user_id`, `postdate`, `status`
             var server=jsonp.server;
            
            var akun=INTERNALDATA.akun.split(',');
            
            var dataString ="uname="+akun[0]+"&upass="+akun[1]+"&ids="+ids+"&total="+total;
            //alert(dataString)
            
            $.ajax({
		type: "POST",
		url:server + "pengajuanklaim.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                 myApp.alert(data.pesan,"Honda Care",function(){
                 myApp.closeModal('.popup-pengajuan-klaim');
                 });
                }else
                {
                  myApp.alert(data.pesan,"Honda Care");
                }
                
              
		},
		error : function(err)
		{ 
                 myApp.hideIndicator();   
                  myApp.alert("Maaf, koneksi internet terputus ditengah proses, mohon ulangi lagi","Honda Care");              
		},
		dataType:"jsonp"
		});
            
        },
        userCancelPermintaan:function(pstatus)
        {
             var server=jsonp.server;
            
            
            var dataString ="orderid="+ORDERID+"&prostatus="+pstatus;
            
            $.ajax({
		type: "POST",
		url:server + "usercancelpermintaan.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                  //app.playNativeSound('notify1');
                // myApp.Alert(""); 
                PROSESHANDLE= setTimeout(function(){jsonp.prosesLookup();},2000);
                }else
                {
                  //app.playNativeSound('notify');
                  myApp.alert("Maaf, Status Layanan tidak bisa diubah . Karena ada kesalahan proses.","Honda Care",function(){
                 PROSESHANDLE= setTimeout(function(){jsonp.prosesLookup();},2000);
                  }) 
                }
                
              
		},
		error : function(err)
		{ 
                // app.playNativeSound('notify');   
                 myApp.hideIndicator("Maaf, Koneksi data terputus, mohon kontak admin","Honda Care",function(){
                  PROSESHANDLE= setTimeout(function(){jsonp.prosesLookup();},2000);
                 });
                 
		},
		dataType:"jsonp"
		});
        },
        getAddressFromLat:function(latlon,callback)
        {
            var server=jsonp.server;
            
            
            var dataString ="latlon="+latlon;
            
            $.ajax({
		type: "POST",
		url:server + "getAddressFromLat.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                callback(data.address);
                }else
                {
                 callback('');
                }
                
              
		},
		error : function(err)
		{ 
                    myApp.hideIndicator();
                callback('');
		},
		dataType:"jsonp"
		});
            
        },
        getLatFromAddress:function(address,callback)
        {
            var server=jsonp.server;
            
            
            var dataString ="address="+address;
            
            $.ajax({
		type: "POST",
		url:server + "getLatFromAddress.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                callback(data.latlon);
                }else
                {
                 callback('');
                }
                
              
		},
		error : function(err)
		{ 
                    myApp.hideIndicator();
                callback('');
		},
		dataType:"jsonp"
		});
            
        },
        setAgenLive:function(pstatus,alasan)
        {
            var server=jsonp.server;
            var akun=INTERNALDATA.akun.split(',');
            var dataString ="pstatus="+pstatus+"&alasan="+alasan+"&uname="+akun[0]+"&upass="+akun[1];
            var proses=false;
            if(pstatus == "on")
            {
            if(alasan != "" && alasan.length > 5)
            {  
              proses = true;  
            }else
            {
                
                myApp.alert("Mohon berikan alasan permohonan penutupan layanan","Honda Care");
            } 
            }else
            {
                proses=true;
            }
            
            if(proses){
            $.ajax({
		type: "POST",
		url:server + "setagenlive.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                 if(pstatus != "on")
                 {
                  $('.panel_profile #panel_status').html("Status : ON").css({'background-color':'green','color':'#eee'});
                  DATAUSER.users.user_live_status="on";
                  //myApp.closeModal('.popup-agen-live');
                 }
                 else
                 {
                    myApp.alert(data.pesan,"Honda Care",function(){
                       // DATAUSER.users.user_live_status="cuti";
                       // $('.panel_profile #panel_status').html("Status : ON").css({'background-color':'green','color':'#eee'});
                       //  $('.panel_profile #panel_status').html("Status : CUTI").css({'background-color':'gray','color':'#eee'});
                        myApp.closeModal('.popup-agen-live');
                    }); 
                 }
                 
                 
                 
                }else
                {
                  myApp.alert("Permintaan penutupan Layanan sudah gagal diajukan, kemungkinan masalah koneksi internet","Honda Care");   
                }
                
              
		},
		error : function(err)
		{ 
                    myApp.hideIndicator();
                    myApp.alert("Permintaan penutupan Layanan sudah gagal diajukan, kemungkinan masalah koneksi internet","Honda Care"); 
		},
		dataType:"jsonp"
		}); 
                
        }   
                
        },
        setAgenLokasi:function(latlon)
        {
             var server=jsonp.server;
            var akun=INTERNALDATA.akun.split(',');
            var dataString ="latlon="+latlon+"&uname="+akun[0]+"&upass="+akun[1];
            
                  
             // alert(dataString)  
            
            
            $.ajax({
		type: "POST",
		url:server + "setagenlokasi.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                  app.reloadDatauser();
                  myApp.alert("Selamat, Lokasi anda sekarang telah dirubah ke :"+latlon,"Honda Care");                
                  
                }else
                {
                  myApp.alert("Maaf, informasi lokasi anda gagal diperbaharui","Honda Care");   
                }
                
              
		},
		error : function(err)
		{ 
                    myApp.hideIndicator();
                    myApp.alert("Maaf, Ada kesalahan dalam proses kemungkinan masalah koneksi internet","Honda Care"); 
		},
		dataType:"jsonp"
		}); 
              
            
        },
        setAgenLokasi2:function(latlon)
        {
             var server=jsonp.server;
            var akun=INTERNALDATA.akun.split(',');
            var dataString ="latlon="+latlon+"&uname="+akun[0]+"&upass="+akun[1];
            
                  
              //alert(dataString)  
            
            
            $.ajax({
		type: "POST",
		url:server + "setagenlokasi.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                                  
                  
                }else
                {
                    
                }
                
              
		},
		error : function(err)
		{ 
                    myApp.hideIndicator();
                     
		},
		dataType:"jsonp"
		}); 
              
            
        },
        getProfil:function()
        {
            var server=jsonp.server;
           var akun=INTERNALDATA.akun.split(',');
            var dataString ="uname="+akun[0]+"&upass="+akun[1];
            
           
            $.ajax({
		type: "POST",
		url:server + "getprofil.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                 //nama,alamat,sid,email,mobile
                 var info = JSON.parse(data.pesan);
                 //alert(data.pesan);
                 if(typeof info.namalengkap != 'undefined')
                 $('input[name=p_nama').val(info.namalengkap);
                 else
                 $('input[name=p_nama').val(info.name);    
                  
                 $('input[name=p_sametonid').val(info.sameton_honda_id);
                 $('input[name=p_alamat').val(info.user_description);
                 $('input[name=p_email').val(info.email);
                 $('input[name=p_mobile').val(info.mobile);
                 $('input[name=ktp').val(info.ktp);
                 
                }else
                {
                  myApp.alert("Maaf, informasi anda gagal didapatkan","Honda Care");   
                }
                
              
		},
		error : function(err)
		{ 
                    myApp.hideIndicator();
                    myApp.alert("Maaf, Ada kesalahan dalam proses kemungkinan masalah koneksi internet","Honda Care"); 
		},
		dataType:"jsonp"
		}); 
        },
        setProfil:function(data)
        {
            var str='';
            for(var i in data)
            {
                str +='&'+i+'='+data[i];
            }
            
            
            var server=jsonp.server;
            var akun=INTERNALDATA.akun.split(',');
            var dataString ="uname="+akun[0]+"&upass="+akun[1]+str;
            //alert(dataString);
            
            $.ajax({
		type: "POST",
		url:server + "setprofil.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                  app.reloadDatauser();
                  myApp.alert("Selamat, Informasi Pribadi Anda sudah di Simpan","Honda Care");                
                  
                }else
                {
                  myApp.alert("Maaf, informasi anda gagal diperbaharui","Honda Care");   
                }
                
              
		},
		error : function(err)
		{ 
                    myApp.hideIndicator();
                    myApp.alert("Maaf, Ada kesalahan dalam proses kemungkinan masalah koneksi internet","Honda Care"); 
		},
		dataType:"jsonp"
		});
               
               
        },
        getOrderDetail:function(orderid,callback)
        {
            var server=jsonp.server;
            var dataString ="orderid="+orderid;
           //alert(dataString);
           
            $.ajax({
		type: "POST",
		url:server + "getorderdetail.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                 callback(data.pesan);
                  
                }else
                {
                  callback("none")   
                }
                
              
		},
		error : function(err)
		{ 
                   callback("error"); 
		},
		dataType:"jsonp"
		});
                
        },
        getKlaim2Konfirm:function(callback)
        {
           var server=jsonp.server;
           var akun=INTERNALDATA.akun.split(',');
            var dataString ="uname="+akun[0]+"&upass="+akun[1];
           //alert(dataString);
           
            $.ajax({
		type: "POST",
		url:server + "getklaim2konfirm.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                 callback(data.pesan);
                  
                }else
                {
                  callback("none")   
                }
                
              
		},
		error : function(err)
		{ 
                   callback("error"); 
		},
		dataType:"jsonp"
		}); 
        },
        setUserKlaimKonfirm:function(klaimid)
        {
           
           myApp.confirm("Apakah Benar anda akan menyetujui Klaim Pembayaran No: "+klaimid+" ?","Honda Care",function(){
             
              var server=jsonp.server;
            var dataString ="klaimid="+klaimid;
           //alert(dataString);
           
            $.ajax({
		type: "POST",
		url:server + "setuserklaimkonfirm.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                DATAUSER={};
                 myApp.alert("Anda Telah menyetujui, bahwa klaim anda sudah dilunasi","Honda Care",function(){
                 //app.reloadDatauser();
                 app.loadDrawStatistik(DATEAWAL,DATEAKHIR);
                 myApp.closeModal('.popup-konfirmasi-klaim');
                 });
                  
                }else
                {
                 myApp.alert("Maaf, Anda gagal menyetujui, mohon kontak admin","Honda Care",function(){
                    myApp.closeModal('.popup-konfirmasi-klaim'); 
                 }) 
                }
                
              
		},
		error : function(err)
		{ 
                   myApp.hideIndicator();
                   myApp.alert("Kesalahan terjadi, kemungkinan koneksi terputus","Honda Care",function(){
                     myApp.closeModal('.popup-konfirmasi-klaim');   
                   })
		},
		dataType:"jsonp"
		});
               
               
           })
            
            
            
               
        },
        agenMonitoringCall:function()
        {
            //cek status sendiri harus ON
            //cek order history ada send/send2/send3 ada 
            //alert(WAKTUAGEN);
            
            if(WAKTUAGEN == "")
            {
             var dt=new Date();
            
             var bulan=dt.getMonth()+1;
             
             
             WAKTUAGEN =dt.getFullYear()+"-"+bulan+"-"+dt.getDate()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
            }
            
            
            var server=jsonp.server;
            var akun=INTERNALDATA.akun.split(',');
            var dataString ="uname="+akun[0]+"&upass="+akun[1]+"&waktuagen="+WAKTUAGEN+"&mposition="+MONITORPOSITION+"&agenhandle="+AGENHANDLE;
           //alert(dataString);
           
            $.ajax({
		type: "POST",
		url:server + "agenmonitoring.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                   // myApp.showIndicator();
                   $('#home_test_value').html('loading');
                   $('#home_test_value2').html('loading');
                  console.log('loading');
		},
         success:function(data){ 
             
                //myApp.hideIndicator();
                if(data.status == 'ok')
                {
                 // console.log(data.pesan);
                 $('#home_test_value').html('..calling..'); 
                 $('#home_test_value2').html('..calling..');  
                 app.notifikasiAgen(data.pesan);
                  var data=JSON.parse(data.pesan); 
                  WAKTUAGEN=data.waktubaru;
                  
                 // 
                
                 
                  
                }else
                {
                 // console.log(data.pesan);
                  $('#home_test_value').html('pending '+WAKTUAGEN);
                   $('#home_test_value2').html('pending '+WAKTUAGEN);
                }
               //alert(WAKTUAGEN);
               
               console.log(WAKTUAGEN);
               //$('#home_test_value').html('idle');
               //console.log(WAKTUAGEN);
               AGENMONITORHANDLE=setTimeout(function(){jsonp.agenMonitoringCall()},5000);
		},
		error : function(err)
		{ 
                $('#home_test_value').html('idle');
                $('#home_test_value2').html('idle');
                AGENMONITORHANDLE=setTimeout(function(){jsonp.agenMonitoringCall()},5000); 
		},
		dataType:"jsonp"
		});
            
            
            
        },
        agenCancelOrder:function()
        {
            var server=jsonp.server;
           
            var dataString ="orderid="+ORDERID;
           //alert(dataString);
           
            $.ajax({
		type: "POST",
		url:server + "agencancelorder.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                  myApp.showIndicator();
                  
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                
                 mainView.router.loadPage("home.html")
                  
                }else
                {
                 myApp.alert("Pembatalan di tolak","Honda Care");
                }
               
		},
		error : function(err)
		{ 
                 myApp.hideIndicator();
                 myApp.alert("Maaf, ada kesalahan sewaktu proses");
		},
		dataType:"jsonp"
		}); 
        },
        getMapPolyline : function(map,start,end)
        {
	var server=jsonp.server;
	
	var dataString = "start="+start+"&end="+end;
	//alert(dataString);
	
	$.ajax({
		type: "POST",
		url:server + "getPolyline.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
			
		myApp.showIndicator()
					
		},
		success: function(data)
		{
		
		myApp.hideIndicator();
			
	     if(data.status == "ok")
		  {			
	       //alert(data.pesan);
		   var poly=data.titik;
           var alamat =data.alamat;
           var posisi=data.posisi;
		   var jeda=data.pesan;
           
		   poly = poly.replace(/\//g,"\\");
           var JALUR=[];
	     var strdec=polyline.decode(poly);
	   
	    for(var i in strdec)
		{
		  JALUR.push({lat:strdec[i][0],lng:strdec[i][1]});		
		}
		   
           //console.log(poly);
           //console.log(alamat);
           //console.log(posisi);		   
		   //console.log(JALUR);
		   
		   map.addPolyline({
			points:JALUR,
			'color':'#AA00FF',
			'width':4,
			'geodesic': true
			
			});
            
            
	
    	//alert(arrlatlon.length);		
		   
		  }else
		  {			
			 myApp.alert(data.pesan,"Honda Care");
		  }	  
		  // setTimeout(function(){ app.hideDialogInfo('.alert-info') }, 3000);
		},
		error : function(err)
		{
		myApp.hideIndicator();
		 myApp.alert("koneksi internet lelet","Honda Care");
		},
		dataType:"jsonp"
		});
		
	
        },
        getDataHC:function(ktp,callback)
        {
            var server=jsonp.server;
            
            
            var dataString ="ktp="+ktp;
            //console.log(dataString);
            $.ajax({
		type: "POST",
		url:server + "data_hc.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                 callback(data.pesan);                 
                }else
                {
                 callback('none');
                }
                
              
		},
		error : function(err)
		{ 
                myApp.hideIndicator(); 
                 callback('error');
		},
		dataType:"jsonp"
		});
        },       
        getPlatno2lok:function(callback)
        {
            var server=jsonp.server;
            
            var akuns=INTERNALDATA.akun;
            var akun=akuns.split(',');
            var dataString ="uname="+akun[0]+"&upass="+akun[1];
            //console.log(dataString);
            $.ajax({
		type: "POST",
		url:server + "platno2lok.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                
                if(data.status =="ok")
                {
                
                
                   
                
                        var arrplat=[];
                        arrplat = JSON.parse(data.pesan)
                        var options="";
                        if(arrplat.length > 0)
                        {
                            for(var i in arrplat)
                            {
							  
				var motor = arrplat[i].split('~');
				var motor_label = motor[1]+" "+motor[0]+" "+motor[2];
				var motor_data = arrplat[i];
							  
                               if(i == 0)
                                    options +="<option value='"+motor_data+"' selected>"+motor_label+"</option>";
                                else
                                    options +="<option value='"+motor_data+"'>"+motor_label+"</option>";
                                
                             
                     
                           }

                        }else
                        {
                            options = "<option value='none' selected>Belum ada Data Kendaraan</option>";
                        }
                        $('#lok_platno').html(options);
						
						callback('ok');

                 }else{
					 callback('no');
				 }
              
		},
		error : function(err)
		{ 
                myApp.hideIndicator(); 
				callback('no');
                 
		},
		dataType:"jsonp"
		});
                
        },
		simpanDataMotorBaru : function(strdata)
		{
			 var server=jsonp.server;
            
            var akuns=INTERNALDATA.akun;
            var akun=akuns.split(',');
            var dataString ="uname="+akun[0]+"&upass="+akun[1]+"&"+strdata;
            //console.log(dataString);
            $.ajax({
		type: "POST",
		url:server + "simpandatamotorbaru.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                
                if(data.status =="ok")
                {
					//jsonp.getPlatno2lok(function(dat){});
					
					myApp.alert(data.pesan,"Honda Care",function(){
					//myApp.closeModal('.popup-tambahdata-kendaraan');
                                        mainView.router.loadPage("lokasiuser.html?datamotor=true");
					});
					
                }else
				{
					myApp.alert(data.pesan,"Perhatian");
				}
              
		},
		error : function(err)
		{ 
                myApp.hideIndicator(); 
				myApp.alert("Ada Kesalahan selama proses!","Perhatian");
                 
		},
		dataType:"jsonp"
		});
			
		},
                editDataMotorBaru : function(strdata)
		{
			 var server=jsonp.server;
            
            var akuns=INTERNALDATA.akun;
            var akun=akuns.split(',');
            var dataString ="uname="+akun[0]+"&upass="+akun[1]+"&"+strdata;
            //console.log(dataString);
           // myApp.alert(dataString)
            
            $.ajax({
		type: "POST",
		url:server + "editdatamotorbaru.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                
                if(data.status =="ok")
                {
					//jsonp.getPlatno2lok(function(dat){});
					
					myApp.alert(data.pesan,"Honda Care",function(){
					//myApp.closeModal('.popup-tambahdata-kendaraan');
                                        mainView.router.loadPage("lokasiuser.html?datamotor=true");
					});
					
                }else
		{
					myApp.alert(data.pesan,"Perhatian");
		}
              
		},
		error : function(err)
		{ 
                myApp.hideIndicator(); 
				myApp.alert("Ada Kesalahan selama proses!","Perhatian");
                 
		},
		dataType:"jsonp"
		});
			
		},
             getAutocomplete:function(elementid,ph,map,marker)
                    {
                     var server=jsonp.server;
                     var map=map;                     
                     var marker1=marker;
                     
                     var autocompleteDropdownAjax = myApp.autocomplete({
                    input: elementid,
                    openIn: 'dropdown',
                    preloader: true, //enable preloader
                    valueProperty: 'id', //object's "value" property name
                    textProperty: 'name', //object's "text" property name
                    limit: 20, //limit to 20 results
                    dropdownPlaceholderText: ph,
                    expandInput: true, // expand input
                     onChange: function(value, autocomplete) {
                       
                            ///driver start
                        var origin = autocomplete;   
                        if(origin != "")
                         {
                         jsonp.getLatFromAddress(origin,function(data){
                         if(data != '')
                         {
                          
                         var latlon=data.split(',');


                            map.animateCamera({
                                 target: {lat: latlon[0], lng: latlon[1]},
                                zoom: 12,
                                 tilt: 0,
                                bearing: 0,
                                  duration: 1000
                                }, function() {

                                  CURPOSITION.latitude = latlon[0];
                                  CURPOSITION.longitude = latlon[1];
                                   marker1.setSnippet(origin);
                                   $('#lok_alamat').html(origin);
                                   $('#info_alamat').val('');
                                   marker1.setPosition({lat: latlon[0], lng: latlon[1]});
                                   marker1.showInfoWindow();



                                }) 

                         }else
                         {
                           myApp.alert("Lokasi tidak ditemukan","Perhatian");   
                         }

                     })
                 }
                 else
                 {
                     myApp.alert("Lokasi tidak terdaftar","Perhatian");
                 }  
                          ////////////////////end start  

                        

                                  },
                    source: function (autocomplete, query, render) {
                        var results = [];
                        if (query.length === 0) {
                            render(results);
                            return;
                        }
                        // Show Preloader
                        autocomplete.showPreloader();
                        // Do Ajax request to Autocomplete data
                        $$.ajax({
                            url: server + 'getAutocomplete.php',
                            method: 'GET',
                            dataType: 'json',
                            //send "query" to server. Useful in case you generate response dynamically
                            data: {
                                query: query
                            },
                            success: function (data) 
                            {
                                // Find matched items
                                for (var i = 0; i < data.length; i++) 
                                {
                                    if (data[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
                                }
                                // Hide Preoloader
                                autocomplete.hidePreloader();
                                // Render items by passing array with result items
                                if(results.length == 0)
                                {
                                    
                                        $('#btn_continue').show();

                                }else
                                {
                                        $('#btn_continue').hide();
                                }



                                render(results);
                            }
                        });
                    }
                });

              },
              getMotorType:function(elementid)
                    {
                     var server=jsonp.server;
                    
                     
                     var autocompleteDropdownAjax = myApp.autocomplete({
                    input: elementid,
                    openIn: 'dropdown',
                    preloader: true, //enable preloader
                    valueProperty: 'id', //object's "value" property name
                    textProperty: 'name', //object's "text" property name
                    limit: 20, //limit to 20 results
                    dropdownPlaceholderText: "Pilih Model Motor",
                    expandInput: true, // expand input
                     onChange: function(value, autocomplete) {
                       
                            ///driver start
                         
                       

                                  },
                    source: function (autocomplete, query, render) {
                        var results = [];
                        if (query.length === 0) {
                            render(results);
                            return;
                        }
                        // Show Preloader
                        autocomplete.showPreloader();
                        // Do Ajax request to Autocomplete data
                        $$.ajax({
                            url: server + 'getMotorType.php',
                            method: 'GET',
                            dataType: 'json',
                            //send "query" to server. Useful in case you generate response dynamically
                            data: {
                                query: query
                            },
                            success: function (data) 
                            {
                                // Find matched items
                                for (var i = 0; i < data.length; i++) 
                                {
                                    if (data[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
                                }
                                // Hide Preoloader
                                autocomplete.hidePreloader();                               



                                render(results);
                            }
                        });
                    }
                });

              },
              getMotorWarna:function(elementid)
                    {
                     var server=jsonp.server;
                    // myApp.alert(elementid)
                    
                     
                     var autocompleteDropdownAjax = myApp.autocomplete({
                    input: elementid,
                    openIn: 'dropdown',
                    preloader: true, //enable preloader
                    valueProperty: 'id', //object's "value" property name
                    textProperty: 'name', //object's "text" property name
                    limit: 20, //limit to 20 results
                    dropdownPlaceholderText: "Pilih Warna Motor",
                    expandInput: true,
                    source: function (autocomplete, query, render) {
                        var results = [];
                        if (query.length === 0) {
                            render(results);
                            return;
                        }
                        // Show Preloader
                        autocomplete.showPreloader();
                        // Do Ajax request to Autocomplete data
                        $$.ajax({
                            url: server + 'getMotorWarna.php',
                            method: 'GET',
                            dataType: 'json',
                            //send "query" to server. Useful in case you generate response dynamically
                            data: {
                                query: query
                            },
                            success: function (data) 
                            {
                                // Find matched items
                                
                                for (var i = 0; i < data.length; i++) 
                                {
                                    if (data[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
                                }
                                // Hide Preoloader
                                autocomplete.hidePreloader();                               



                                render(results);
                            }
                        });
                    }
                });
                   
              },
        getPath:function(source,destination,callback)
        {
             var server=jsonp.server;
            
            
            var dataString = 'source='+source+'&destination='+destination;
            
            $.ajax({
		type: "POST",
		url:server + "getPath.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                callback(data.polyline,data.pesan);
                }else
                {
                 callback('','');
                }
                
              
		},
		error : function(err)
		{ 
                 myApp.hideIndicator();
                callback('','');
		},
		dataType:"jsonp"
		});
            
        },        
        getUserInfo:function(platno,callback)
        {
            
             var server=jsonp.server;
            var dataString = 'platno='+platno;
            
            $.ajax({
		type: "POST",
		url:server + "getuserinfo.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                callback(data.status,data.pesan);
                }else
                {
                 callback(data.status,data.pesan);
                }
                
              
		},
		error : function(err)
		{ 
                 myApp.hideIndicator();
                 callback('none','none');
		},
		dataType:"jsonp"
		});
        },
        mpendaftaran:function(dataString,callback)
        {
             var server=jsonp.server;
            var dataString = dataString;
            
            $.ajax({
		type: "POST",
		url:server + "m_pendaftaran.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                callback(data.status,data.pesan,data.userid);
                }else if(data.status == 'no')
                {
                 callback(data.status,data.pesan,'');
                }
                
              
		},
		error : function(err)
		{ 
                 myApp.hideIndicator();
                 callback('','','');
		},
		dataType:"jsonp"
		});
        },
        mpemesanan : function(dataString,callback)
        {
            var server=jsonp.server;
            var dataString = dataString;
            
            $.ajax({
		type: "POST",
		url:server + "m_pemesanan.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                callback(data.status,data.pesan);
                }else if(data.status == 'no')
                {
                 callback(data.status,data.pesan);
                }
                
              
		},
		error : function(err)
		{ 
                 myApp.hideIndicator();
                 callback('','');
		},
		dataType:"jsonp"
		});
        },
           manual_orderinfo  : function(callback)
           {
               var server=jsonp.server;
            var dataString = "agenakun="+INTERNALDATA.akun;
            
            $.ajax({
		type: "POST",
		url:server + "manual_orderinfo.php?callback=?",
		timeout:50000,
		data: dataString,
		crossDomain: true,
		cache: false,
		beforeSend: function(){
                    myApp.showIndicator();
		},
         success:function(data){ 
             
                myApp.hideIndicator();
                if(data.status == 'ok')
                {
                callback(data.status,data.pesan);
                }else if(data.status == 'no')
                {
                 callback(data.status,data.pesan);
                }
                
              
		},
		error : function(err)
		{ 
                 myApp.hideIndicator();
                 callback('','');
		},
		dataType:"jsonp"
		});
           }
                
        
}	
	
	////////////////////////
