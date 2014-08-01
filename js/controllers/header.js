define(['underscore', 'marionette', 'views/header-layout'], function(_, Marionette, HeaderView) {

    var Controller = Marionette.Controller.extend({

        modelDefaults: null,

        initialize: function(options) {
            this.vent = options.vent;
            this.region = options.region;
        },

        showJanre: function(name) {
            console.log('headerController:showJanre', this.view);

            this.modelDefaults = {
                sectionTitle: name,
                hideJanre: _.bind(function() {
                    console.log('headerController:hideJanre', name);
                    this.vent.trigger('janre:hidden', name);
                }, this)
            };

            this.show();
            this.view.showJanreControls();
        },

        show: function(title) {
            var modelOptions = this.modelDefaults || {
                sectionTitle: title || ''
            };

            this.view = new HeaderView({
                region: this.region,
                model: new Backbone.Model(modelOptions)
            });

            console.log('headerController:show', title, modelOptions, this.view);
        }
    });

    return Controller;
});