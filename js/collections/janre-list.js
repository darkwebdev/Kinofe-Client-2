define(['backbone', 'backbone.radio', '../models/janre-item'], function(Backbone, Radio, Janre) {
    var radio = Radio.channel('app');

    var JanreList = Backbone.Collection.extend({
        total: null,
        model: Janre,

        initialize: function() {
            //console.log('ignoreList collection:init');
        },

        restoreJanre: function(janre) {
            console.log('collection::janre:restored', janre.get('name'));
            radio.command('janre:restore', janre.get('name'));
        }
    });

    return JanreList;
});