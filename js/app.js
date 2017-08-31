var Console = function (element){
    
    this.plugins = [];
    this.config;
    this.text= [];
    this.index= 0;

    
    this.recognize = function(text) {
        for(var p of this.plugins) {
            for(var cmd in p.cmds) {
                if(text.indexOf(cmd) != -1) {
                    return p.cmds[cmd].callback(text);
                }
            }
        }

        /*if(lang =='fr') {
            return 'commande inconnue';
        } else { */
            return 'command not found';
        //}
    }.bind(this);

    this.handleKeyDown = function(event) {
        if(event.which==13) {
            this.text.push($('#enter').val());
            $('#enter').val('');

            var oldtext = '<p class="old"><span>Nicolas@Brondin></span>'+this.text[this.text.length-1]+'</p>';
            $(oldtext).insertBefore('#current');
            var newtext = '<p class="old">'+this.recognize(this.text[this.text.length-1])+'</p>';
            $(newtext).insertBefore('#current');
            $.scrollTo('#current',20);
            this.index=0;
        } else if(event.which==38) {
            //Gestion de l'historique des commandes
            if(this.index<this.text.length)
            {
                $('#enter').val(this.text[this.text.length-1-this.index]);
                this.index++;
            }
        } else if(event.which==40) {
            if(this.index>0)
            {
                this.index--;
                $('#enter').val(this.text[this.text.length-1-this.index]);
            }
        } else if(event.which==9) {
            //Gestion de l'autocomplétion
            $('#enter').focus();
            if(event.preventDefault) 
            {
                event.preventDefault();
            }
        }
    }.bind(this);
    
    this.init = function(){
        //Init the CLI with the config file
        load_json_file("js/config.json", function(data) {
            config = data;
            document.title = config.title;
            var welcome_text = document.createElement('p');
            welcome_text.innerHTML = config.welcome;
            var session_text= document.createElement('p');
            session_text.setAttribute('id','current');
            session_text.innerHTML = '<span>'+config.session+'</span><input type="text" id="enter" size="70"/>'
             document.getElementsByTagName('body')[0].appendChild(welcome_text);
             document.getElementsByTagName('body')[0].appendChild(session_text);
            document.getElementById("enter").focus();
            document.addEventListener('click',function() { $('#enter').focus(); });
            document.getElementById('enter').addEventListener('keydown',this.handleKeyDown);	
        }.bind(this));

        //Load all the plugins
        load_json_file("js/plugins/dependencies.json",  function(manifest) {
          for(var p of manifest) {
              load_script_file(p, 'js/plugins/'+p.url+"/plugin.js", function(pl) {
                  console.log("plugin loaded", window[pl.class_name]);
                  var o = new window[pl.class_name](this);
                  console.log(o);
                  this.plugins.push(o);
                  console.log(this.plugins);
              }.bind(this));
          }
        }.bind(this));
    }
    
    this.init();
};

var c = new Console();


    


		