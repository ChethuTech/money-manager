import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onClickDelete} = props
  const {id, title, amount, transactionType} = transactionDetails
  const deleteTheitem = () => {
    onClickDelete(id)
  }

  return (
    <li className="history-list-item">
      <div className="items-container">
        <p className="item-title">{title}</p>
        <p className="item-amount">Rs {amount}</p>
        <p className="item-type">{transactionType}</p>
      </div>

      {/* comment: data-testid="delete" is for testing purpose only, it has nothing to do with app function  */}
      <button
        data-testid="delete"
        onClick={deleteTheitem}
        className="delete-btn"
        type="button"
      >
        <img
          className="delete-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
