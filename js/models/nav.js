define(['underscore', 'backbone', 'config', 'backbone.radio'], function(_, Backbone, config, Radio) {

    var Model = Backbone.Model.extend({

        initialize: function() {
            console.log('nav:model:init', this);
            this.radio = Radio.channel('app');
        },

        getJanre: function(name) {
            console.log('navModel:getJanre', name);
        },

        activateView: function(name) {
            this.radio.command(name + ':show');
        }

    });

    return Model;
});