define(['marionette', 'backbone.radio', 'collections/movie-list', 'views/movie-list'],
    function(Marionette, Radio, MovieList, MovieListView) {

    var Controller = Marionette.Controller.extend({

        shown: false,

        initialize: function(options) {
            console.log('movieListController:init', options);

            options = options || {};
            this.radio = Radio.channel('app');
            this.collection = new MovieList();
            this.watchlistUserId = options.watchlistUserId;

            this.view = new MovieListView({
                region: options.region,
                collection: this.collection
            });

            _.bindAll(this);
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

            options.watchlistUser = this.watchlistUserId;

            if (options.janre || options.watchlistUser) {
                this.shown = true;
                this.collection.fetch(options);
            }

            if (options.force || !this.shown) {
                this.shown = true;
                this.collection.fetch({});
            }

        },

        update: function() {
            this.show({ force: true });
        },

        showJanre: function(name) {
            this.show({ janre: name });
        }
    });

    return Controller;
});