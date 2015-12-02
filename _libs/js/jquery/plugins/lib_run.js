//   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
function loadAjax(_func_name, _dados, _box, _top, _func_exe){
    //console.log("\n loadAjax: "+window.path['url']);
    if(typeof(_dados) == 'string'){
        _dados = _dados.split(',');
        for(var i=0; i<_dados.length; i++){ _dados[i] = _dados[i].trim();}
    }
    dados = "";
    for(i=0;i<_dados.length;i++){ dados += "ajax_value"+(i+1)+"="+ _dados[i] +"&"; }
    if(_top) window.scrollBy(0,0);
    $.ajax({
        type    : "GET",
        url     : window.path['url'],
        global  : false,
        contentType: "text/plain; charset=UTF-8",
        data    : "ajax_method="+ _func_name +"&"+ dados,
        dataType: "html",
        success : function(content){
            if(content.indexOf('pag_login') > 0){
                winBox('confirm', {
                    'title'       : 'A sessão expirou',
                    id            : "status_login",
                    'reset'       : true,
                    'background'  : true,
                    'class'       : 'box_remover_anexo_imovel',
                    'content'     : "<p> O seu login expirou, faça seu login novamente. <br />Seus dados editados na página atual serão perdidos. </p>",
                    center        : true,
                    handle        : '.win_box',
                    width         : '500px',
                    height        : '160px',
                    'ok'          : "Ir para página de login",
                    ok_callback   : function() {
                      window.location.href = window.path['url'];
                    }
                });
                return;
            }
            //console.log("\n loadAjax: "+_dados);
            //console.log("\n loadAjax: "+content);
            if(_func_exe) _func_exe(content);//  eval(_func_exe+"("+content+")");
            else if(_box) $(_box).html(content);
        },
        error:function (xhr, ajaxOptions, thrownError){
          console.log(xhr.status);
          console.log(thrownError);
        }
    });
}
//   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -