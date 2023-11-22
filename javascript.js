function convertCurrency(){
    const amount=document.getElementById('amount').value;
    const baseCurrency=document.getElementById('baseCurrency').value;
    const targetCurrency=document.getElementById('targetCurrency').value;

    fetch("http://localhost:8080/currencyconvert/${baseCurrency}/${targetCurrency}?amount=${amount}")
    .then(response => response.json())
    .then(data=>{
        const resultElement =document.getElementById('result');
        resultElement.innerHTML =   "${data.convertedAmount}";
    });
}
