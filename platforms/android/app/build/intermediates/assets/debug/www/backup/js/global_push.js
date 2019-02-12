push = {
test : function()
{
	alert('dari class push');
},
push_message_init :function ()
{
    //$('#index_status').append("fungsi dipanggil<br>");
	var notificationOpenedCallback = function(jsonData) 
		{
             // mainView.router.loadPage('home.html');      
             var str=jsonData.payload.title +"|"+jsonData.payload.additionalData.action;
             var aksi=jsonData.payload.additionalData.action;
             var strpesan =jsonData.payload.additionalData.pesan;
             var strname=jsonData.payload.additionalData.name;
             var imgurl=jsonData.payload.additionalData.imgurl; 
             DATAAGEN=strpesan;
			 setTimeout(function(){
					
					app.playNativeSoundLoop('phone1');
					mainView.router.loadPage("agen_waiting.html");
					//alert("sound play");
					},1500);
			 
             if(aksi == 'chat')
              {
				  /*
             pesan.push(strpesan);
              
             var htmlmsg='<div class="message message-received"><div class="message-name">'+strname+'</div><div class="message-text"> '+strpesan+'</div></div>';
             history_pesan = history_pesan + htmlmsg; 
            */
              }else if(aksi == "calling")
	     {
                  window.screenLocker.unlock(function(){	
                        }, function(e){},10);
		
                 if(cordova.plugins.backgroundMode.isActive())
		{
        //bagkground notification
		cordova.plugins.backgroundMode.moveToForeground();
		setTimeout(function(){
			
			app.playNativeSoundLoop('phone1');
			mainView.router.loadPage("agen_waiting.html");
			//alert("sound play");
			},1500);
			
		//alert("mencoba memanggil");
		
		
		
		
		
		}else
		{
			cordova.plugins.backgroundMode.enable();
			
			
			setTimeout(function(){
			
			app.playNativeSoundLoop('phone1');
			mainView.router.loadPage("agen_waiting.html");
			//alert("sound play on active");
			},1500);
		}         
                             
				  
             }else if(aksi == "forgotpassword")
             {
                 
             }else if(aksi == "approve")
             {
            ns.getData('register',function(d){
                
                if(d == "pending")
                {
                    //untuk keanggotaan agen ahass atau freelance
                    //set status register
                   /// ns.saveData('register','approve');
                    mainView.router.loadPage('login.html');
                    
                    
                    
                }
                
             });
            
                
           } 
                    
	     
             
	        };
		
	var notificationReceivedCallback = function(jsonData)
	{
	
	//app.playNativeSound("dingdong");
    var str=jsonData.payload.title +"|"+jsonData.payload.additionalData.action;
    var aksi=jsonData.payload.additionalData.action;
    var strpesan =jsonData.payload.additionalData.pesan;
    var strname=jsonData.payload.additionalData.name;
    var imgurl=jsonData.payload.additionalData.imgurl;
    //alert(aksi+'|'+strpesan);
    
    if(aksi == 'chat')
    {
		//aksi chat 
    
    }else if(aksi == "calling")
	{
            DATAAGEN=strpesan;
            var dat=JSON.parse(strpesan);
            if(app.inArray(dat.orderid,ARRAYORDERID))
            {
                
            }else
            {
                ARRAYORDERID.push(dat.orderid);
            
            
            
             window.screenLocker.unlock(function(){	
                        }, function(e){},10);
		if(cordova.plugins.backgroundMode.isActive())
		{
        //bagkground notification
		cordova.plugins.backgroundMode.moveToForeground();
		setTimeout(function(){
			
			app.playNativeSoundLoop('phone1');
                        app.hidupScreen();
			mainView.router.loadPage("agen_waiting.html");
			//alert("sound play");
			},1500);
			
		//alert("mencoba memanggil");
		}else
		{
			cordova.plugins.backgroundMode.enable();
			
			
			setTimeout(function(){
			
			app.playNativeSoundLoop('phone1');
                        app.hidupScreen();
			mainView.router.loadPage("agen_waiting.html");
			//alert("sound play on active");
			},1500);
                        
                        
                       
		}		
            }
		
                
		
		
	}else if(aksi == "forgotpassword")
         {
           mainView.router.loadPage("resetpassword.html");      
         }else if(aksi == "approve")
          {
            ns.getData('register',function(d){
                
                if(d == "pending")
                {
                    //untuk keanggotaan agen ahass atau freelance
                    //set status register
                   /// ns.saveData('register','approve');
                    mainView.router.loadPage('login.html');
                    
                    
                    
                }
                
            });
            
                
          }else if(aksi == "penunjukan")
          {
              var tipeanggota =INTERNALDATA.keanggotaan;
              if(tipeanggota == "umum")//pelanggan
              {
                  
                  var dat=JSON.parse(strpesan);
                  
                  ORDERID=app.getMD5();//
                  var nopolisi = dat['order_platno'];
                  var keluhan = dat['order_keluhan'];
                  var agenid = dat['agen_id'];
                  var username= dat['user_name'];
                  KELUHAN=keluhan;
                  NOPOLISI=nopolisi;
                  var upos=dat['user_position'].split(',');
                  CURPOSITION.latitude=upos[0];
                  CURPOSITION.longitude=upos[1];
                  var param=strpesan;
                  app.playNativeSoundLoop('phone1');
                  //alert(param);
               myApp.confirm("Salam "+username+",Maaf atas ketidaknyamanannya, Plat :"+nopolisi+" , Keluhan : "+keluhan+". Kami dari pihak Honda Care mengharapkan anda untuk melakukan Panggilan Ulang pada Agen yang telah kami tunjuk, dengan menekan tombol OK sekali","Honda Care",function(){
                   
               app.hidupScreen();
                  
                  
                         window.screenLocker.unlock(function(){	
                        }, function(e){},10);
                        if(cordova.plugins.backgroundMode.isActive())
                     {
                        //bagkground notification
                        cordova.plugins.backgroundMode.moveToForeground();
                          setTimeout(function(){
			
                            app.playNativeSoundLoop('phone1');
                             app.hidupScreen();
                            mainView.router.loadPage("mintalayanan2.html?keluhan="+keluhan+"&nopolisi="+nopolisi+"&param="+param);
                            //alert("sound play");
                            },1500);			
                                //alert("mencoba memanggil");
                        }else
                        {
			cordova.plugins.backgroundMode.enable();
			setTimeout(function(){
			
			app.playNativeSoundLoop('phone1');
                        app.hidupScreen();
			mainView.router.loadPage("mintalayanan2.html?keluhan="+keluhan+"&nopolisi="+nopolisi+"&param="+param);
			//alert("sound play on active");
			},1500);
                        
                        
                       
                    }
               
               
               },function(){
                   
                   app.stopNativeSound('phone1');
               })   
                
                
                  
                  
                  
              }
          }
      
    
	//alert(JSON.stringify(str));
	//alert(jsonData.additionalData.pesan)
    //console.log('Did I receive a notification: ' + JSON.stringify(jsonData));
	};	
	
window.plugins.OneSignal.startInit("9501b2bb-f1dd-4bd9-b1f6-b3185c700c0b","978234941658").handleNotificationOpened(notificationOpenedCallback).handleNotificationReceived(notificationReceivedCallback).inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification).endInit();
  
         // Show an alert box if a notification comes in when the user is in your app.
		 window.plugins.OneSignal.enableSound(true);
		 //window.plugins.OneSignal.enableVibrate(true);
		 window.plugins.OneSignal.enableNotificationsWhenActive(true);
        //window.plugins.OneSignal.enableInAppAlertNotification(false);
		
		
		
		window.plugins.OneSignal.getIds(function(ids) 
					{
						OSID = ids.userId;
						DEVICEID=device.uuid;
						//navigate to login.html
						myApp.hideIndicator();
						$('#index_status').html("push login"); 
						//ns.setInitData('register','pending');
						//ns.setInitData('keanggotaan','umum');
						//ns.setInitData('akun','none');
						//var mainview_=mainView;
                                                // mainView.router.loadPage("login.html");
						ns.getData('register',function(d){
							
                                                   $('#index_status').html("registered"); 
                                                   //alert(d);
                                                        INTERNALDATA.register = d;
                                                       
                                                   
                                                    if(d == 'undefined'){
                                                          mainView.router.loadPage("login.html");  
                                                        }else
                                                        { 
							if(d == 'approve')
							{
								//alert(d);
								
								
							   ns.getData('akun',function(d1){
								   
								   //alert(d1);
								  
								$('#index_status').html("cek akun");  
								   if(d1 != 'none')
								   {
                                                                       
                                                                        
									  var akun=d1.split(",");
									  var param="uname="+akun[0]+"&upass="+akun[1]+"&device_id="+DEVICEID+'&onesignal='+OSID;
								     INTERNALDATA.akun =d1;	 
                                                                   //var mainview__=mainview_;
									  jsonp.autologin(param,function(st,pesan){
										 if(st == 'ok')
										 {
                                                                                  $('#index_status').html("login");
                                                                                     
                                                                                 //try cek remote config
                                                                                  jsonp.remoteConfig(getSettings);
                                                                                  function getSettings(atur){
                                                                                 $('#index_status').html("Setting & Launch");
                                                                                  SETTINGS = atur;
                                                                                  WDOGTIME= SETTINGS.WDOGTIME.value;
                                                                                  CALLTIME=SETTINGS.CALLTIME.value;
                                                                                  SCANCOVERMIN=SETTINGS.SCANCOVERMIN.value;
                                                                                  SCANSTEP=SETTINGS.SCANSTEP.value;
                                                                                  IMGSERVER=SETTINGS.IMGSERVER.value;

                                                                                  app.initialDataInternal();
                                                                                   mainView.router.loadPage("front.html");   
                                                                                   
                                                                                  
                                                                                  }
                                                                                  
										 }else
                                                                                {
										  myApp.alert(pesan,"Perhatian!");	 
										  mainView.router.loadPage("login.html"); 	 
										 }		 
										  
									  });

									  
								   }else
								   {
									mainView.router.loadPage("login.html");   
								   }
								   
							   });	
							 
							}else
							{
							   mainView.router.loadPage("login.html");	
							}
                                                        
                                                    }
							
						});
                       
					});

}

}