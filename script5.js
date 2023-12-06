let orders = [
  {
      id: 1,
      cardNumber: '5344 5346 1734 9573',
      orderNumber: '84832',
      amount: '783',
      clientName: 'Мусоголим Бенлан',
      timestamp: new Date(),
      comment: 'Быстрее!!!',
  },
  {
      id: 2,
      cardNumber: '4017 9383 0371 4283',
      orderNumber: '54237',
      amount: '1542',
      clientName: 'Мария Иванова',
      timestamp: new Date(),
      comment: 'ФЛвьпьфлваыв',
  }
];
let closedOrders = [];
let ordersTable;
let nextUserId = 3;
const historyButton = document.getElementById('historyButton');
const addButton = document.getElementById('addButton');




function renderOrdersTable(showHistory = false, filteredOrders) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; 
  
    const ordersToDisplay = showHistory ? closedOrders : (filteredOrders || orders);
  
    if (ordersToDisplay.length > 0) {
        const table = document.createElement('table');
        const headerRow = table.insertRow();
        
        const headers = ['ID', 'Номер карты', 'Заказ', 'Сумма (руб.)', 'Имя клиента', 'Время добавления', 'Комментарий', ''];
    
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.appendChild(document.createTextNode(headerText));
            headerRow.appendChild(th);
        });
    
        ordersToDisplay.forEach(order => {
            const row = table.insertRow();
    
            Object.keys(order).forEach(key => {
                const cell = row.insertCell();
                if (key === 'timestamp') {
                  cell.appendChild(document.createTextNode(formatTimestamp(order[key])));
                } else {
                  cell.appendChild(document.createTextNode(order[key]));
                }
            });

            const actionsCell = row.insertCell();
            const loggedIn = localStorage.getItem("loggedIn");
            actionsCell.innerHTML = `
    ${(showHistory) ? '' : `<button data-id="${order.id}" onclick="editOrder(this)">Редактировать</button>`}
    ${(showHistory) ? '' : `<button data-id="${order.id}" onclick="deleteOrder(this)" ${loggedIn === 'false' ? 'disabled' : ''}>Удалить</button>`}
    ${(showHistory) ? '' : `<button data-id="${order.id}" onclick="renameOrder(this)" ${loggedIn === 'false' ? 'disabled' : ''}>Переименовать</button>`}
    ${(showHistory) ? '' : `<button data-id="${order.id}" onclick="closeOrder(this)" ${loggedIn === 'false' ? 'disabled' : ''}>Закрыть</button>`}
`;
            
        });
    
        mainContent.appendChild(table);
    }
  
    const addOrderForm = document.createElement('form');
    addOrderForm.id = 'addOrderForm';
    addOrderForm.innerHTML = `
        <h2>Добавить новый заказ</h2>
        <label for="cardNumber">Номер карты:</label>
        <input type="text" id="cardNumber" required><br>
    
        <label for="orderNumber">Номер заказа:</label>
        <input type="text" id="orderNumber" required><br>
    
        <label for="amount">Сумма (руб.):</label>
        <input type="text" id="amount" required><br>
    
        <label for="clientName">Имя клиента:</label>
        <input type="text" id="clientName" required><br>
    
        <label for="comment">Комментарий:</label>
        <input type="text" id="comment"><br>
    
        <button type="button" onclick="addOrder()">Добавить заказ</button>
    `;
  
    addOrderForm.style.display = 'none';

    mainContent.appendChild(addOrderForm);

    if (showHistory) {
        addButton.classList.add('hidden');
    } else {
        addButton.classList.remove('hidden');
    }

    
}
  
function goHome() {
    window.location.href = "index.html";
}
function deleteOrder(button) {
  const userId = button.getAttribute('data-id');
  const index = orders.findIndex(order => order.id == userId);
  if (index !== -1) {
      orders.splice(index, 1);
      renderOrdersTable();
  }
}

function renameOrder(button) {
  const userId = button.getAttribute('data-id');
  const index = orders.findIndex(order => order.id == userId);

  if (index !== -1) {
      const newName = prompt('Введите новый номер заказа (5 цифр):');

      if (/^\d{5}$/.test(newName)) {
          orders[index].orderNumber = newName;
          renderOrdersTable();
      } else {
          alert('Новый номер заказа должен содержать ровно 5 цифр.');
      }
  }
}
function editOrder(button) {
  const userId = button.getAttribute('data-id');
  const orderToEdit = orders.find(order => order.id == userId);

  if (orderToEdit) {
      const editOrderForm = createEditForm(orderToEdit);
      const mainContent = document.getElementById('main-content');
  
      const previousEditForm = document.getElementById('editOrderForm');
      if (previousEditForm) {
          previousEditForm.remove();
      }

      mainContent.appendChild(editOrderForm);
      
  }
}
function createEditForm(order) {
  const form = document.createElement('form');
  const loggedIn = localStorage.getItem("loggedIn");
  form.id = 'editOrderForm';
  form.dataset.userId = order.id;

  form.innerHTML = `
      <h2>Редактировать заказ</h2>
      <label for="editCardNumber">Номер карты:</label>
      <input type="text" id="editCardNumber" required data-edit="cardNumber" value="${order.cardNumber}" ${loggedIn === 'false' ? 'disabled' : ''}><br>

      <label for="editOrderNumber">Номер заказа:</label>
      <input type="text" id="editOrderNumber" required data-edit="orderNumber" value="${order.orderNumber}" ${loggedIn === 'false' ? 'disabled' : ''}><br>

      <label for="editAmount">Сумма (руб.):</label>
      <input type="text" id="editAmount" required data-edit="amount" value="${order.amount}" ${loggedIn === 'false' ? 'disabled' : ''}><br>

      <label for="editClientName">Имя клиента:</label>
      <input type="text" id="editClientName" required data-edit="clientName" value="${order.clientName}" ${loggedIn === 'false' ? 'disabled' : ''}><br>

      <label for="editComment">Комментарий:</label>
      <input type="text" id="editComment" data-edit="comment" value="${order.comment}"><br>

      <button type="button" onclick="updateOrder()">Сохранить изменения</button>
  `;

  return form;
}
function closeOrder(button) {
  const userId = button.getAttribute('data-id');
  const orderToClose = orders.find(order => order.id == userId);

  if (orderToClose) {
      orders = orders.filter(order => order.id != userId);

      const closedOrder = { ...orderToClose, id: orderToClose.id };
      closedOrders.push(closedOrder);

      renderOrdersTable();
  }
}
function toggleOrderHistory() {
  const isHistoryVisible = historyButton.dataset.historyVisible === 'true';

  const searchInput = document.getElementById('searchInput');

  if (isHistoryVisible) {
      renderOrdersTable(false);
      historyButton.innerText = 'История заказов';
      historyButton.dataset.historyVisible = 'false';
      searchInput.removeAttribute('hidden');
  } else {
      renderOrdersTable(true);
      historyButton.innerText = 'Вернуться';
      historyButton.dataset.historyVisible = 'true';
      searchInput.value = '';
      
      searchInput.setAttribute('hidden', 'true');
  }
}

function searchOrders() {
  const searchInput = document.getElementById('searchInput');
  const searchValue = searchInput.value.trim();

  const filteredOrders = orders.filter(order => order.orderNumber.startsWith(searchValue));

  renderOrdersTable(false, filteredOrders);
}

function formatTimestamp(timestamp) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Intl.DateTimeFormat('ru-RU', options).format(timestamp);
  }



function showAddOrderForm() {
  const addOrderForm = document.getElementById('addOrderForm');
  addOrderForm.style.display = 'block'; 
}


function updateOrder() {
  clearValidationMessages();
  const userId = document.getElementById('editOrderForm').dataset.userId;
  const index = orders.findIndex(order => order.id == userId);

  const editCardNumberInput = document.getElementById('editCardNumber');
  const editOrderNumberInput = document.getElementById('editOrderNumber');
  const editAmountInput = document.getElementById('editAmount');
  const editClientNameInput = document.getElementById('editClientName');
  const editCommentInput = document.getElementById('editComment');

  const cardNumberIsValid = /^\d{4} \d{4} \d{4} \d{4}$/.test(editCardNumberInput.value);
  const orderNumberIsValid = /^\d{5}$/.test(editOrderNumberInput.value);
  const amountIsValid = /^\d{1,6}$/.test(editAmountInput.value);
  const clientNameIsValid = /^[a-zA-Zа-яА-Я\s]{1,20}$/.test(editClientNameInput.value); 
  const commentIsValid = editCommentInput.value.length <= 20;

  if (!cardNumberIsValid) {
      displayValidationMessage(editCardNumberInput, 'Некорректный ввод карты');
  }

  if (!orderNumberIsValid) {
      displayValidationMessage(editOrderNumberInput, 'Номер заказа должен состоять из 5 цифр');
  }

  if (!amountIsValid) {
      displayValidationMessage(editAmountInput, 'Некорректный ввод');
  }

  if (!clientNameIsValid) {
      displayValidationMessage(editClientNameInput, 'Некорректный ввод');
  }

  if (!commentIsValid) {
      displayValidationMessage(editCommentInput, 'Некорректный ввод');
  }

  if (cardNumberIsValid && orderNumberIsValid && amountIsValid && clientNameIsValid && commentIsValid) {
      const userId = document.getElementById('editOrderForm').dataset.userId;
      const index = orders.findIndex(order => order.id == userId);

      if (index !== -1) {
          orders[index].cardNumber = editCardNumberInput.value;
          orders[index].orderNumber = editOrderNumberInput.value;
          orders[index].amount = editAmountInput.value;
          orders[index].clientName = editClientNameInput.value;
          orders[index].comment = editCommentInput.value;

          document.getElementById('editOrderForm').style.display = 'none';

          clearValidationMessages();

          renderOrdersTable();
      }
  }
}

function addOrder() {
    
    clearValidationMessages();
  
    const cardNumberInput = document.getElementById('cardNumber');
    const orderNumberInput = document.getElementById('orderNumber');
    const amountInput = document.getElementById('amount');
    const clientNameInput = document.getElementById('clientName');
    const commentInput = document.getElementById('comment');
  
    const cardNumberIsValid = /^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumberInput.value);
    const orderNumberIsValid = /^\d{5}$/.test(orderNumberInput.value);
    const amountIsValid = /^\d{1,6}$/.test(amountInput.value);
    const clientNameIsValid = /^[a-zA-Zа-яА-Я\s]{1,20}$/.test(clientNameInput.value); 
  const commentIsValid = commentInput.value.length <= 20;
  
    if (!cardNumberIsValid) {
      displayValidationMessage(cardNumberInput, 'Некорректный ввод карты');
    }
  
    if (!orderNumberIsValid) {
      displayValidationMessage(orderNumberInput, 'Номер заказа должен состоять из 5 цифр');
    }
  
    if (!amountIsValid) {
      displayValidationMessage(amountInput, 'Некорректный ввод');
    }
  
    if (!clientNameIsValid) {
      displayValidationMessage(clientNameInput, 'Некорректный ввод');
    }
  
    if (!commentIsValid) {
      displayValidationMessage(commentInput, 'Некорректный ввод');
    }
  
    if (cardNumberIsValid && orderNumberIsValid && amountIsValid && clientNameIsValid && commentIsValid) {
      const timestamp = new Date();
      
      const newOrder = {
        id: nextUserId++,
        cardNumber: cardNumberInput.value,
        orderNumber: orderNumberInput.value,
        amount: amountInput.value,
        clientName: clientNameInput.value,
        timestamp,
        comment: commentInput.value,
      };
  
      orders.push(newOrder);
      renderOrdersTable();
  
      document.getElementById('addOrderForm').style.display = 'none';
  
      clearFormInputs();
    }
}
  
  function displayValidationMessage(inputElement, message) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
  
    const errorLabel = document.createElement('div');
    errorLabel.className = 'validation-error';
    errorLabel.appendChild(document.createTextNode(message));
  
    errorContainer.appendChild(errorLabel);

    inputElement.insertAdjacentElement('afterend', errorContainer);
}
  
  function clearValidationMessages() {
    const errorContainers = document.querySelectorAll('.error-container');
    errorContainers.forEach(errorContainer => {
      errorContainer.remove();
    });
}
  
  function clearFormInputs() {
    document.getElementById('cardNumber').value = '';
    document.getElementById('orderNumber').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('clientName').value = '';
    document.getElementById('comment').value = '';
}

renderOrdersTable();

document.addEventListener("DOMContentLoaded", function () {

  const registrationSuccess = localStorage.getItem("registrationSuccess");
  if (registrationSuccess !== "true") {
    alert("Пользователь не авторизован.");
    window.location.href = "login2.html";
  }

  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn === "false") {
      const addButton = document.getElementById('addButton');
      const searchInput = document.getElementById('searchInput');
      const historyButton = document.getElementById('historyButton');
      if (addButton) {
        addButton.disabled = true;
      }
      if (searchInput) {
        searchInput.disabled = true;
      }
      if (historyButton) {
        historyButton.disabled = true;
      }
  }
});