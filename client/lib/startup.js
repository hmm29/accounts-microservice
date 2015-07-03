// Harrison Miller: hack to get rid of unnecessary meteor_accounts_loginServiceConfiguration
Tracker.autorun(function() {
  var subs = Meteor.default_connection._subscriptions; //all the subscriptions that have been subscribed.

   Object.keys(subs).forEach(function(key) {
       if (subs[key].name === "meteor.loginServiceConfiguration") subs[key].stop();
   });

   Router.go('/');
});
