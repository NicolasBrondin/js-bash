function load_json_file(file, callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if(request.readyState === 4) {
        if(request.status === 200) { 
          callback(JSON.parse(request.responseText));
        } else {
          console.error('An error occurred during your request: ', request.status + ' ' + request.statusText);
        } 
      }
    }

    request.open('Get', file, true);
    request.send();
}

function load_text_file(file){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if(request.readyState === 4) {
        
      }
    }

    request.open('Get', file, false);
    request.send();
    if(request.status === 200) { 
          return request.responseText;
        } else {
          console.error('An error occurred during your request: ', request.status + ' ' + request.statusText);
            return null;
        } 
}


function load_script_file(pl, file, callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if(request.readyState === 4) {
        if(request.status === 200) { 
            window.eval(request.responseText);
            callback(pl);
        } else {
          console.error('An error occurred during your request: ', request.status + ' ' + request.statusText);
        } 
      }
    }

    request.open('Get', file, true);
    request.send();
}