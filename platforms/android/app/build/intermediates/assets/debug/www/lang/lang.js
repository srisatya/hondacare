lang={
langs:[
	{lang:'in',label:'login_lupa_password',nilai:'Lupa Kata Sandi?'},
	{lang:'en',label:'login_lupa_password',nilai:'Forgot Password?'},
        {lang:'in',label:'pesan_anggota_umum',nilai:'<p><b>Selamat [UNAME],</b><br> Mulai sekarang anda telah terdaftar sebagai anggota Honda Care</p><p>Anda sudah bisa menikmati semua layanan yang kami sediakan untuk mempermudah hari-hari anda</p><p><b>Salam Satu Hati</b></p>'},
        {lang:'en',label:'pesan_anggota_umum',nilai:''},
        {lang:'in',label:'pesan_agen_ahass',nilai:'<p><b>Selamat [UNAME],</b><br> Tinggal satu langkah lagi, AHASS :[AHASS] sudah bisa bergabung dengan Agen Honda Care</p><p>Mohon tunggu konfirmasi dari Admin untuk menyetujui keanggotaan anda. Anda akan mendapat pemberitahuan di Mobile yang telah terpasang Aplikasi Honda Care.<br> <b>Pastikan aplikasi Honda Care selalu aktif.</b></p><p><b>Salam Satu Hati</b></p>'},
        {lang:'en',label:'pesan_agen_ahass',nilai:''},
        {lang:'in',label:'pesan_agen_freelance',nilai:'<p><b>Selamat [UNAME],</b><br> Tinggal satu langkah lagi, Anda sudah bisa bergabung dengan Agen Honda Care di bawah AHASS : [AHASS]</p><p>Mohon tunggu konfirmasi dari Admin untuk menyetujui keanggotaan anda. Anda akan mendapat pemberitahuan di Mobile yang telah terpasang Aplikasi Honda Care.<br> <b>Pastikan aplikasi Honda Care selalu aktif.</b></p><p><b>Salam Satu Hati</b></p>'},
        {lang:'en',label:'pesan_agen_freelance',nilai:''}
	],
_text_dw:function(skey)
{
	var str="";
	for(var i in this.langs)
	{
		if(this.langs[i].lang == LG)
		{
			 if(this.langs[i].label == skey)
			 {
				 str = this.langs[i].nilai;
				 break;
			 }else
			 {
			  str="";	 
			 }	 
		}else
        {
		  str="";
		}			
	}
	
	document.write(str);
},
_text:function(skey)
{
	
	var str="";
	for(var i in this.langs)
	{
		if(this.langs[i].lang == LG)
		{
			 if(this.langs[i].label == skey)
			 {
				 str = this.langs[i].nilai;
				 break;
			 }else
			 {
			  str="";	 
			 }	 
		}else
        {
		  str="";
		}			
	}
	
	return str;
	
}



}