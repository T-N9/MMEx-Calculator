$('document').ready(function(){
    let input=$('#u-input');
    let output=$('#output-result');
    let from=$('#u-from');
    let to=$('#u-to');
    let formAction=$('#dataForm');

    function createOption(x,y,z) {
        let option=document.createElement("option");
        let country=document.createTextNode(y);
        option.setAttribute("value",toNum(z));
        option.append(country);
        x.append(option);
    }

    function toNum(x){
        return Number(x.replace(",",""));
    }
    for(x in data.rates){
        createOption(from,x,data.rates[x]);
        createOption(to,x,data.rates[x]);
    }

    formAction.on("submit",function(cal){
        cal.preventDefault();

        //get state
        let inputValue=input.value;
        let fromValue=from.value;
        let toValue=to.value;

        console.log(inputValue,fromValue,toValue);
    });
});