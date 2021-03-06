var Console = function (element){
    
    this.plugins = [];
    this.plugins_set = {};
    this.config;
    this.text= [];
    this.index= 0;

    
    this.recognize = function(text) {
        var b = false;
        this.plugins.forEach(function(p){
            if(!b){
                b = p.std_in(text);
                console.log(b);
            }
        });
    }.bind(this);
    
    this.write_something = function(s){
        var html = document.documentElement;
        var current_element = document.getElementById('current');
         var body = document.getElementsByTagName('body')[0];
        var last_text_element = document.createElement('p');
            last_text_element.setAttribute('class','old');
        last_text_element.innerHTML = s;
        body.insertBefore(last_text_element, current_element);
        
        body.scrollTop = current.getBoundingClientRect().y;
            html.scrollTop = current.getBoundingClientRect().y;
    };

    this.handleKeyDown = function(event) {
        var input_element = document.getElementById('enter');
        var current_element = document.getElementById('current');
        var body = document.getElementsByTagName('body')[0];
        var html = document.documentElement;
        if(event.which==13) {
            this.text.push(input_element.value);
            var last_text = this.text[this.text.length-1];
            input_element.value = '';
            
            var old_text_element = document.createElement('p');
            old_text_element.setAttribute('class','old');
            old_text_element.innerHTML = '<span>'+config.session+'</span>'+last_text;
            
            body.insertBefore(old_text_element, current_element);
            var t = this.recognize(last_text);
            if(t){
            last_text_element.innerHTML = t;
            
            console.log(old_text_element);
            console.log(last_text_element);
            console.log(current_element);
            
            body.insertBefore(last_text_element, current_element);
            }
            
            body.scrollTop = current.getBoundingClientRect().y;
            html.scrollTop = current.getBoundingClientRect().y;

            this.index=0;
        } else if(event.which==38) {
            //Gestion de l'historique des commandes
            if(this.index<this.text.length){
                input_element.value = this.text[this.text.length-1-this.index];
                this.index++;
            }
        } else if(event.which==40) {
            if(this.index>0){
                this.index--;
                input_element.value = this.text[this.text.length-1-this.index];
            }
        } else if(event.which==9) {
            //Gestion de l'autocomplétion
            input_element.focus();
            
            if(event.preventDefault) {
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
            document.addEventListener('click',function() { document.getElementById("enter").focus(); });
            document.getElementById('enter').addEventListener('keydown',this.handleKeyDown);	
        }.bind(this));

        //Load all the plugins
        load_json_file("js/plugins/dependencies.json",  function(manifest) {
          for(var p of manifest) {
              load_script_file(p, 'js/plugins/'+p.url+"/plugin.js", function(pl) {
                  var o = new window[pl.class_name](this);
                  this.plugins.push(o);
                  this.plugins_set[pl.class_name] = o;
              }.bind(this));
          }
        }.bind(this));
    }
    
    this.init();
};

var c = new Console();


		