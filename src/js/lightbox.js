const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

document.addEventListener('DOMContentLoaded',function() {

    const init = function(e) {
        
        let url = e.target.dataset.url;

        const clickOutside = function(e) {
            let target = e.target;  

            if (target.id === 'overlay') {
                closeLightbox();
            }
        }
        
        const closeLightbox = function() {
            enableBodyScroll(document.getElementById('overlay'));
            document.getElementById('overlay').remove();
            document.removeEventListener('click', clickOutside);
            window.removeEventListener('resize', setHeight);
        }

        const setHeight = function() {
            let windowHeight = window.innerHeight,
                lightboxHeight = document.getElementsByClassName('js-lightbox')[0].clientHeight;
            
            if (lightboxHeight > windowHeight) {
                document.getElementById('overlay').classList.add('to-baseline');
            } else {
                document.getElementById('overlay').classList.remove('to-baseline');
            }
        }

        const loadContent = function() {
            
            let req = new XMLHttpRequest();
            
            req.open('GET', url, true);
            req.send(null);
    
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                    
                        let tmp = document.createElement('div');
                            tmp.innerHTML = req.responseText.trim();
                            
                        let content = document.getElementById('overlay').getElementsByClassName('js-content')[0];
                            
                        content.appendChild(tmp.firstChild);
                        content.classList.add('is-visible');
                        
                        setHeight();
                        window.addEventListener('resize', setHeight, false);
                        disableBodyScroll(document.getElementById('overlay'));
                        
                        window.cs();            // custom select
                        window.contactMap();    // gmap
                        window.uploadcsv();     // import contact
                        window.validateForm();  // validate form
                        
                        content.getElementsByClassName('js-closelightbox')[0].addEventListener('click', closeLightbox);

                    } else {
                        console.log(req.status, req.statusText);
                    }
                }
            };

            //document.getElementById('overlay').removeEventListener('transitionend', loadContent);
        };

        const pressEsc = function(evt) {
            let isEscape = false;
            
            if ("key" in evt) {
                isEscape = (evt.key == "Escape" || evt.key == "Esc");
            } else {
                isEscape = (evt.keyCode == 27);
            }

            if (isEscape) {
                closeLightbox();
            }

            document.removeEventListener('keydown', pressEsc);
        }

        const showLightbox = function() {
        
            const hamburger = document.getElementsByClassName('js-hamburger')[0];
            const nav = document.getElementsByClassName('js-nav')[0];

            if (document.getElementById('overlay')) {
                closeLightbox();
            }
            
            if (hamburger.classList.contains('is-active')) {
                
                hamburger.classList.remove('is-active');
                nav.classList.remove('is-visible');
            }
            

            let tmp = document.createElement('div');

            tmp.innerHTML = '<div class="o-overlay" id="overlay"><div class="o-overlay__content js-content"></div></div>';

            document.body.appendChild(tmp.firstChild);            
            document.addEventListener('keydown', pressEsc);
            document.addEventListener('click', clickOutside);

            setTimeout(function() {
                //document.getElementById('overlay').classList.add('is-visible');
                loadContent();
                //document.getElementById('overlay').addEventListener('transitionend', loadContent, false);
            }, 10);
        }

        if (url) {
            showLightbox();
            e.stopPropagation();
            e.preventDefault() ? e.preventDefault() : e.preventDefault = false;
        }
    }    
    
    document.addEventListener('click', init, true);
    
}, false);