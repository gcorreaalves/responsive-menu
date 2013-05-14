(function ($) {

    $.fn.responsiveMenu = function (options) {

        var e = $(this),
            defaults = {
                'userWidth' : 800,
                'open'      : 'after',
                'linkMenu'      : ''
            },
            settings = $.extend({}, defaults, options),
            originalValue, 
            callback, 
            data,
            linkPrincipal = '';

        originalValue = '';
        callback = callback;
        data = '';

        initialize = function(){
            setLink();              
            verifyWidth();
            changeOrietation();
            setPositionMenu();
            controlMenu();
            controlSubMenu();
        }

        setLink = function(){
            if(settings.linkMenu){
                linkPrincipal = settings.linkMenu;
            }else{
                $('<a href="#" class="toggleMenu">Menu</a>').insertBefore(e);    
                linkPrincipal = '.toggleMenu';
            } 
            linkPrincipal = $(linkPrincipal);
        }

        setPositionMenu = function(){            
            var link = linkPrincipal,
                linkCurrent = link;
                link.remove();
            if(settings.open == 'before'){
                linkCurrent.insertAfter(e);
            }else{
                linkCurrent.insertBefore(e);
            }
        }

        verifyWidth = function(){
            var link = linkPrincipal;
            if($(window).width() <= settings.userWidth){
                applyResponsive(e);
                link.css('display', 'block');
            }else{
                removeResponsive(e);       
                link.css('display', 'none');
            }     
        }

        changeOrietation = function(){
            $(window).on('resize orientationchange', function() {
                verifyWidth();
            });
        }

        applyResponsive = function(e){
            e.addClass('responsive-nav');
        }

        removeResponsive = function(e){
            e.removeClass('responsive-nav');  
            e.removeAttr("style");
            e.find('ul > li > ul').removeAttr("style");       
        }

        controlMenu = function(){            
            linkPrincipal.click(function(){
              e.toggle();  
            });
        }

        controlSubMenu = function(){
            e.find('a').click(function(ev){                  
                if($(this).next().is('ul')){
                    ev.preventDefault();
                    $(this).next('ul').toggle();
                }
            })
        }

        return initialize();
 
    }; 
})( jQuery );