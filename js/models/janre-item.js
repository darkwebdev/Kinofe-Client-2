define(['backbone'], function(Backbone) {

    var Model = Backbone.Model.extend({
        idAttribute: 'pk',

        restore: function() {
            this.set({ hidden: false }).collection.restoreJanre(this);
        }
    });

    return Model;
});