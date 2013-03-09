define([
    'jquery',
    'backbone',
    'underscore',
    'views/mapview'],
    function($, Backbone, _, mapView) {
        var Router = Backbone.Router.extend({

            initialize: function() {
                Backbone.history.start({pushState: true, root:'/sdhangouts/'});
            },

            routes: {
				        '': 'map'
            },

            map: function() {
                this.mapView = new mapView;				
                this.mapView.render();
            }

        });

        return Router;
    });
