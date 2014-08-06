define(['marionette', 'models/user-details', 'views/user-details', 'collections/movie-list', 'collections/janre-list'],
    function(Marionette, UserDetails, UserDetailsView, MovieList, JanreList) {

        var Controller = Marionette.Controller.extend({

            initialize: function(options) {
                this.vent = options.vent;
                this.router = options.router;
                this.region = options.region;

                this.checkAuth(options.user);
            },

            checkAuth: function(user) {
                // if authenticated:
                this.user = new UserDetails({ id: user.id });
                // else:
                // login
            },

            logout: function() {
                // logout
                this.user = null;
                this.show();
            },

            show: function() {
                var ignoredJanrelist = this.user.get('ignorelist').janre;
                var janreModels = _.map(ignoredJanrelist, function(janre) { return { name: janre }; });
                console.log('showIgnorelist', ignoredJanrelist, janreModels, this);

                new UserDetailsView({
                    region: this.region,
                    model: this.user,
                    watchlist: new MovieList({ vent: this.vent }),
                    ignorelist: new MovieList({ vent: this.vent }),
                    janrelist: new JanreList(janreModels, { vent: this.vent })
                });
//                this.router.navigate('person/' + id); // update url
            },

            ignoreMovie: function(id) {
                if (this.user) {
                    this.user.ignoreMovie(id);
                    console.log('user controller:ignore movie', id, this.user);
                    this.user.save(null, { patch: true });
                }
            },

            restoreMovie: function(id) {
                if (this.user) {
                    this.user.restoreMovie(id);
                    console.log('user controller:restore movie', id, this.user);
                    this.user.save(null, { patch: true });
                }
            },

            ignoreJanre: function(name) {
                if (this.user) {
                    this.user.ignoreJanre(name);
                    this.user.save(null, { patch: true });
                }
            },

            restoreJanre: function(name) {
                if (this.user) {
                    this.user.restoreJanre(name);
                    this.user.save(null, { patch: true });
                }
            },

            toggleWatchlistedMovie: function(id) {
                if (this.user) {
                    this.user.toggleWatchlistedMovie(id);
                    console.log('user controller:toggleWatchlistedMovie', id, this.user);
                    this.user.save(null, { patch: true });
                }
            }
        });

        return Controller;
    });