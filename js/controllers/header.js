define(['underscore', 'marionette', 'backbone.radio', 'views/header-layout'], function(_, Marionette, Radio, HeaderView) {

    var Controller = Marionette.Controller.extend({

        initialize: function(options) {
            this.region = options.region;
            this.user = options.user;
            this.radio = Radio.channel('app');
        },

        showJanre: function(name) {
            console.log('headerController:showJanre', name);

            this.show({ sectionTitle: name });

            this.view.model.hideJanre = _.bind(function() {
                console.log('headerController:hideJanre', name);
                this.radio.trigger('janre:hidden', name);
            }, this);

            this.radio.trigger('user:getDetails');

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