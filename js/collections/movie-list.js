define(['backbone', 'backbone.radio', 'config', '../models/movie-item'], function(Backbone, Radio, config, Movie) {
    var MovieList = Backbone.Collection.extend({
        total: null,
        model: Movie,

        url: function() {
            var url = config.apiUrl + '/movies';

            if (this.janre) {
                url += '/' + this.janre;
            }
            if (this.watchlistUser) {
                url = config.apiUrl + '/users/' + this.watchlistUser + '/watchlist';
            }
            if (this.ignorelistUser) {
                url = config.apiUrl + '/users/' + this.ignorelistUser + '/ignorelist';
            }
            console.log('movieList:url', url, this);

            return url;
        },
//            url: 'data/movie-list.json',

        parse: function(data) {
            this.total = data.count;

            return data.results;
        },

        fetch: function(options) {
            options = options || {};
            this.janre = options.janre;
            this.watchlistUser = options.watchlistUser;
            this.ignorelistUser = options.ignorelistUser;
            console.log('movieList:fetch', options, this);

            return Backbone.Collection.prototype.fetch.call(this, options);
        },

        initialize: function() {
            console.log('movie-list collection:init');
            this.radio = Radio.channel('app');
        },

//        selectMovie: function(movie) {
//            console.log('collection::movie:selected', movie.get('id'));
//            this.radio.trigger('movie:selected', movie.get('id'));
//        },

        hideMovie: function(movie) {
            console.log('collection::movie:hidden', movie.get('id'));
            this.radio.trigger('movie:hidden', movie.get('id'));
        },

        restoreMovie: function(movie) {
            console.log('collection::movie:restored', movie.get('id'));
            this.radio.trigger('movie:restored', movie.get('id'));
        },

        toggleWatchlistedMovie: function(movie) {
            console.log('collection::movie:toggleWatchlistedMovie', movie.get('id'));
            this.radio.trigger('movie:watchlisted', movie.get('id'));
        }
    });

    return MovieList;
});