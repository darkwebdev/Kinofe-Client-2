define(['marionette', 'handlebars', 'text!templates/header.hbs'],
    function(Marionette, Handlebars, html) {

        var View = Marionette.LayoutView.extend({
            template: Handlebars.compile(html),

            regions: {
                janreControls: '.janreControls'
            },

            events: {
                'click .navTab': 'navClicked',
                'click .hideJanre': 'hideJanre'
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

            activateView: function(title) {
                console.log('activate section', title);
                $('.navTab[rel="' + title +'"]').addClass('active').siblings().removeClass('active');
                this.model.activateView(title);
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