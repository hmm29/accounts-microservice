/**
 * Created by harrisonmiller on 7/26/15.
 */
Meteor.publish("match-interactions", function() {
    return matchInteractions.matching("*to*")
});