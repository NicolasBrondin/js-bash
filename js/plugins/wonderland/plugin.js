var WonderlandPlugin = function(parent) {
    this.parent = parent;
    this.process_launched = false;
    
    this.vars = {
        
    };
    
    this.functions = {
        
    };
    
    this.processes = {
        wonderland: function(input){
            if(input == "quit"){
                this.parent.write_something("/** You exited wonderland, see you ! **/");
                this.process_launched = false;
            } else if(input == "start") {
                this.parent.write_something("/** You can look around you by typing 'ls', try it **/");
            } else if(input == "ls"){
                this.parent.write_something("house forest road chest");
            this.parent.write_something("/** To open something you can type 'cat' plus the name of the object, try it ! **/");
            }else {
                var r;
                try{
                    r = eval(input);
                }catch(e){
                    
                }
                this.parent.write_something("/** "+r+" **/");
            }
            return true;
        }.bind(this)
    };

    this.cmds = {
        "wonderland":{  
            callback: function(parameters) {
                setInterval(function(){console.log(document.body.style.backgroundColor);},1000);
                this.process_launched = true;
                this.parent.write_something("/** You entered the wonderland, your goal is to find the white rabbit and get a special code to get the job ! **/");
                this.parent.write_something("/** To start you journey, type 'start', to exit the wonderland and give up, type 'quit'. **/");
                return true;
            }.bind(this),
            manual:{
                en:{ usage:'wonderland', description:'enter the wonderland'},
                fr:{ usage:'wonderland', description:'entre au pays des merveilles'}
            }
        }
    };
    
    this.std_in = function(input){
        if(!this.process_launched){
            if(this.cmds[input.split(' ')[0]]){
                var parameters = input.split(' ');
                parameters.splice(0,1);
                return this.cmds[input.split(' ')[0]].callback(parameters);
            }
        } else {
            return this.processes.wonderland(input);
        }
    };
};