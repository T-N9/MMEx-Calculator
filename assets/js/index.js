let input=document.getElementById("u-input");
let output=document.getElementById("output-result");
let from=document.getElementById("u-from");
let to=document.getElementById("u-to");
let formAction=document.getElementById("dataForm");
let calBtn=document.getElementById("calBtn");
let historyL=document.getElementById("historyList");

function createOption(x,y,z){
    let option=document.createElement("option");
    let country=document.createTextNode(y);
    option.setAttribute("value",toNum(z));
    option.appendChild(country);
    x.appendChild(option);
}
function toNum(x){
    return Number(x.replace(",",""));
}
for(x in data.rates){
    createOption(from,x,data.rates[x]);
    createOption(to,x,data.rates[x]);
}

function createTableData(data){
    let tr=document.createElement("tr");
    let noRecord=document.getElementById("noRecord");
    if(noRecord){
        noRecord.remove();
    }

    data.map(function(dmap){
        let td=document.createElement("td");
        let text=document.createTextNode(dmap);
        td.appendChild(text);
        tr.appendChild(td);
    });
    historyL.appendChild(tr);
};

function storeHistory(){
    localStorage.setItem("record",historyL.innerHTML);
};

formAction.addEventListener("submit",function(cal){
    cal.preventDefault();

    //get state
    let inputValue=input.value;
    let fromValue=from.value;
    let toValue=to.value;

    //process state
    let firstState= inputValue*fromValue;
    let secondState= firstState/toValue;
    let fromCurrency= inputValue+" "+from.options[from.selectedIndex].innerText;
    let toCurrency= to.options[to.selectedIndex].innerText;
    let outputCurrency=secondState.toFixed(2);
    let opcc=secondState.toFixed(2)+' '+toCurrency;
    let date=new Date().toLocaleString();
    let dataArr=[date,fromCurrency,toCurrency,opcc];
    createTableData(dataArr);
    storeHistory();

    //set state
    output.innerHTML=outputCurrency;
    input.value="";
    from.value="";
    to.value="";
    input.focus();
});
(function(){
    if(localStorage.getItem("record")){
        historyL.innerHTML=localStorage.getItem("record");
    }
    else{
        historyL.innerHTML=`<tr id="noRecord"><td  colspan="4" class="text-center">There is no record.</td></tr>`;
    }
})();
