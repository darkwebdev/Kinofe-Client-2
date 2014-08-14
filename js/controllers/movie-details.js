define(['marionette', 'models/movie-details', 'views/movie-details', 'collections/person-list'],
    function(Marionette, MovieDetails, MovieDetailsView, PersonList) {

        var Controller = Marionette.Controller.extend({

            initialize: function(options) {
                this.vent = options.vent;
                this.router = options.router;
                this.region = options.region;
            },

            show: function(id) {
                console.log('movieDetailsController:show', id);

                new MovieDetailsView({
                    region: this.region,
                    directorList: new PersonList(),
                    actorList: new PersonList([], { vent: this.vent }),
                    model: new MovieDetails({ id: id })
                });

                this.router.navigate('movie/' + id); // update url
            }
        });

        return Controller;
    }
);