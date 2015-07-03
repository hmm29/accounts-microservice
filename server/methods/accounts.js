// Harrison Miller: API for Venture AccountsSvc

Meteor.methods({
    /**
     * add a Venture user account to database
     * @method 'AccountsSvc.addUser'
     * @param {Object} data
     * @param {String} newAccountFacebookAccessToken
     * @param {Boolean} currentUserAccessToken
     * @return {String} accountId
     */
    'AccountsSvc.addUser': function (data, newAccountFacebookAccessToken, currentUserFacebookAccessToken) {
        var accessTokensDoMatch = (newAccountFacebookAccessToken === currentUserFacebookAccessToken);

        if (!db.accounts.findOne(data) && accessTokensDoMatch) {
            var accountId;

            check(data, Object);
            check(newAccountFacebookAccessToken, String);
            check(currentUserFacebookAccessToken, String);

            // prevent adding redundant access token fields
            if (! data.services.facebook.accessToken) {
              var newData = _.extend(data, {'services.facebook.accessToken': newAccountFacebookAccessToken});
            }

            accountId = db.accounts.insert(data);
            return accountId;
        }

        if (db.accounts.findOne({'services.facebook.accessToken': newAccountFacebookAccessToken})) {
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
    'AccountsSvc.getUser': function (selector) {
        var account;
        check(selector, Object);

        account = db.accounts.findOne(selector, {'profile.firstName': 1, username: 1, activityPreference: 1,'profile.bio': 1, 'profile.gender': 1});

        if(account) return account;

        throw new Meteor.Error(403, "User does not exist");
    },
    /**
     * get a selection of user accounts from the database
     * @method 'AccountsSvc.getMultipleUsers'
     * @param {Object} selector
     * @return {Array} accounts
     */
    'AccountsSvc.getMultipleUsers': function (selector) {
        var accounts;

        check(selector, Object);

        accounts = db.accounts.find(selector, {'profile.firstName': 1, username: 1, activityPreference: 1,'profile.bio': 1, 'profile.gender': 1}).fetch();
        if(accounts) return accounts;

        throw new Meteor.Error(403, "Users do not exist");
    },
    /**
     * update a Venture user account in the database
     * @method 'AccountsSvc.updateUser'
     * @param {Object} selector
     * @param {Object} data
     * @param {String} facebookAccessToken
     * @return {Number} num_of_accounts_updated
     */
    'AccountsSvc.updateUser': function (selector, data, facebookAccessToken) {
        var num_of_accounts_updated = 0;
        var targetAccount;

        check(selector, Object);
        check(data, Object);
        check(facebookAccessToken, String);

        targetAccount = db.accounts.findOne(selector);
        if(targetAccount && targetAccount.services.facebook.facebookAccessToken === facebookAccessToken) {
          num_of_accounts_updated = db.accounts.update(selector, {$set: data});
        }

        return num_of_accounts_updated;
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
    'AccountsSvc.deleteUser': function (selector, currentUserFacebookAccessToken) {
        var num_of_accounts_deleted;
        var targetAccount;

        check(selector, Object);
        check(facebookAccessToken, String);

        targetAccount = db.accounts.findOne(selector);
        if(targetAccount && targetAccount.services.facebook.accessToken === currentUserFacebookAccessToken) {
          num_of_accounts_deleted = db.accounts.remove(selector);
          return num_of_accounts_deleted;
        }

        throw new Meteor.Error(403, "Not authorized to delete other users");
    }
});
