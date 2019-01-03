document.addEventListener('DOMContentLoaded',function() {

    window.uploadcsv = function() {
    
        let el = document.getElementsByClassName('js-uploadcsv');
        
        const init = function(e) {

            for (let i = 0; i < el.length; i ++) {
            
                let upload = el[i],
                    input = el[i].getElementsByTagName('input')[0],
                    filename = el[i].getElementsByClassName('js-filename')[0];
                    
                const changeEventHandler = function(e) {
                
                    input.value.replace(/.*(\/|\\)/, '');
                    upload.classList.add('file-added');
                    filename.classList.remove('is-hidden');

                    for (let j = 0; j < input.files.length; ++j) {
                        let name = input.files.item(i).name;
                        filename.innerHTML = name;
                    }
                }

                input.onchange = changeEventHandler;                    
            }
        }

        el.length > 0 ? init() : false;
    }
    
    
}, false);
