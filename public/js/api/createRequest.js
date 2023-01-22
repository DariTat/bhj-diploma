/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options) => {

    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    const { data, url, method, callback } = options;
    try{
        xhr.open(method, url);
        xhr.send(data);
    } catch(e){
        console.log(e);
    }
    xhr.onload = function(){
       callback(null, xhr.response);
    }      
}
    
    
