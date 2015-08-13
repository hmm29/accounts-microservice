// ensure 2d sphere index
// db.accounts.createIndex({location: "2d"}); TODO: make this work

Meteor.publishComposite("accounts", function() {
  return {
    find: function() {
      return db.accounts.find({});
    },
    children: [
      {
        find: function() {
          return matchInteractions.matching("*to*")
        }
      }
    ]
  }
});
