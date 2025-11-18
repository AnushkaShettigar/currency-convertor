const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
let msg = document.querySelector(".msg");
const swapIcon = document.querySelector(".swap-icon");

swapIcon.addEventListener("click", () => {
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    updateFlags(fromCurr);
    updateFlags(toCurr);
});

for (let select of dropdowns) {
    for (code in countryList){
        let newOption = document.createElement("option");
        newOption.value = code;
        newOption.innerText = code;

        if (select.name === "from" && code === "USD"){
            newOption.selected = true;
        } else if (select.name === "to" && code === "INR"){
            newOption.selected = true;
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlags(evt.target);    
    })
}

const updateFlags = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1){
        alert("Please enter a valid amount");
        amount.value = "1";
        amtVal = 1;
    }


    let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`;
});