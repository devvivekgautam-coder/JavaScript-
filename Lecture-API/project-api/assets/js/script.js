async function myAPI() {
    let isResponse = await fetch("https://dog.ceo/api/breeds/list/all");
    let data = await isResponse.json();
    return data;
}

async function run() {
    let breedList = document.querySelector(".breedList");

    try {
        let res = await myAPI();
        console.log(res);

        let breeds = res.message;

        for (let breed in breeds) {
            breedList.innerHTML += `<li class="mb-2 bg-info list-unstyled">${breed}</li>`;
        }

    } catch (err) {
        console.log(err);
    }
}

run();