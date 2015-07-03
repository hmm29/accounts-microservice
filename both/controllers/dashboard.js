DashboardController = AppController.extend({
  waitOn: function() {
    if (Meteor.user() && Roles.userIsInRole(Meteor.userId(), ['admin-privileges'], 'accounts-admin')) {
      return this.subscribe('accounts');
    }
  },
  data: {
    accounts: db.accounts.find({})
  },
  onAfterAction: function () {
    Meta.setTitle('Dashboard');
  }
});

DashboardController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});
