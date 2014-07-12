define(['../bower_components/marionette/lib/backbone.marionette', 'vent'], function(Marionette, vent) {
    var Controller = Marionette.Controller.extend({
        initialize: function(options) {
            this.collection = options.collection;
//                this.controller = new app.Controller(options);
        },

        showMovieDetails: function(id) {
            console.log('controller:showMovieDetails', id);
            var movie = this.collection.get(id);

            if (movie) {
                movie.select();
            }

            vent.trigger('movie:selected', id);
        }
    });

    return Controller;
});