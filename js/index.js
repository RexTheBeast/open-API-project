fetch("https://api.thedogapi.com/v1/breeds", {
    headers: {
        "x-api-key": "live_4NwSCSCAIZa0Ll4XZL2yPJCnAUOBul6M2C1BzosusZu3xFIWzsF0Td2FjziiZO0T"
    }
})
    .then(response => response.json())
    .then( data => {
        var breeds = data;
        console.log(breeds);

        var dogSection = document.getElementById("DogBreeds");

        var dogList = dogSection.querySelector("ul");

        for (let i =0; i<10; i++){
            var adog = document.createElement("li")

            adog.innerHTML = breeds[i].name;

            dogList.appendChild(adog);
        }
    })
    .catch(error => {
        console.error("No dogs found:", error)
    });