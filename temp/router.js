define(['../bower_components/marionette/lib/backbone.marionette'], function(Marionette) {
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'showMovieList',
            'movie/:id': 'showMovieDetails'
        }
    });

    return Router;
});