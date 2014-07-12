define(['backbone', '../models/movie-item', 'vent'], function(Backbone, Movie, vent) {
    var MovieList = Backbone.Collection.extend({
        url: 'data/movie-list.json',
        model: Movie,

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