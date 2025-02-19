/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
    
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {

    createRequest({
      url: this.URL +'/current',
      method: 'GET',
      callback: (err, response) => {
        if(response && response.user) {
          this.setCurrent(response.user);
        }
        if(response.success === false){
         this.unsetCurrent();
        }
        if(err) {
          err = new Error('Ошибка получения информации о пользователе');
        }
        callback(err, response);
      }
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }else {
          err = new Error('Ошибка авторизации')
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      data,
      method: 'POST',
      url: this.URL + '/register',
      callback: (err, response) => {
        if(response && response.user){
          this.setCurrent(response.user);
        }else {
          err = new Error('Ошибка регистрации')
        }
        callback(err, response);
      }
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      method: 'POST',
      url: this.URL + '/logout',
      callback: (err, response) =>{
        if(response && response.success) {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    })
  }
}
