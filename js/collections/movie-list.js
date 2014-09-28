define(['backbone', 'radio', 'config', '../models/movie-item'], function(Backbone, Radio, config, Movie) {
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

            options.success = function() {
                console.log('Fetch:success', arguments);
            };
            options.error = function() {
                console.log('Fetch:error', arguments);
            };
            console.log('movieList:fetch', options, this);

            return Backbone.Collection.prototype.fetch.call(this, options);
        },

        initialize: function(options) {
            console.log('movie-list collection:init');

            options = options || {};
            this.watchlistUser = options.watchlistUser;
            this.ignorelistUser = options.ignorelistUser;
        },

        hideMovie: function(movie) {
            console.log('collection::movie:hidden', movie.get('id'));
            radio.trigger('movie:hidden', movie.get('id'));
        },

        restoreMovie: function(movie) {
            console.log('collection::movie:restored', movie.get('id'));
            radio.trigger('movie:restored', movie.get('id'));
        },

        toggleWatchlistedMovie: function(movie) {
            console.log('collection::movie:toggleWatchlistedMovie', movie.get('id'));
            radio.trigger('movie:watchlisted', movie.get('id'));
        }
    });

    return MovieList;
});