Accounts = new Mongo.Collection('accounts');

Accounts.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});
