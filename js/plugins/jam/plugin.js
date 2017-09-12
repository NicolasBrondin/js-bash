var JamPlugin = function(parent) {
    this.parent = parent;
    this.process_launched = false;
    this.vars = {
        
    };
    this.functions = {
        
    };
    
    this.processes = {
        jam: function(input){
            alert(input);
            if(input == "quit"){
                console.log("quit");
            this.process_launched = false;
                console.log(this);
            }
            return true;
        }.bind(this)
    };

    this.cmds = {
        "jam":{  
            callback: function() {
                setInterval(function(){console.log(document.body.style.backgroundColor);},1000);
                this.process_launched = true;
                this.parent.write_something("jam launched");
                return true;
            }.bind(this),
            manual:{
                en:{ usage:'jam', description:'start the code jam'},
                fr:{ usage:'jam', description:'démarre le code jam'}
            }
        }
    };
    
    this.std_in = function(input){
        console.log(this);
        if(!this.process_launched){
            if(this.cmds[input.split(' ')[0]]){
                return this.cmds[input.split(' ')[0]].callback(input.split(' ')[1]);
            }
        } else {
            return this.processes.jam(input);
        }
    };
};