document.addEventListener('DOMContentLoaded',function() {

    const el = document.getElementsByClassName('js-toggle');
    
    const init = function() {
    

    
        const toggle = function(o, status) {
                
            let that = document.getElementById(o);
            
            if (status) {
                that.classList.remove('is-hidden');
                
                setTimeout(function() {
                    that.getElementsByClassName('js-content')[0].classList.remove('is-invisible');
                }, 1);
    
            } else {
                
                that.classList.add('is-hidden');
                that.getElementsByClassName('js-content')[0].classList.add('is-invisible');
            }
        };


        const action = function(e) {
        
            let target = e.target.getAttribute('data-toggle'),
                that = e.currentTarget;            

            if (that.classList.contains('is-active')) {
                that.classList.remove('is-active');   
                toggle(target, false);

            } else {
                that.classList.add('is-active');
                toggle(target, true);
            }

            e.preventDefault() ? e.preventDefault() : e.preventDefault = false; 
        };
        
        for(let i = 0; i < el.length; i ++) {
            
            el[i].addEventListener('click', action);
            //el[i].getElementsByTagName('span')[0].addEventListener('click', action);
            
            //console.log(el[i].currentTarget.parentNode);
        }
        
        
    };


    el ? init() : false;


}, false);