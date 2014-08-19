define(['marionette', 'backbone.radio', 'collections/movie-list', 'views/movie-list'],
    function(Marionette, Radio, MovieList, MovieListView) {

    var Controller = Marionette.Controller.extend({

        shown: false,

        initialize: function(options) {
            console.log('movieListController:init', this);
            this.radio = Radio.channel('app');
            this.collection = new MovieList();

            this.view = new MovieListView({
                region: options.region,
                collection: this.collection
            });

            _.bindAll(this, [ 'show' ]);
        },

        selectMovie: function(id) {
            this.show();
//            console.log('movieListController:selectMovie', id);
//            var movie = this.collection.get(id);

//            if (movie) {
//                movie.select();
//            }

            this.radio.trigger('movie:selected', id);
        },

        selectJanre: function(name) {
            this.radio.trigger('janre:selected', name);
        },

        show: function(options) {
            options = options || {};
            var janre = options.janre;

            if (options.force || janre || !this.shown) {
                this.shown = true;
                this.collection.fetch(janre ? { janre: janre } : {});
            }
        },

        showTop: function() {
            this.show({ force: true });
        },

        showJanre: function(name) {
            this.show({ janre: name });
        }
    });

    return Controller;
});