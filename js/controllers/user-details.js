define(['marionette', 'models/user-details', 'views/user-details'],
    function(Marionette, UserDetails, UserDetailsView) {

        var Controller = Marionette.Controller.extend({

            initialize: function(options) {
                this.vent = options.vent;
                this.router = options.router;
                this.region = options.region;
            },

            show: function() {
                new UserDetailsView({
                    region: this.region,
                    model: new UserDetails({ id: 1 })
                });
//                this.router.navigate('person/' + id); // update url
            }
        });

        return Controller;
    });