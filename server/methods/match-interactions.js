/*
 MATCH INTERACTIONS API

 Example API call:

 Meteor.call('MatchInteractions.sendRequest', '507f1f77bcf86cd799439011',
 '807a1f77bcc86ad790445611', function(err,resp) {
  if(resp) {
    // do something here
  }
 });

 */

Meteor.methods({
    /**
     * send a match request
     * @method 'MatchInteractions.sendRequest'
     * @param {String} requesterId
     * @param {String} recipientId
     * @return {String} res
     */
    'MatchInteractions.sendRequest': function (requesterId, recipientId) {
        var interaction, res;

        check(requesterId, String);
        check(recipientId, String);

        interaction = requesterId + 'to' + recipientId;

        if (typeof(matchInteractions.get(interaction)) === 'undefined') {
            res = matchInteractions.set(interaction, 'sent');
            if (res) return res; // [OK]
        }

        throw new Meteor.Error(403, 'Could not send request because interaction already exists.');
    },
    /**
     * accept a match request
     * @method 'MatchInteractions.acceptRequest'
     * @param {String} recipientId
     * @param {String} requesterId
     * @return {String} res
     */
    'MatchInteractions.acceptRequest': function (recipientId, requesterId) {
        var interaction, res;

        check(recipientId, String);
        check(requesterId, String);

        interaction = requesterId + 'to' + recipientId;

        if (matchInteractions.get(interaction) == 'sent') {
            res = matchInteractions.set(interaction, 'matched');
            if (res) return res; // [OK]
        }
        else if (matchInteractions.get(interaction) == 'matched') {
            throw new Meteor.Error(403, 'Already matched');
        }

        throw new Meteor.Error(403, 'Interaction does not exist');
    },
    /**
     * get status of a match request
     * @method 'MatchInteractions.getStatus'
     * @param {String} requesterId
     * @param {String} recipientId
     * @return {String} status
     */
    'MatchInteractions.getStatus': function (requesterId, recipientId) {
        var interaction, status;

        check(requesterId, String);
        check(recipientId, String);

        interaction = requesterId + 'to' + recipientId;

        if (typeof(matchInteractions.get(interaction)) !== 'undefined') {
            status = matchInteractions.get(interaction);
            if (status === 'sent' || status === 'matched') return status; // 'sent' or 'matched'
            else throw new Meteor.Error(403, 'Invalid value for interaction status.');
        }

        throw new Meteor.Error(403, 'Interaction does not exist.');
    },
    /**
     * terminate a match interaction
     * @method 'MatchInteractions.endInteraction'
     * @param {String} requesterId
     * @param {String} recipientId
     * @return {String} num_of_interactions_deleted
     */
    'MatchInteractions.endInteraction': function (requesterId, recipientId) {
        var num_of_interactions_deleted;

        check(requesterId, String);
        check(recipientId, String);

        num_of_interactions_deleted = matchInteractions.del(requesterId + 'to' + recipientId);
        if (num_of_interactions_deleted) return num_of_interactions_deleted; // Should be 1

        throw new Meteor.Error(403, 'Interaction does not exist.');
    }
});
