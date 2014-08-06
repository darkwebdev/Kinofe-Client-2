define(['backbone', 'models/person-item'], function(Backbone, Person) {
    var PersonList = Backbone.Collection.extend({
        model: Person,

        initialize: function(models, options) {
            console.log('collection person-list:init', options);
            this.vent = options.vent;
        },

        selectPerson: function(person) {
            this.vent.trigger('person:selected', person.get('id'));
        }
    });

    return PersonList;
});