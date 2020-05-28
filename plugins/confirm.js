$.confirm = function(options) {
    return new Promise((resolve,reject) => {

        const modal = $.modal({
            //width: '400px',
            //closable: false,
            title: options.title,
            content: options.content,
            onClose: function() {
                modal.destroy()
            },
            footerButtons: [
                {text: 'Cancel',  type: 'secondary',handler() {
                    modal.close()
                    reject()
                }},
                {text: 'Delete', type: 'danger',handler() {
                    modal.close()
                    resolve()
                }},
            ],

        })

        modal.open()
    })
}