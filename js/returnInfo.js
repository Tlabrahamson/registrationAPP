var regAPI = "scripts/read.php";
var request = new XMLHttpRequest();
var displayOutput = document.getElementById('output');

request.onload = function(){
    if(this.status >= 200 && this.status < 400){
        var response = this.responseText;
        
        var regJSON = JSON.parse(response);
        displayOutput.innerHTML = regJSON.map(makeSomeCards).join('');
        request.abort();
    } else{
        console.log("SRY code sucks!");
    }
};
request.onerror = function(){
    
};
window.onload = function(){
    let getMyInfoButton = document.getElementById("getInfoButton");

    getMyInfoButton.addEventListener('click', function(){
        // alert("Here come the logs!");
        iziToast.show({
            theme: 'dark',
            color: '#d64141',
            position: 'center',
            title: 'Uh oh!',
            message: '1337 HAX ALERT!'
        });
        request.open('GET', regAPI, true);
        request.send();
    });
};

function makeSomeCards(item){
    var elementString = 
        `<div id="cards">
        <h3 class="cardHeader">First Name: ${item.firstName}</h3>
        <h3 class="cardHeader">Last Name: ${item.lastName}</h3>
        <h3 class="cardHeader">Email: ${item.email}</h3>
        <h3>Phone Number: (${item.areaCode})${item.phoneNumber}</h3>
        <h3>Company Name: ${item.companyName}</h3>
        </div>
        `;
    return elementString;
}