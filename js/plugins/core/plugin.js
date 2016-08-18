var CorePlugin = function() {
    
    this.vars = { lang:'en' };
    
    this.functions = {
        clean: function(s) {
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
        },
        update: function(event) {
            //TO-DO
        }
    };
    
    this.cmds = {
        "clear":{ 
            callback: function() {
                $('.old').remove();
                return '';
            },
            manual:{
                en:{ usage:'clear', description:'clear the console'},
                fr:{ usage:'clear', description:'efface la console'}
            }
        },
        "help":{ 
            callback:function() {
                var html = '<table class="old">';
                for(plugin of plugins) {
                    for(cmd in plugin.cmds) {
                        console.log(plugin);
                        html += "<tr><td>"+plugin.cmds[cmd].manual[this.vars.lang].usage+"</td><td>"+plugin.cmds[cmd].manual[this.vars.lang].description+"</td></tr>";
                    }
                }
                return html+"</table>";
            }.bind(this),
            manual:{
                en:{ usage:'help', description: 'list all the commands available in the console'},
                fr:{ usage:'help', description: 'liste toutes les commandes disponibles'}
            }
        },
        "lang":{ 
            callback:function(text) {
                if(this.functions.clean(text).indexOf(this.functions.clean(" fr"))!=-1){
                    this.vars.lang = 'fr';
                    return 'langue changée';
                } else if(this.functions.clean(text).indexOf(this.functions.clean(" en"))!=-1) {
                    this.vars.lang = 'en';
                    return 'language changed';
                } else {
                    return 'language not found';
                }
            }.bind(this),
            manual:{
                en:{ usage:"lang 'fr'", description:'change the language'},
                fr:{ usage:"lang 'en'", description:'change la langue'}
            }
        },
        "github":{
            callback:function() {
                window.open('https://github.com/NicolasBrondin/cli-resume', '_blank');
                return '';
            },
            manual:{
                en:{ usage:"github", description:'open the GitHub repo of this resume'},
                fr:{ usage:"github", description:'ouvre le repo GitHub du CV'}
            }
        },
        "awesome":{
            callback:function() {
                window.open('https://www.youtube.com/watch?v=SCwcJsBYL3o', '_blank');
                return '';
            },
            manual:{
                en:{ usage:"awesome", description:'surprise...'},
                fr:{ usage:"awesome", description:'surprise...'}
            }
        }
    }
};


plugins = plugins.concat([new CorePlugin()]);
