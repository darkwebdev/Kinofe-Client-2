define(['backbone', 'backbone.radio', '../models/janre-item'], function(Backbone, Radio, Janre) {
    var JanreList = Backbone.Collection.extend({
        total: null,
        model: Janre,

        initialize: function() {
            console.log('ignoreList collection:init');
            this.radio = Radio.channel('app');
        },

        restoreJanre: function(janre) {
            console.log('collection::janre:restored', janre.get('name'));
            this.radio.trigger('janre:restored', janre.get('name'));
        }
    });

    return JanreList;
});