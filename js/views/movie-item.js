define(['marionette', 'handlebars', 'text!templates/movie-item.hbs', 'collections/janre-list', 'views/janre-list'],
    function(Marionette, Handlebars, html, JanreList, JanreListView) {

    var View = Marionette.LayoutView.extend({

        tagName: 'li',
        className: 'listItem',
        template: Handlebars.compile(html),

        regions: {
            janreRegion: '.janreList'
        },

        events: {
            'click .hide': 'hideMovie',
            'click .watchlist': 'toggleWatchlistedMovie',
//            'click .select': 'selectMovie',
            'click .restore': 'restoreMovie'
        },

        modelEvents: {
            'change:hidden': 'hide',
            'change:watchlisted': 'checkWatchlisted'
        },

        initialize: function() {
            //console.log('MovieItemView:init', this.model);
            this.checkWatchlisted(); // set the proper watchlisted icon
        },

        onShow: function() {
            //console.log('MovieItemView:onShow');

            var janreCollection = new JanreList(_.map(this.model.get('janre'), function(name) {
                return { name: name };
            }));
            var janreListView = new JanreListView({ collection: janreCollection });

            this.janreRegion.show(janreListView);
        },

        hide: function() {
            $(this.el).addClass('hidden');
        },

        checkWatchlisted: function() {
//            console.log('movie item view:checkWatchlisted', this.model.get('id'), this.model.get('watchlisted'));
            $(this.el).toggleClass('watchlisted', this.model.get('watchlisted'));
        },

        hideMovie: function() {
            console.log('movie view:hideMovie');
            this.model.hide();
        },
        restoreMovie: function() {
            console.log('movie view:restoreMovie');
            this.model.restore();
        },

        toggleWatchlistedMovie: function() {
            console.log('movie view:toggleWatchlistedMovie');
            this.model.toggleWatchlisted();
        }
    });

    return View;
});