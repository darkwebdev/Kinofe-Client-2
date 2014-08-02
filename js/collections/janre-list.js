define(['backbone', 'config', '../models/janre-item', 'vent'], function(Backbone, config, Janre, vent) {
    var JanreList = Backbone.Collection.extend({
        total: null,
        model: Janre,

        initialize: function() {
            console.log('ignoreList collection:init');
        },

        restoreJanre: function(janre) {
            console.log('collection::janre:restored', janre.get('name'));
            vent.trigger('janre:restored', janre.get('name'));
        }
    });

    return JanreList;
});