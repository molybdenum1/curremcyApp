import React from 'react'

export default function CurrencyRow(props) {
    const {currencyOp, selectCurrency, onChangeCurrency, amount, onChangeAmount} = props

    return (
    <div>
      <input type="number"  className="input" value={amount} onChange={onChangeAmount}/>
      <select value={selectCurrency} onChange={onChangeCurrency}>
          {currencyOp.map(option => (
              <option key={option} value={option}>{option}</option>
          ))}
      </select>
    </div>
  )
}
