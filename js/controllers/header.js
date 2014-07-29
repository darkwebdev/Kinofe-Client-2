define(['marionette', 'views/header-layout'], function(Marionette, HeaderView) {

    var Controller = Marionette.Controller.extend({

        initialize: function(options) {
            this.vent = options.vent;
            this.region = options.region;
        },

        show: function(title) {
            new HeaderView({
                region: this.region,
                model: new Backbone.Model({ sectionTitle: title })
            });
        }
    });

    return Controller;
});