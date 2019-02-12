'use strict';

myApp.onPageInit('themes', function(page) {

	if (sessionStorage.getItem('nectarMaterialThemeColor')) {
		$$('.page[data-page=themes] input[name=theme-color][value=' + sessionStorage.getItem('nectarMaterialThemeColor') + ']').prop('checked', true);
	}

	/* Change Color Theme */
	$$('.page[data-page=themes] input[name=theme-color]').on('change', function() {
		if (this.checked) {
			$$('body').removeClass('theme-red theme-pink theme-purple theme-deeppurple theme-indigo theme-blue theme-lightblue theme-cyan theme-teal theme-green theme-lightgreen theme-lime theme-yellow theme-amber theme-orange theme-deeporange theme-brown theme-gray theme-bluegray theme-white theme-black');
			$$('body').addClass('theme-' + $$(this).val());
			sessionStorage.setItem('nectarMaterialThemeColor', $$(this).val());
    }
  });

	if (sessionStorage.getItem('nectarMaterialThemeLayout')) {
		$$('.page[data-page=themes] input[name=theme-layout][value=' + sessionStorage.getItem('nectarMaterialThemeLayout') + ']').prop('checked', true);
	}

	/* Change Layout Theme */
	$$('.page[data-page=themes] input[name=theme-layout]').on('change', function() {
		if (this.checked) {
			switch($$(this).val()) {
				case 'dark':
					$$('body').removeClass('layout-dark');
					$$('body').addClass('layout-' + $$(this).val());
				break;
				default:
					$$('body').removeClass('layout-dark');
				break;
			}
			sessionStorage.setItem('nectarMaterialThemeLayout', $$(this).val());
    }
  });

});