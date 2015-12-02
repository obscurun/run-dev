(function($){
	//gerencia qual método será chamado
	$.fn.winBox = function(){			
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		//métodos do plugin
		var exe = {
			remove_click : function(){
				return false;	
			},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			init : function(options){		
				return this.each(function(){
					bt = $(this);	
					bt.addClass('bt_winbox');
					bt.bind('click', exe.open);
				});		
			},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			destroy : function(){
				return this.each(function(){
					$(this).unbind('click');
				})
			},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			set_background : function(){
				if($('#back_'+ win_id ).length < 1) $('body').append("<div id='back_"+ win_id +"' class='win_back'> </div>");
				$('#back_'+ win_id ).css({'opacity':'0', 'display':'block'}).animate({opacity:options['opacity']},{duration: options['duration'], easing: options['easing'], complete:function(p){  } });
				win_back = $('#back_'+ win_id );			
			},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			set_bt_close : function(){
				if(win_box.find('.bt_close').length < 1) win_box.append("<div class='bt_close' title='" + options['titleClose'] + "'>Fechar </div>");
				win_box.find('.bt_close').bind("click", function(){
					$(this).parent().fadeOut(50);
					if(options['background'] == true) $('#back_'+ win_id ).hide();
					else if(options['background'] == null) $('#back_'+ win_id ).hide();
					options['close_callback'].apply();
				});
				
			},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -	
			set_win_box : function(){
				if(win_box.length < 1){ $(options['container']).append("<div id='"+ win_id +"' class='win_box "+ options['class'] +"'><div class='interno'>"+ options['html'] +"</div></div>");	}
				win_box = $('#'+ win_id );			
				win_box.bind('close', function(){ $(this).find('.bt_close').trigger('click'); });
				//if(options['center']) win_box.css({"left":((getClientWidth()/2)-(win_box.width()/2))+"px","top":((getClientHeight()/2)-(win_box.height()/2))+"px"});
			},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			set_content	: function(){
				if(win_box.find('.win_content').length < 1){ 
					if(win_box.find('.interno').length > 0) win_box.find('.interno').append("<div class='win_content load_icon'></div>");
					else win_box.append("<div class='win_content load_icon'></div>"); 
				}
				if(typeof(options['content']) == "string" && options['content'].length > 0){
					win_box.find('.win_content').html( options['content'] ); 
					if(options['execute']){
						 options['execute'].apply(); 
					}  	
				}
				win_content = win_box.find('.win_content');
				if(typeof(options['ajax']) == "string" && options['ajax'].length > 0 && win_content.html() == ""){
					win_content.html("<div class='loading'>  </div>");
					window.setTimeout(function(){ 
						$.ajax( {
								url : options['ajax'],
								cache: false,
								dataType : "html",
								success : function(conteudo) {
									win_content.html(conteudo);
									if(typeof(options['execute']) == "function") options['execute'].apply();
									$('.win_content').removeClass('.load_icon');
								},
								error : function () {
									tAlert("Erro!", "Houve um erro ao carregar os dados.", 'OK', 300);
								} 
						});				
					}, 100 );
				}
			},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			set_control	: function(){
				$(document).bind('keyup', function(event){			
				  if(event.keyCode == '27') {
						win_box.find('.bt_close').click();
				   }
				});
			},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			set_title : function(){
				if(win_box.find('.title').length < 1) win_box.prepend('<div class="mini_header"><h3 class="title"></h3></div>');
				win_box.find('.title').html(options['title']);
			},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			set_iframe : function(){
				if(win_box.find('.win_iframe_content').length < 1){
					win_box.append( '<div class="win_iframe_content"><iframe class="win_iframe hide" onload=" _this=$(this); setTimeout(function(){_this.show();},100);" '+ options['iframe_settings'] +' style="width:100%;height:100%;margin:0 auto;border:0;" src="' + options['iframe'] + '"></iframe></div>');
				}
				win_box.find('.win_iframe').attr('src', options['iframe']);
			},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			set_draggable : function(){
				win_box.draggable({'handle':options['handle'],"containment" : $('.win_back')});
			},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			alert : function(){
				exe.open();
				win_box.addClass('box_alert');
				win_box.append('<div class="buttons"><button class="bt_ok">'+ options['ok'] +'</button></div>');
				win_box.find('.buttons > .bt_ok').bind('click', function(){
					check = options['ok_callback'].apply();
					if(check === false ) return false;
					if(options['background'] == true || $('#back_'+ win_id ).length > 0) $('#back_'+ win_id ).hide();
					$(this).parent().parent().fadeOut(options['duration']*.6);
				});
			},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			confirm : function(){
				exe.open();
				win_box.addClass('box_confirm');
				win_box.append('<div class="buttons"><button class="bt_ok">'+ options['ok'] +'</button><button class="bt_cancel">'+ options['cancel'] +'</button></div>');
				win_box.find('.buttons > .bt_ok').bind('click', function(){
					if(options['background'] == true || $('#back_'+ win_id ).length > 0 ) $('#back_'+ win_id ).hide();
					$(this).parent().parent().fadeOut(options['duration']*.6);
					options['ok_callback'].apply();
				});
				win_box.find('.buttons > .bt_cancel').bind('click', function(){
					if(options['background'] == true || $('#back_'+ win_id ).length > 0 ) $('#back_'+ win_id ).hide();
					$(this).parent().parent().fadeOut(options['duration']*.6);
					options['cancel_callback'].apply();
				});
			},
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			two_choices : function(){
				exe.open();
				win_box.addClass('box_confirm');
				win_box.append('<div class="buttons"><button class="bt_accept">'+ options['accept'] +'</button><button class="bt_refuse">'+ options['refuse'] +'</button><button class="bt_cancel">'+ options['cancel'] +'</button></div>');
				win_box.find('.buttons > .bt_accept').bind('click', function(){
					if(options['background'] == true || $('#back_'+ win_id ).length > 0 ) $('#back_'+ win_id ).hide();
					$(this).parent().parent().fadeOut(options['duration']*.6);
					options['accept_callback'].apply();
				});
				win_box.find('.buttons > .bt_refuse').bind('click', function(){
					if(options['background'] == true || $('#back_'+ win_id ).length > 0 ) $('#back_'+ win_id ).hide();
					$(this).parent().parent().fadeOut(options['duration']*.6);
					options['refuse_callback'].apply();
				});
				win_box.find('.buttons > .bt_cancel').bind('click', function(){
					if(options['background'] == true || $('#back_'+ win_id ).length > 0 ) $('#back_'+ win_id ).hide();
					$(this).parent().parent().fadeOut(options['duration']*.6);
					options['cancel_callback'].apply();
				});
			},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			open : function(){
				if(options['clearOpened'] == true){ if($('.win_box#'+options['id']).size() > 0) $('.win_box#'+options['id']).remove(); }
				win_id 		= options['id'];
				win_content = options['content'];
				win_back 	= "";
				win_box 	= $("#"+options['id']);
				if($('#'+ win_id ).length >= 1 && options['reset'] == true){  $('#'+ win_id ).html("")};
				if(options['background'] != false) exe.set_background();
				exe.set_win_box(); 
				exe.set_content();
				if(options['title']	!= null)	exe.set_title();
				if(options['iframe']!= null)	exe.set_iframe();

				_w = win_box.outerWidth();
				_h = win_box.outerHeight();
				//win_box.css({'marginLeft':-_w/2+'px','marginTop':-_h/2+'px' });
	
				if(options['maxZIndex'] === true){
					try{
						if(options['background'] != false) win_back.topZIndex();
					} catch(e){}
					win_box.topZIndex();
				}else if(typeof(options['maxZIndex']) == 'number' ){
					if(options['background'] != false) win_back.css('zIndex', options['maxZIndex']);
					win_box.css('zIndex', options['maxZIndex']+1);
				}
				exe.set_bt_close();
				win_box.fadeIn(250);
				if(options['width'] != null) win_box.css('width',options['width']);
				if(options['height'] != null) win_box.css('height',options['height']);
				
				if(options['center'] === true){
					win_box.css({'left': (($(window).width()/2) - (win_box.width()/2)) +"px"});
					win_box.css({'top': (($(window).height()/2) - ((win_box.height()+90)/2)) +"px"});
				}
				//alert((win_box.offset().top) +' > '+ $(window).height());
				
				switch (options['opening']) {
					case "fade":
						win_content.fadeIn(options['duration']);
						break
					case "slide":
						win_content.slideDown(options['duration']);
						break
					default: 
						win_content.show();
				}

				exe.set_control();
				if(options['draggable'] == true) exe.set_draggable();
				if(options['back_close'] == true) win_box.bind('close', function(){ $(this).find('.bt_close').trigger('click'); });
				if( typeof(_gaq) == "object" ){
					 _gaq.push(['_trackEvent', options['title'], 'clicked']);
				}
				
				if(options['exit'] != false && options['exit'] != null){
				    passouTempoMinimo = false;
                    setTimeout(function() {
                        passouTempoMinimo = true;
                    }, options['exit']);
				    
                    hoverIn = false;
                    win_box.hover(function(){
                        hoverIn = true;
                    }, function() {
                        hoverIn = false;
                    });
                    
                    intervaloWinbox = setInterval(function() {
                        if (passouTempoMinimo == true && hoverIn == false) {
                            clearInterval(intervaloWinbox);
                            switch (options['opening']) {
                                case "fade":
                                    win_box.fadeOut(options['duration']);
                                    break;
                                case "slide":
                                    win_box.slideUp(options['duration']);
                                    break;
                                default: 
                                    win_box.hide();
                                    break;
                            }
                        }
                    }, 1000);
				}
			}
		};
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		var options = new Object();
		var defaults = {
			'title'					:null,
			'titleClose'            :"Fechar janela",
			'id'					:"win_box",
			'html'					:"",
			'content'				:null,
			'container'				:'body',
			'class'					:null,
			'iframe'				:null,
			'ajax'					:null,
			'iframe_settings'		:'frameborder="no" border="no"',
			'background'			:null,
			'maxZIndex'				:true,
			'auto_resize'			:true,
			'draggable'				:true,
			'handle'				:'.mini_header',
			'execute'				:false,
			'reset'					:false,
			'opening'				:'show',
			'clearOpened'			:true,
			'center'				:true,
			'back_close'			:false,
			'opacity'				:.33,
			'duration'				:200,
			'easing'				:"easeOutExpo",
			'width'					:null,
			'height'				:null,
			'ok'					:"OK",
			'accept'				:"Aceitar",
			'refuse'				:"Recusar",
			'cancel'				:"Cancelar",
			'ok_callback'			:function(){},
			'accept_callback'		:function(){},
			'refuse_callback'		:function(){},
			'cancel_callback'		:function(){},
			'close_callback'		:function(){},
			'exit'				    :false
		};	
		var win_id;
		var win_content;
		var win_back;
		var win_box;	
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		if(exe[arguments[0]]){
			if(typeof(arguments[1] === 'object')) options = $.extend(defaults, arguments[1]);
			return exe[arguments[0]].apply( this, Array.prototype.slice.call(arguments, 1) );
		}
		else if(typeof(arguments[0] === 'object') || !method){
			options = $.extend(defaults, arguments[0]);
			return exe.init.apply(this, arguments);
		}
		else{
			$.error( 'O Método ' +  arguments[0] + ' nao existe em jQuery.winBox' );
		}
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -			
	};
})(jQuery);
// //////////////////////////////////////////////////////////////////
function winBox(param, config){ //param [confirm, alert]
	if(typeof(param) == 'string') $.fn.winBox(param, config);
	else $.fn.winBox('open', param);
}