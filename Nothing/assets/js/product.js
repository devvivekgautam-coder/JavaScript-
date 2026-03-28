let products = JSON.parse(localStorage.getItem("Products")) || [];
let DisplayPro = () => {
        products.forEach((pro) => {
            // console.log(pro.n);
            console.log(products);

        })
}
DisplayPro();