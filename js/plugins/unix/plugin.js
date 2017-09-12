var UnixPlugin = function(parent) {
    this.parent = parent;
    this.process_launched = false;
    
    this.vars = {
        
    };
    
    this.functions = {
        
    };
    
    this.processes = {
        jam: function(input){
            if(input == "quit"){
                this.parent.write_something(">> Node exited <<");
                this.process_launched = false;
            } else {
                var r;
                try{
                    r = eval(input);
                }catch(e){
                    
                }
                this.parent.write_something("Node >> "+r);
            }
            return true;
        }.bind(this)
    };

    this.cmds = {
        "node":{  
            callback: function(parameters) {
                setInterval(function(){console.log(document.body.style.backgroundColor);},1000);
                this.process_launched = true;
                this.parent.write_something(">> Node started <<");
                return true;
            }.bind(this),
            manual:{
                en:{ usage:'node', description:'start the code jam'},
                fr:{ usage:'node', description:'démarre le code jam'}
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
            return this.processes.jam(input);
        }
    };
};