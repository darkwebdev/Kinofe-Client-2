define(['backbone', 'marionette'], function(Backbone, Marionette) {
    var app = new Marionette.Application();

    app.on('initialize:after', function() {
        console.log('App has started!');
        Backbone.history.start();
    });

    app.addRegions({
        headerRegion: '.mainHeader',
        movieListRegion: '.movieListContainer',
        detailsRegion: '.details',
        userRegion: '.user-area'
    });

    return app;
});
