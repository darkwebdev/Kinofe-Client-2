define(['marionette', 'backbone', 'handlebars', 'config', 'text!templates/user-details.hbs',
        'views/movie-list', 'views/janre-list', 'collections/movie-list', 'collections/janre-list'],
    function(Marionette, Backbone, Handlebars, config, html,
         MovieListView, JanreListView, MovieList, JanreList) {

        var View = Marionette.Layout.extend({
            template: Handlebars.compile(html),

            regions: {
                watchlistRegion: '.detailsWatchList',
                ignorelistJanreRegion: '.detailsIgnoreListJanre',
                ignorelistMovieRegion: '.detailsIgnoreListMovie'
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
                console.log('userDetailsView:showWatchlist:collection', view.collection);
            },

            hideWatchlist: function() {
                $(this.watchlistRegion.el).empty();
            },

            showIgnorelist: function() {
                var movieListView = new MovieListView({
                    region: this.ignorelistMovieRegion,
                    collection: new MovieList()
                });
                movieListView.collection.fetch({ ignorelistUser: 1 });

                var ignoredJanrelist = this.model.get('ignorelist').janre;
                console.log('showIgnorelist', ignoredJanrelist, this);

                var janreListView = new JanreListView({
                    region: this.ignorelistJanreRegion,
                    collection: new JanreList(ignoredJanrelist)
                });
                janreListView.show();

                this.hideWatchlist();
            },

            hideIgnorelist: function() {
                $(this.ignorelistJanreRegion.el).add(this.ignorelistMovieRegion.el).empty();
            },

            login: function() {},

            logout: function() {}
        });

        return View;
    }
);