define(['marionette', 'radio', 'config', 'collections/movie-list', 'views/movie-list'],
    function(Marionette, radio, config, MovieList, MovieListView) {

        var Controller = Marionette.Controller.extend({

            initialize: function(options) {
                options = options || {};
                console.log('movieListController:init', options);

                this.autoUrl = options.autoUrl;
                this.region = options.region;

                var collectionOptions = {};

                if (options.watchlistUserId) collectionOptions.watchlistUser = options.watchlistUserId;
                if (options.ignorelistUserId) collectionOptions.ignorelistUser = options.ignorelistUserId;
                this.collection = new MovieList(collectionOptions);

                _.bindAll(this);
            },

            show: function(options) {
                options = options || {};
                console.log('MovieListController:show', options, this);

                this.view = new MovieListView({
                    region: this.region,
                    collection: this.collection
                });

                this.collection.fetch(options);

                if (this.autoUrl) Backbone.history.navigate(this.autoUrl);

                radio.on('janre:show', this.showJanre, this);
            },

            showJanre: function(name) {
                this.show({ janre: name });
            }

        });

        return Controller;
});