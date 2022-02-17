import React, { useEffect, useState } from 'react';

const API_URL = 'https://open.er-api.com/v6/latest/USD'

export default function Header() {

    
 
    const [exchangeRateUSD, setExcgangeRateUSD] = useState()
    const [exchangeRateEUR, setExcgangeRateEUR] = useState()
    
    let USD  = exchangeRateUSD
    let EUR  = exchangeRateEUR
    useEffect(() => {
        fetch(API_URL)
          .then(res => res.json())
          .then(data => {
            const UAHCurrency = Object.keys(data.rates)[144]
            const EURCurrency = Object.keys(data.rates)[43]
            setExcgangeRateEUR((+(1 / data.rates[EURCurrency]) * data.rates[UAHCurrency]).toFixed(2))
            setExcgangeRateUSD(data.rates[UAHCurrency])
          })
      }, [])
  return (
    <div className="header">
        <h1>Курс гривны</h1>
        <div>
            <div>USD {USD}</div>
            <div>EUR {EUR}</div>
        </div>
    </div>
  )
}
