const loadGoogleMapsApi = require('load-google-maps-api');

document.addEventListener('DOMContentLoaded',function() {
    
    window.contactMap = function() {    
        const el = document.getElementsByClassName('js-map')[0];
    
        const init = function() {
            
            loadGoogleMapsApi({
                key: 'AIzaSyDzv4gozpcF9CjrI6OWHpLavj2hTLfH4IY'
                
            }).then(function (googleMaps) {
            
                el.classList.remove('is-loading');
    
                let myLatLng = new google.maps.LatLng(el.getAttribute('data-lat'), el.getAttribute('data-lng')),
                    map = new googleMaps.Map(el, {
                        center: myLatLng,
                        disableDefaultUI: true,
                        zoom: 17
                    });
    
                let marker = new google.maps.Marker({
                    position: myLatLng,
                    animation: google.maps.Animation.DROP,
                    map: map
                });
            
            }).catch(function (error) {
                console.error(error)
            })
        };
    
        el ? init() : false;
    }
    
    contactMap();

    
}, false);


