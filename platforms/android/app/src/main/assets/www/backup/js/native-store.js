ns={

saveData : function(skey,svalue)
{
 NativeStorage.setItem(skey,svalue,null,null);	
},
getData : function(skey,callback)
{
 NativeStorage.getItem(skey, success, error);
 function success(rsl)
 {
	 callback(rsl);
 }
 
 function error(err)
 {
	callback('undefined');
 }
 
},
setInitData:function(skey,svalue,callback)
{
						ns.getData(skey,sukses);
						function sukses(data)
						{
					           if(data == 'undefined')
						     ns.saveData(skey,svalue);
							
						callback("ok",data);	
						}
	
},
checkAll:function()
{
	NativeStorage.keys(function(datas){
		   var str="";
		   for(var i in datas)		   
		   {
			   
			   
				  str += datas[i]+"\n"; 
			 
			   
		   }
		   alert(str);
	   }, null);
}


}