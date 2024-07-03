import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    moneyDetails: [
      {
        id: 1,
        amount: 0,
        heading: 'Your Balance',
        imgUrl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
        altName: 'balance',
        dataTestId: 'balanceAmount',
      },
      {
        id: 2,
        amount: 0,
        heading: 'Your Income',
        imgUrl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
        altName: 'income',
        dataTestId: 'incomeAmount',
      },
      {
        id: 3,
        amount: 0,
        heading: 'Your Expenses',
        imgUrl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
        altName: 'expenses',
        dataTestId: 'expensesAmount',
      },
    ],
    transactionDetailsList: [],
    title: '',
    amount: '',
    transactionType: 'Income',
  }

  deleteBtn = id => {
    this.setState(prevState => ({
      transactionDetailsList: prevState.transactionDetailsList.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onAmountChange = event => {
    this.setState({amount: parseInt(event.target.value)})
  }

  onTransactionTypeChange = event => {
    this.setState({transactionType: event.target.value})
  }

  addTransaction = event => {
    // submmit
    event.preventDefault()
    const {title, amount, transactionType} = this.state

    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      transactionType: transactionType === 'EXPENSES' ? 'Expenses' : 'Income',
    }

    this.setState(prevState => ({
      transactionDetailsList: [
        ...prevState.transactionDetailsList,
        newTransaction,
      ],
      title: '',
      amount: '',
      transactionType: 'Income',
    }))
  }

  totalIncome = () => {
    const {transactionDetailsList} = this.state
    const incomeList = transactionDetailsList.filter(
      eachTrans => eachTrans.transactionType === 'Income',
    )
    if (incomeList.length > 0) {
      const income = incomeList.reduce((accumulator, eachItem) => ({
        amount: accumulator.amount + eachItem.amount,
      }))

      return income.amount
    }
    return 0
  }

  totalExpenses = () => {
    const {transactionDetailsList} = this.state
    const expensesList = transactionDetailsList.filter(
      eachTrans => eachTrans.transactionType === 'Expenses',
    )

    if (expensesList.length > 0) {
      const expenses = expensesList.reduce((accumulator, eachItem) => ({
        amount: accumulator.amount + eachItem.amount,
      }))

      return expenses.amount
    }
    return 0
  }

  render() {
    const {
      moneyDetails,
      transactionDetailsList,
      title,
      amount,
      transactionType,
    } = this.state

    const totalIncome = this.totalIncome()
    const totalExpenses = this.totalExpenses()

    return (
      <div className="bg">
        <div className="header">
          <h1 className="user-name">Hi, Richard </h1>
          <p className="user-welcome">
            {' '}
            Welcome back to your{' '}
            <span className="money-manager-text">Money Manager</span>
          </p>
        </div>

        <div className="money-details-list">
          {moneyDetails.map(eachItem => (
            <MoneyDetails
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              moneyDetails={eachItem}
              key={eachItem.id}
            />
          ))}
        </div>

        <div className="form-and-history-container">
          <form className="transaction-form" onSubmit={this.addTransaction}>
            <h1 className="transaction-form-heading"> Add Transaction </h1>

            <label>
              TITLE
              <input
                required
                type="text"
                value={title}
                onChange={this.onTitleChange}
                placeholder="TITLE"
              />
            </label>

            <label>
              AMOUNT
              <input
                required
                value={amount}
                onChange={this.onAmountChange}
                placeholder="AMOUNT"
              />
            </label>

            <label>
              TYPE
              <select
                onChange={this.onTransactionTypeChange}
                value={transactionType}
              >
                <option
                  value={transactionTypeOptions[0].optionId}
                  id={transactionTypeOptions[0].optionId}
                >
                  {transactionTypeOptions[0].displayText}
                </option>
                <option
                  value={transactionTypeOptions[1].optionId}
                  id={transactionTypeOptions[1].optionId}
                >
                  {transactionTypeOptions[1].displayText}
                </option>
              </select>
            </label>

            <button className="add-btn" type="submit">
              {' '}
              Add
            </button>
          </form>

          <div className="history-container">
            <h1 className="history-heading">History</h1>

            <ul className="history-list-container">
              <li className="history-list" key={uuidv4()}>
                <p className="title">Title</p>
                <p className="amount">Amount</p>
                <p className="type">Type</p>
              </li>
              {transactionDetailsList.map(eachTransaction => (
                <TransactionItem
                  onClickDelete={this.deleteBtn}
                  transactionDetails={eachTransaction}
                  key={eachTransaction.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
