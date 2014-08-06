define(['underscore', 'marionette', 'views/header-layout'], function(_, Marionette, HeaderView) {

    var Controller = Marionette.Controller.extend({

        initialize: function(options) {
            this.vent = options.vent;
            this.region = options.region;
            this.user = options.user;
        },

        showJanre: function(name) {
            console.log('headerController:showJanre', name);

            this.show({ sectionTitle: name });

            this.view.model.hideJanre = _.bind(function() {
                console.log('headerController:hideJanre', name);
                this.vent.trigger('janre:hidden', name);
            }, this);

            this.vent.trigger('user:getDetails');

//            if (janreIgnored()) {
                this.view.showJanreControls();
//            }
        },

        show: function(options) {
            var model = new Backbone.Model(options);
            model.getJanre = function() {};

            this.view = new HeaderView({
                region: this.region,
                model: model
            });

            console.log('headerController:show', options, this.view);
        }
    });

    return Controller;
});