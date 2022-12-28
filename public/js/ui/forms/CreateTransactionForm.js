
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
    document.querySelector("#income-accounts-list").innerHTML = '';
    document.querySelector("#expense-accounts-list").innerHTML = '';
    let user = User.current();
    Account.list(user, (err,response)=>{
      if(response.success && response){
        if(this.element.id == 'new-income-form'){
         
          for(let item in response.data){
            document.getElementById('income-accounts-list').insertAdjacentHTML('beforeEnd',`
              <option value="${response.data[item]['id']}">${response.data[item]['name']}</option>`
            )
          }
        } else if(this.element.id == 'new-expense-form'){
          
          for(let item in response.data){
            document.getElementById('expense-accounts-list').insertAdjacentHTML('beforeEnd',`
              <option value="${response.data[item]['id']}">${response.data[item]['name']}</option>`
            )
          }
        }
      }else{
        err = new Error ('Не удалось получить список')
      }
    });
    
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response)=>{
      if(response && response.success){
        App.update();
        this.element.reset();
        if(this.element.id == 'new-income-form'){
          App.getModal('newIncome').close();
        } else if(this.element.id == 'new-expense-form'){
          App.getModal('newExpense').close();
        }
      }
    })
    }
    
}