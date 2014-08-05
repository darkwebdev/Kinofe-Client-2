define(['marionette', 'handlebars', 'text!templates/header.hbs'],
    function(Marionette, Handlebars, html) {

        var View = Marionette.Layout.extend({
            template: Handlebars.compile(html),

            regions: {
                janreControls: '.janreControls'
            },

            events: {
                'click .hideJanre': 'hideJanre'
            },

            initialize: function(options) {
                console.log('header view:init', options, this);
                this.region = options.region;
                this.region.show(this);
            },

            showJanreControls: function() {
                console.log('controls', this.regions.janreControls);
                $(this.regions.janreControls).addClass('active');
            },

            hideJanre: function() {
                console.log('click hideJanre', this.model);
                this.model.hideJanre();
            }
        });

        return View;
    }
);