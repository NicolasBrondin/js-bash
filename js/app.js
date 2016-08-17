var text= new Array();
    var lang = 'en';
    var index= 0;

function readfile(filename) {
    var info;
    $.ajax({ type: 'GET',
            async: false,
            url: filename,
            dataType: 'text',
            success:function(data){info=data;}
    });
            return info;
}

function recognize(text) {
    if(clean(text)==clean('help'))
    {
        if(lang=='en')
        {
            return '<table class="old"><tr><td>ls</td><td>show all the categories of my CV</td></tr><tr><td>cat \'category\'</td><td> show the content of the select category</td></tr><tr><td>clear</td><td>clear the console</td></tr><tr><td>lang</td><td>add parameter \'fr\' or \'en\' to change the language</td></tr></table>';
        }
        else if(lang=='fr')
        {
            return '<table class="old"><tr><td>ls</td><td>affiche toutes les catégories de mon cv</td></tr><tr><td>cat \'catégorie\'</td><td> affiche le contenu de la catégorie sélectionnée</td></tr><tr><td>clear</td><td>efface la console</td></tr><tr><td>lang</td><td>ajouter le paramètre \'fr\' ou \'en\' pour changer la langue</td></tr></table>';
        }
    }
    else if(clean(text)==clean('ls'))
    {
        if(lang=='en')
        {
            return '<table class="old"><tr><td>Profile</td></tr><tr><td>Education</td></tr><tr><td>Competences</td></tr><tr><td>Experience</td></tr><tr><td>Hobbies</td></tr></table>';
        }
        else if(lang=='fr')
        {
            return '<table class="old"><tr><td>Profil</td></tr><tr><td>Etudes</td></tr><tr><td>Compétences</td></tr><tr><td>Expérience</td></tr><tr><td>Hobbies</td></tr></table>';
        }
    }
    else if(clean(text)==clean('clear'))
    {
        $('.old').remove();
        return '';
    }
    else if(clean(text).indexOf(clean("lang "))!=-1)
    {
        if(clean(text).indexOf(clean(" fr"))!=-1)
        {
            lang = 'fr';
            return 'langue changée';
        }
        else if(clean(text).indexOf(clean(" en"))!=-1)
        {
            lang = 'en';
            return 'language changed'
        }
        else
        {
            return 'language not found'
        }

    }
    else if(clean(text).indexOf(clean("cat "))!=-1)
    {
        if(clean(text).indexOf(clean("Profile"))!=-1 || clean(text).indexOf(clean("Profil"))!=-1)
        {
            if(lang=='en') return readfile('profile_en.txt');
            else if(lang=='fr')	return readfile('profil_fr.txt');
        }
        else if(clean(text).indexOf(clean("Education"))!=-1 || clean(text).indexOf(clean("Etudes"))!=-1)
        {
            if(lang=='en') return readfile('education_en.txt');
            else if(lang=='fr')	return readfile('etudes_fr.txt');					
        }
        else if(clean(text).indexOf(clean("Compétences"))!=-1)
        {
            if(lang=='en') return readfile('competences_en.txt');
            else if(lang=='fr')	return readfile('competences_fr.txt');					
        }
        else if(clean(text).indexOf(clean("Expérience"))!=-1)
        {
            if(lang=='en') return readfile('experiences_en.txt');
            else if(lang=='fr')	return readfile('experiences_fr.txt');					
        }
        else if(clean(text).indexOf(clean("Hobbies"))!=-1)
        {
            if(lang=='en') return readfile('hobbies_en.txt');
            else if(lang=='fr')	return readfile('hobbies_fr.txt');						
        }
        else
        {
            if(lang =='en')	return 'category not found';
            else if(lang =='fr') return 'catégorie inconnue';
        }
    }
    else
    {
        if(lang =='en')	return 'command not found';
        else if(lang == 'fr') return 'commande inconnue';
    }
}

function clean(s) {
    var r=s.toLowerCase();
    r = r.replace(new RegExp("[àáâãäå]", 'g'),"a");
    r = r.replace(new RegExp("æ", 'g'),"ae");
    r = r.replace(new RegExp("ç", 'g'),"c");
    r = r.replace(new RegExp("[èéêë]", 'g'),"e");
    r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
    r = r.replace(new RegExp("ñ", 'g'),"n");                            
    r = r.replace(new RegExp("[òóôõö]", 'g'),"o");
    r = r.replace(new RegExp("œ", 'g'),"oe");
    r = r.replace(new RegExp("[ùúûü]", 'g'),"u");
    r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
    return r;
};

function handleKeyDown(event) {
    if(event.which==13)
				{
					text.push($('#enter').val());
					$('#enter').val('');
					
					var oldtext = '<p class="old"><span>Nicolas@Brondin></span>'+text[text.length-1]+'</p>';
					$(oldtext).insertBefore('#current');
					var newtext = '<p class="old">'+recognize(text[text.length-1])+'</p>';
					$(newtext).insertBefore('#current');
					$.scrollTo('#current',20);
					index=0;
				}
				//Gestion de l'historique des commandes
				if(event.which==38)
				{
					if(index<text.length)
					{
						$('#enter').val(text[text.length-1-index]);
						index++;
					}
				}
				if(event.which==40)
				{
					if(index>0)
					{
						index--;
						$('#enter').val(text[text.length-1-index]);
					}
				}
				//Gestion de l'autocomplétion
				if(event.which==9)
				{
					$('#enter').focus();
					if(event.preventDefault) 
					{
                		event.preventDefault();
            		}
				}
};

$(document).ready(function() {
    $('#enter').focus();
    
    $(document).click(function() { $('#enter').focus(); });
    $('#enter').keydown(handleKeyDown);			
});

		