// ensure 2d sphere index
db.accounts.createIndex({location: "2dsphere"});

Meteor.publishComposite("accounts", function() {
  return {
    find: function() {
      return db.accounts.find({});
    }
  }
});
