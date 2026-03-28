let products = JSON.parse(localStorage.getItem("Products")) || [];

let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let imageUrl = document.getElementById("imageUrl").value;

    if (name.trim() && price.trim() && imageUrl.trim()) {

        let product = {
            name: name,
            price: price,
            imageUrl: imageUrl
        };

        products.push(product);

        localStorage.setItem("Products", JSON.stringify(products));
        form.reset();
    } else {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        });
    }
});