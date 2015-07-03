// This file specifies what should happen with client-side CRUD operations done on the accounts database
// These validators protect the database from non-admin parties

// The userId param will ensure that admin is logged in to perform operations

db.accounts.allow({
    'insert': function (userId, doc) {
        return Roles.userIsInRole(userId, ['admin-privileges'], 'accounts-admin')
            && doc.createdBy === userId
            && !db.accounts.findOne(_.omit(doc, 'createdAt'));
    },
    'update': function (userId, doc, fields, modifier) {
        return Roles.userIsInRole(userId, ['admin-privileges'], 'accounts-admin');
    },
    'remove': function (userId, doc) {
        return Roles.userIsInRole(userId, ['admin-privileges'], 'accounts-admin')
            && db.accounts.findOne(doc);
    }
});
