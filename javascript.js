function convertCurrency(){
    var result = document.getElementById("result");
    result.innerHTML=" ";
    var historyTable = document.getElementById("conversionHistory");
    historyTable.innerHTML=' ';
    var komunikat = document.getElementById('komunikat');
    komunikat.innerHTML= " ";
    var container = document.getElementById("exchangeRatesContainer");
    container.innerHTML=" ";
    const amount=document.getElementById("amount").value;
    const baseCurrency=document.getElementById("baseCurrency").value;
    const targetCurrency=document.getElementById("targetCurrency").value;

    if(baseCurrency===""){
            alert("Proszę wybrać walute bazową.");
            return false; 
        }
        if(targetCurrency===""){
            alert("Proszę wybrać walute docelową.");
            return false; 
        }
    fetch(`http://localhost:8080/currencyconvert/${baseCurrency}/${targetCurrency}?amount=${amount}`, {
        method: 'GET',
        credentials: 'include', // Include credentials (cookies)
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data=>{
        const resultElement =document.getElementById("result");
        resultElement.innerHTML =   `Wynik: ${data}`;
    })
    .catch(error => {
        console.error("Error:", error);
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `Error: ${error.message}`;
    });
}

function conversionHistoryShow(){
    try{
    fetch(`http://localhost:8080/currencyconvert/history`,{
        method: 'GET',
        credentials: 'include', // Include credentials (cookies)
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response=>{
        if(response.status!==200){
            return Promise.reject('Cos poszło nie tak!');
        }
        return response.json()
    })
    .then( (data) => { dispalyConversionHistory(data); } )
} catch (error) {
    console.error("Error:", error);
    alert(`Error: ${error.message}`);
}
}

function conversionHistoryHide(){
    var historyTable = document.getElementById("conversionHistory");
    historyTable.innerHTML=' ';
}

function dispalyConversionHistory(history){
    var result = document.getElementById("result");
    result.innerHTML=" ";
    var historyTable = document.getElementById("conversionHistory");
    historyTable.innerHTML=' ';
    var komunikat = document.getElementById('komunikat');
    komunikat.innerHTML= " ";
    var container = document.getElementById("exchangeRatesContainer");
    container.innerHTML=" ";
    var content="<table border='1'> <thead><tr><th>Waluta bazowa</th>"+
        "<th>Kwota</th><th>Waluta docelowa</th><th>Wynik</th><th>Data</th></tr></thead><tbody>";
    // for(var element in history){
    //     var id = history[element].id;
    //     var baseCurrency=history[element].baseCurrency;
    //     var amount = history[element].amount;
    //     var targetCurrency = history[element].targetCurrency;
    //     var result = history[element].result;
    //     var dateTime = history[element].dateTime;
    //     content += "<tr><td>" + baseCurrency + "</td><td>" + amount +
    //         "</td><td>" + targetCurrency + "</td><td>" + result + "</td><td>"+ dateTime + "</td></tr>";
    // }
    history.forEach(element=>{
        content += "<tr><td>" +element.amount+ "</td><td>" + element.baseCurrency + "</td><td>"+ element.targetCurrency +"</td><td>"+ element.result + "</td><td>"+ element.dateTime +"</td></tr>";
    })
    content += "</tbody></table>";
    historyTable.innerHTML = content;
}
function komunikat(body){
    var komunikat = document.getElementById('komunikat');
    // komunikat.innerHTML= " ";
    content = "<h2>" + body + "</h2>"
    komunikat.innerHTML = content
}

function clearHistory(){
    try{
        var result = document.getElementById("result");
    result.innerHTML=" ";
    var historyTable = document.getElementById("conversionHistory");
    historyTable.innerHTML=' ';
    var container = document.getElementById("exchangeRatesContainer");
    container.innerHTML=" ";
        fetch(`http://localhost:8080/currencyconvert/history/clear`,{
            method: 'DELETE',
            credentials: 'include', // Include credentials (cookies)
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response=>{
            response.text().then(body => komunikat(body));
        }) 
    }catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function swapOptions(){
   
    var baseCurrency = document.getElementById("baseCurrency");
    var targetCurrency = document.getElementById("targetCurrency");

    var tempValue = baseCurrency.value;
    baseCurrency.value = targetCurrency.value;
    targetCurrency.value = tempValue;

}


function showExchangeRates(){
    var result = document.getElementById("result");
    result.innerHTML=" ";
    var historyTable = document.getElementById("conversionHistory");
    historyTable.innerHTML=' ';
    var komunikat = document.getElementById('komunikat');
    komunikat.innerHTML= " ";
    var container = document.getElementById("exchangeRatesContainer");
    container.innerHTML=" ";
    try{
    fetch(`http://localhost:8080/exchangerate`, {
    method: 'GET',
    credentials: 'include', // Include credentials (cookies)
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(response=>{
        if(response.status!==200){
            return Promise.reject('Cos poszło nie tak!');
        }
        return response.json()
    })
    .then( (data) => {
        displayExchangeRates(data);
        // console.log(data);
     } )
} catch (error) {
    alert(`Error: ${error.message}`);
}
}

function displayExchangeRates(exchangerates){
    // for(var element in exchangerates){
    //     var effectiveDate = exchangerates[element].effectiveDate;
    //     var rates = exchangerates[element].rates;
    //     console.log("Data", effectiveDate);
    //     console.log("Waluty", rates)
        var container= document.getElementById('exchangeRatesContainer');
        var content ="";
        var effectiveDate;
        exchangerates.forEach(element => {
            // var header = document.createElement('h2');
            // header.textContent = 'Kursy walut na dzień: ' + element.effectiveDate;
            // var list = document.createElement('ul');
            effectiveDate = '<h1>Kursy walut na dzień: ' + element.effectiveDate +'</h1>';
            content += "<table border='1'> <thead><tr><th>Waluta</th><th> Kod waluty</th>"+
            "<th>Kurs</th></tr></thead><tbody>";
            element.rates.forEach(rate=>{
                // var listItem = document.createElement('li');
                // listItem.textContent = `Nazwa waluty:" ${rate.currency}, <strong>kod: ${rate.code}, <strong>kurs: ${rate.mid}`;
                // listItem.innerHTML = `Nazwa waluty:<strong>${rate.currency}</strong> , Kod: <strong>${rate.code}</strong>, Kurs: <strong>${rate.mid}</strong>`;
                // list.appendChild(listItem);
                content += "<tr><td>" +rate.currency+ "</td><td>" + rate.code + "</td><td>" + rate.mid + "</td></tr>";
            });
            // container.appendChild(header);
            // container.appendChild(list);
            content += "</tbody></table>";
        });
        container.innerHTML = effectiveDate + content;
    }

