// Assignment 4 | COMP1073 Client-Side JavaScript
// Jason Gomez 200587201
// Daniel Perusse 20055190
// Sebastian 200561191
// COMP1073

// Define the endpoint URL for fetching cat facts and images
catEndpointUrl = "https://meowfacts.herokuapp.com/";
imageEndpointURL = "https://cataas.com/cat?json=true";

// Define the query parameter to request a specific number of cat facts
requestUrl = "?count=3";

// Asynchronous function to request cat facts from the API
async function requestCatFact() {
    try {
        // Fetch cat facts from the API
        const response = await fetch(catEndpointUrl + requestUrl);

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data from the response
        const data = await response.json();
        console.log(data); // Log the data for debugging purposes

        // Get the HTML element where the cat facts will be displayed
        const factOutput = document.getElementById("fact-output");

        const catImgOutput = document.getElementById("cat-img-output");

        // Reset the output area by removing all existing child elements
        while (factOutput.firstChild) {
            factOutput.removeChild(factOutput.lastChild);
        }
        if (catImgOutput.firstChild) {
        catImgOutput.removeChild(catImgOutput.lastChild);
        }

        // Iterate over each cat fact and add it as a paragraph element to the output
        data["data"].forEach((element) => {
            console.log(element);
            let tempPar = document.createElement("p");
            tempPar.textContent = element;
            factOutput.appendChild(tempPar);
        });

        // Get the image ID asynchronously by calling requestImage function
        const imageId = await requestImage();
        let tempImg = document.createElement("img");
        tempImg.src = `https://cataas.com/cat/${imageId}`;
        catImgOutput.appendChild(tempImg);
        
    } catch (error) {
        // Log any errors that occur during the fetch or processing
        console.error('Error:', error);
    }
}

// Function to request a random cat image from the API
function requestImage() {
    return fetch(imageEndpointURL)
        .then(response => response.json())
        .then(data => {
            const id = data._id;
            console.log(id);
            return id;
        })
        .catch(error => {
            // Log any errors that occur during the fetch
            console.error('Error fetching the JSON file:', error);
        });
}