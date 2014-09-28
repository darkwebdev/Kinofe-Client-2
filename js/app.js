define(['backbone', 'marionette'], function(Backbone, Marionette) {

    var app = _.extend(new Marionette.Application(), {

        defaultView: 'releases',

        routes: {},

        urls: {
            home: '',
            releases: 'releases(/*filter)',
            watchlist: 'watchlist(/*filter)',
            theaters: 'theaters(/*filter)',
            movie: 'movie/:id',
            person: 'person/:id',
            user: 'user/:id'
        },

        getRoute: function(name) {
            var route = this.urls[name];
            var splitAt = route.indexOf('(');

            if (splitAt == -1) {
                splitAt = route.indexOf('/:');
            }

            return route.slice(0, splitAt);
        }

    });

    _.each(app.urls, function(url, name) {
        app.routes[url] = 'show' + name[0].toUpperCase() + name.slice(1);
    });

    console.info('routes', app.routes);

    app.on('initialize:after', function() {
        console.log('App has started!', this);
        Backbone.history.start();
    });

    app.addRegions({
        headerRegion: '.mainHeader',
        movieListRegion: '.movieListContainer',
        detailsRegion: '.mainDetails',
        userRegion: '.userArea'
    });

    return app;
});
