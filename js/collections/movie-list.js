define(['backbone', 'config', '../models/movie-item', 'vent'], function(Backbone, config, Movie, vent) {
    var MovieList = Backbone.Collection.extend({
        total: null,
        model: Movie,

        url: config.apiUrl + '/movies',
//            url: 'data/movie-list.json',

        parse: function(data) {
            this.total = data.count;

            return data.results;
        },

        initialize: function() {
            console.log('movie-list collection:init');
        },

        selectMovie: function(movie) {
            console.log('collection::movie:selected', movie.get('id'));
            vent.trigger('movie:selected', movie.get('id'));
        }
    });

    return MovieList;
});