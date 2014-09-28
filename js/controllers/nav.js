define(['underscore', 'marionette', 'radio', 'config', '../views/header'],
    function(_, Marionette, radio, config, HeaderView) {

    var Controller = Marionette.Controller.extend({

        initialize: function(options) {
            options = options || {};
            this.user = options.user;

            this.view = new HeaderView({
                region: options.region
            });

            _.bindAll(this);
        },

        show: function(options) {
            options = options || {};

            if (options.activeView) {
                this.view.activateView(options.activeView, { janre: options.janre });
                //radio.command(options.activeView + ':show', options.janre);
            }

            console.log('NavController:show', options);
        },

        showHome: function() {
            this.showReleases();
        },

        showReleases: function(filter) {
            console.log('NavController:showReleases', filter);
            this.show({
                activeView: 'releases',
                filter: filter
            });
        },
        showWatchlist: function(janre) {
            this.show({
                activeView: 'watchlist',
                janre: janre
            });
        },
        showTheaters: function(janre) {
            this.show({
                activeView: 'theaters',
                janre: janre
            });
        },

        showMovie: function(id) {
            radio.command('movie:show', id);
        },
        showJanre: function(name) {
            radio.trigger('janre:selected', name);
        },
        showPerson: function(id) {
            radio.command('person:show', id);
        },
        showUser: function(id) {
            radio.command('user:show', id);
        }

    });

    return Controller;
});