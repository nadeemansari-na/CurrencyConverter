// const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"//usd.min.json"

const dropdowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("button")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const mes=document.querySelector(".mes")

for (let select of dropdowns){
    for (code in countryList) {
        // console.log(code,countryList[code])
        
        let newopt=document.createElement("option")
        if(select.name==='from' && code==='KWD'){
            newopt.selected="selected";
        }
        else if(select.name==='to' && code==='INR'){
            newopt.selected="selected";
        }
        newopt.innerText=code;
        newopt.value=code;
    select.append(newopt)
}

    select.addEventListener("change",(evt)=>{
        // console.log(evt)
        updateflag(evt.target)
    })
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;///${toCurr.value.toLowerCase()}.json`;
  console.log(URL)
  let response = await fetch(URL);
  let data = await response.json();

  console.log(data);
  let from = fromCurr.value.toLowerCase();
  console.log(from);
  let to = toCurr.value.toLowerCase();
  console.log(to);

  let rate = data[from][to];


  let finalAmount = amtVal * rate;
  mes.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateflag = (element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode]
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let image =element.parentElement.querySelector("img");


   image.src=newsrc;
};

button.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchangeRate()
})
window.addEventListener("load",() => {
  updateExchangeRate();

});