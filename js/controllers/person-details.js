define(['marionette', 'models/person-details', 'views/person-details'],
    function(Marionette, PersonDetails, PersonDetailsView) {

        var Controller = Marionette.Controller.extend({

            initialize: function(options) {
                this.vent = options.vent;
                this.router = options.router;
                this.region = options.region;
            },

            show: function(id) {
                new PersonDetailsView({
                    region: this.region,
                    model: new PersonDetails({ id: id })
                });
                this.router.navigate('person/' + id); // update url
            }
        });

        return Controller;
    });