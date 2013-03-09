define([
    'jquery',
    'underscore'
], function($, _) {

    var placedetails = {

        marker: function(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {

                // Info window with place contact info, yelp review, and google search link

                var placeDetails = '<div class="place-details"><b>' + place.name + '</b>' + (place.url ? '<a href="' + place.url + '" target="_blank" style="margin-left: 7px;">more info</a>' : '') + (place.formatted_address ? '<p>' + place.formatted_address.split(',')[0] : '') + '</p>' + (place.formatted_phone_number ? '<p>' + place.formatted_phone_number + '</p>' : '') + (place.website ? '<p><a href="' + place.website + '" target="_blank">' + place.website.slice(0,-1) + '</a></p>' : '') + '</p><p><a href="http://yelp.com/search?find_desc=' + place.name.trim().replace(/\s/,'+') + '&find_loc=San+Diego%2C+CA" target="_blank">Yelp reviews</a> | <a href="http://google.com/search?q=' + place.name.trim().replace(/\s/,'+') + '" target="_blank">Google search</a></p></div>';
                
                infowindow.setContent(placeDetails);
                infowindow.open(map, this);
            });
        },

        // drawOverlay function from https://github.com/hpneo/gmaps

        drawOverlay: function(options) {
            var overlay = new google.maps.OverlayView();
            overlay.setMap(map);

            var auto_show = true;

            overlay.onAdd = function() {
                var el = document.createElement('div');
                el.style.borderStyle = "none";
                el.style.borderWidth = "0px";
                el.style.position = "absolute";
                el.style.zIndex = 100;
                el.innerHTML = options.content;

                overlay.el = el;
                options.layer = 'overlayLayer';

                var panes = this.getPanes();
                var overlayLayer = panes[options.layer];
                overlayLayer.appendChild(el);
            };

            overlay.draw = function() {
                var projection = this.getProjection();
                var pixel = projection.fromLatLngToDivPixel(new google.maps.LatLng(options.lat, options.lng));

                options.horizontalOffset = options.horizontalOffset || 0;
                options.verticalOffset = 5; //options.verticalOffset || 0;

                var el = overlay.el;
                var content = el.children[0];

                var content_height = content.clientHeight;
                var content_width = content.clientWidth;

                switch (options.verticalAlign) {
                case 'top':
                    el.style.top = (pixel.y - content_height + options.verticalOffset) + 'px';
                    break;
                default:
                case 'middle':
                    el.style.top = (pixel.y - (content_height / 2) + options.verticalOffset) + 'px';
                    break;
                case 'bottom':
                    el.style.top = (pixel.y + options.verticalOffset) + 'px';
                    break;
                }

                switch (options.horizontalAlign) {
                case 'left':
                    el.style.left = (pixel.x - content_width + options.horizontalOffset) + 'px';
                    break;
                default:
                case 'center':
                    el.style.left = (pixel.x - (content_width / 2) + options.horizontalOffset) + 'px';
                    break;
                case 'right':
                    el.style.left = (pixel.x + options.horizontalOffset) + 'px';
                    break;
                }

                el.style.display = 'block';
            };

            return overlay;
        }
    };

    return placedetails;

});
