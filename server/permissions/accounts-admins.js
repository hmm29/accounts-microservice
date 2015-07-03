DENY_USERS_COLLECTION_CLIENT_OPERATIONS = true;

//make sure DENY_USERS_COLLECTION_CLIENT_OPERATIONS is a boolean
if (typeof(DENY_USERS_COLLECTION_CLIENT_OPERATIONS) !== 'boolean' || DENY_USERS_COLLECTION_CLIENT_OPERATIONS) {

    db.users.deny({
        'insert': function (userId, doc) {
            return true;
        },
        'update': function (userId, doc, fields, modifier) {
            return true;
        },
        'remove': function (userId, doc) {
            return true;
        }
    });

}

else {

    db.users.deny({
        'insert': function (userId, doc) {
            return Roles.userIsInRole(userId, ['admin-privileges'], 'accounts-admin')
                && !db.users.findOne(doc);
        },
        'update': function (userId, doc, fields, modifier) {
            return Roles.userIsInRole(userId, ['admin-privileges'], 'accounts-admin');
        },
        'remove': function (userId, doc) {
            return Roles.userIsInRole(userId, ['admin-privileges'], 'accounts-admin')
                && db.users.findOne(doc);
        }
    });

}
