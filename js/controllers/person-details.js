define(['marionette', 'backbone.radio', 'config', 'collections/movie-list', 'models/person-details', 'views/person-details'],
    function(Marionette, Radio, config, MovieList, PersonDetails, PersonDetailsView) {

        var Controller = Marionette.Controller.extend({

            initialize: function(options) {
                this.region = options.region;
                this.radio = Radio.channel('app');
            },

            show: function(id) {
                var model = new PersonDetails({ id: id });

                new PersonDetailsView({
                    region: this.region,
                    directedList: function(models) {
                        return new MovieList(models);
                    },
                    playedList: function(models) {
                        return new MovieList(models);
                    },
                    model: model
                });

                //this.radio.command('releases:show');
                Backbone.history.navigate(config.urls.person.replace(':id', id));
            }
        });

        return Controller;
    });