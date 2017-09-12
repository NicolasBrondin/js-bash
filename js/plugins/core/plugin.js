var CorePlugin = function(parent) {
    
    this.parent = parent;
    
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
            callback: function(parameters) {
                var to_remove = [];
                to_remove = document.querySelectorAll('.old');
                to_remove.forEach(function(r){
                    document.body.removeChild(r);
                });
            },
            manual:{
                en:{ usage:'clear', description:'clear the console'},
                fr:{ usage:'clear', description:'efface la console'}
            }
        },
        "help":{ 
            callback:function(parameters) {
                var html = '<table class="old">';
                for(p of this.parent.plugins) {
                    for(cmd in p.cmds) {
                        console.log(p);
                        html += "<tr><td>"+p.cmds[cmd].manual[this.vars.lang].usage+"</td><td>"+p.cmds[cmd].manual[this.vars.lang].description+"</td></tr>";
                    }
                }
                this.parent.write_something(html+"</table>");
            }.bind(this),
            manual:{
                en:{ usage:'help', description: 'list all the commands available in the console'},
                fr:{ usage:'help', description: 'liste toutes les commandes disponibles'}
            }
        },
        "lang":{ 
            callback:function(parameters) {
                console.log(parameters);
                var text = parameters[0];
                if(this.functions.clean(text).indexOf(this.functions.clean("fr"))!=-1){
                    this.vars.lang = 'fr';
                    this.parent.write_something('langue changée');
                } else if(this.functions.clean(text).indexOf(this.functions.clean("en"))!=-1) {
                    this.vars.lang = 'en';
                    this.parent.write_something('language changed');
                } else {
                    this.parent.write_something('language not found');
                }
            }.bind(this),
            manual:{
                en:{ usage:"lang 'fr'", description:'change the language'},
                fr:{ usage:"lang 'en'", description:'change la langue'}
            }
        },
        "github":{
            callback:function(parameters) {
                window.open('https://github.com/NicolasBrondin/cli-resume', '_blank');
                
            },
            manual:{
                en:{ usage:"github", description:'open the GitHub repo of this resume'},
                fr:{ usage:"github", description:'ouvre le repo GitHub du CV'}
            }
        },
        "awesome":{
            callback:function(parameters) {
                window.open('https://www.youtube.com/watch?v=SCwcJsBYL3o', '_blank');
               
            },
            manual:{
                en:{ usage:"awesome", description:'surprise...'},
                fr:{ usage:"awesome", description:'surprise...'}
            }
        }
    }
    
    this.std_in = function(input){
        if(this.cmds[input.split(' ')[0]]){
            var parameters = input.split(' ');
            parameters.splice(0,1);
            return this.cmds[input.split(' ')[0]].callback(parameters);
        }
    };
};
