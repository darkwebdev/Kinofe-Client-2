define(['underscore'], function(_) {

    var defaultView = 'releases';
    var urls = {
        default: '',
        releases: 'releases(/*filter)',
        watchlist: 'watchlist(/*filter)',
        theaters: 'theaters(/*filter)',
        movie: 'movie/:id',
        person: 'person/:id',
        user: 'user/:id'
    };
    var routes = {};

    routes.prototype.defaultView = 'showReleases';

    _.each(urls, function(url, name) {
        routes[url] = 'show' + name[0].toUpperCase() + name.slice(1);
    });

    console.info('routes', routes);

    return routes;
});
