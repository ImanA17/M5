const fruits = [
    {id: 1, title: 'Apple' , price: 20, imag: 'https://businessnc.com/wp-content/uploads/2018/08/apples-getty-839461454.jpg'},
    {id: 2, title: 'Orange', price: 30, imag: 'https://www.halegroves.com/blog/wp-content/uploads/2019/03/buy-navel-oranges-online-020819b.jpg'},
    {id: 3, title: 'Mango' , price: 40, imag: 'https://www.garden.eco/wp-content/uploads/2018/08/where-do-mangos-grow-400x266.jpg'},
]

/**
 * 1. Show Modal window of price
 * 2. Dynamic set list of cards
 * 3. On delete modal remove or not!
 */



const modal = $.modal({
    title: "George Petrosyan Modal Dialog",
    closable: true,
    content:`
    <h6>Modal is working</h6>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint dolore eum laudantium dolores eligendi! Ipsa, rem quis. Soluta ipsum perferendis sequi praesentium odit quia vero, velit nisi nam, nemo explicabo itaque atque id accusantium aut ratione ducimus provident eligendi voluptas.</p>
    `,
    width: '400px',
    footerButtons: [
        { 
            text: 'OK', 
            type: 'primary',
            handler() {
                modal.close()
            }
        },
        {
            text: 'Cancel', 
            type: 'danger',
            handler() {
                modal.close()
            } 
        },       
    ]
})

