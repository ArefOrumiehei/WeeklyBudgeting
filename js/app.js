// budget class for calculate somethings
class Budget{
    constructor(budget){
        this.budget = budget
        this.amount = this.budget
    }

    // calculate remaining amount 
    remainingAmount(amount){
        return this.amount = this.amount - amount
    }
}


// HTML class for show budget and remaining budget in html
class HTML{

    // show budget in totalBudget and LeftBudget
    showBudget(money){
        totalBudget.textContent = money
        leftBudget.textContent = money
    }


    // show message 
    showMessage(message , className){
        // create new child
        let div = document.createElement('div')
        div.classList.add('alert' , 'message-center' , className)
        div.textContent = message

        const content = document.querySelector('.content')
        
        // adding new child to insert before form
        content.insertBefore(div , form)

        setTimeout(() => {
            document.querySelector('.content div').remove()
            form.reset()
        }, 3000);
    }


    // Show amount spent
    showSpentAmount(name , amount){
        const ul = document.querySelector('.list-group')

        // create li element
        let li = document.createElement('li')
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')

        li.innerHTML = `
        <span>${name}</span>
        <span class='badge badge-primary badge-pill'>${amount}</span>
        `

        ul.appendChild(li)
    }


    // show remaining amount
    showRemainingAmount(amount){
        let remainingAmount = budget.remainingAmount(amount)

        // show remaining amount
        leftBudget.textContent = remainingAmount
    

        if (budget.budget / 4 > remainingAmount) {
            // change color of remaining amount to red if less than 25%
            leftBudget.parentElement.parentElement.classList.remove('alert-success')
            leftBudget.parentElement.parentElement.classList.add('alert-danger')
        } else if(budget.budget / 2 > remainingAmount){
            // change color of remaining amount to yellow if less than 50%
            leftBudget.parentElement.parentElement.classList.remove('alert-success')
            leftBudget.parentElement.parentElement.classList.add('alert-warning')
        }
    }
}



// variables
let userBudget
let budget
let totalBudget = document.querySelector('#total')
let leftBudget = document.querySelector('#left')
let form = document.querySelector('#add-expense')
const html = new HTML()



// eventListeners
eventListeners()
function eventListeners(){
    document.addEventListener('DOMContentLoaded' , function(){
        // get user value
        userBudget = window.prompt('لطفا بودجه هفتگی خود را وارد نمایید :')
        
        // validate user input
        if(userBudget === null || userBudget === '' || userBudget === '0' || userBudget === '00' || userBudget === '000'){
            window.location.reload()
        }else{
            budget = new Budget(userBudget)
            showBudget = html.showBudget(budget.budget)
        }
    })


    // validate and access to form and fields
    form.addEventListener('submit' , function(e){
        e.preventDefault()

        // access to fields
        const expense = document.querySelector('#expense').value
        const amount = document.querySelector('#amount').value

        // validate the fields
        if(expense === '' || amount === ''){
            html.showMessage('لطفا مقادیر مناسبی را قرار دهید' , 'alert-danger')
        }else{
            // sent amount of spent
            html.showSpentAmount(expense , amount)
            html.showRemainingAmount(amount)
        }
    })
}