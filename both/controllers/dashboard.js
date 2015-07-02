DashboardController = AppController.extend({
  waitOn: function() {
    return this.subscribe('accounts');
  },
  data: {
    accounts: Accounts.find({})
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
