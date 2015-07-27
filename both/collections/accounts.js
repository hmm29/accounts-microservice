db.accounts = new Mongo.Collection('accounts');

db.accounts.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
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

Schema.AccountLoginStatus = new SimpleSchema({
  online: {
    type: Boolean
  }
});

Schema.Account = new SimpleSchema({
    ventureId: {
        type: String
    },
    name: {
        type: String,
        regEx: /^[a-zA-Z_ -]{2,35}$/,
        label: "name"
    },
    firstName: {
        type: String,
        regEx: /^[a-zA-Z -]{0,25}$/,
        index: 1,
        label: "first name"
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
      type: String,
      regEx: SimpleSchema.RegEx.Url
    },
    gender: {
        type: String,
        allowedValues: [
            "agender",
            "androgyne",
            "androgynous",
            "bigender",
            "cis",
            "cisgender",
            "cis female",
            "cis male",
            "cis man",
            "cis woman",
            "cisgender female",
            "cisgender male",
            "cisgender man",
            "cisgender woman",
            "female",
            "female to male",
            "ftm",
            "gender fluid",
            "gender nonconforming",
            "gender questioning",
            "gender variant",
            "genderqueer",
            "intersex",
            "male",
            "male to female",
            "mtf",
            "neither",
            "neutrois",
            "non-binary",
            "other",
            "pangender",
            "trans person",
            "trans female",
            "trans male",
            "trans man",
            "trans woman",
            "transfeminine",
            "transgender",
            "transgender female",
            "transgender male",
            "transgender man",
            "transgender person",
            "transgender woman",
            "transmasculine",
            "transsexual female",
            "transsexual male",
            "transsexual man",
            "transsexual person",
            "transsexual woman",
            "two-spirit"],
        optional: true
    },
    bio: {
        type: String,
        regEx: /^.{0,25}$/,
        label: "bio",
        optional: true
    },
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    },
    ageRange: {
      type: Schema.AccountAgeRange
    },
    location: {
        type: Schema.AccountLocation
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
