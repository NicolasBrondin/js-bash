var   lang = 'en';
var cmd_clear = function() {
    $('.old').remove();
    return '';
};

function clean(s) {
    var r = s.toLowerCase();
    return r.replace(new RegExp("[àáâãäå]", 'g'),"a")
            .replace(new RegExp("æ", 'g'),"ae")
            .replace(new RegExp("ç", 'g'),"c")
            .replace(new RegExp("[èéêë]", 'g'),"e")
            .replace(new RegExp("[ìíîï]", 'g'),"i")
            .replace(new RegExp("ñ", 'g'),"n")                    
            .replace(new RegExp("[òóôõö]", 'g'),"o")
            .replace(new RegExp("œ", 'g'),"oe")
            .replace(new RegExp("[ùúûü]", 'g'),"u")
            .replace(new RegExp("[ýÿ]", 'g'),"y");
};

var cmd_lang = function(text) {
    if(clean(text).indexOf(clean(" fr"))!=-1){
        lang = 'fr';
        return 'langue changée';
    } else if(clean(text).indexOf(clean(" en"))!=-1) {
        lang = 'en';
        return 'language changed';
    } else {
        return 'language not found';
    }
};


var cmd_help = function() {
    var html = '<table class="old">';
    for(item of plugins) {
        html += "<tr><td>"+item.manual[lang].usage+"</td><td>"+item.manual[lang].description+"</td></tr>";
    }
    return html+"</table>";
};

plugins = plugins.concat([
{ name:"clear", 
      callback:cmd_clear,
      manual:{
        en:{ usage:'clear', description:'clear the console'},
        fr:{ usage:'clear', description:'efface la console'}
      }
},{ name:"help", 
      callback:cmd_help,
      manual:{
        en:{ usage:'help', description: 'list all the commands available in the console'},
        fr:{ usage:'help', description: 'liste toutes les commandes disponibles'}
      }
    },
    { name:"lang", 
      callback:cmd_lang,
      manual:{
        en:{ usage:"lang 'fr'", description:'change the language'},
        fr:{ usage:"lang 'en'", description:'change la langue'}
      }
    }]);