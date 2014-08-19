define(['backbone', 'backbone.radio', 'models/person-item'], function(Backbone, Radio, Person) {
    var PersonList = Backbone.Collection.extend({
        model: Person,

        initialize: function() {
            console.log('collection person-list:init');
            this.radio = Radio.channel('app');
        }//,

//        selectPerson: function(person) {
//            this.radio.trigger('person:selected', person.get('id'));
//        }
    });

    return PersonList;
});