// budget class for calculating some things
class Budget {
    constructor(budget) {
        this.budget = budget;
        this.amount = this.budget;
    }

    // calculate remaining amount
    remainingAmount(amount) {
        return (this.amount = this.amount - amount);
    }
}

// HTML class for showing budget and remaining budget in HTML
class HTML {
    // show budget in totalBudget and leftBudget
    showBudget(money) {
        totalBudget.textContent = money;
        leftBudget.textContent = money;
    }

    // show message
    showMessage(message, className) {
        // create a new child
        let div = document.createElement('div');
        div.classList.add('alert', 'message-center', className);
        div.textContent = message;

        const content = document.querySelector('.content');

        // add the new child to insert before the form
        content.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.content div').remove();
            form.reset();
        }, 3000);
    }

    // Show amount spent
    showSpentAmount(name, amount) {
        const ul = document.querySelector('.list-group');

        // create an li element
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        li.innerHTML = `
        <span>${name}</span>
        <span class='badge badge-primary badge-pill'>${amount}</span>
        `;

        ul.appendChild(li);
    }

    // show remaining amount
    showRemainingAmount(amount) {
        let remainingAmount = budget.remainingAmount(amount);

        // show remaining amount
        leftBudget.innerHTML = remainingAmount;

        if (budget.budget / 4 > remainingAmount) {
            // change the color of the remaining amount to red if less than 25%
            leftBudget.parentElement.parentElement.classList.remove('alert-success');
            leftBudget.parentElement.parentElement.classList.add('alert-danger');
        } else if (budget.budget / 2 > remainingAmount) {
            // change the color of the remaining amount to yellow if less than 50%
            leftBudget.parentElement.parentElement.classList.remove('alert-success');
            leftBudget.parentElement.parentElement.classList.add('alert-warning');
        }
    }

    // Add a reset button to clear everything
    resetBudget() {
        // Create a reset button and add it to the page
        resetBtn.style.display = 'none';
        resetBtn.onclick = this.resetAll.bind(this);

    }

    // Function to reset everything
    resetAll() {
        if (confirm('آیا از پاک کردن همه چیز مطمئن هستید؟')) {
            // Clear values and content
            totalBudget.textContent = '';
            leftBudget.textContent = '';
            form.reset();

            // Clear the expenses list
            const ul = document.querySelector('.list-group');
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }

            // Remove the reset button
            const resetButton = document.querySelector('.btn-danger');
            resetButton.parentNode.removeChild(resetButton);

            // Reset the budget amount
            budget.amount = budget.budget;

            // Reset the panel color based on the budget amount
            leftBudget.parentElement.parentElement.classList.remove('alert-danger', 'alert-warning');
            leftBudget.parentElement.parentElement.classList.add('alert-success');
        }
    }
}

// Elements
let totalBudget = document.querySelector('#total');
let leftBudget = document.querySelector('#left');
let form = document.querySelector('#add-expense');
const budgetInput = document.querySelector('#budget');
const inputs = document.querySelectorAll('input');
const errorText = document.querySelector('.error-text')

//Buttons
const submitBtn = document.querySelector('#submit-btn');
const editBtn = document.querySelector('#edit-btn');
const resetBtn = document.querySelector('#reset-btn')



// variables
let userBudget;
let budget;

const html = new HTML();

// eventListeners
eventListeners();
function eventListeners() {

    // اضافه کردن event listener برای input ها
    inputs.forEach(input => {
        input.addEventListener('input', checkInputs);
    });


    document.addEventListener('input', function () {
        // get user value
        const inputBudget = document.querySelector('#budget');
        userBudget = inputBudget.value;

        // validate user input
        if (userBudget === null || userBudget === '' || userBudget === '0' || userBudget === '00' || userBudget === '000') {
            window.location.reload();
        } else {
            budget = new Budget(userBudget);
            showBudget = html.showBudget(budget.budget);
        }
    });

    // validate and access to form and fields
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // access to fields
        const expense = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        // validate the fields
        if (budgetInput === '' && (expense === '' || amount === '')) {
            html.showMessage('لطفاً مقادیر مناسبی را قرار دهید', 'alert-danger');
        } else {
            // send the amount of spent
            html.showSpentAmount(expense, amount);
            html.showRemainingAmount(amount);
        }
    });

    // Add the reset button to the page
    html.resetBudget();
}

// Enable the budget input
function enableBudgetInput() {
    budgetInput.removeAttribute('disabled');
}

// Disable the budget input
function disableBudgetInput() {
    budgetInput.setAttribute('disabled', 'true');
}

// When the budget input loses focus, disable the input
budgetInput.addEventListener('blur', disableBudgetInput);

// When the user clicks the "Edit Budget" button, enable the input
editBtn.addEventListener('click', function() {
    enableBudgetInput();
    // Disable form submission while editing budget
    form.removeEventListener('submit', handleSubmit);
});


function checkInputs() {
    // بررسی وضعیت ورودی‌ها
    const isEmpty = Array.from(inputs).every(input => input.value === '');
    
    // اگر همه ورودی‌ها خالی باشند، دکمه ریست را مخفی کنید، در غیر این صورت نمایش دهید
    if (isEmpty) {
        resetBtn.style.display = 'none';
    } else {
        resetBtn.style.display = 'block';
    }
}