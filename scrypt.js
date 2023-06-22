const form = document.querySelector("#form-name");
const input = form.children[2].firstElementChild;
const output = form.children[3];
console.log(form);

form.addEventListener('submit', (e)=>{

    //prevent from submission
    e.preventDefault();

     //HW1: validate &sanitize the INPUT:
    //dont sent empty request
    //remove extra spaces
    const searchedName = function (inputValue){
        if(inputValue!== "" && inputValue!== "  "){
            let name = inputValue.trim();
           return name;
        } else {
            console.log(`Please write your name!`)
        }
    }

    const name = searchedName(input.value);

   


    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.nationalize.io?name=${name}`);
    xhr.send();

    xhr.onload = () => {
        let reponse = xhr.responseText;
        let data = JSON.parse(reponse);

        //HW2 Check when empty response and show a corresponding message
        if(data.country.length === 0) {            
            output.textContent= `This name was not found, please check the spelling orf enter a valid name!`;
        } else {
            let nationality = data.country[0].country_id;
            output.innerHTML = `You are most probably from <strong>${nationality}</strong>`;
        }        
    }
    
})



