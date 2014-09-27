define(['marionette', 'handlebars', 'backbone.radio', 'text!templates/header.hbs'],
    function(Marionette, Handlebars, Radio, html) {

        var radio = Radio.channel('app');

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

            activateView: function(name, options) {
                console.log('HeaderView:activateView', name);
                $('.navTab[rel="' + name +'"]').addClass('active').siblings().removeClass('active');

                radio.command(name + ':show', options);
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