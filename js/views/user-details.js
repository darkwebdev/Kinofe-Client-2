define(['marionette', 'backbone', 'handlebars', 'text!templates/user-details.hbs', 'views/movie-list', 'views/janre-list'],
    function(Marionette, Backbone, Handlebars, html, MovieListView, JanreListView) {

        var View = Marionette.LayoutView.extend({
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

            watchlistVisible: false,
            ignorelistVisible: false,

            initialize: function(options) {
                this.region = options.region;
                this.watchlist = options.watchlist;
                this.ignorelist = options.ignorelist;
                this.janrelist = options.janrelist;

                if (this.model) {
                    this.model.fetch();
                } else {
                    this.show();
                }
            },

            show: function() {
                console.log('UserDetailsView:show', this.model.toJSON(), MovieListView);
                this.region.show(this);

                // update lists if required
                if (this.watchlistVisible) {
                    this.showWatchlist();
                }
                if (this.ignorelistVisible) {
                    this.showIgnorelist();
                }
            },

            showWatchlist: function() {
                var view = new MovieListView({
                    region: this.watchlistRegion,
                    collection: this.watchlist
                });
                view.collection.fetch({ watchlistUser: this.model.get('id') });

                this.watchlistVisible = true;
                this.hideIgnorelist();
                console.log('userDetailsView:showWatchlist:collection', view.collection);
            },

            hideWatchlist: function() {
                $(this.watchlistRegion.el).empty();
                this.watchlistVisible = false;
            },

            showIgnorelist: function() {
                var movieListView = new MovieListView({
                    region: this.ignorelistMovieRegion,
                    collection: this.ignorelist
                });
                movieListView.collection.fetch({ ignorelistUser: 1 });

                var janreListView = new JanreListView({
                    region: this.ignorelistJanreRegion,
                    collection: this.janrelist
                });
                janreListView.show();

                this.ignorelistVisible = true;
                this.hideWatchlist();
            },

            hideIgnorelist: function() {
                $(this.ignorelistJanreRegion.el).add(this.ignorelistMovieRegion.el).empty();
                this.ignorelistVisible = false;
            },

            login: function() {},

            logout: function() {}
        });

        return View;
    }
);