/**
 * Create a new Venture admin account
 */
Accounts.onCreateUser(function (options, user) {
  var userIsAccountAdmin = !! (db.accountsAdminEmails.findOne({email: options.email}) || options.email === 'harrison.miller@yale.edu');

  if (! userIsAccountAdmin) {
    return ;
  }

  Meteor.defer(function() {
    if(userIsAccountAdmin) Roles.addUsersToRoles(user._id, ['admin-privileges'], 'accounts-admin');
  });

  return user;
});
