define(['marionette', 'handlebars', 'radio', 'text!templates/header.hbs'],
    function(Marionette, Handlebars, radio, html) {

        var View = Marionette.LayoutView.extend({
            template: Handlebars.compile(html),

            regions: {
                janreControls: '.janreControls'
            },

            events: {
                'click .navTab': 'navClicked'
            },

            initialize: function(options) {
                console.log('header view:init', options, this);
                this.region = options.region;
                this.region.show(this);
            },

            navClicked: function(e) {
                var sectionName = $(e.currentTarget).attr('rel');

                console.log('nav clicked', sectionName);

                this.activateView(sectionName);
            },

            activateView: function(name, options) {
                console.log('HeaderView:activateView', name);
                $('.navTab[rel="' + name +'"]').addClass('active').siblings().removeClass('active');

                radio.command(name + ':show', options);
            }

        });

        return View;
    }
);