Meteor.publishComposite("accounts", function() {
  return {
    find: function() {
      return Accounts.find({});
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
