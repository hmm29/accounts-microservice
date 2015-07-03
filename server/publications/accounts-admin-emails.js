Meteor.publish("accountsAdminEmails", function() {
  return db.accountsAdminEmails.find({});
});
