define(function() {
    var config = {
        apiUrl: 'http://localhost:8000',
//        apiUrl: 'http://api.kinofe.com',
        defaultView: 'releases',
        urls: {
            default: '',
            releases: 'releases/',
            watchlist: 'watchlist/',
            theaters: 'theaters/',
            movie: 'movie/:id',
            person: 'person/:id',
            janre: 'janre/:name',
            user: 'user/'
        },
        user: {
            id: 1,
            name: 'tibalt'
        }
    };

    return config;
});
