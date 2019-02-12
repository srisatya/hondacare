db = {
 myDB:null,
 rsl:new Array(), 
 nilai:"",
test : function()
{
	alert('dari class WebSql');
},
init : function()
{
	var dbSize = 10 * 1024 * 1024; // 10MB
    return openDatabase("hondacare2", "1.0", "data manager", dbSize,function(){
		alert("db open");
	});
},
open_db : function()
{
		
		var myDB = this.init();
		myDB.transaction(function (tx) {
			tx.executeSql("CREATE TABLE IF NOT EXISTS membership(ID INTEGER PRIMARY KEY ASC, skey TEXT, svalue TEXT)",
				[], null, null);
			//var formatdate = new Date();
			
           var postdate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");	
			//var	postgaransi = moment(new Date()).format("YYYY-MM-DD");		
			tx.executeSql("INSERT INTO membership(ID,skey,svalue) VALUES (?,?,?)", ['1','register','0'], onSuccess, onError);
			//tx.executeSql("INSERT INTO membership(ID,skey,svalue) VALUES (?,?,?)", ['2','keanggotaan','umum'], onSuccess, onError);
			//tx.executeSql("INSERT INTO membership(ID,skey,svalue) VALUES (?,?,?)", ['3','akun','none'], onSuccess, onError);
			//tx.executeSql("INSERT INTO membership(ID,skey,svalue) VALUES (?,?,?)", ['4','installdate',postdate], onSuccess, onError);
			
		});
		
		function onSuccess(transaction, resultSet) {
			alert('Query completed: ' + JSON.stringify(resultSet));
		}		
		function onError(transaction, error) {
			alert('Query failed: ' + error.message);
		}
	
},
select_db : function(stquery)
{

var myDB = this.init();
  myDB.transaction(function (tx) 
  {
   //populate drop down for unites
    tx.executeSql(stquery, [], function (tx, results) {
             
	   var len = results.rows.length; 
        var i=0;
        var txt="";
        for (i = 0; i < len; i++){
            txt=txt + results.rows.item(i).skey + "," + results.rows.item(i).svalue+"\n";
			//arr.push({step:results.rows.item(i).step,daytime:results.rows.item(i).daytime});
        }
       
	   alert(txt);
	   
     }, null);
   });
 

}//////////////////////////////////////////////////////////////////
,
getGlobalVariable : function(stquery,index)
{

var myDB = this.init();
  myDB.transaction(function (tx) {
   //populate drop down for unites
    tx.executeSql(stquery, [], function (tx, results) {
             
	   var len = results.rows.length; 
        var i=0;
        var txt="";
        /*for (i = 0; i < len; i++)
		{
            //txt=txt + results.rows.item(i).skey + "," + results.rows.item(i).svalue+"\n";
			rsl.push({skey:results.rows.item(i).skey,svalue:results.rows.item(i).svalue});
        }*/
       
	    return globalGeneralVariable = results.rows.item(index).svalue;
		
	   
     }, null);
   });
 

return globalGeneralVariable;
	
 
},
getGeneralVariable:function(skey,callback)
{
 var myDB = this.init();
  myDB.transaction(function (tx) {
   //populate drop down for unites
   tx.executeSql("SELECT * FROM membership", [], function (tx,results) {
             
	   var len = results.rows.length; 
       var nilai="wrong";
        for (i = 0; i < len; i++)
		{
            //txt=txt + results.rows.item(i).skey + "," + results.rows.item(i).svalue+"\n";
			//rsl.push({skey:results.rows.item(i).skey,svalue:results.rows.item(i).svalue});
			if(results.rows.item(i).skey == skey)
			{
				nilai= results.rows.item(i).svalue;
				break;
			}
        }
       
	   //loginakun=nilai;
	   callback(nilai);
	   
     }, null);
   });
 

	//return nilai;
},
cek_pendaftaran : function(dataString)
{
	
var myDB = this.init();
myDB.transaction(function (tx)
  { 
	tx.executeSql("SELECT * FROM membership", [], function (tx, results) {
		
		var id =results.rows.item(1).ID;
	    var skey =results.rows.item(1).skey;
		var status_register=results.rows.item(1).svalue;
		
		
		if(status_register == '0')
		{
			//db.update_db('UPDATE membership SET skey ="install" , svalue ="1" where ID = "1" ');
			//db.update_db('UPDATE membership SET skey ="register" , svalue ="1" where ID = "2" ');			
			jsonp.pendaftaran(dataString);
			
		}else
		{
			navigator.notification.activityStop();
			navigator.notification.alert(
					"SORRY, you was registered",  // message
					function(){document.getElementById('signup_login').click();}, // callback to invoke
					'Notification!',            // title
					'OK'            // buttonLabels
					
				);  
		}
			
				
		
		
		
	}, null);
  });
	
}//////////////////////////////////////////////////////////////////
,
insert_db : function(stquery,arrkolom)
{
var myDB = this.init();
	
},
update_db : function(stquery)
{
	var myDB = this.init();
	myDB.transaction(function (tx) {
   //populate drop down for unites
    tx.executeSql(stquery,[], function (tx, results) {
    	//alert("sukses update");   
     },function(err){
		 alert("error");
	 });
   });
	
	
},
drop_db : function()
{
	var myDB = this.init();
	myDB.transaction(function (t) {
     t.executeSql("DROP TABLE IF EXISTS membership",[], 
         function(t,results){
             alert("sukses hapus");
         },
         function(t,error){
             alert("gagal");
         }
     )
});

},
cek_login : function()
{
	var myDB = this.init();
myDB.transaction(function (tx)
  { 
	tx.executeSql("SELECT * FROM membership", [], function (tx, results) {
		
		var id =results.rows.item(3).ID;
	    var skey =results.rows.item(3).skey;
		var status_login=results.rows.item(3).svalue;
		if(status_login == '1')
		{
		  $('#nama').val('tunggu login otomatis...'); 
         
            jsonp.getAppVersion(sukses);
            function sukses(td,vlama,vbaru)
            {
                             
                
                
              if(td == "old") 
              {  
               
                
               //cek pengguna 
                db.getGeneralVariable("mjsakun",sukses);
			function sukses(data)
			{
			    if(data == "")
                            {
                              mainView.router.loadPage("home.html");  
                            }else
                            {	
				var decrypted = CryptoJS.AES.decrypt(data,KUNCI);
				hasil=decrypted.toString(CryptoJS.enc.Utf8);
				//alert(hasil);
				if(hasil)
				{
				   
				 var mjsakun=hasil.split(',');
                                 if(mjsakun[0] && mjsakun[1])
                                 {
                                   mainView.router.loadPage("dashboard.html?username="+mjsakun[0]+"&password="+mjsakun[1]);								   
                                 }
                                 
                                }
                            }
                        }
                //end cek pengguna
                
                
                
                
               
             
              }else if(td == "new")
              {
               //document.getElementById('update').click(); 
               mainView.router.loadPage("update.html?vlama="+vlama+"&vbaru="+vbaru);
              }else
              {
               mainView.router.reloadPage("index.html"); 
              }
             
             navigator.notification.activityStop(); 
            }
            
          
		
			//$('#basket_info').html(basket.length);
		}else
        {
          navigator.notification.activityStop();  
          app.endisTag("show");
          mainView.router.reloadPage("index.html");
          //cek data di server berhubungan dengan deviceid
         
            
        }
	
		
	}, null);
  });
}

}//end object class