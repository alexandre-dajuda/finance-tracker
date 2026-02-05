/**
 * Global Selectors for DOM Elements
 */
const balanceAmount = document.getElementById('balance-amount');
const incomeAmout = document.getElementById('money-plus');
const expenseAmount = document.getElementById('money-minus');
const transactionList = document.getElementById('transactions');
const form = document.getElementById('form');
const inputText = document.getElementById('text');
const inputAmount = document.getElementById('amount');
const btnAdd = document.getElementById('btn-add');

/**
 * Persistence: Get data from LocalStorage or initialize as an empty array
 */
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

/**
 * Updates the LocalStorage with the current state of transactions
 */
function savedTransactionsLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

/**
 * Handles the form submission to create a new transaction
 * @param {Event} e - Submit event object
 */
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isInputEmpty = inputText.value.trim() === '' || inputAmount.value.trim() === '';

    if (isInputEmpty) {
        alert('Please, fill both fields');
        return;
    }

    const transaction = {
        id: Math.floor(Math.random() * 1000000),
        text: inputText.value,
        amount: Number(inputAmount.value)
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    savedTransactionsLocalStorage();
    
    // Clear inputs after success
    inputText.value = '';
    inputAmount.value = '';

    updateValues();
});

/**
 * Renders a single transaction object into the DOM
 * @param {Object} transaction - The transaction object {id, text, amount}
 */
function addTransactionDOM(transaction) {
    const itemClass = transaction.amount < 0 ? 'minus' : 'plus';
    const item = document.createElement('li');

    item.classList.add(itemClass);

    item.innerHTML = `
        ${transaction.text} <span>R$ ${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    transactionList.appendChild(item);
}

/**
 * Calculates and updates the Dashboard values: Balance, Income, and Expenses
 */
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1)
        .toFixed(2);

    // Update UI text
    balanceAmount.innerText = `R$ ${total}`;
    incomeAmout.innerText = `R$ ${income}`;
    expenseAmount.innerText = `R$ ${expense}`;
}

/**
 * Removes a transaction from the list based on its ID
 * @param {number} id - The unique ID of the transaction to be deleted
 */
function removeTransaction(id) {
    // Immutability: Filtering out the transaction to be removed
    transactions = transactions.filter(transaction => transaction.id !== id);
    
    savedTransactionsLocalStorage();
    init(); // Refresh the UI
}

/**
 * Application Entry Point: Initializes the app state and UI
 */
function init() {
    transactionList.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();