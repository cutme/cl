document.addEventListener('DOMContentLoaded',function() {

    const el = document.getElementsByClassName('js-post');
    
    const init = function() {

        const action = function(e) {
            let url = e.currentTarget.dataset.url;
            
            url ? window.open(url, '_self') : false;
        }

        for (let i = 0; i < el.length; i ++) {
            el[i].addEventListener('click', action);
        }
    }


    el.length > 0 ? init() : false;


}, false);