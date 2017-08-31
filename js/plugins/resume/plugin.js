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
            $.ajax({ type: 'GET', async: false, url: 'js/plugins/resume/data/'+filename, dataType: 'text', success:function(data){
                info=data;
            }});
            return info;
        }
    };

    this.cmds = {
            "ls":{  
                callback: function() {
                    var html = '<table class="old">';
                    for(item of this.vars.cat[this.parent.plugins[0].vars.lang]) {
                        html += "<tr><td>"+item+"</td></tr>";
                    }
                    return html+"</table>";
                }.bind(this),
                manual:{
                    en:{ usage:'ls', description:'show all the categories of my résumé'},
                    fr:{ usage:'ls', description:'affiche toutes les catégories de mon cv'}
                }
            },

        
            "cat":{ 
                callback: function(text) {
                    var cat_string = clean(text);
                    for(c of cat[this.parent.plugins[0].vars.lang]) {
                        if(cat_string.indexOf(clean(c))!=-1) {
                            content = readfile(clean(c)+'_'+this.parent.plugins[0].vars.lang+'.txt');
                            if(content)
                            return content;
                        }
                    }
    
                    if(this.parent.plugins[0].vars.lang =='fr') {
                        return 'catégorie inconnue';
                    } else {
                        return 'category not found';
                    }
                }.bind(this),
                manual:{
                    en:{ usage:"cat 'category'", description:'display the content of the selected category'},
                    fr:{ usage:"cat 'catégorie'", description:'affiche le contenu de la catégorie sélectionnée'}
                }
            }
        }
};