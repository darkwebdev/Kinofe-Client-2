define(['marionette', 'models/user-details', 'views/user-details'],
    function(Marionette, UserDetails, UserDetailsView) {

        var Controller = Marionette.Controller.extend({

            initialize: function(options) {
                this.vent = options.vent;
                this.router = options.router;
                this.region = options.region;
                this.user = null;

                this.checkAuth();
            },

            checkAuth: function() {
                // if authenticated:
                this.user = new UserDetails({ id: 1 });
                // else:
                // login
            },

            logout: function() {
                // logout
                this.user = null;
                this.show();
            },

            show: function() {
                new UserDetailsView({
                    region: this.region,
                    model: this.user
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

            ignoreJanre: function(id) {
                if (this.user) {
                    this.user.ignoreJanre(id);
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