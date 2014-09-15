define(['underscore', 'marionette', 'backbone.radio', 'config', 'models/nav', 'views/header-layout'],
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
        },

        show: function(options) {
            options = options || {};

            if (options.activeView) {
                this.view.activateView(options.activeView);
            }

            console.log('navController:show', options);
        },

        showDefault: function() {
            console.log('navController:showDefault', config);
            this.show({ activeView: config.defaultView });
        },

        showMovie: function(id) {
            this.radio.trigger('movie:selected', id);
        },

        showJanre: function(name) {
            this.radio.trigger('janre:selected', name);
        }
    });

    return Controller;
});