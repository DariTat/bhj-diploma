/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    this.element = element;
    this.update();
    this.registerEvents();
    
    if (element == ''){
      throw new Error ('element undefined');
    }
    
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      let e = event.target;

      if(e.className.includes('create-account')){
        App.getModal('createAccount').open();
      } 
      let account = e.closest(".account");
    
      if(account){
        this.onSelectAccount(account);
      }
     
    })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    let user = User.current();
    if(user){
      Account.list(user, (err,response)=>{
        if(response.success && response){
          this.clear();
          for(let item in response.data){
            this.renderItem(response.data[item]);
          }
        }else {
          err = new Error ('Не удалось получить список счетов')
        }
      });  
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    [...this.element.querySelectorAll('.account')].forEach((item) => item.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
   
    const accounts = [...this.element.querySelectorAll('.account')]
    let index = accounts.findIndex((item) => item.className.includes('active'));
    if(index == -1){
      console.log('активный класс не найден')
      element.classList.add("active");
    }else {
      accounts[index].classList.remove("active");
      console.log('удален активный класс')
      element.classList.add("active");
    }
    App.showPage('transactions', {'account_id': element.dataset.id});
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `<li class="account" data-id=${item.id}>
      <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum}</span>
      </a>
    </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    this.element.innerHTML += this.getAccountHTML(data);
  }
}
