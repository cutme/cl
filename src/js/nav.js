const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

(function() {
    
    const el = document.getElementsByClassName('js-hamburger')[0];
    
    const init = function() {
    
        const nav = document.getElementsByClassName('js-nav')[0];  
        
        const hideMenu = function() {
            
            enableBodyScroll(document.getElementsByClassName('js-navlist')[0]);
            nav.classList.remove('is-visible');
            el.classList.remove('is-active');
            
        }
    
        const showMenu = function(e) {  

            // Menu is open
            if (e.currentTarget.classList.contains('is-active')) {
                
                hideMenu();
                
            } else {
                
                disableBodyScroll(document.getElementsByClassName('js-navlist')[0]);
                nav.classList.add('is-visible');
                el.classList.add('is-active');
                
            }

            //e.currentTarget.classList.toggle('is-active');
            e.preventDefault() ? e.preventDefault() : e.preventDefault = false;
        }

        el.addEventListener('click', showMenu);
     
     
        // Hide menu on ESC
        
        document.addEventListener('keydown', function(evt) {
           // evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key == "Escape" || evt.key == "Esc");
            } else {
                isEscape = (evt.keyCode == 27);
            }
            if (isEscape) {
                hideMenu();
            }
        });
       
    }
    
    el ? init() : false;
    
})();
