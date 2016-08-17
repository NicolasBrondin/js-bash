var cat = { 
    en:['Profile','Education','Competences','Experience','Hobbies'],
    fr:['Profil','Etudes','Compétences','Expérience','Hobbies']
};

function readfile(filename) {
    var info;
    $.ajax({ type: 'GET', async: false, url: 'js/plugins/resume/data/'+filename, dataType: 'text', success:function(data){
        info=data;
    }});
    return info;
}

var cmd_ls = function() {
    var html = '<table class="old">';
    for(item of cat[lang]) {
        html += "<tr><td>"+item+"</td></tr>";
    }
    return html+"</table>";
};


var cmd_cat = function(text) {
    var cat_string = clean(text);
    for(c of cat[lang]) {
        if(cat_string.indexOf(clean(c))!=-1) {
            content = readfile(clean(c)+'_'+lang+'.txt');
            if(content)
                return content;
        }
    }
    
    if(lang =='fr') {
        return 'catégorie inconnue';
    } else {
        return 'category not found';
    }
};

plugins = plugins.concat([    { name:"ls", 
      callback:cmd_ls,
      manual:{
        en:{ usage:'ls', description:'show all the categories of my résumé'},
        fr:{ usage:'ls', description:'affiche toutes les catégories de mon cv'}
      }
    },
    { name:"cat", 
      callback:cmd_cat,
      manual:{
        en:{ usage:"cat 'category'", description:'display the content of the selected category'},
        fr:{ usage:"cat 'catégorie'", description:'affiche le contenu de la catégorie sélectionnée'}
      }
    }]);