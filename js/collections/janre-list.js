define(['backbone', '../models/janre-item'], function(Backbone, Janre) {
    var JanreList = Backbone.Collection.extend({
        total: null,
        model: Janre,

        initialize: function(models, options) {
            console.log('ignoreList collection:init');
            this.vent = options.vent;
        },

        restoreJanre: function(janre) {
            console.log('collection::janre:restored', janre.get('name'));
            this.vent.trigger('janre:restored', janre.get('name'));
        }
    });

    return JanreList;
});