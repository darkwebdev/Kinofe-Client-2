define(['backbone'], function(Backbone) {

    var Model = Backbone.Model.extend({
        idAttribute: 'pk',

        select: function() {
            this.set({ selected: true }).collection.selectMovie(this);
        },

        hide: function() {
            this.set({ hidden: true }).collection.hideMovie(this);
        },

        restore: function() {
            this.set({ hidden: false }).collection.restoreMovie(this);
        },

        toggleWatchlisted: function() {
            this.set({ watchlisted: !this.get('watchlisted') }).collection.toggleWatchlistedMovie(this);
        }
    });

    return Model;
});