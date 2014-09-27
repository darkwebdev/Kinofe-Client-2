define(['backbone', 'backbone.radio', 'models/person-item'], function(Backbone, Radio, Person) {
    var radio = Radio.channel('app');

    var PersonList = Backbone.Collection.extend({
        model: Person,

        initialize: function() {
            //console.log('collection person-list:init');
        }//,

//        selectPerson: function(person) {
//            this.radio.trigger('person:selected', person.get('id'));
//        }
    });

    return PersonList;
});