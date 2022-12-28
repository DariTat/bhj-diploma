/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static URL = '';
  static list(data, callback){  
    if(this.URL == '/transaction'){
      createRequest({
        url: this.URL + '?account_id=' + data,
        data, 
        method:'GET',
        callback: (err, response) =>{
            if(response.success && response){
              console.log('Получен список данных')
            }else{
              err = new Error ('Не удалось получить данные')
            }
          callback(err, response);
        }
      })} else {
        createRequest({
          url: this.URL,
          data, 
          method:'GET',
          callback: (err, response) =>{
              if(response.success && response){
                console.log('Получен список данных')
              }else{
                err = new Error ('Не удалось получить данные')
              }
            callback(err, response);
          }
        })
      }
      
    
    
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest({
      url: this.URL,
      data, 
      method:'PUT',
      callback: (err, response)=>{
        if(response.user && response){
          console.log ('Создаем счёт/расход/доход')
        }else{
          err = new Error ('Не удалось создать счёт/расход/доход')
        }
        callback(err,response);
      }
    })
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback) {
    createRequest({
      url: this.URL,
      data, 
      method:'DELETE',
      callback: (err, response)=>{
        if(response.success && response){
          console.log ('Успешно удален')
        }else{
          err = new Error ('Не удалось удалить счёт/расход/доход')
        }
        callback(err,response);
      }
    })
  }
}
