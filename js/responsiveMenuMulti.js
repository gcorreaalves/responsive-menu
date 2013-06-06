;(function ( $, window, document, undefined ) {

    var pluginName = "responsiveMenu",
        defaults = {
			maxWidth : 800,
			linkMenu  : ''
        };

    function Plugin( element, options ) {
        this.element = $(element);
		
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;
        this.linkPrincipal = '';

        this.init();
    }

    Plugin.prototype = {

        init: function() {			
			this.setLink(this.element, this.options, this.linkPrincipal);			
			this.verifyWidth(this.element, this.options);
			this.changeOrietation(this.element, this.options);			
			this.controlMenu(this.element);			
			this.controlSubMenu(this.element);
        },
		setLink : function(el, options, linkPrincipal){
            var link = '';
			if(options.linkMenu){
                link = options.linkMenu;
            }else{
				var elID = el.attr('id');
                $('<a href="#" class="toggleMenu" id="toggleMenu-'+elID+'">Menu</a>').insertBefore(el);    
                link = '#toggleMenu-'+elID+'';
            } 
            this.linkPrincipal = $(link);
        },
		verifyWidth : function(el, options){
            var link = this.linkPrincipal;
            if($(window).width() <= options.maxWidth){
                this.applyResponsive(el);
                link.css('display', 'block');
            }else{
                this.removeResponsive(el);       
                link.css('display', 'none');
            }     
        },
		changeOrietation : function(el, options){
            $(window).on('resize orientationchange', $.proxy(function() {
                this.verifyWidth(el, options);
            }, this));
        },
		applyResponsive : function(el){
            el.addClass('responsive-nav');
        },
		removeResponsive : function(el){
            el.removeClass('responsive-nav');  
            el.removeAttr("style");
            el.find('ul > li > ul').removeAttr("style");       
        },
		controlMenu : function(el){            
            this.linkPrincipal.click(function(ev){
				ev.preventDefault();
				el.toggle();  	
            });
        },
        controlSubMenu : function(el){
            el.find('a').click(function(ev){                  
                if($(this).next().is('ul')){
                    ev.preventDefault();
                    $(this).next('ul').toggle();
                }
            })
        }		
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );