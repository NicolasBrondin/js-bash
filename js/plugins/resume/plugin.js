var ResumePlugin = function(parent) {
    this.parent = parent;
    this.vars = {
        cat :{ 
            en:['Profile','Education','Competences','Experiences','Contact'],
            fr:['Profil','Etudes','Compétences','Expériences','Contact']
        }
    };
    this.functions = {
        readfile: function(filename) {
            var info;
            info = load_text_file('js/plugins/resume/data/'+filename);
            return info;
        },
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
        }
    };

    this.cmds = {
            "ls":{  
                callback: function(parameters) {
                    var html = '<table class="old">';
                    for(item of this.vars.cat[this.parent.plugins_set['CorePlugin'].vars.lang]) {
                        html += "<tr><td>"+item+"</td></tr>";
                    }
                    //return html+"</table>";
                    this.parent.write_something(html+"</table>");
                }.bind(this),
                manual:{
                    en:{ usage:'ls', description:'show all the categories of my résumé'},
                    fr:{ usage:'ls', description:'affiche toutes les catégories de mon cv'}
                }
            },

        
            "cat":{ 
                callback: function(parameters) {
                    var text = parameters[0]
                    var cat_string = this.functions.clean(text);
                    for(c of this.vars.cat[this.parent.plugins_set['CorePlugin'].vars.lang]) {
                        if(cat_string.indexOf(this.functions.clean(c))!=-1) {
                            content = this.functions.readfile(this.functions.clean(c)+'_'+this.parent.plugins_set['CorePlugin'].vars.lang+'.txt');
                            if(content)
                            this.parent.write_something(content);
                        }
                    }
    /*
                    if(this.parent.plugins[0].vars.lang =='fr') {
                        this.parent.write_something('catégorie inconnue');
                    } else {
                        this.parent.write_something('category not found');
                    }*/
                }.bind(this),
                manual:{
                    en:{ usage:"cat 'category'", description:'display the content of the selected category'},
                    fr:{ usage:"cat 'catégorie'", description:'affiche le contenu de la catégorie sélectionnée'}
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