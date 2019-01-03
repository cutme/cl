document.addEventListener('DOMContentLoaded',function() {

    let tabs = document.getElementsByClassName('js-tabs')[0];

    const init = function() {

        const nav = tabs.getElementsByTagName('li'),
              content = document.getElementsByClassName('js-tabs-content')[0],
              item = content.getElementsByClassName('js-tab');
              
        const setActiveOnStart = function() {
            
            let activeIndex = cutme.Helpers.thisindex(tabs.getElementsByClassName('is-active')[0]),
                activeTabItem = content.getElementsByClassName('js-tab')[activeIndex],
                activeTabContent = activeTabItem.getElementsByClassName('js-inside')[0];

            activeTabItem.classList.add('is-active');
            activeTabContent.classList.add('is-active');
        }

        const hideTab = function() {
            const activeNav = tabs.getElementsByClassName('is-active')[0],
                  activeContent = content.getElementsByClassName('is-active')[0];
            
            if (activeContent) {
                activeNav.classList.remove('is-active');
                activeContent.classList.remove('is-active');
                activeContent.getElementsByClassName('is-active')[0].classList.remove('is-active');
            }
        }
        
        const showTab = function() {
            
        }

        const action = function() {
            let target = item[cutme.Helpers.thisindex(this)];            

            hideTab();
            showTab();

            this.classList.add('is-active');
            target.classList.add('is-active');

            setTimeout(function() {
                target.getElementsByClassName('js-inside')[0].classList.add('is-active');                            
            }, 1)

        }

        for (let i = 0; i < nav.length; i ++) {            
            nav[i].addEventListener('click', action);
        }

        
        setActiveOnStart();
    };


    tabs ? init() : false;

}, false);