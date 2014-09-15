define(['marionette', 'backbone.radio', 'collections/movie-list', 'models/person-details', 'views/person-details'],
    function(Marionette, Radio, MovieList, PersonDetails, PersonDetailsView) {

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

                this.radio.command('releases:show');
            }
        });

        return Controller;
    });