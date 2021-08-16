let
    name = document.getElementById("productName"),
    desc = document.getElementById("productDesc"),
    price = document.getElementById("productPrice"),
    company = document.getElementById("productCom"),
    btn = document.getElementById("myBtn"),
    productsRow = document.getElementById("productsRow"),
    productContainer = [],
    search = document.getElementById("search"),
    searchResult = document.getElementById("result"),
    form = document.getElementsByTagName("form")[0];


class Product {
    static id = 0 ;
    constructor(price, name, company, desc) {
        this.price = price;
        this.name = name;
        this.company = company;
        this.desc = desc;
        this.productId = Product.id++ ;
    }
}


const cardTemplate = ({ name, desc, price, company , productId}) => (
    `<div class = "col-md-6 col-lg-4 text-center p-2  border border-light bg-light m-2"><h2 class = " text-primary"> ${name}</h2>
        <p class = "text-secondary p-2 ">${desc} </p>
        <p class = "text-danger">${price}</p>
        <p class = "text-muted">${company} </p>
    <button class = "btn btn-danger " onclick = "delProduct(${productId})"> Delete </button> </div> `
)

const displayProducts = () => {
    let cols = "";
    productContainer.forEach((element) => {
        cols += cardTemplate(element);
    });

    document.getElementById("productsRow").innerHTML = cols;
}


btn.onclick = () => {
    addProduct();
    displayProducts();
    name.value = price.value = company.value = desc.value = null;
}

const addProduct = () => {
    // to add the product at the loal storage 
    if (name.value == "" || price.value == "" || desc.value == "" || company == "") {
        window.alert("please enter a valid information ")
    }
    else {
        productContainer.push(new Product(price.value, name.value, company.value, desc.value));
        localStorage.setItem("productContainer", JSON.stringify(productContainer));
    }
}




const delProduct = (productId) => {
    productContainer = productContainer.filter ((element)=> element.productId != productId) ;
    localStorage.setItem("productContainer", JSON.stringify(productContainer));
    displayProducts();
    if (searchResult.innerHTML!=""){
        productSearch(search.value);
    }
}




const productSearch = (term) => {
    let temp = [], cols = " ";

    // returrn the elements that includes the term ;
    temp = productContainer.filter(({ name }) => name.toLowerCase().includes(term.toLowerCase().trim())); // returns the elements that containes the term ;
    temp.forEach((element, i) => {
        cols += cardTemplate(element, i);
    });
    // checking if there were no match to display an informative message to the user ;
    temp = temp.length === 0 ? temp = `<p class = "text-danger py-2"> this item is not found ......</p> ` : result;

    // displaying the result ;
    searchResult.innerHTML = cols;
}

//  intiallizes the product Container with old elements if exist ;
if (localStorage.getItem("productContainer") != null) {
    productContainer = JSON.parse(localStorage.getItem("productContainer"))
    displayProducts();
}