define(['underscore', 'marionette', 'backbone.radio', 'config', 'models/nav', '../views/header'],
    function(_, Marionette, Radio, config, NavModel, HeaderView) {

    var radio = Radio.channel('app');

    var Controller = Marionette.Controller.extend({

        model: null,

        initialize: function(options) {
            options = options || {};
            this.user = options.user;

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
                this.view.activateView(options.activeView, { janre: options.janre });
                //radio.command(options.activeView + ':show', options.janre);
            }

            console.log('NavController:show', options);
        },

        showDefault: function() {
            this.show({ activeView: config.defaultView });
        },
        showReleases: function(janre) {
            console.log('NavController:showReleases', janre);
            this.show({
                activeView: 'releases',
                janre: janre
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