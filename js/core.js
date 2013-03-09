require.config({
    baseUrl: "js",
    paths: {
        jquery: 'libs/jquery-1.8.2.min',
        bootstrap: 'libs/bootstrap',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone',
        gmap: 'libs/gmap',
        async: 'libs/async',
        text: 'libs/text',
        templates: '../templates',
    },
    'shim':{
        backbone:{
            'deps' : ['jquery' ,'underscore'],
            'exports' : 'Backbone'
        },
        bootstrap:{
            'deps' : ['jquery'],
            'exports' : 'Bootstrap'
        },
        underscore: {
            'exports' : '_'
        }
    },
    waitSeconds: 10,
    urlArgs: 'v='+Math.floor(Math.random()*99999)
});

require([
    'app'
], function(App){
    App.initialize();
});
