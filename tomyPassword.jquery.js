
(function($) {
 
    $.fn.tomyPassword = function(options) {
   
      options = $.extend({}, $.fn.tomyPassword.defaultOptions, options);
        
      validaciones = {
        numero:{
            texto:'Al menos 1 número (0...9)',
            valido:false,
            expresion:/\d/
        },
        mayuscula:{
            texto:'Al menos 1 letra mayúscula (A...Z)',
            valido:false,
            expresion:/[A-Z]/
        },
        minuscula:{
            texto:'Al menos 1 minuscula (a...z)',
            valido:false,
            expresion:/[a-z]/
        },
        especial:{
            texto:'Al menos 1 carácter especial',
            valido:false,
            expresion:/\W|_/
        },
        longitud:{
            texto:'Al menos 8 caracteres',
            valido:false,
            expresion:/.{8,}/
        }
      };


      this.each(function() {
        var element = $(this);
        element.parent().css('position', 'relative');
        element.data('validado', false); 

        element.focus(function() {            
            $div = $('<div>', {class:'tomyPassword'});
            $div.append($('<span>').text('La contraseña debe contener al menos:'));    
            $ul = $('<ul>');
            element.data('validado', true);
            jQuery.each(validaciones, function(i, item) {
                item.valido = item.expresion.test(element.val());
                if(!item.validado) element.data('validado', false);
                $ul.append($('<li>', {'class':i}).text(item.texto)
                                                 .addClass(item.valido?options.ok_class:options.error_class));
            });
            $div.append($ul);
            element.before($div);    
        });        

        element.blur(function() {
           $('div.tomyPassword').remove();
        });
        
        element.keyup(function() {
            element.data('validado', true);
            jQuery.each(validaciones, function(i, item) {
                item.valido = item.expresion.test(element.val());
                if(!item.valido) element.data('validado', false);                
                $('.tomyPassword ul li.' + i).removeClass(options.ok_class)
                                             .removeClass(options.error_class)
                                             .addClass(item.valido?options.ok_class:options.error_class);
            });            
        });

      });
   
      return this;
    }
   
    // Parametros del plugin.
    $.fn.tomyPassword.defaultOptions = {
      ok_class: 'texto-verde',
      error_class: 'texto-rojo'
    };
   
   
   
  })(jQuery);