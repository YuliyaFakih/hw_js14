class App {
        constructor() {
            this.element = JSON.parse(localStorage.getItem('products')) || []
        }
        create(){
            //location.assign ("http://127.0.0.1:5500/")
            //window.location.hostname = "http://localhost/"
            const mainContainer = document.createElement('div')
            mainContainer.classList.add('app')
            this.element = mainContainer;
        }
        render(){
            document.body.prepend(this.element)
        }
        getApiData() {
            const currentList = []            

            fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then((products) => {
                return products.map(product => {
                    this.element.insertAdjacentHTML('afterbegin', `
                    <div>
                        <h2>${product.title}</h2>
                        <p class="price">${product.price} $ </p>
                        <p class="description"><b>Description:</b> ${product.description}</p>
                        <p class="category"><b>Category:</b> ${product.category}</p>
                        <img src="${product.image}">
                        <button> Add in the bag </button>
                    </div>
                    `)
                              
                    if(localStorage.getItem('products')) {

                    } else {
                        localStorage.setItem('products', JSON.stringify(products))
                    }

                    document.querySelector('.app div h2').addEventListener('click', () => { 
                        document.querySelector('.app').innerHTML = ''
                        document.querySelector('.app').insertAdjacentHTML('afterbegin', `
                        <div>
                            <h2>${product.title}</h2>
                            <img src="${product.image}">
                        </div>
                        <p class="price">${product.price} $ </p>
                        <div>
                            <p class="description"><b>Description:</b> ${product.description}</p>
                            <button> Add in the bag </button>
                        </div>
                        `)
                        
                        document.head.insertAdjacentHTML('beforeend', `
                        <style>
                        .app {
                            background: white;
                            padding: 15px;
                            border: 2px solid #dccece;
                            box-shadow: 0 0 15px 5px #ceabab85;
                        }
                        .app div {
                            padding: 40px;
                            border: none; 
                            box-shadow: none;
                        }
                        .app img {
                            position: relative;
                            display: block;
                            bottom: 0;
                            left: 0;
                            margin: 38px auto;
                        }
                        .app > p {
                            width: auto; 
                            height: auto;
                            border: none; 
                            box-shadow: none;
                        }
                        .app div .description {
                            overflow-y: none !important;
                            height: auto;
                            font-size: 18px;
                        }
                        button {
                            position: relative;
                            bottom: 0;
                            left: 0;
                            display: block;
                            margin: 33px auto;
                            width: 159px;
                            height: 55px;
                            font-size: 20px;
                        }
                        </style>
                        `)
                    })
                    
                    const button = document.querySelector('.app div > button')
                    button.addEventListener('click', () => {
                        button.classList.toggle('added')
                        if(button.classList.contains('added')) {
                            button.innerText = "Added"
                            currentList.push(product)
                            document.cookie = "AddedProducts=" + JSON.stringify(currentList)
                        } else {
                            button.innerText = "Add in the bag"
                        }
                    })

                    document.querySelector('.bag').addEventListener('click', () => {
                        document.querySelector('.app').innerHTML = ""
                        window.location.hash = "#cart/"
                        const priceContainer = document.createElement('div')
                        const cartPrice = document.createElement('p')
                        priceContainer.appendChild(cartPrice)
                        const btnBuy = document.createElement('button')
                        btnBuy.innerText = "Buy now"
                        priceContainer.appendChild(btnBuy)
                        document.querySelector('.app').appendChild(priceContainer)
                        priceContainer.classList.add('priceContainer')
                      
                        currentList.forEach(product => {
                            document.querySelector('.app').insertAdjacentHTML('beforeend', `
                            <div class="item">
                                <h2> ${product.title} </h2>
                                <p class="price2"> ${product.price} $</p>
                                <img src="${product.image}">
                                <input class="countTotal" type="number" min="1" value="1" step="1">
                            </div>
                            `)
                            let removeBtn = document.createElement('button')
                            removeBtn.innerText = "Remove"
                            document.querySelector('.item').appendChild(removeBtn)
                            //все кнопки добавляются в первый товар 
                            removeBtn.addEventListener('click', function(){
                                this.parentElement.remove();
                            });
                            
                            let itemNumber = parseInt(document.querySelector('.countTotal').value)
                            //let itemPrice = parseFloat(document.querySelector('.price2').textContent)
                            let totalPrice = 0
                            let UpdateTotal = function() {
                                currentList.map((item)=>{
                                return totalPrice = totalPrice + (item.price * itemNumber);
                            })
                            }()
                            document.querySelector('.countTotal').addEventListener('change', () => {
                                UpdateTotal()
                          })
                            console.log(totalPrice)
                            cartPrice.innerHTML = "Total:" + totalPrice + "$";
                
                            let itemCounter = document.createElement('span')
                            document.querySelector('.bag').appendChild(itemCounter)
                            itemCounter.innerText = currentList.length || 0
                            //не получилось вставить вне итераций

                        })
                    })
                })
            })
        }
     
        init(){
            this.create()
            this.render()
            this.getApiData()

            document.querySelector('html').setAttribute('lang', 'en')
            const meta1 = document.createElement('meta')
            meta1.setAttribute('charset', 'UTF-8')
            document.head.appendChild(meta1)
            const meta2 = document.createElement('meta')
            meta2.setAttribute('http-equiv', 'X-UA-Compatible')
            meta2.setAttribute('content', 'IE=edge')
            document.head.appendChild(meta2)
            const meta3 = document.createElement('meta')
            meta3.setAttribute('name', 'viewport')
            meta3.setAttribute('content', `width=device-width, initial-scale=1.0`)
            document.head.appendChild(meta3)
            const meta4 = document.createElement('meta')
            meta4.setAttribute('name', 'author')
            meta4.setAttribute('content', 'Yuliya Fakih')
            document.head.appendChild(meta4)
            const title = document.createElement('title')
            title.innerHTML = 'SPA'
            document.head.appendChild(title)
            const css = document.createElement('link')
            css.setAttribute('rel', 'stylesheet')
            css.setAttribute('href', './css/style.css')
            document.head.appendChild(css)
        }
}

export default new App().init();