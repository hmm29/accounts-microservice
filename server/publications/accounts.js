// ensure 2d sphere index
db.accounts.createIndex({location: "2d"});

Meteor.publishComposite("accounts", function() {
  return {
    find: function() {
      return db.accounts.find({});
    }
  }
});
