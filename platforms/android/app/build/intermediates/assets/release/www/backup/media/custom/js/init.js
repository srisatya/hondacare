'use strict';

(function() {

/*
|------------------------------------------------------------------------------
| Initialize Framework7
| For more parameters visit https://framework7.io/docs/init-app.html
|------------------------------------------------------------------------------
*/

window.myApp = new Framework7({
	cache: false,
	init: false,
	material: true,
	modalTitle: 'Nectar',
	notificationCloseButtonText: 'OK',
	scrollTopOnNavbarClick: true
});

/*
|------------------------------------------------------------------------------
| Initialize Main View
|------------------------------------------------------------------------------
*/

window.mainView = myApp.addView('.view-main');

/*
|------------------------------------------------------------------------------
| Assign Dom7 Global Function to a variable $$ to prevent conflicts with other
| libraries like jQuery or Zepto.
|------------------------------------------------------------------------------
*/

window.$$ = Dom7;

})();

/*
|------------------------------------------------------------------------------
| Function performed on every AJAX request
|------------------------------------------------------------------------------
*/

$$(document).on('ajaxStart', function (e) {
	myApp.showIndicator();
});

$$(document).on('ajaxComplete', function (e) {
	myApp.hideIndicator();
});

/*
|------------------------------------------------------------------------------
| Set last saved color and layout theme
|------------------------------------------------------------------------------
*/

$$(document).on('pageInit', function(e) {
	if (sessionStorage.getItem('nectarMaterialThemeColor')) {
		$$('body').removeClass('theme-red theme-pink theme-purple theme-deeppurple theme-indigo theme-blue theme-lightblue theme-cyan theme-teal theme-green theme-lightgreen theme-lime theme-yellow theme-amber theme-orange theme-deeporange theme-brown theme-gray theme-bluegray theme-white theme-black');
		$$('body').addClass('theme-' + sessionStorage.getItem('nectarMaterialThemeColor'));
	}
	
	if (sessionStorage.getItem('nectarMaterialThemeLayout')) {
		switch(sessionStorage.getItem('nectarMaterialThemeLayout')) {
			case 'dark':
				$$('body').removeClass('layout-dark');
				$$('body').addClass('layout-' + sessionStorage.getItem('nectarMaterialThemeLayout'));
			break;
			default:
				$$('body').removeClass('layout-dark');
			break;
		}
	}
});