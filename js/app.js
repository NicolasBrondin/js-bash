var text= [],
    lang = 'en',
    index= 0;
var plugins = [];

function recognize(text) {
    var cleaned = clean(text);
    for(c of plugins) {
        if(cleaned.indexOf(c.name) != -1) {
            return c.callback(cleaned);
        }
    }
    
    if(lang =='fr') {
        return 'commande inconnue';
    } else { 
        return 'command not found';
    }
    
}

function handleKeyDown(event) {
    if(event.which==13) {
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
    if(event.which==38) {
        if(index<text.length)
        {
            $('#enter').val(text[text.length-1-index]);
            index++;
        }
    }
    if(event.which==40) {
        if(index>0)
        {
            index--;
            $('#enter').val(text[text.length-1-index]);
        }
    }
    //Gestion de l'autocomplétion
    if(event.which==9) {
        $('#enter').focus();
        if(event.preventDefault) 
        {
            event.preventDefault();
        }
    }
};

$(document).ready(function() {
    
    $.ajax({dataType: "json", url:"js/plugins/plugins.json",  success: function(data) {
      for(p of data) {
          $.getScript( 'js/plugins/'+p.url+"/plugin.js", function(plugin) {
              //Plugins loaded
          });
      }
    }});
    
    $('#enter').focus();
    $(document).click(function() { $('#enter').focus(); });
    $('#enter').keydown(handleKeyDown);			
});

		