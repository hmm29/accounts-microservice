// Immutable: only can add and delete user admin emails

db.accountsAdminEmails.allow({
    'insert': function (userId, doc) {
        return Roles.userIsInRole(userId, ['admin-privileges'], 'accounts-admin')
          && ! db.accountsAdminEmails.findOne(_.omit(doc, ['addedAt', 'addedBy']));
    },
    'remove': function (userId, doc) {
        return Roles.userIsInRole(userId, ['admin-privileges'], 'accounts-admin')
          && db.accountsAdminEmails.findOne(doc);
    }
});
