// document.addEventListener('DOMContentLoaded', conversionHistory);
function convertCurrency(){
    var result = document.getElementById("result");
    result.innerHTML=" ";
    var historyTable = document.getElementById("conversionHistory");
    historyTable.innerHTML=' ';
    var komunikat = document.getElementById('komunikat');
    komunikat.innerHTML= " ";
    const amount=document.getElementById("amount").value;
    const baseCurrency=document.getElementById("baseCurrency").value;
    const targetCurrency=document.getElementById("targetCurrency").value;

    fetch(`http://localhost:8080/currencyconvert/${baseCurrency}/${targetCurrency}?amount=${amount}`)
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
    fetch(`http://localhost:8080/currencyconvert/history`)
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
    var content="<table border='1'> <thead><tr><th>ID</th><th> Waluta bazowa</th>"+
        "<th>Kwota</th><th>Waluta docelowa</th><th>Wynik</th><th>Data</th></tr></thead><tbody>";
    for(var element in history){
        var id = history[element].id;
        var baseCurrency=history[element].baseCurrency;
        var amount = history[element].amount;
        var targetCurrency = history[element].targetCurrency;
        var result = history[element].result;
        var dateTime = history[element].dateTime;
        content += "<tr><td>" +id+ "</td><td>" + baseCurrency + "</td><td>" + amount +
            "</td><td>" + targetCurrency + "</td><td>" + result + "</td><td>"+ dateTime + "</td></tr>";
    }
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
        fetch(`http://localhost:8080/currencyconvert/history/clear`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response=>{
            response.text().then(body => komunikat(body));
        }) 
    }catch (error) {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
    }
}

