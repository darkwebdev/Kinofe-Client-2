define(['marionette', 'backbone.radio', 'collections/movie-list', 'views/movie-list'],
    function(Marionette, Radio, MovieList, MovieListView) {

    var Controller = Marionette.Controller.extend({

        initialize: function(options) {
            console.log('movieListController:init');
            this.radio = Radio.channel('app');
            this.collection = new MovieList();

            new MovieListView({
                region: options.region,
                collection: this.collection
            });

            this.show();
        },

        selectMovie: function(id) {
            console.log('movieListController:selectMovie', id);
            var movie = this.collection.get(id);

            if (movie) {
                movie.select();
            }

            this.radio.trigger('movie:selected', id);
        },

        selectJanre: function(name) {
            this.radio.trigger('janre:selected', name);
        },

        show: function(janre) {
            this.collection.fetch(janre ? { janre: janre }: {});
        }
    });

    return Controller;
});