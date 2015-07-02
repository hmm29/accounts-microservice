Meteor.startup(function() {

  Factory.define('account', Accounts, {
    name: function() { return Fake.sentence(); },
    rating: function() { return _.random(1, 5); }
  });

  if (Accounts.find({}).count() === 0) {

    _(10).times(function(n) {
      Factory.create('account');
    });

  }

});
