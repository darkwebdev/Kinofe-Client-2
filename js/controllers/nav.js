define(['underscore', 'marionette', 'backbone.radio', 'config', 'models/nav', '../views/header'],
    function(_, Marionette, Radio, config, NavModel, HeaderView) {

    var Controller = Marionette.Controller.extend({

        model: null,

        initialize: function(options) {
            options = options || {};
            this.user = options.user;
            this.radio = Radio.channel('app');

            this.model = new NavModel();

            this.view = new HeaderView({
                region: options.region,
                model: this.model
            });

            _.bindAll(this);
        },

        show: function(options) {
            options = options || {};

            if (options.activeView) {
                this.view.activateView(options.activeView);
            }

            console.log('navController:show', options);
        },

        showDefault: function() {
            this.show({ activeView: config.defaultView });
        },
        showReleases: function() {
            this.show({ activeView: 'releases' });
        },
        showWatchlist: function() {
            this.show({ activeView: 'watchlist' });
        },
        showTheaters: function() {
            this.show({ activeView: 'theaters' });
        },

        showMovie: function(id) {
            this.radio.command('movie:show', id);
        },
        showJanre: function(name) {
            this.radio.trigger('janre:selected', name);
        },
        showPerson: function(id) {
            this.radio.command('person:show', id);
        },
        showUser: function() {
            this.radio.command('user:show');
        }

    });

    return Controller;
});