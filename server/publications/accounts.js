Meteor.publishComposite("accounts", function() {
  return {
    find: function() {
      return db.accounts.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});
