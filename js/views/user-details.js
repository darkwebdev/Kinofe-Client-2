define(['marionette', 'backbone', 'handlebars', 'config', 'text!templates/user-details.hbs', 'views/movie-list', 'collections/movie-list'],
    function(Marionette, Backbone, Handlebars, config, html, MovieListView, MovieList) {

        var View = Marionette.Layout.extend({
            template: Handlebars.compile(html),

            regions: {
                watchlistRegion: '.detailsWatchList',
                ignorelistRegion: '.detailsIgnoreList'
            },

            events: {
                'click .login': 'login',
                'click .logout': 'logout',
                'click .showWatchlist': 'showWatchlist',
                'click .showIgnorelist': 'showIgnorelist'
            },

            modelEvents: {
                sync: 'show'
            },

            initialize: function(options) {
                this.region = options.region;
                if (this.model) {
                    this.model.fetch();
                } else {
                    this.show();
                }
            },

            show: function() {
                console.log('UserDetailsView:show', this.model.toJSON(), MovieListView);
                this.region.show(this);
            },

            showWatchlist: function() {
                var view = new MovieListView({
                    region: this.watchlistRegion,
                    collection: new MovieList()
                });
                view.collection.fetch({ watchlistUser: 1 });

                this.hideIgnorelist();
                console.log('userDetailsView:showWatchlist:collection', view.collection)
            },

            hideWatchlist: function() {
                $(this.watchlistRegion.el).empty();
            },

            showIgnorelist: function() {
                var view = new MovieListView({
                    region: this.ignorelistRegion,
                    collection: new MovieList()
                });
                view.collection.fetch({ ignorelistUser: 1 });

                this.hideWatchlist();
            },

            hideIgnorelist: function() {
                $(this.ignorelistRegion.el).empty();
            },

            login: function() {},

            logout: function() {}
        });

        return View;
    }
);