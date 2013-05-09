(function ($) {

	$.fn.responsiveMenu = function (options, callback) {

		var e = $(this);

        console.log(e);

        var defaults = {
        	'userWidth'  	: 800,
         	'effect'    : 'slider',
         	'direction' : 'up',
         	'icon'		: 'icon.png'
        };
 
        var settings = $.extend({}, defaults, options);

        var originalValue, callback, data;

        originalValue = '';
        callback = callback;
        data = '';

        verifyWidth = function(){

        	if($(window).width() <= settings.userWidth){
        		applyResponsive(e);
        	}else{
        		removeResponsive(e);
        	}

        }

        applyResponsive = function(e){
        	e.addClass('responsive-nav');
        	openSubMenu();
        }

        removeResponsive = function(e){
			e.removeClass('responsive-nav');
        }

        openSubMenu = function(){
			e.find('a').click(function(ev){
				ev.preventDefault();
				$(this).parent().find('ul').toggle();
			})
        }

	    /*if(typeof callback == 'function'){
	      callback.call(this, data);
	    }*/

	    return verifyWidth();
 
    }; 
})( jQuery );