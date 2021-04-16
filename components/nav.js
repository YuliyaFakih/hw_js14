class Nav {
    constructor() {
        this.element = []
    }
    create() {
        const navigation = document.createElement('nav')
        navigation.classList.add('navbar')
        this.element = navigation
        const container = document.createElement('div')
        container.classList.add('container')
        navigation.appendChild(container)
        const navContainer = document.createElement('ul')
        container.appendChild(navContainer)
        const bagContainer = document.createElement('div')
        bagContainer.innerHTML = "Shopping Bag: " 
        bagContainer.classList.add('bag')
        
        container.appendChild(bagContainer)
        const li1 = document.createElement('li')
        li1.classList.add('products')
        li1.innerText = "Products"
        const li2 = document.createElement('li')
        li2.innerText = "Women clothing"
        const li3 = document.createElement('li')
        li3.innerText = "Electronics"
        const li4 = document.createElement('li')
        li4.innerText = "Men clothing"
        navContainer.appendChild(li1)
        navContainer.appendChild(li2)
        navContainer.appendChild(li3)
        navContainer.appendChild(li4)
    }

    init() {
        this.create()
        document.body.prepend(this.element)
        document.querySelector('.products').addEventListener('click', () => {
            //const hashData = window.hash.replace('#', '').split('/')
            window.location.hash = 'products'
            document.querySelector('.app').innerHTML = ''

            this.productPage()
        })
    }

    productPage() {
        let id = prompt('Specify item ID from 1 to 20')
        console.log(id)
        window.location.search = id
        fetch('https://fakestoreapi.com/products/'+ id)
            .then(response => response.json())
            .then((product) => {
                document.querySelector('.app').insertAdjacentHTML('beforeend', `
                    <div class="itemPage">
                        <h2>${product.title}</h2>
                        <p class="price">${product.price} $ </p>
                        <p class="description"><b>Description:</b> ${product.description}</p>
                        <p class="category"><b>Category:</b> ${product.category}</p>
                        <img src="${product.image}">
                    </div>
                    `)
            })
    }
}

const nav = new Nav().init();
export {nav};