import Croppie from 'croppie';
import css from '../../node_modules/croppie/croppie.css';

document.addEventListener('DOMContentLoaded',function() {

    const el = document.querySelectorAll('.js-croppie');
    
    const init = function(item) {        

        const img = item.querySelector('.js-image'),
              rotate = item.querySelectorAll('.js-rotate'),
              upload = item.querySelector('input[type=file]');
              
        let croppie;
    
    	const readFileHandler = function(event) {
    	
    	    let input = event.target,
    	        reader = new FileReader();
    
            reader.onload = function() {                
            
                let dataURL = reader.result;
    			
                croppie.bind({
                    url: dataURL,
                    orientation: 1
                });
            }
            reader.readAsDataURL(input.files[0]);
        }
        
            
        croppie = new Croppie.Croppie(img, {
            enableExif: true,
            viewport: {
                width: 260, 
                height: 251,
            },
            showZoomer: true,
            enableOrientation: true,
            viewMode:3,
            aspectRatio: 1,
        });
        
        if (item.dataset.image) {
            croppie.bind({
                url: item.dataset.image,
                orientation: 1
            });
        }
        
        rotate.forEach(function(obj) {
            obj.addEventListener('click', function(e) {
                croppie.rotate(parseInt(this.dataset.deg));
            });
        });

        
        
        upload.onchange = readFileHandler;

    };


    
        
    if (el) {
        window.onload = function() {
            el.forEach(function(item) {
                init(item);
            });
        };
    }
    
    
}, false);
