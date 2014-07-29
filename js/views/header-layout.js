define(['marionette', 'handlebars', 'text!templates/header.hbs'],
    function(Marionette, Handlebars, html) {

        var View = Marionette.Layout.extend({
            template: Handlebars.compile(html),

            regions: {
            },

            initialize: function(options) {
                console.log('view movie-details:init', options);
                this.region = options.region;
                this.region.show(this);
            }
        });

        return View;
    }
);