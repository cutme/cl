document.addEventListener('DOMContentLoaded', function() {

    const el = document.getElementsByClassName('js-updatemylist')[0];

    const init = function() {
    
        const updateList = function(obj) {
            
            if (obj.classList.contains('is-onmylist')) {
                
                obj.innerHTML = obj.dataset.remove;
                obj.classList.remove('is-onmylist');
            
            } else {

                obj.innerHTML = obj.dataset.add;
                obj.classList.add('is-onmylist');
            
            }
        }
        
        const action = function(e) {
            
            updateList(e.target);

            e.preventDefault() ? e.preventDefault() : e.preventDefault = false;
        }
        
        updateList(el);
        
        el.addEventListener('click', action)
    }
    
    el ? init() : false;

}, false);
