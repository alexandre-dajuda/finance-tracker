const balanceAmount = document.getElementById('balance-amount');
const incomeAmout =document.getElementById('money-plus');
const expenseAmount = document.getElementById('money-minus');
const transactionList = document.getElementById('transactions');
const form =document.getElementById('form');
const inputText = document.getElementById('text');
const inputAmount = document.getElementById('amount');
const btnAdd = document.getElementById('btn-add');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function savedTransactionsLocalStorage() {
    localStorage.setItem('transactions',JSON.stringify(transactions));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(inputText.value.trim() === '' || inputAmount.value.trim() === '') {
        alert('Por favor, preencha ambos os campos');
        return;
    }else{

        const transaction = {
        id:Math.floor(Math.random() * 1000000),
        text: inputText.value,
        amount:Number(inputAmount.value)
        };

         transactions.push(transaction);
        addTransactionDOM(transaction);
         savedTransactionsLocalStorage();
          inputText.value = '';
         inputAmount.value = '';
         
    };
    updateValues();
});

// Função que recebe UMA transação e desenha no HTML
function addTransactionDOM(transaction) {
    // 1. Define se a classe é plus (verde) ou minus (vermelho)
    const itemClass = transaction.amount < 0 ? 'minus' : 'plus';

    // 2. Cria o elemento <li>
    const item = document.createElement('li');

    // 3. Adiciona a classe ao <li>
    item.classList.add(itemClass);

    // 4. Preenche o conteúdo interno do <li>
    // Usamos Math.abs para o número aparecer sem o sinal de menos (pois a cor já indica isso)
    item.innerHTML = `
        ${transaction.text} <span>R$ ${Math.abs(transaction.amount)}</span>
        <button class="delete-btn">x</button>
    `;

    // 5. Adiciona o <li> dentro da nossa <ul> (transactionList)
    transactionList.appendChild(item);
}

function init(){
    transactionList.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}
function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    balanceAmount.innerText = `R$ ${total}`;
    
}

init();
//teste de conexao