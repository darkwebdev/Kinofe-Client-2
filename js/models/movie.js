define(['backbone'], function(Backbone) {

    var Model = Backbone.Model.extend({
        select: function() {
            this.set({ selected: true });
            this.collection.selectMovie(this);
        }
    });

    return Model;
});