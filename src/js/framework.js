import ScrollToPlugin from 'gsap/ScrollToPlugin';


document.addEventListener('DOMContentLoaded',function() {


    // Set rows to have the same height

    (function() {        
        if (document.getElementsByClassName('js-postsTitle')[0]) {
            
            window.onload = function() {
                setTimeout(function() {
                    cutme.helper.setRowHeights();
                }, 1000);
            }
            
            // page resize
            window.onresize = function(event) {

                setTimeout(function() {
                    // set heights based on new page size
                    cutme.helper.setRowHeights();

                }, 10);

            };
        }
        
    })();
    

    // isMobile
    
    (function() {
    	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    		document.getElementsByTagName('html')[0].className += ' mobile';
    	} else {
    	    document.getElementsByTagName('html')[0].className += ' desktop';
    	}
    })();


    // GoToTarget

    (function() {
    
        'use strict';
        
        const scrollTo = function (target, speed, offset) {    
    		TweenLite.to(window, speed, {
    			scrollTo: {
    				y: target + offset,
    				autoKill: false
    			},
    			ease: Power1.easeOut
    		});
    	};
    
    	const speed_calculate = function (target) {
        	let base_speed  = 25,
        		page_offset = window.pageYOffset || document.documentElement.scrollTop,
            	offset_diff = Math.abs(target - page_offset),
            	speed = ((offset_diff * base_speed) / 1000)/100;
    
        	return speed;
    	};
    
    	const clickAction = function(e) {
    	
    	    const that = e.currentTarget;
    
    	    let src = that.getAttribute('href'),
    	        window_pos = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
    
    	    const obj = document.getElementById( src.slice(1, src.length) );
    
    	    if (obj) {
    	        let offset = that.getAttribute('data-offset');
    
                if (!offset) {
                    offset = 0;
                }
                
                document.body.removeAttribute('style');
    	    
    	        let target = window_pos + obj.getBoundingClientRect().top - offset;
    	        scrollTo(target, speed_calculate(target), offset);
    	    }
            
            if (window.e) {
                window.e.returnValue = false;
            }
            
    	    e.preventDefault() ? e.preventDefault() : e.preventDefault = false;
    	};
    	
    
        
        const btn = document.getElementsByClassName('js-goto');
        
        if (btn.length>0) {
        	for (let i = 0; i < btn.length; i++) {
                btn[i].addEventListener('click', clickAction);
            }
        }
    })();


    // Nav
    
    (function() {
        
        const hamburger = document.getElementsByClassName('js-hamburger')[0];
        
        if (hamburger) {
         
            let mobilestatus = false;

            const nav = document.getElementsByClassName('js-nav')[0],
                  body = document.body,
                  link = nav.getElementsByTagName('a');

            const closeNav = function() {
                hamburger.classList.remove('is-active');
                body.classList.remove('mobile-nav');
                nav.classList.remove('is-visible');
                
                document.removeEventListener('keydown', pressEsc);
                document.removeEventListener('click', clickOutside);
                
                closeSubmenu();
            }

            const clickOutside = function(e) {
                let target = e.target;  
    
                if (target.classList.contains('o-container')) {
                    closeNav();
                } 
            }            

            const action = function(e) {
                
                e.currentTarget.classList.toggle('is-active');
                body.classList.toggle('mobile-nav');

                setTimeout(function() {
                    nav.classList.toggle('is-visible');
                }, 1);
                
                document.addEventListener('keydown', pressEsc);
                document.addEventListener('click', clickOutside);
            }

            const pressEsc = function(evt) {
                let isEscape = false;
                
                if ("key" in evt) {
                    isEscape = (evt.key == "Escape" || evt.key == "Esc");
                } else {
                    isEscape = (evt.keyCode == 27);
                }
                
                if (isEscape) {
                    closeNav();
                }
                
                document.removeEventListener('keydown', pressEsc);
            }
            
            const closeSubmenu = function() {
                let submenus = nav.getElementsByClassName('open-submenu');
                
                for (let i = 0; i < submenus.length; i ++) {
                    submenus[i].classList.remove('open-submenu');
                    nav.classList.remove('to-top');
                }
            }
            
            const cta = function(e) {

                let submenu = this.parentNode.getElementsByClassName('sub-menu')[0];

                if (window.innerWidth <= 1024) {
                    if (submenu) {
    
                        if (submenu.parentNode.classList.contains('open-submenu')) {
    
                            closeSubmenu();
                            return false;
    
                        } else {
    
                            submenu.parentNode.classList.add('open-submenu');
                            nav.classList.add('to-top');
                        }
    
                    } else {
                        document.location.href = this.getAttribute('href');
                    }
    
                    e.preventDefault() ? e.preventDefault() : e.preventDefault = false;
                }
            }


            for (let i = 0; i < link.length; i ++) {
                
                link[i].addEventListener('click', cta);
                
            }
            
            hamburger.addEventListener('click', action);
            
            
            const enableMobileNav = function() {
                if (mobilestatus === false) {
                    cutme.helper.detach(nav, body);
                    mobilestatus = true;
                }
            }
            
            const disableMobileNav = function() {
                if (mobilestatus === true) {
                    cutme.helper.detachAfter(nav, body.getElementsByClassName('js-topbar')[0].getElementsByClassName('c-logo')[0]);
                    mobilestatus = false;
                }
            }
            
            
            window.addEventListener('resize', function() {
               
               if (window.innerWidth >= 1024) {
                    if (hamburger.classList.contains('is-active')) {
                        closeNav();
                    }
                    
                    disableMobileNav();

               } else {
                                          
                   enableMobileNav();
                   
               }
            });
            
            if (window.innerWidth <= 1024) {
                enableMobileNav();
            }
        }
        
    })();


    // Border topbar

    (function() {
        let scroll_pos = window.pageYOffset || window.scrollY,
            status = false;
        
        const el = document.getElementsByClassName('js-topbar')[0];
        
        const action = function() {
            scroll_pos = window.pageYOffset || window.scrollY;
            
            if (scroll_pos > 200) {
                if (status === false) {
                    el.classList.add('border');
                    status = true;
                }
            } else {
                if (status === true) {
                
                    el.classList.remove('border');
                    status = false;
                }
            }
        }
        
        window.addEventListener('scroll', action);
        
    })();


    // Remove Autocomplete
    
    /*
(function() {
        window.onload = function() {
        
            let inputs = document.getElementById('commentform').getElementsByTagName('input');
            
            if (inputs.length>0) {
                for (let i = 0; i < inputs.length; i ++) {
                    inputs[i].setAttribute('autocomplete', 'nope');
                }
            }
        };
    })();
*/


}, false);