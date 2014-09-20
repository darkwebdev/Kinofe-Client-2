define(['marionette', 'backbone.radio', 'config', 'collections/movie-list', 'views/movie-list'],
    function(Marionette, Radio, config, MovieList, MovieListView) {

    var Controller = Marionette.Controller.extend({

        shown: false,

        initialize: function(options) {
            console.log('movieListController:init', options);

            options = options || {};
            this.radio = Radio.channel('app');
            this.autoUrl = options.autoUrl;
            this.region = options.region;

            var collectionOptions = {};

            if (options.watchlistUserId) collectionOptions.watchlistUser = options.watchlistUserId;
            this.collection = new MovieList(collectionOptions);

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

        show: function() {
            console.log('movieList:show', this.view);

            this.view = new MovieListView({
                region: this.region,
                collection: this.collection
            });

            this.collection.fetch();

            if (this.autoUrl) Backbone.history.navigate(this.autoUrl);
        }

    });

    return Controller;
});