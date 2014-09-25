define(['marionette', 'backbone', 'handlebars', 'backbone.radio', 'text!templates/user.hbs'],
    function(Marionette, Backbone, Handlebars, Radio, html) {

        var View = Marionette.LayoutView.extend({

            tagName: 'span',

            template: Handlebars.compile(html),

            events: {
                'click .login': 'login',
                'click .logout': 'logout',
                'click .showIgnorelist': 'showIgnorelist'
            },

            initialize: function(options) {
                this.region = options.region;
                this.radio = Radio.channel('app');
            },

            show: function() {
                console.log('UserDetailsView:show', this.model.toJSON());
                this.region.show(this);
            },

            showIgnorelist: function() {
                this.radio.command('ignorelist:show');
            },

            login: function() {
                this.radio.command('user:login');
            },

            logout: function() {
                this.radio.command('user:logout');
            }
        });

        return View;
    }
);