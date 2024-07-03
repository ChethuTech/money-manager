import './index.css'

const MoneyDetails = props => {
  const {moneyDetails, totalIncome, totalExpenses} = props
  const {id, heading, imgUrl, altName, dataTestId} = moneyDetails

  let amount

  if (id === 1) {
    //  Your Balance
    amount = totalIncome - totalExpenses
  } else if (id === 2) {
    //  Your Income
    amount = totalIncome
  } else {
    //  Your Expenses
    amount = totalExpenses
  }

  return (
    <div className={`money-details-list-item ${altName}`}>
      <img className="img" src={imgUrl} alt={altName} />
      <div className="card">
        <p className="card-name">{heading}</p>

        <p data-testid={`${dataTestId}`} className="card-amount">
          Rs {amount}
        </p>

        {/* comment: data-testid="......" is for testing purpose only, it has nothing to do with app function  */}
      </div>
    </div>
  )
}

export default MoneyDetails
