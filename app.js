let base_url = "https://v6.exchangerate-api.com/v6/b2a9fa772e4660fb8c05a73c/latest/";

const dropdowns = document.querySelectorAll(".converter select");

let amount = document.querySelector("#Amount");

let amountprice = document.querySelector(".amount input")
const fromCurr = document.querySelector(".from select");
const toCurr  = document.querySelector(".to select");
const msgfr = document.querySelector(".fromcurr");
const msgto = document.querySelector(".tocurr");
const msgupdate = document.querySelector(".update");

for (let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        for(currc in currencyList){
            newOption.innerText = `${currcode} - ${currencyList[currcode]}`;
        }
        newOption.value = currcode;
        if(select.name==='from' && currcode==='USD'){
            newOption.selected = 'selected';
        }
        if(select.name==='to' && currcode==='INR'){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
        calculateConversion();
    })
}


const updateFlag = (element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

async function calculateConversion() {
    let amtValue = amountprice.value;
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amountprice.value = 1;
    }

    const URL = `${base_url}${fromCurr.value}`;
    let response = await fetch(URL);
    const data = await response.json();

    let tc = toCurr.value;
    let rate = data.conversion_rates[tc];
    let finalamount = rate * amtValue;
    let ratetime = data.time_last_update_utc;
    msgfr.innerText = `${amtValue} ${fromCurr.value}`;
    msgto.innerText =  `${finalamount.toFixed(2)} ${toCurr.value}`;
    msgupdate.innerText = `Market rates collected - ${ratetime}`;
}


amount.addEventListener('input',async (evt)=>{
    evt.preventDefault();

    calculateConversion();
})
