define(['marionette', 'models/person-details', 'views/person-details'],
    function(Marionette, PersonDetails, PersonDetailsView) {

        var Controller = Marionette.Controller.extend({

            initialize: function(options) {
                this.vent = options.vent;
                this.router = options.router;
                this.region = options.region;
            },

            show: function(id) {
                var model = new PersonDetails({ id: id });

                new PersonDetailsView({
                    region: this.region,
                    directedList: new MovieList(model.get('directed'), { vent: this.vent }),
                    playedList: new MovieList(model.get('played'), { vent: this.vent }),
                    model: model
                });
                this.router.navigate('person/' + id); // update url
            }
        });

        return Controller;
    });