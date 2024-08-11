
catEndpointUrl = "https://meowfacts.herokuapp.com/";

requestUrl = "?count=5";




// cat fact
function requestCatFact() {
    // get request
    fetch(catEndpointUrl+requestUrl)
    .then(response => {
      if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        factOutput = document.getElementById("fact-output");
        // reset
        while (factOutput.firstChild) {
            factOutput.removeChild(factOutput.lastChild);
        }



        // for each
        data["data"].forEach((element) => {
            console.log(element);
            tempPar = document.createElement("p");
            tempPar.textContent = element;
            factOutput.appendChild(tempPar);
        });


    })
    .catch(error => {
        console.error('Error:', error);
    });
}


