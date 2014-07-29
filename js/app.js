define(['backbone', 'marionette'], function(Backbone, Marionette) {
    var app = new Marionette.Application();

    app.on('initialize:after', function() {
        console.log('App has started!');
        Backbone.history.start();
    });

    app.addRegions({
        movieListRegion: '.movieList',
        detailsRegion: '.details',
        userRegion: '.user',
        navRegion: '.mainNav',
        sectionTitleRegion: '.sectionTitle'
    });

    return app;
});
