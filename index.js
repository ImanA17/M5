let fruits = [
    {id: 1, title: 'Apple' , price: 20, imag: 'https://businessnc.com/wp-content/uploads/2018/08/apples-getty-839461454.jpg'},
    {id: 2, title: 'Orange', price: 30, imag: 'https://www.halegroves.com/blog/wp-content/uploads/2019/03/buy-navel-oranges-online-020819b.jpg'},
    {id: 3, title: 'Mango' , price: 40, imag: 'https://www.garden.eco/wp-content/uploads/2018/08/where-do-mangos-grow-400x266.jpg'},
]

 const toHTML = function(fruit){ return `
    <div class="col" id = "${fruit.id}">
    <div class="card">
        <img class="card-img-top" style = 'height: 200px'src="${fruit.imag}" alt = ${fruit.title}>
        <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn = "price" data-id = "${fruit.id}" >Check Price</a>
        <a href="#" class="btn btn-danger" data-btn = "delete" data-id = "${fruit.id}" >Delete</a>
        </div>
    </div>            
    </div>
   `
 }

function render(){
    const html = fruits.map( fruit => toHTML(fruit)).join('');
    document.querySelector('#fruits').innerHTML = html;
}

render()

const priceModal = $.modal({
    title: "Fruit Price",
    closable: true,
    width: '400px',
    footerButtons: [
        { 
            text: 'Close', 
            type: 'primary',
            handler() {
                priceModal.close()
            }
        },
    ]
})



document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id
    if(btnType === 'price') {
 
        const fruit = fruits.find( elem => elem.id === id)

        priceModal.setContent(`
        <img class="card-img-top" style = 'height: 200px'src="${fruit.imag}" alt = ${fruit.title}>
        <h5 class="card-title">${fruit.title}</h5>       
        <p>Price: <strong>${fruit.price}$</strong>  per Kg</p>
        `)
        priceModal.open()
        


    } 
    else if(btnType === 'delete') {

        const fruit = fruits.find( elem => elem.id === id)
        const confirmModal = $.confirm({
            title: "Delete",
            content: `
            <p> Are you sure want to remove <strong>${fruit.title}</strong> from list</p>
            `,
        })
        .then( (data) => {
            fruits = fruits.filter( (f) => {return f.id!==id})
            render()
        } )
        .catch( (reson) => {
            console.log('cancel');
        })
        
    }
})

