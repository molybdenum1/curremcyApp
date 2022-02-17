import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';

const API_URL = 'https://open.er-api.com/v6/latest/USD'

export default function Main() {

    const [currencyOp, setCurrencyOp] = useState([])
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [exchangeRate, setExcgangeRate] = useState()
    const [amount, setAmount] = useState(1)
    const [amountFromCurrency, setAmountFromCurrency] = useState(true)
    
    let toAmount, fromAmount;
    if(amountFromCurrency){
      fromAmount = amount;
      toAmount = amount * exchangeRate;
    }else {
      toAmount = amount;
      fromAmount = amount / exchangeRate
    }
  
    //console.log(currencyOp)
    //console.log(exchangeRate)
    //data.base_code,
    useEffect(() => {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          const firstCurrency = Object.keys(data.rates)[43]
          setCurrencyOp([ ...Object.keys(data.rates) ])
          setFromCurrency(data.base_code)
          setToCurrency(firstCurrency)
          setExcgangeRate(data.rates[firstCurrency])
        })
    }, [])
  
    useEffect(() => {
      if(fromCurrency != null && toCurrency != null) {
        fetch(`${API_URL}?base_code=${fromCurrency}&symbols=${toCurrency}`)
          .then(res => res.json())
          .then(data => setExcgangeRate(data.rates[toCurrency]))
      }
    },[fromCurrency, toCurrency])
  
    function handleFromAmountChange(e){
      setAmount(e.target.value)
      setAmountFromCurrency(true)
    }
    function handleToAmountChange(e){
      setAmount(e.target.value)
      setAmountFromCurrency(false)
    }

  return (
    <div>
      <h1>Convert</h1>
      <CurrencyRow 
        currencyOp={currencyOp}
        selectCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOp={currencyOp}
        selectCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  )
}
