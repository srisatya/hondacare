document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady(){

alert('onDeviceReady Work')

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

// Export selectors engine
$$ = Dom7;

// Add view
mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});



 myApp.onPageInit('*', function (page) {
	 
	 alert('framework7 work well');
 })
	
	
}


// Initialize your app
