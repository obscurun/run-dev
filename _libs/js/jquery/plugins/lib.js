window.console = window.console || (function(){
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
    return c;
})();

function StringBuffer() {
    this.buffer = [];
}
function StringBuffer(string) {
    this.buffer = [];
    this.buffer.push(string);
}
StringBuffer.prototype.append = function append(string) {
    this.buffer.push(string);
    return this;
};
StringBuffer.prototype.toString = function toString() {
    return this.buffer.join("");
};
Array.prototype.contains = function(element) {
    for ( var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
};
Array.prototype.removeByElement = function(element) {
    for ( var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            this.splice(i, 1);
        }
    }
};
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
};
String.prototype.ltrim = function() {
    return this.replace(/^\s+/, '');
};
String.prototype.rtrim = function() {
    return this.replace(/\s+$/, '');
};
String.prototype.isEmpty = function() {
    return this.trim().length == 0 ? true : false;
};
String.prototype.reverse = function() {
    return this.split("").reverse().join("");
};
String.prototype.removeDots = function() {
    str = this.replace(/\./g, "");
    str = str.replace(/-/g, "");
    str = str.replace(/\//g, "");
    return str;
};

String.prototype.removeAccentuation = function() {
    var torem = this;
    torem = torem.split('');
    toremout = new Array();
    toremlen = torem.length;
    var sec = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var rep = ['A','A','A','A','A','A','a','a','a','a','a','a','O','O','O','O','O','O','O','o','o','o','o','o','o','E','E','E','E','e','e','e','e','e','C','c','D','I','I','I','I','i','i','i','i','U','U','U','U','u','u','u','u','N','n','S','s','Y','y','y','Z','z'];
    for (var y = 0; y < toremlen; y++) {
        if (sec.indexOf(torem[y]) != -1) {
            toremout[y] = rep[sec.indexOf(torem[y])];
        } else {
            toremout[y] = torem[y];
        }
    }
    toascout = toremout.join('');
    return toascout;
};
function toInt(value) {
    value = parseInt(value);
    return isNaN(value) ? 0 : value;
}
function isArray(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
      return false;
   else
      return true;
}
function checkLength(val, xlength){
	return (jQuery.trim(val).length >= xlength);
}
function replaceAll(string, token, newtoken) {
	while (string.indexOf(token) != -1) {
		string = string.replace(token, newtoken);
	}
	return string;
}
function getCookie(cookieName) {
    var i, key, value, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        key = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        value = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        key = key.replace(/^\s+|\s+$/g, "");
        if (key == cookieName) {
            return unescape(value);
        }
    }
}
function setCookie(cookieName, value, days) {
    var cookieDate = new Date();
    cookieDate.setDate(cookieDate.getDate() + days);
    var cookieValue = escape(value) + ((days == null) ? "" : "; expires=" + cookieDate.toUTCString());
    document.cookie = cookieName + "=" + cookieValue;
}
function hasEvent(element, eventName) {
    var result = false;
    if ($(element).data("events")) {
        jQuery.each($(element).data("events"), function(i, event) {
            jQuery.each(event, function(i, handler) {
                jQuery.each(handler, function(name, value) {
                    if (name == "type" && value == eventName) {
                        result = true;
                    }
                });
            });
        });
    }
    return result;
}

function GetQueryUrl(name, query) {
    if(query == undefined) query = location.search;
    if (query.indexOf("?") == 0) { query = query.substr(1); }
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        if (pair[0] == name) {
            return pair[1];
        }
    }
    return "";
}
function getData(){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    return "Hora: "+h+":"+m+":"+s;
}
/**/


function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE");

    if (msie > 0)      // If Internet Explorer, return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
    else                 // If another browser, return 0
        return 0;

    return false;
}

function getInternetExplorerVersion(){
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}


if(getInternetExplorerVersion() > 1 && getInternetExplorerVersion() < 10){
    $('[placeholder]').focus(function() {
      var input = $(this);
      if(input.attr("type") == "password") return;
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(function() {
      var input = $(this);
      if(input.attr("type") == "password") return;
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    }).blur();

    $('[placeholder]').parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
        var input = $(this);
        if(input.attr("type") == "password") return;
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      })
    });
}