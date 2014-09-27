define(['marionette', 'backbone.radio', 'config', 'models/movie-details', 'views/movie-details', 'collections/person-list'],
    function(Marionette, Radio, config, MovieDetails, MovieDetailsView, PersonList) {

        var Controller = Marionette.Controller.extend({

            initialize: function(options) {
                this.region = options.region;
                this.radio = Radio.channel('app');

                _.bindAll(this);
            },

            show: function(id) {
                console.log('movieDetailsController:show', id, this);

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

                //this.radio.command('home:show');
                Backbone.history.navigate(config.urls.movie.replace(':id', id));
            }
        });

        return Controller;
    }
);