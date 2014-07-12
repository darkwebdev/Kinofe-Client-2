define(['backbone', 'models/person-item', 'vent'], function(Backbone, Person, vent) {
    var PersonList = Backbone.Collection.extend({
        model: Person,

        initialize: function(options) {
            console.log('collection person-list:init', options);
        },

        selectPerson: function(person) {
            vent.trigger('person:selected', person.get('id'));
        }
    });

    return PersonList;
});