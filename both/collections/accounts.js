db.accounts = new Mongo.Collection('accounts');

db.accounts.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
    doc.sinchClientId = '';

    // if account is being inserted by admin and not by Venture app user
    // Venture app will call 'AccountsSvc.addUser' with facebookAccessToken param
    if (!(doc.services && doc.services.facebookAccessToken)) {
        doc.createdBy = Meteor.userId();
    }
});

Schema.AccountAgeRange = new SimpleSchema({
  min: {
    type: Number,
    min: 13,
    max: 129
  },
  max: {
    type: Number,
    min: 14,
    max: 130
  }
});

Schema.AccountLocation = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ["Point"]
  },
  coordinates: {
    type: [Number],
    decimal: true,
    minCount: 0,
    maxCount: 2,
    label: "coordinates"
  }
});

Schema.AccountMatchingSettings = new SimpleSchema({
    maxSearchDistance: {
        type: Number,
        decimal: true,
        min: 0,
        max: 10
    },
    ageRangeLower: {
        type: Number,
        min: 18,
        max: 98
    },
    ageRangeUpper: {
        type: Number,
        min: 19,
        max: 99
    },
    genderPreferences: {
        type: [String],
        allowedValues: ["male", "female", "other"]
    }
});

Schema.AccountDiscoveryPreferences = new SimpleSchema({
  genderInclusions: {
    type: [String],
    allowedValues: ["male", "female", "other"]
  }
});

Schema.AccountServices = new SimpleSchema({
  facebookAccessToken: {
    type: String
  }
});

Schema.AccountLoginStatus = new SimpleSchema({
  online: {
    type: Boolean
  }
});

Schema.Account = new SimpleSchema({
    name: {
        type: String,
        regEx: /^[a-zA-Z_ -]{2,25}$/,
        label: "name"
    },
    firstName: {
        type: String,
        regEx: /^[a-zA-Z -]{0,25}$/,
        index: 1,
        label: "first name",
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z -]{0,25}$/,
        label: "last name",
        optional: true
    },
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_ -]{3,15}$/,
        label: "username",
        optional: true
    },
    activityPreference: {
        type: String,
        regEx: /^[a-z0-9A-Z \/_?:;.,-]{0,12}$/,
        index: 1,
        optional: true
    },
    picture: {
      type: String
    },
    gender: {
        type: String,
        allowedValues: [
            "male",
            "female",
            "other",
            "Male",
            "Female",
            "Agender",
            "Androgyne",
            "Androgynous",
            "Bigender",
            "Cis",
            "Cisgender",
            "Cis Female",
            "Cis Male",
            "Cis Man",
            "Cis Woman",
            "Cisgender Female",
            "Cisgender Male",
            "Cisgender Man",
            "Cisgender Woman",
            "Female to Male",
            "FTM",
            "Gender Fluid",
            "Gender Nonconforming",
            "Gender Questioning",
            "Gender Variant",
            "Genderqueer",
            "Intersex",
            "Male to Female",
            "MTF",
            "Neither",
            "Neutrois",
            "Non-binary",
            "Other",
            "Pangender",
            "Trans Person",
            "Trans Female",
            "Trans Male",
            "Trans Man",
            "Trans Woman",
            "Transfeminine",
            "Transgender",
            "Transgender Female",
            "Transgender Male",
            "Transgender Man",
            "Transgender Person",
            "Transgender Woman",
            "Transmasculine",
            "Transsexual Female",
            "Transsexual Male",
            "Transsexual Man",
            "Transsexual Person",
            "Transsexual Woman",
            "Two-Spirit"],
        optional: true
    },
    bio: {
        type: String,
        label: "bio",
        optional: true
    },
    ageRange: {
      type: Schema.AccountAgeRange
    },
    location: {
        type: Schema.AccountLocation
    },
    services: {
        type: Schema.AccountServices
    },
    matchingPreferences: {
        type: Schema.AccountMatchingSettings
    },
    discoveryPreferences: {
        type: Schema.AccountDiscoveryPreferences
    },
    status: {
        type: Schema.AccountLoginStatus
    }
});

db.accounts.attachSchema(Schema.Account);
