async function myAPI() {
    let res = await fetch("https://dog.ceo/api/breeds/list/all");
    return await res.json();
}

async function getBreedImages(breed) {
    let res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    return await res.json();
}

async function getSubBreedImages(breed, subBreed) {
    let res = await fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images`);
    return await res.json();
}2

async function run() {
    let breedList = document.querySelector(".breedList");
    let rightSide = document.querySelector(".rightSight");

    try {
        let res = await myAPI();
        let breeds = res.message;

        for (let breed in breeds) {

            let p = document.createElement("p");
            p.innerText = breed;

            p.addEventListener("click", async () => {

                document.querySelectorAll(".breedList p").forEach(el => {
                    el.classList.remove("active");
                });
                p.classList.add("active");

                rightSide.innerHTML = "<h4>Loading...</h4>";

                let subBreeds = breeds[breed];
                rightSide.innerHTML = "";

                if (subBreeds.length > 0) {

                    for (let sub of subBreeds) {

                        let subTitle = document.createElement("h3");
                        subTitle.innerText = `${breed} - ${sub}`;
                        rightSide.appendChild(subTitle);

                        let imgData = await getSubBreedImages(breed, sub);

                        imgData.message.slice(0,).forEach(img => {
                            let image = document.createElement("img");
                            image.src = img;
                            rightSide.appendChild(image);
                        });
                    }

                } else {

                    let title = document.createElement("h2");
                    title.innerText = breed;
                    rightSide.appendChild(title);

                    let imgData = await getBreedImages(breed);

                    imgData.message.slice(0,).forEach(img => {
                        let image = document.createElement("img");
                        image.src = img;
                        rightSide.appendChild(image);
                    });
                }
            });

            breedList.appendChild(p);
        }

    } catch (err) {
        console.log(err);
    }
}

run();