/*
 ACCOUNTS API
*/

Meteor.methods({
    /**
     * add a Venture user account to database
     * @method 'AccountsSvc.addUser'
     * @param {Object} data
     * @param {String} newUserVentureId
     * @param {Boolean} currentUserVentureId
     * @return {String} accountId
     */
    'Accounts.addUser': function (data, newUserVentureId, currentUserVentureId) {
        var ventureIdsDoMatch = (newUserVentureId === currentUserVentureId);

        if (!db.accounts.findOne(data) && ventureIdsDoMatch) {
            var accountId;

            check(data, Object);
            check(newUserVentureId, String);
            check(currentUserVentureId, String);

            if (!(data.ventureId)) {
                _.assign(data, {ventureId: newUserVentureId});
            }

            if (data.ventureId && data.ventureId !== newUserVentureId) {
                throw new Meteor.Error(403, "New user data Venture Id does not match current user's Venture ID");
            }

            accountId = db.accounts.insert(data);
            return accountId;
        }

        if (db.accounts.findOne({ventureId: newUserVentureId})) {
            throw new Meteor.Error(403, "Already created account");
        }

        throw new Meteor.Error(403, "User already exists");
    },
    /**
     * get a Venture user account from the database
     * @method 'AccountsSvc.getUser'
     * @param {Object} selector
     * @return {Object} account
     */
    'Accounts.getUser': function (selector) {
        var account;
        check(selector, Object);

        account = db.accounts.findOne(selector);
        if (account) return _.pick(account, 'firstName', 'activityPreference', 'picture', 'bio', 'gender', 'ageRange');

        throw new Meteor.Error(404, "User does not exist");
    },
    /**
     * get a selection of user accounts from the database
     * @method 'AccountsSvc.getMultipleUsers'
     * @param {Object} selector
     * @return {Array} accounts
     */
    'Accounts.getMultipleUsers': function (selector) {
        var accounts;

        check(selector, Object);

        accounts = db.accounts.find(selector).fetch();
        if (accounts) return _.map(accounts, function (account) {
            return _.pick(account, 'firstName', 'activityPreference', 'picture', 'bio', 'gender', 'ageRange');
        });

        throw new Meteor.Error(403, "Users do not exist");
    },
    /**
     * update a Venture user account in the database
     * @method 'AccountsSvc.updateUser'
     * @param {Object} selector
     * @param {Object} data
     * @param {String} currentUserVentureId
     * @param {String} currentUserName
     * @param {String} currentUserEmail
     * @return {Number} num_of_accounts_updated
     */
    'Accounts.updateUser': function (selector, data, currentUserVentureId, currentUserName, currentUserEmail) {
        var num_of_accounts_updated = 0;
        var targetAccount;

        check(selector, Object);
        check(data, Object);
        check(currentUserVentureId, String);
        check(currentUserName, String);
        check(currentUserEmail, String);

        targetAccount = db.accounts.findOne(selector);
        if (targetAccount &&
          (targetAccount.ventureId === currentUserVentureId
            && targetAccount.name === currentUserName
            && targetAccount.email === currentUserEmail)
          ) {
            num_of_accounts_updated = db.accounts.update(selector, {$set: data});
            return num_of_accounts_updated;
        }

        throw new Meteor.Error(403, "Cannot perform update");
    },
    /**
     * delete a Venture user account from the database
     * @method 'AccountsSvc.deleteUser'
     * @param {Object} selector
     * @param {String} currentUserVentureId
     * @return {Object} account
     *
     * Note: User can only delete his or her own account
     * React Native code must pass the current user's facebook access token
     */
    'Accounts.deleteUser': function (selector, currentUserVentureId) {
        var num_of_accounts_deleted;
        var targetAccount;

        check(selector, Object);
        check(currentUserVentureId, String);

        targetAccount = db.accounts.findOne(selector);
        if (targetAccount && targetAccount.ventureId === currentUserVentureId) {
            num_of_accounts_deleted = db.accounts.remove(selector);
            return num_of_accounts_deleted;
        }

        throw new Meteor.Error(403, "Cannot perform delete");
    }
});
