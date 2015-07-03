Router.route('/', {
  name: 'home',
});

Router.route('/dashboard', {
  name: 'dashboard',
  controller: 'DashboardController'
});

Router.route('/accountsAdminEmails', {
  name: 'accountsAdminEmails',
  controller: 'AccountsAdminEmailsController'
});

Router.plugin('ensureSignedIn', {
  only: ['home','dashboard']
});
