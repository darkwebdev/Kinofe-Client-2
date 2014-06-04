define(['marionette'], function(Marionette) {
    var Controller = Marionette.Controller.extend({
        initialize: function(options) {
            this.collection = options.collection;
//                this.controller = new app.Controller(options);
        },

        showMovieDetails: function(id) {
            console.log('controller:showMovieDetails', id);
            var movie = this.collection.get(id);

            movie.select();
        }
    });

    return Controller;
});