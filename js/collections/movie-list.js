define(['backbone', 'models/movie', 'vent'], function(Backbone, Movie, vent) {
    var MovieList = Backbone.Collection.extend({
        url: 'data/movies.json',
        model: Movie,

        selectMovie: function(movie) {
            vent.trigger('movie:selected', movie);
        }
    });

    return MovieList;
});