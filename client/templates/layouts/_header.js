Template._header.helpers({
    currentUserEmail: function () {
        return Meteor.user().emails[0].address;
    }
});
