define(['backbone'], function(Backbone) {

    var Model = Backbone.Model.extend({
        idAttribute: 'pk',

        select: function() {
            this.set({ selected: true });
            this.collection.selectPerson(this);
        }
    });

    return Model;
});