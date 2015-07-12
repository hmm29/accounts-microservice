/*
 ACCOUNTS API

 Example API call:

 Meteor.call('AccountsSvc.addUser',
 {name: 'Harrison Miller', firstName: 'Harrison',
 activityPreference: 'code', ...}, '<FACEBOOK_ACCESS_TOKEN>'
 '<FACEBOOK_ACCESS_TOKEN>', function(err, resp) {
 if (resp) {
  //do something here
 }
})

*/

Meteor.methods({
    /**
     * add a Venture user account to database
     * @method 'AccountsSvc.addUser'
     * @param {Object} data
     * @param {String} newUserFacebookAccessToken
     * @param {Boolean} currentUserFacebookAccessToken
     * @return {String} accountId
     */
    'Accounts.addUser': function (data, newUserFacebookAccessToken, currentUserFacebookAccessToken) {
        var accessTokensDoMatch = (newUserFacebookAccessToken === currentUserFacebookAccessToken);

        if (!db.accounts.findOne(data) && accessTokensDoMatch) {
            var accountId;

            check(data, Object);
            check(newUserFacebookAccessToken, String);
            check(currentUserFacebookAccessToken, String);

            if (!(data.services && data.services.facebookAccessToken)) {
                _.assign(data, {'services': {'facebookAccessToken': newUserFacebookAccessToken}});
            }

            accountId = db.accounts.insert(data);
            return accountId;
        }

        if (db.accounts.findOne({'services.facebookAccessToken': newUserFacebookAccessToken})) {
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
        if (account) return _.pick(account, 'firstName', 'activityPreference', 'picture', 'bio', 'gender');

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
            return _.pick(account, 'firstName', 'activityPreference', 'picture', 'bio', 'gender');
        });

        throw new Meteor.Error(403, "Users do not exist");
    },
    /**
     * update a Venture user account in the database
     * @method 'AccountsSvc.updateUser'
     * @param {Object} selector
     * @param {Object} data
     * @param {String} currentUserFacebookAccessToken
     * @return {Number} num_of_accounts_updated
     */
    'Accounts.updateUser': function (selector, data, currentUserFacebookAccessToken) {
        var num_of_accounts_updated = 0;
        var targetAccount;

        check(selector, Object);
        check(data, Object);
        check(currentUserFacebookAccessToken, String);

        targetAccount = db.accounts.findOne(selector);
        if (targetAccount && targetAccount.services.facebookAccessToken === currentUserFacebookAccessToken) {
            num_of_accounts_updated = db.accounts.update(selector, {$set: data});
        }

        return num_of_accounts_updated;

        throw new Meteor.Error(403, "Cannot perform update");
    },
    /**
     * delete a Venture user account from the database
     * @method 'AccountsSvc.deleteUser'
     * @param {Object} selector
     * @param {String} currentUserFacebookAccessToken
     * @return {Object} account
     *
     * Note: User can only delete his or her own account
     * React Native code must pass the current user's facebook access token
     */
    'Accounts.deleteUser': function (selector, currentUserFacebookAccessToken) {
        var num_of_accounts_deleted;
        var targetAccount;

        check(selector, Object);
        check(currentUserFacebookAccessToken, String);

        targetAccount = db.accounts.findOne(selector);
        if (targetAccount && targetAccount.services.facebookAccessToken === currentUserFacebookAccessToken) {
            num_of_accounts_deleted = db.accounts.remove(selector);
            return num_of_accounts_deleted;
        }

        throw new Meteor.Error(403, "Cannot perform delete");
    }
});
