db.accounts = new Mongo.Collection('accounts');

db.accounts.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();

    // if account is being inserted by admin and not by Venture app user
    // Venture app will call 'AccountsSvc.addUser' with facebookAccessToken param
    if (!(doc.services && doc.services.facebook.accessToken)) {
        doc.createdBy = Meteor.userId();
    }
});

//Schema goes here
// TODO: add schema for facebook access token!!!!
// Schema.AccountCountry = new SimpleSchema({
//     name: {
//         type: String,
//         label: "country name"
//     },
//     code: {
//         type: String,
//         regEx: /^[A-Z]{2}$/,
//         label: "country code"
//     }
// });
//
// Schema.AccountProfile = new SimpleSchema({
//     name: {
//         type: String,
//         regEx: /^[a-zA-Z_ -]{2,25}$/,
//         label: "name"
//     },
//     firstName: {
//         type: String,
//         regEx: /^[a-zA-Z -]{0,25}$/,
//         index: 1,
//         label: "first name",
//         optional: true
//     },
//     lastName: {
//         type: String,
//         regEx: /^[a-zA-Z -]{0,25}$/,
//         label: "last name",
//         optional: true
//     },
//     birthday: {
//         type: Date,
//         optional: true
//     },
//     gender: {
//         type: String,
//         allowedValues: [
//             "male",
//             "female",
//             "other",
//             "Male",
//             "Female",
//             "Agender",
//             "Androgyne",
//             "Androgynous",
//             "Bigender",
//             "Cis",
//             "Cisgender",
//             "Cis Female",
//             "Cis Male",
//             "Cis Man",
//             "Cis Woman",
//             "Cisgender Female",
//             "Cisgender Male",
//             "Cisgender Man",
//             "Cisgender Woman",
//             "Female to Male",
//             "FTM",
//             "Gender Fluid",
//             "Gender Nonconforming",
//             "Gender Questioning",
//             "Gender Variant",
//             "Genderqueer",
//             "Intersex",
//             "Male to Female",
//             "MTF",
//             "Neither",
//             "Neutrois",
//             "Non-binary",
//             "Other",
//             "Pangender",
//             "Trans Person",
//             "Trans Female",
//             "Trans Male",
//             "Trans Man",
//             "Trans Woman",
//             "Transfeminine",
//             "Transgender",
//             "Transgender Female",
//             "Transgender Male",
//             "Transgender Man",
//             "Transgender Person",
//             "Transgender Woman",
//             "Transmasculine",
//             "Transsexual Female",
//             "Transsexual Male",
//             "Transsexual Man",
//             "Transsexual Person",
//             "Transsexual Woman",
//             "Two-Spirit"],
//         optional: true
//     },
//     organization: {
//         type: String,
//         regEx: /^[a-z0-9A-z .]{3,30}$/,
//         optional: true
//     },
//     website: {
//         type: String,
//         regEx: SimpleSchema.RegEx.Url,
//         optional: true
//     },
//     bio: {
//         type: String,
//         label: "bio",
//         optional: true
//     },
//     country: {
//         type: Schema.AccountCountry,
//         optional: true
//     }
// });
//
// Schema.AccountMatchingSettings = new SimpleSchema({
//     maxSearchDistance: {
//         type: Number,
//         min: 0,
//         max: 10
//     },
//     ageRangeLower: {
//         type: Number,
//         min: 18,
//         max: 98
//     },
//     ageRangeUpper: {
//         type: Number,
//         min: 19,
//         max: 99
//     },
//     genderPreferences: {
//         type: [String],
//         allowedValues: ["male", "female", "other"]
//     },
//     discoveryPreferences: {
//         type: [String],
//         optional: true
//     }
// });
//
// Schema.Account = new SimpleSchema({
//     username: {
//         type: String,
//         regEx: /^[a-z0-9A-Z_ -]{3,15}$/,
//         label: "username",
//         optional: true
//     },
//     emails: {
//         type: [Object],
//         // this must be optional if you also use other sign-in services like facebook,
//         // but if you use only accounts-password, then it can be required
//         optional: true
//     },
//     "emails.$.address": {
//         type: String,
//         regEx: SimpleSchema.RegEx.Email
//     },
//     "emails.$.verified": {
//         type: Boolean
//     },
//     createdAt: {
//         type: Date
//     },
//     activityPreference: {
//         type: String,
//         regEx: /^[a-z0-9A-Z \/_?:;.,-]{0,12}$/,
//         index: 1,
//         optional: true
//     },
//     profile: {
//         type: Schema.AccountProfile
//     },
//     services: {
//         type: Object,
//         blackbox: true
//     },
//     matchingSession: {
//         type: Schema.AccountMatchingSession
//     },
//     location: {
//         type: Schema.AccountLocation
//     },
//     matchingSettings: {
//         type: Schema.AccountMatchingSettings
//     },
//     status: {
//         type: Object,
//         optional: true,
//         blackbox: true
//     },
//     roles: {
//         type: [String],
//         optional: true
//     }
// });
//
// db.accounts.attachSchema(Schema.Account);
