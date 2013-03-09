define([
    'jquery',
    'underscore',
    'backbone',
    'gmap',
    'placedetails',
    'neighborhoods',
    'text!templates/map.html'
], function($, _, Backbone, googleMap, placedetails, neighborhoods, mapTemplate) {

    var MapView = Backbone.View.extend({
        el: '#map',
        template:_.template(mapTemplate),

        initialize: function() {
            var map, service, infowindow;
        },

        events: {
            'change select': 'search'
        },

        search: function() {
            var searchsd = $('#neighborhood option:selected');
            var searchplaces = $('#hangout option:selected');

            if (searchsd.val() == "search-sd") {
                $('.error-msg.area').show();
                return false;
            }
            else if (searchplaces.val() == "search-for") {
                $('.error-msg.venue').show();
                return false;
            }

            $('.error-msg').hide();

            var placeType, placeKeyword;

            if (searchplaces.parent().attr('id') == 'restaurant') {                
                placeType = 'restaurant';
                placeKeyword = searchplaces.val();
            }
            else {
                placeType = searchplaces.val();
            }

            var area = _.pick(neighborhoods, searchsd.val());
            area = _.values(area)[0];

            var lat = area.lat, lng = area.lng, radius = area.radius;
            var sdhood = new google.maps.LatLng(lat, lng);

            map = new google.maps.Map(document.getElementById('map_canvas'), {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: sdhood,
                zoom: 16,
                mapTypeControl: false
            });

            google.maps.event.addListener(map, 'mousedown', function() {
                infowindow.close();
            })

            var request = {
                location: sdhood, 
                radius: radius,
                types: [placeType],
                keyword: placeKeyword
            };

            infowindow = new google.maps.InfoWindow();
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);

            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0, resultsCount = results.length; i < resultsCount; i++) {
                        service.getDetails(results[i], function(place, status) {
                            placedetails.marker(place || results[i]);
                        });

                        var options = { 
                            lat: results[i].geometry.location.lat(),
                            lng: results[i].geometry.location.lng(),
                            content : '<span class="label label-info overlay">' + results[i].name + '</span>'
                        };

                        placedetails.drawOverlay(options);
                    }
                }
            };
        },

        render: function() {
			      this.$el.html(this.template);
            var sandiego = new google.maps.LatLng(32.729203,-117.167559);

            map = new google.maps.Map(document.getElementById('map_canvas'), {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: sandiego,
                zoom: 13,
                mapTypeControl: false
            });
        }

    });

    return MapView;
});
