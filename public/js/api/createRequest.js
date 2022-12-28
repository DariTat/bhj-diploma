/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options) => {

    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    let data = options.data;
    let url = options.url;
    let method = options.method;
    let callback = options.callback;
    try{
        xhr.open(method, url);
        xhr.send(data);
    } catch(e){
        console.log(e);
    }
    xhr.onload = function(){
       console.log(xhr.response)
       callback(null, xhr.response);
    }      
}
    
    
