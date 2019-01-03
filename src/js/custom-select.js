import customSelect from 'custom-select';

document.addEventListener('DOMContentLoaded',function() {

    window.cs = function() {
    
        let el = document.getElementsByTagName('select');
        
        for (let i = 0; i < el.length; i ++) {
           !el[i].parentNode.classList.contains('customSelect') ? customSelect(el[i]) : false;
        }         
    }
    
    cs();


}, false);