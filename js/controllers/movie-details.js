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

                var model = new MovieDetails({ id: id });
                var directorList = model.get('director') || [];
                var actorList = model.get('actor') || [];

                new MovieDetailsView({
                    region: this.region,
                    directorList: new PersonList(directorList, { vent: this.vent }),
                    actorList: new PersonList(actorList, { vent: this.vent }),
                    model: model
                });

                this.router.navigate('movie/' + id); // update url
            }
        });

        return Controller;
    }
);