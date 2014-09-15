define(['marionette', 'backbone.radio', 'models/movie-details', 'views/movie-details', 'collections/person-list'],
    function(Marionette, Radio, MovieDetails, MovieDetailsView, PersonList) {

        var Controller = Marionette.Controller.extend({

            initialize: function(options) {
                this.region = options.region;
                this.radio = Radio.channel('app');
            },

            show: function(id) {
                console.log('movieDetailsController:show', id);

                new MovieDetailsView({
                    region: this.region,
                    directorList: function(models) {
                        return new PersonList(models);
                    },
                    actorList: function(models) {
                        return new PersonList(models);
                    },
                    model: new MovieDetails({ id: id })
                });

                this.radio.command('releases:show');
            }
        });

        return Controller;
    }
);