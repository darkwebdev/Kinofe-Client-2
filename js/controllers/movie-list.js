define(['marionette', 'backbone.radio', 'config', 'collections/movie-list', 'views/movie-list'],
    function(Marionette, Radio, config, MovieList, MovieListView) {

        var radio = Radio.channel('app');

        var Controller = Marionette.Controller.extend({

            shown: false,

            initialize: function(options) {
                console.log('movieListController:init', options);

                options = options || {};
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
                console.log('MovieListController:show', options);

                this.view = new MovieListView({
                    region: this.region,
                    collection: this.collection
                });

                this.collection.fetch(options);

                if (this.autoUrl) Backbone.history.navigate(this.autoUrl);
            }

        });

        return Controller;
});