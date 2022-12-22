
/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let select;
    let response = Account.list();
    if(this.element.id == 'new-income-form'){
      select = document.getElementById('income-accounts-list');
    } else if(this.element.id == 'new-expense-form'){
      select = document.getElementById('expense-accounts-list');
    }
    for(let item in response){
    select.insertAdjacentHTML('beforeEnd',`
      <option value="${response[item]['id']}">${response[item]['name']}</option>`
    )
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data)
    if(response && response.user){
      App.update();
      this.element.reset();
      if(this.element.id == 'new-income-form'){
        App.getModal('newIncome').close();
      } else if(this.element.id == 'new-expense-form'){
        App.getModal('newExpense').close();
      }
    }
  }
}