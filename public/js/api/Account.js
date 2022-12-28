/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static URL = '/account';
  static get(id, callback){
    createRequest({
      url: this.URL + '/' + id,
      method: 'GET',
      callback: (err, response)=>{
        if(response.user && response){
          console.log('Получили информацию о счете', response.user)
        }else{
          err = new Error ('Не удалось получить информацию')
        }
        callback(err, response);
      }
    })
  }
}
