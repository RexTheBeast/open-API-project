/* practice making fetch functions
function loadBreeds(){
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
}

function loadImages() {
    fetch("https://api.thedogapi.com/v1/images/search?limit=12", {
    headers: { "x-api-key": "live_4NwSCSCAIZa0Ll4XZL2yPJCnAUOBul6M2C1BzosusZu3xFIWzsF0Td2FjziiZO0T" }
    })
        .then(response => response.json())
        .then(data => {
            const list = document.querySelector("#DogBreeds ul");
            list.innerHTML =""
            data.forEach(img => {
            const item = document.createElement("li");

            const image = document.createElement("img");
            image.src = img.url;
            image.style.width = "100%";
            image.style.borderRadius = "6px";

            item.appendChild(image);
            list.appendChild(item);
            });
        })
        .catch(error => {
            console.error("Error loading images:", error)
        });
}

document.getElementById("nav-breeds").addEventListener("click", () => {
  loadBreeds();
});

document.getElementById("nav-images").addEventListener("click", () => {
  loadImages();
});
*/


/* Final js script to make the page make sense instead of just 
fetching random images and dog breed names */
let breeds = [];
let currentIndex = 0;


//gets info about the dog
function fetchBreeds(){
    return fetch("https://api.thedogapi.com/v1/breeds",{
        headers:{
            "x-api-key": "live_4NwSCSCAIZa0Ll4XZL2yPJCnAUOBul6M2C1BzosusZu3xFIWzsF0Td2FjziiZO0T"
        }
    })
        .then(response => response.json())
        .then(data => {
        breeds = data;
        });
}

fetchBreeds();
//gets image of dog
function fetchDogImg(imageId){
    return fetch(`https://api.thedogapi.com/v1/images/${imageId}`,{
        headers:{
            "x-api-key": "live_4NwSCSCAIZa0Ll4XZL2yPJCnAUOBul6M2C1BzosusZu3xFIWzsF0Td2FjziiZO0T"
        }
    })
    .then(response => response.json())

}

function addDog(){
    const list = document.querySelector("#DogBreeds ul");

    if (currentIndex >= breeds.length) {
        alert("No more dogs!");
        return;
    }
    const breed = breeds[currentIndex];

    if (!breed.reference_image_id) {
        currentIndex++;
        addNextDog();
        return;
    }

    fetchDogImg(breed.reference_image_id).then(image => {
        const item = document.createElement("li");

        const img = document.createElement("img");
        img.src = image.url;
        img.style.width = "100%";
        img.style.borderRadius = "6px";

        const name = document.createElement("p");
        name.textContent = breed.name;

        item.appendChild(img);
        item.appendChild(name);
        list.appendChild(item);

        currentIndex++;
  });
}

document.getElementById("Add-dog").addEventListener("click", event => {
        event.preventDefault();
        addDog();
    }
);