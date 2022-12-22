/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    let data = options.data;
    let url = options.url;
    let method = options.method;
    let callback = options.callback;
    console.log(data)
    console.log(options)
    try{
        xhr.open(method, url);
        xhr.send(data);
    } catch(e){
        console.log(e);
    }
    xhr.onload = function(){
       //if(xhr.status === 200 && xhr.statusText === 'Ok'){
          
       // }
       callback(null, xhr.response);
    }      
}
    
    
