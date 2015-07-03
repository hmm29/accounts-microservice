AccountsAdminEmailsController = AppController.extend({
  waitOn: function() {
    // double-check to ensure user is logged in and has been authorized
    // can only access accounts admin emails on /accountsAdminEmails route
    if (Meteor.user() && Roles.userIsInRole(Meteor.userId(), ['admin-privileges'], 'accounts-admin')) {
      this.subscribe('accountsAdminEmails', function() {
        if (db.accountsAdminEmails.find().count() === 0) {
          db.accountsAdminEmails.insert({email: 'harrison.miller@yale.edu'});
        }
      });
    }
  },
  data: {
    accountsAdminEmails: db.accountsAdminEmails.find({})
  }
});
