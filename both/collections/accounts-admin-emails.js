db.accountsAdminEmails = new Mongo.Collection('accountsAdminEmails');

db.accountsAdminEmails.before.insert(function (userId, doc) {
    doc.addedAt = moment().toDate();
    doc.addedBy = Meteor.userId();
  });
