import Glide from '@glidejs/glide';
import css from '../../node_modules/@glidejs/glide/src/assets/sass/glide.core.scss';

document.addEventListener('DOMContentLoaded',function() {
    
    const propertyBigCarousel = document.getElementById('propertyBigCarousel'),
          dashslide = document.getElementsByClassName('js-dashslide');


    // Carousel in Search Property Details

    const propertyBigCarousel_init = function() {

        const glide = new Glide(propertyBigCarousel, {
            type: 'carousel',
            animationDuration: 1000,
            autoplay: 4000,
            startAt: 1,
            perView: 3,
            gap: 40,
            rewind: true,
            peek: -200
        })
        
        glide.mount();
        
        //window.onload = function() {
            propertyBigCarousel.removeAttribute('style');
            propertyBigCarousel.classList.add('is-visible');
       //}
    }
    
    
    // Carousels in Dashboard

    const dashSlides = function() {
        
        for (let i = 0; i < dashslide.length; i ++) {
        
            let perview = dashslide[i].getAttribute('data-row');
            
            dashslide[i].style.maxWidth = "1080px";

            const glider = new Glide(dashslide[i], {
                type: 'carousel',
                perView: perview,
                peek: -20,
                swipeThreshold: false,
                dragThreshold: false,
                breakpoints: {
            		768: {
            			perView: 3
            		},
            		540: {
            			perView: 1
            		}
            	}
            })
            
            glider.mount();
        }
    }
    
    
    dashslide.length > 0 ? dashSlides() : false;
    propertyBigCarousel ? propertyBigCarousel_init() : false;
    

}, false);