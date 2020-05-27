Element.prototype.insertAfter = function(elAfter){
     if(elAfter !== undefined)
        elAfter.parentNode.insertBefore(this, elAfter.nextSibling) 
}

function noop(){}

function _createModalFooter(buttons=[]){

    if(buttons.length === 0){
        return undefined;
    }

    const wrap = document.createElement("div");
    wrap.classList.add("modal-footer");

    buttons.forEach( button =>{
        const btn = document.createElement('button');
        btn.textContent = button.text;
        btn.classList.add('btn');
        btn.classList.add(`btn-${button.type || 'secondary'}`);
        btn.onclick = button.handler || noop
        wrap.appendChild(btn);
    })
    return wrap
}






function _createModal(options){
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement("div");
    modal.classList.add('gmodal');
    modal.insertAdjacentHTML("beforeend", `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style = "width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class = "modal-title">${options.title || 'Window'}</span>
                    ${options.closable ? `<span class = "modal-close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
            </div>        
        </div>
    `) 

    const footer = _createModalFooter(options.footerButtons);
    if(footer!==undefined)
        footer.insertAfter(modal.querySelector('[data-content]'))

       
     document.body.appendChild(modal); 
    return modal;  
}

/*
* title: string+
* closable bool x visible or not+
* content string+
* width:string 400px+
* close as about in hs+
* ---------------------------------------------
* setcontent(html:sting): void | public+
* onClose():
* onOpen():void
* beforeClose(): boolean
* animate.css
*/

$.modal = function(options){
    const $modal = _createModal(options)
    const ANIMATION_SPEED = 200;
    let closing = false;
    let destroyed = false;

    const modalObj = {
        open(){
            if(destroyed){
                return console.log("Modal is destroyed")
            }
            !closing && $modal.classList.add('open');
        },
        close(){
            if(!$modal.classList.contains('open'))
                return;

            closing = true;
            $modal.classList.remove('open');
            $modal.classList.add('hide');

            setTimeout(()=> {
                $modal.classList.remove('hide');
                closing = false;
            },ANIMATION_SPEED)
        }
    }

    const close_listener = (event)=>{
        if(event.target.dataset.close){
          modalObj.close();
      }
    }

    $modal.addEventListener('click', close_listener)


    return Object.assign(modalObj, {
        destroy() {
            $modal.removeEventListener(close_listener);
            $modal.parentNode.removeChild($modal)
            destroyed = true;
        },
        setContent(html){
            $modal.querySelector('[data-giorgi]').innerHTML = html;
        }


    });
}