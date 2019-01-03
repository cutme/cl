(function() {
    
    const topButtons = document.getElementsByClassName('js-top-buttons')[0],
          nav = document.getElementsByClassName('js-nav')[0],
          topbar = document.getElementsByClassName('js-top')[0],
          smartphone = 540;

    let status = false;

    const action = function() {
        
        if (window.innerWidth > smartphone) {            
           if (status === true) {

               if (topbar) {
                  cutme.Helpers.detach( topButtons, topbar );
                  status = false;
               }
              
           }
       }
       
       if (window.innerWidth <= smartphone) {
           if (status === false) {
           
              if (topbar) {
                  cutme.Helpers.detach( topButtons, nav );
                  status = true;
              }
              
           }
       }   
    };
    
    action();

    window.addEventListener('resize', function() {

       action();
                 
    });
    
    
})();
