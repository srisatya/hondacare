'use strict';

/*
|------------------------------------------------------------------------------
| Careers
|------------------------------------------------------------------------------
*/

myApp.onPageInit('careers', function(page) {

	/* Validate & Submit Form */
	$('.popup-careers-job-apply form[name=job-apply]').validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
        email:true
      },			
      linkedin: {
				url: true
			},
			resume: {
				required: true,
				accept: 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
			}
		},
    messages: {
			name: {
				required: 'Please enter name.'
			},
			email: {
				required: 'Please enter email address.',
        email: 'Please enter a valid email address.'
      },
			linkedin: {
				url: 'Please enter a valid LinkedIn Profile URL.'
			},
			resume: {
				required: 'Please upload resume (PDF or DOC format).',
				accept: 'Please upload resume in PDF or DOC format only.'
      }
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			if(element.attr('name') == 'resume') {
				error.appendTo(element.parent().parent().siblings('.input-error'));
			}
			else {
				error.appendTo(element.parent().siblings('.input-error'));
			}
		},
		submitHandler: function(form) {
			myApp.addNotification({
				message: 'Your application has been submitted successfully.',
				hold: 1500,
				button: {
					text: ''
				}
			});
			myApp.closeModal('.popup-careers-job-apply');
		}
	});

});

/*
|------------------------------------------------------------------------------
| Cart
|------------------------------------------------------------------------------
*/

myApp.onPageInit('cart', function(page) {

	updateAmount();

	/* Change Quantity */
	$$('.page[data-page=cart] [data-action=change-quantity]').on('click', function(e) {
		e.preventDefault();
		var el = $(this).closest('.swipeout');
		var el_product_quantity = el.find('.product-quantity');
		var product_unit_price = el.find('.item-after').data('unit-price');
		var el_product_amount = el.find('.product-amount'); 
		myApp.prompt('Quantity', 
      function(value) {
        if(value > 0) {
					el_product_quantity.text(value);
					el_product_amount.text(product_unit_price * value);
				}
				updateAmount();
      }
    );
		myApp.swipeoutClose(el);
	});

	/* Remove Product */
	$$('.page[data-page=cart] [data-action=remove-product]').on('click', function(e) {
		e.preventDefault();
		var el = $(this).closest('.swipeout');
		myApp.confirm('Do you want to remove this product from cart?', 
			function() {
        myApp.swipeoutDelete(el, function(){
					myApp.addNotification({
						message: 'Removed from cart successfully.',
						hold: 1500,
						button: {
							text: ''
						},
						onClose: function() {
							updateAmount();
						}
					});
				});
      },
			function() {
				myApp.swipeoutClose(el);
			}
    );
	});

	function updateAmount() {
		var product_count = 0;
		var subtotal = 0;
		var discount = 0;
		var shipping_charges = 0;
		var grand_total = 0;

		product_count = $('.page[data-page=cart] .products-list li').length;

		$$('.page[data-page=cart] .products-list li').each(function() {
			var unit_price = $$(this).find('[data-unit-price]').data('unit-price');
			var quantity = $$(this).find('.product-quantity').text();
			subtotal += parseInt(unit_price * quantity);
			$$(this).find('.product-amount').text(parseInt(unit_price * quantity));
		})

		discount = (subtotal * $$('.page[data-page=cart] [data-discount-percent]').data('discount-percent')) / 100;

		shipping_charges = parseInt($$('.page[data-page=cart] .shipping-charges').text());

		grand_total = parseInt(subtotal - discount + shipping_charges);

		$$('.page[data-page=cart] .product-count').text(product_count);
		$$('.page[data-page=cart] .subtotal').text(subtotal);
		$$('.page[data-page=cart] .discount').text(discount);
		$$('.page[data-page=cart] .payable-amount').text(grand_total);
		$$('.page[data-page=cart] .toolbar-bottom .grand-total').text('₹' + grand_total);
	}

});

/*
|------------------------------------------------------------------------------
| Chat
|------------------------------------------------------------------------------
*/

myApp.onPageInit('chat', function(page) {

	/* Initialize Messages */
	var messages = myApp.messages('.page[data-page=chat] .messages', {
    autoLayout: true
	});

	/* Image Upload Handler */
	$$('.page[data-page=chat] .messagebar [data-action=send-image]').on('click', function(e) {
		e.preventDefault();
		$$('.page[data-page=chat] #image-file').click();
	});

	var image = $$('.page[data-page=chat] #image-file');
	image.on('change', function(e) {
		myApp.showIndicator();
		var reader = new FileReader();
		reader.onload = function() {
			var data = reader.result;
			if (data.match(/^data:image\//)) {
				messages.addMessage({
					text: '<img src="' + data + '" alt="Image" />',
					type: 'sent'
				});
				myApp.hideIndicator();
		  }
			else {
				myApp.addNotification({
					message: 'Please select a valid image.',
					hold: 2000,
					button: {
						text: ''
					}
				});
				image.val('');
				myApp.hideIndicator();
			}
		};
		reader.readAsDataURL(image.prop('files')[0]);
	});

	/* Send Message */
	$$('.page[data-page=chat] .messagebar [data-action=send-message]').on('click', function(e) {
		e.preventDefault();
		if (($$('.page[data-page=chat] .messagebar textarea').val().trim())) {
			messages.addMessage({
				text: $$.nl2br($$('.page[data-page=chat] .messagebar textarea').val()),
				type: 'sent'
			});
			$$('.page[data-page=chat] .messagebar textarea').val('');
		}
	});

	/* Photo Browser */
	$$('body').on('click', '.page[data-page=chat] .message .message-text img', function() {

		var photos = $('.page[data-page=chat] .message .message-text').children('img').map(function() {
			return $(this).attr('src');
		}).get();

		var currentSlide = $.inArray($(this).attr('src'), photos);

		var myPhotoBrowser = myApp.photoBrowser({
    	photos: photos,
			exposition: false,
			initialSlide: currentSlide,
			lazyLoading: true,
			lazyLoadingInPrevNext: true,
			lazyLoadingOnTransitionStart: true,
			loop: true
		});
		myPhotoBrowser.open();
	});

});

/*
|------------------------------------------------------------------------------
| Checkout
|------------------------------------------------------------------------------
*/

myApp.onPageInit('checkout', function(page) {

	$$('.page[data-page=checkout] [data-action=show-tab-address]').on('click', function(e) {
		e.preventDefault();
		myApp.showTab('#tab-address');
	});

	$('.page[data-page=checkout] form[name=shipping-address]').validate({
		rules: {
			name: {
				required: true
			},
			address: {
				required: true
			},
			city: {
				required: true
			},
			zip: {
				required: true
			}
		},
    messages: {
			name: {
				required: 'Please enter name.'
			},
			address: {
				required: 'Please enter address.'
			},
			city: {
				required: 'Please enter city.'
			},
			zip: {
				required: 'Please enter ZIP.'
			}
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.showTab('#tab-payment');
		}
	});

	$('.page[data-page=checkout] form[name=payment]').validate({
		ignore: '',
		rules: {
			payment_method: {
				required: true
			}
		},
    messages: {
			payment_method: {
				required: 'Please select a payment method.'
			}
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			if(element.attr('name') == 'payment_method')
			{
				error.appendTo(element.parent().parent().siblings('li').find('.input-error'));	
			}
			else {
				error.appendTo(element.parent().siblings('.input-error'));	
			}
		},
		submitHandler: function(form) {
			myApp.showTab('#tab-done');
		}
	});

});

/*
|------------------------------------------------------------------------------
| Coming Soon
|------------------------------------------------------------------------------
*/

myApp.onPageInit('coming-soon', function(page) {

	var countdownDate = new Date('Jan 1, 2018 00:00:00').getTime();

	/* Update the countdown every 1s */
	var x = setInterval(function() {
		/* Get today's date and time */
		var now = new Date().getTime();

		/* Find the duration between now and the countdown date */
		var duration = countdownDate - now;

		/* Time calculations for days, hours, minutes and seconds */
		var days = Math.floor(duration / (1000 * 60 * 60 * 24));
		var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((duration % (1000 * 60)) / 1000);

		/* Show countdown timer */
		$$('.page[data-page=coming-soon] .countdown-timer .days .value').text(days);
		$$('.page[data-page=coming-soon] .countdown-timer .hours .value').text(hours);
		$$('.page[data-page=coming-soon] .countdown-timer .minutes .value').text(minutes);
		$$('.page[data-page=coming-soon] .countdown-timer .seconds .value').text(seconds);

		/* If the countdown is finished, do something */
		if (duration < 0) {
			clearInterval(x);
			mainView.router.load({
				url: 'home.html'
			});
		}
	}, 1000);

	/* Notify Me */
	$$('.page[data-page=coming-soon] #modal-notify-me').on('click', function(e) {
		e.preventDefault();
		myApp.prompt('Enter your email and we\'ll let you know when Nectar is available.', 'Notify Me', function(value) {
			if(value.trim().length > 0) {
				myApp.addNotification({
					message: 'Thank You',
					hold: 1500,
					button: {
						text: ''
					}
				});
				mainView.router.back();
			}
    });
	});

});

/*
|------------------------------------------------------------------------------
| Contact Us
|------------------------------------------------------------------------------
*/

myApp.onPageInit('contact-us', function(page) {

	/* Load Map */
	$(function() {
		var map = new GMaps({
			el: '#map',
      lat: 37.441169,
      lng: -122.143249,
      zoom: 14, 
      zoomControl: true,
      zoomControlOpt: {
				style: 'SMALL',
        position: 'TOP_LEFT'
      },
      panControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      overviewMapControl: false
    });

		map.addMarker({
			lat: 37.441169,
			lng: -122.143249,
			icon: {
				path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: '#DBBD31',
        fillOpacity: 1,
        strokeColor: '#000000',
        strokeWeight: 2,
        scale: 1
   		},
			animation: google.maps.Animation.DROP
		});

		map.addStyle({
			styledMapName: 'Light Monochrome',
      styles: snazzyMaps.lightMonochrome,
      mapTypeId: 'lightMonochrome'  
		});

    map.setStyle('lightMonochrome');
	});

	/* Validate & Submit Form */
	$('.popup-contact-us-write form[name=write-us]').validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
        email:true
      },
			subject: {
				required: true
			},
			message: {
				required: true
			}
		},
    messages: {
			name: {
				required: 'Please enter name.'
			},
			email: {
				required: 'Please enter email address.',
        email: 'Please enter a valid email address.'
      },
			subject: {
				required: 'Please enter subject.'
			},
			message: {
				required: 'Please enter message.'
			}
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.addNotification({
        message: 'Thank you for contacting us. We will get back to you soon.',
				hold: 3000,
				button: {
					text: ''
				}
			});
			myApp.closeModal('.popup-contact-us-write');
		}
	});

});

/*
|------------------------------------------------------------------------------
| Contacts List
|------------------------------------------------------------------------------
*/

myApp.onPageInit('contacts-list', function(page) {

	/* Search Bar */
	var mySearchbar = myApp.searchbar('.page[data-page=contacts-list] .searchbar', {
    searchList: '.page[data-page=contacts-list] .list-block-search',
    searchIn: '.page[data-page=contacts-list] .item-title'
	});

	/* Edit Contact */
	$$('.page[data-page=contacts-list] [data-action=edit-contact]').on('click', function(e) {
		e.preventDefault();
	});

	/* Delete Contact */
	$$('.page[data-page=contacts-list] [data-action=delete-contact]').on('click', function(e) {
		e.preventDefault();
		var el = $(this).closest('.swipeout');
		myApp.confirm('Do you want to delete this contact?', 
			function() {
        myApp.swipeoutDelete(el, function(){
					myApp.addNotification({
						message: 'Deleted',
						hold: 1500,
						button: {
							text: ''
						}
					});
				});
      }
    );
		myApp.swipeoutClose(el);
	});

});

/*
|------------------------------------------------------------------------------
| Feedback
|------------------------------------------------------------------------------
*/

myApp.onPageInit('feedback', function(page) {

	$$('.page[data-page=feedback] form[name=feedback]').on('submit', function(e) {
		e.preventDefault();
		myApp.addNotification({
       message: 'Thank you for your valuable feedback.',
			hold: 2000,
			button: {
				text: ''
			}
		});
		mainView.router.load({
			url: 'home.html'
		});
	});

});

/*
|------------------------------------------------------------------------------
| Forgot Password
|------------------------------------------------------------------------------
*/

myApp.onPageInit('forgot-password', function(page) {

	$('.page[data-page=forgot-password] form[name=forgot-password]').validate({
		rules: {
			email: {
				required: true,
        email:true
      }
		},
    messages: {
			email: {
				required: 'Please enter email address.',
        email: 'Please enter a valid email address.'
      }
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.popup('.popup-password-reset-token');
		}
	});

	$('.popup-password-reset-token form[name=password-reset-token]').validate({
		rules: {
			token: {
				required: true
      }
		},
    messages: {
			token: {
				required: 'Please enter token.'
      }
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.closeModal('.popup-password-reset-token');
			myApp.popup('.popup-reset-password');
		}
	});

	$('.popup-reset-password form[name=reset-password]').validate({
		rules: {
      new_password: {
				required: true,
				minlength: 8
			},
			confirm_password: {
				required: true,
				equalTo: '.popup-reset-password form[name=reset-password] input[name=new_password]'
			}
		},
    messages: {
			new_password: {
				required: 'Please enter new password.',
				minlength: 'New password must be at least 8 characters long.'
      },
			confirm_password: {
				required: 'Password confirmation is required.',
				equalTo: 'Both the passwords must match.'
			}
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.closeModal('.popup-reset-password');
			myApp.addNotification({
				message: 'Your password has been reset successfully.',
				hold: 1500,
				button: {
					text: ''
				}
			});
			mainView.router.load({
				url: 'login.html'
			});
		}
	});

});

/*
|------------------------------------------------------------------------------
| Home
|------------------------------------------------------------------------------
*/

myApp.onPageInit('home', function(page) {

	/* Hero Slider */
	myApp.swiper('.page[data-page=home] .slider-hero .swiper-container', {
		autoplay: 10000,
		loop: true,
		pagination: '.swiper-pagination',
		paginationClickable: true
	});

	/* Theme Color */
	if (sessionStorage.getItem('nectarMaterialThemeColor')) {
		$$('input[name=theme-color][value=' + sessionStorage.getItem('nectarMaterialThemeColor') + ']').prop('checked', true);
	}

	$$('input[name=theme-color]').on('change', function() {
		if (this.checked) {
			$$('body').removeClass('theme-red theme-pink theme-purple theme-deeppurple theme-indigo theme-blue theme-lightblue theme-cyan theme-teal theme-green theme-lightgreen theme-lime theme-yellow theme-amber theme-orange theme-deeporange theme-brown theme-gray theme-bluegray theme-white theme-black');
			$$('body').addClass('theme-' + $$(this).val());
			sessionStorage.setItem('nectarMaterialThemeColor', $$(this).val());
    }
  });

	/* Theme Mode */
	if (sessionStorage.getItem('nectarMaterialThemeLayout')) {
		$$('input[name=theme-layout][value=' + sessionStorage.getItem('nectarMaterialThemeLayout') + ']').prop('checked', true);
	}

	$$('input[name=theme-layout]').on('change', function() {
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

	/* Share App */
	$$('[data-action=share-app]').on('click', function(e) {
		e.preventDefault();
		var buttons = [
			{
        text: 'Share Nectar',
				label: true
      },
			{
				text: '<i class="fa fa-fw fa-lg fa-envelope-o color-red"></i>&emsp;<span>Email</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-facebook color-facebook"></i>&emsp;<span>Facebook</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-google-plus color-googleplus"></i>&emsp;<span>Google+</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-linkedin color-linkedin"></i>&emsp;<span>LinkedIn</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-twitter color-twitter"></i>&emsp;<span>Twitter</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-whatsapp color-whatsapp"></i>&emsp;<span>WhatsApp</span>'
			}
    ];
		myApp.actions(buttons);
	});

});

/*
|------------------------------------------------------------------------------
| Log In
|------------------------------------------------------------------------------
*/

myApp.onPageInit('login', function(page) {

	/* Show|Hide Password */
	$$('.page[data-page=login] [data-action=show-hide-password]').on('click', function() {
		if ($$('.page[data-page=login] input[data-toggle=show-hide-password]').attr('type') === 'password') {
			$$('.page[data-page=login] input[data-toggle=show-hide-password]').attr('type', 'text');
			$$(this).attr('title', 'Hide');
			$$(this).children('i').text('visibility_off');
		}
		else {
			$$('.page[data-page=login] input[data-toggle=show-hide-password]').attr('type', 'password');
			$$(this).attr('title', 'Show');
			$$(this).children('i').text('visibility');
		}
	});

	/* Validate & Submit Form */
	$('.page[data-page=login] form[name=login]').validate({
		rules: {
			email: {
				required: true,
        email:true
      },
      password: {
				required: true
			}
		},
    messages: {
			email: {
				required: 'Please enter email address.',
        email: 'Please enter a valid email address.'
      },
			password: {
				required: 'Please enter password.'
      }
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.addNotification({
        message: 'Welcome',
				hold: 1500,
				button: {
					text: ''
				}
			});
			mainView.router.load({
				url: 'home.html'
			});
		}
	});

});

/*
|------------------------------------------------------------------------------
| News Article
|------------------------------------------------------------------------------
*/

myApp.onPageInit('news-article', function(page) {

	$('.popup-article-comment form[name=article-comment]').validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
        email:true
      },
      comment: {
				required: true
			}
		},
    messages: {
			name: {
				required: 'Please enter name.'
			},
			email: {
				required: 'Please enter email address.',
        email: 'Please enter a valid email address.'
      },
			comment: {
				required: 'Please enter comment.'
      }
		},
		ignore: '',
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.addNotification({
				message: 'Thank You',
				hold: 1500,
				button: {
					text: ''
				}
			});
			myApp.closeModal('.popup-article-comment');
		}
	});

	$$('.page[data-page=news-article] [data-action=share-article]').on('click', function(e) {
		e.preventDefault();
		var buttons = [
			{
        text: 'Share Article',
				label: true
      },
			{
				text: '<i class="fa fa-fw fa-lg fa-envelope-o color-red"></i>&emsp;<span>Email</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-facebook color-facebook"></i>&emsp;<span>Facebook</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-google-plus color-googleplus"></i>&emsp;<span>Google+</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-linkedin color-linkedin"></i>&emsp;<span>LinkedIn</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-twitter color-twitter"></i>&emsp;<span>Twitter</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-whatsapp color-whatsapp"></i>&emsp;<span>WhatsApp</span>'
			}
    ];
		myApp.actions(buttons);
	});

});	

/*
|------------------------------------------------------------------------------
| Notifications
|------------------------------------------------------------------------------
*/

myApp.onPageInit('notifications', function(page) {

	setTimeout(function() {
		var toast = myApp.toast('Swipe over the notifications to perform actions on them.', '', {duration: 3000});
		toast.show();
	}, 2000);	

	setTimeout(function() {
		var toast = myApp.toast('Pull the page down to refresh notifications list.', '', {duration: 3000});
		toast.show();
	}, 6000);	

	/* Search Bar */
	var mySearchbar = myApp.searchbar('.page[data-page=notifications] .searchbar', {
    searchList: '.page[data-page=notifications] .list-block-search',
    searchIn: '.page[data-page=notifications] .item-title, .page[data-page=notifications] .item-after, .page[data-page=notifications] .item-subtitle, .page[data-page=notifications] .item-text'
	});

	/* Pull to Refresh */
	var ptrContent = $$('.page[data-page=notifications] .pull-to-refresh-content');
	ptrContent.on('ptr:refresh', function(e) {
		setTimeout(function() {
			myApp.addNotification({
        message: 'You have 3 new notifications.',
				hold: 2000,
				button: {
					text: ''
				}
			});
			myApp.pullToRefreshDone();
		}, 2000);	
	});

});

/*
|------------------------------------------------------------------------------
| OTP Verification
|------------------------------------------------------------------------------
*/

myApp.onPageInit('otp-verification', function(page) {

	var numpad = myApp.keypad({
		input: '.page[data-page=otp-verification] #input-otp',
    container: '.page[data-page=otp-verification] #numpad',
    toolbar: false,
    valueMaxLength: 4,
    dotButton: false,
    onChange: function(p, value) {
      value = value.toString();
			length = value.length;
			$$('.page[data-page=otp-verification] .otp-digit').text('');
			$$('.page[data-page=otp-verification] .otp-digit').removeClass('filled');

			if (length >= 1 && length <= 4) {
				for (var i=1; i<=length; i++) {
					$$('.page[data-page=otp-verification] .otp-digit:nth-child(' + i + ')').text(value.charAt(i-1));
					$$('.page[data-page=otp-verification] .otp-digit:nth-child(' + i + ')').addClass('filled');
				}
			}

			if (length === 4) {
				myApp.addNotification({
					message: 'OTP has been verified.',
					hold: 1500,
					button: {
						text: ''
					}
				});
				mainView.router.load({
					url: 'home.html'
				});
			}
		}
  });

});

/*
|------------------------------------------------------------------------------
| Pattern Lock
|------------------------------------------------------------------------------
*/

myApp.onPageInit('pattern-lock', function(page) {

	/* Initialize Date & Time */
	function setDateTime() {	
		var t = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
		var e = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
		var n = new Date();
		var i = n.getYear();
		1e3 > i && (i += 1900);
		var a = n.getDay();
		var o = n.getMonth();
		var s = n.getDate();
		10 > s && (s = '0' + s);
		var h = n.getHours();
		var c = n.getMinutes();
		var u = n.getSeconds();
		var l = 'AM';
		h >= 12 && (l = 'PM');
		h > 12 && (h -= 12);
		0 == h && (h = 12);
		9 >= c && (c = '0' + c);
		9 >= u && (u = '0' + u);
		$('.page[data-page=pattern-lock] .date-time .day').text(t[a]);
		$('.page[data-page=pattern-lock] .date-time .date').text(e[o] + ' ' + s + ', ' + i);
		$('.page[data-page=pattern-lock] .date-time .time').text(h + ':' + c + ' ' + l);
	}

	setDateTime();

	setInterval(function() {
		setDateTime();
	}, 60000);

	/* Initialize Pattern Lock */
	var lock = new PatternLock('.page[data-page=pattern-lock] .pattern-container');

	lock.checkForPattern('7415963', function(){
		myApp.addNotification({
			message: 'Welcome to Nectar',
			hold: 1500,
			button: {
				text: ''
			}
		});
		mainView.router.load({
			url: 'home.html'
		});
	},
	function(){
    myApp.addNotification({
			message: 'Oops! Try Again',
			button: {
				text: ''
			},
			hold: 2000,
			onClose: function() {
				lock.reset();
			}
		});
	});

});

/*
|------------------------------------------------------------------------------
| Products List
|------------------------------------------------------------------------------
*/

myApp.onPageInit('products-list', function(page) {

	$$('body').on('click', '.page[data-page=products-list] [data-action=cart-add]', function() {
		var toast = myApp.toast('Added to Cart');
		toast.show();
	});	

});

/*
|------------------------------------------------------------------------------
| Product Details
|------------------------------------------------------------------------------
*/

myApp.onPageInit('product-details', function(page) {

	/* Initialize Slider */
	myApp.swiper('.page[data-page=product-details] .slider-product .swiper-container', {
		loop: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev'
	});

	/* Product Images Browser */
	$$('body').on('click', '.page[data-page=product-details] .slider-product .slide-image-wrapper', function() {
		var photos = [];

		$('.page[data-page=product-details] .slider-product .slide-image-wrapper img').each(function() {
			photos.push({
				url: $(this).attr('src'),
				caption: $(this).attr('alt')
			});
		});

		var myPhotoBrowser = myApp.photoBrowser({
    	photos: photos,
			exposition: false,
			lazyLoading: true,
			lazyLoadingInPrevNext: true,
			lazyLoadingOnTransitionStart: true,
			loop: true
		});
		myPhotoBrowser.open();
	});

	/* Add to Wishlist */
	$$('.page[data-page=product-details] .add-wishlist').on('click', function(e) {
		e.preventDefault();
		myApp.addNotification({
			message: 'Added to wishlist successfully.',
			hold: 1500,
			button: {
				text: ''
			}
		});
	});

	/* Add to Cart */
	$$('.page[data-page=product-details] .add-cart').on('click', function(e) {
		e.preventDefault();
		myApp.addNotification({
			message: 'Added to cart successfully.',
			hold: 1500,
			button: {
				text: ''
			}
		});
	});

	/* Rate & Review */
	$('.popup-product-rate-review .rating').rateYo({
		halfStar: true,
		normalFill: '#9E9E9E',
		ratedFill: '#FFC107',
		spacing: '4px'
	})
	.on('rateyo.set', function(e, data) {
		$('.popup-product-rate-review form[name=product-rate-review] input[name=rating]').val(data.rating);
	});

	$('.popup-product-rate-review form[name=product-rate-review]').validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
        email:true
      },
			rating: {
				required: true,
				range: [0.5, 5],
				step: 0.5
			},
      comment: {
				required: true
			}
		},
    messages: {
			name: {
				required: 'Please enter name.'
			},
			email: {
				required: 'Please enter email address.',
        email: 'Please enter a valid email address.'
      },
			rating: {
				required: 'Please select rating.',
				range: 'Please select a valid rating.',
				step: 'Please select a valid rating.'
			},
			comment: {
				required: 'Please enter comment.'
      }
		},
		ignore: '',
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.addNotification({
				message: 'Thank you for your valuable feedback.',
				hold: 1500,
				button: {
					text: ''
				}
			});
			myApp.closeModal('.popup-product-rate-review');
		}
	});

});

/*
|------------------------------------------------------------------------------
| Recipe
|------------------------------------------------------------------------------
*/

myApp.onPageInit('recipe', function(page) {

	/* Recipe Slider */
	myApp.swiper('.page[data-page=recipe] .slider-recipe .swiper-container', {
		loop: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev'
	});

	/* Recipe Photos Browser */
	$$('body').on('click', '.page[data-page=recipe] .slider-recipe .slide-image-wrapper img', function() {
		var photos = [];

		$('.page[data-page=recipe] .slider-recipe .slide-image-wrapper img').each(function() {
			photos.push({
				url: $(this).attr('src'),
				caption: $(this).attr('alt')
			});
		});

		var myPhotoBrowser = myApp.photoBrowser({
    	photos: photos,
			exposition: false,
			lazyLoading: true,
			lazyLoadingInPrevNext: true,
			lazyLoadingOnTransitionStart: true,
			loop: true
		});
		myPhotoBrowser.open();
	});

});

/*
|------------------------------------------------------------------------------
| Settings
|------------------------------------------------------------------------------
*/

myApp.onPageInit('settings', function(page) {

	/* Share App */
	$$('.page[data-page=settings] [data-action=share-app]').on('click', function(e) {
		e.preventDefault();
		var buttons = [
			{
        text: 'Share Nectar',
				label: true
      },
			{
				text: '<i class="fa fa-fw fa-lg fa-envelope-o color-red"></i>&emsp;<span>Email</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-facebook color-facebook"></i>&emsp;<span>Facebook</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-google-plus color-googleplus"></i>&emsp;<span>Google+</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-linkedin color-linkedin"></i>&emsp;<span>LinkedIn</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-twitter color-twitter"></i>&emsp;<span>Twitter</span>'
			},
			{
				text: '<i class="fa fa-fw fa-lg fa-whatsapp color-whatsapp"></i>&emsp;<span>WhatsApp</span>'
			}
    ];
		myApp.actions(buttons);
	});

});

/*
|------------------------------------------------------------------------------
| Sign Up
|------------------------------------------------------------------------------
*/

myApp.onPageInit('signup', function(page) {

	/* Show|Hide Password */ 
	$$('.popup-signup-email [data-action=show-hide-password]').on('click', function() {
		if ($$('.popup-signup-email input[data-toggle=show-hide-password]').attr('type') === 'password') {
			$$('.popup-signup-email input[data-toggle=show-hide-password]').attr('type', 'text');
			$$(this).attr('title', 'Hide');
			$$(this).children('i').text('visibility_off');
		}
		else {
			$$('.popup-signup-email input[data-toggle=show-hide-password]').attr('type', 'password');
			$$(this).attr('title', 'Show');
			$$(this).children('i').text('visibility');
		}
	});

	/* Validate & Submit Form */
	$('.popup-signup-email form[name=signup-email]').validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
        email:true
      },
      password: {
				required: true,
				minlength: 8
			}
		},
    messages: {
			name: {
				required: 'Please enter name.'
			},
			email: {
				required: 'Please enter email address.',
        email: 'Please enter a valid email address.'
      },
			password: {
				required: 'Please enter password.',
				minlength: 'Password must be at least 8 characters long.'
      }
		},
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.closeModal('.popup-signup-email');
			myApp.addNotification({
        message: 'Thank you for signing up with us.',
				hold: 2000,
				button: {
					text: ''
				}
			});
			mainView.router.load({
				url: 'login.html'
			});
		}
	});

});	

/*
|------------------------------------------------------------------------------
| Splash Screen
|------------------------------------------------------------------------------
*/

myApp.onPageInit('splash-screen', function(page) {

	new Vivus('logo', {
		duration: 125,
		onReady: function(obj) {
			obj.el.classList.add('animation-begin');
		}
	},
	function(obj) {
		obj.el.classList.add('animation-finish');

		/* 3 seconds after logo animation is completed, open walkthrough screen. */
		setTimeout(function(){
			mainView.router.load({
				url: 'walkthrough.html'
			});
		}, 3000);
	});

	/* 1 second after page is loaded, show preloader. */
	setTimeout(function() {
		$$('.page[data-page=splash-screen] .splash-preloader').css('opacity', 1);
	}, 1000);

});

/*
|------------------------------------------------------------------------------
| Testimonials
|------------------------------------------------------------------------------
*/

myApp.onPageInit('testimonials', function(page) {

	myApp.swiper('.page[data-page=testimonials] .testimonials-container', {
		pagination: '.page[data-page=testimonials] .testimonials-pagination',
		paginationClickable: true
	});

	$('.page[data-page=testimonials] .testimonial-rating').each(function() {
		$(this).rateYo({
			rating: $(this).data('rating'),
			halfStar: true,
			normalFill: '#9E9E9E',
			ratedFill: '#FFC107',
			readOnly: true,
			spacing: '4px',
			starWidth: '18px'
		});
	});	

	$('.popup-testimonial-write .rating').rateYo({
		halfStar: true,
		normalFill: '#9E9E9E',
		ratedFill: '#FFC107',
		spacing: '4px'
	})
	.on('rateyo.set', function(e, data) {
		$('.popup-testimonial-write form[name=testimonial] input[name=rating]').val(data.rating);
	});

	$('.popup-testimonial-write form[name=testimonial]').validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
        email:true
      },
			rating: {
				required: true,
				range: [0.5, 5],
				step: 0.5
			},
      comment: {
				required: true
			}
		},
    messages: {
			name: {
				required: 'Please enter name.'
			},
			email: {
				required: 'Please enter email address.',
        email: 'Please enter a valid email address.'
      },
			rating: {
				required: 'Please select rating.',
				range: 'Please select a valid rating.',
				step: 'Please select a valid rating.'
			},
			comment: {
				required: 'Please enter comment.'
      }
		},
		ignore: '',
		onkeyup: false,
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.closeModal('.popup-testimonial-write');
		}
	});

});

/*
|------------------------------------------------------------------------------
| User Profile
|------------------------------------------------------------------------------
*/

myApp.onPageInit('user-profile', function(page) {

	/* Portfolio Images Browser */
	$$('body').on('click', '.page[data-page=user-profile] #tab-portfolio .image-gallery .image-wrapper img', function() {
		var photos = [];

		$('.page[data-page=user-profile] #tab-portfolio .image-gallery .image-wrapper img').each(function() {
			photos.push({
				url: $(this).attr('src'),
				caption: $(this).attr('alt')
			});
		});

		var myPhotoBrowser = myApp.photoBrowser({
    	photos: photos,
			exposition: false,
			lazyLoading: true,
			lazyLoadingInPrevNext: true,
			lazyLoadingOnTransitionStart: true,
			loop: true
		});
		myPhotoBrowser.open();
	});

});

/*
|------------------------------------------------------------------------------
| Walkthrough
|------------------------------------------------------------------------------
*/

myApp.onPageInit('walkthrough', function(page) {

	/* Initialize Slider */
	myApp.swiper('.page[data-page=walkthrough] .walkthrough-container', {
		pagination: '.page[data-page=walkthrough] .walkthrough-pagination',
		paginationClickable: true
	});

});