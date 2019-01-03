document.addEventListener('DOMContentLoaded',function() {

    const el = document.getElementsByClassName('js-searchforms')[0];
    
   
    
    
    const init = function() {

        const checkboxes = el.getElementsByClassName('js-checkboxes')[0],
              checkbox = checkboxes.getElementsByClassName('js-checkbox'),
              filters = el.getElementsByClassName('js-filters')[0],
              searchform = filters.getElementsByClassName('js-searchform');

        const switchForm = function() {            
                  
            const hideForm = function() {

                for(let i = 0; i < searchform.length; i++ ) {
                    if (searchform[i].classList.contains('is-active')) {
                        searchform[i].classList.remove('is-active');
                        searchform[i].getElementsByClassName('js-inside')[0].classList.remove('is-active');
                    }
                }
            }
            
            const showForm = function(i) {
                searchform[i].classList.add('is-active');
                
                setTimeout(function() {
                    searchform[i].getElementsByClassName('js-inside')[0].classList.add('is-active');
                }, 1);
            }
        
            const action = function() {
            
                console.log(this);

                let index = (cutme.Helpers.thisindex(this.parentNode));

                hideForm();
                showForm(index);
                
            }            
            
            for(let i = 0; i < checkbox.length; i++ ) {
                
                checkbox[i].addEventListener('click', action);
                
                if ( checkbox[i].getAttribute('checked') != null ) {
                    showForm(i);
                }
            }
        }

        
        switchForm();
    }


    el ? init() : false;


}, false);