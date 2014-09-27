define(function() {
    var config = {
        apiUrl: 'http://localhost:8000',
//        apiUrl: 'http://api.kinofe.com',
        defaultView: 'releases',
        urls: {
            default: '',
            releases: 'releases(/:janre)',
            watchlist: 'watchlist(/:janre)',
            theaters: 'theaters(/:janre)',
            movie: 'movie/:id',
            person: 'person/:id',
            user: 'user/:id'
        },
        user: {
            id: 1,
            name: 'tibalt'
        }
    };

    return config;
});
