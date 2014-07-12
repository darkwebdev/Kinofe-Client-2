define(['marionette', 'collections/movie-list', 'views/movie-list'],
    function(Marionette, MovieList, MovieListView) {

    var Controller = Marionette.Controller.extend({

        initialize: function(options) {
            this.vent = options.vent;
            this.collection = new MovieList();

            new MovieListView({
                region: options.region,
                collection: this.collection
            });

            this.collection.fetch();
        },

        selectMovie: function(id) {
            var movie = this.collection.get(id);

            if (movie) {
                movie.select();
            }

            this.vent.trigger('movie:selected', id);
        }
    });

    return Controller;
});