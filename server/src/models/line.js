const mongoose = require('mongoose')
const { Colors } = require('react-native/Libraries/NewAppScreen')
const validator = require('validator')

const LineSchema = new mongoose.Schema (
	{

    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    catalog: {
			type: Number,
			required: true,
      unique: true,

			validator(value) {
				if (!Number.isInteger(value)) throw new Error('Line catalog number is invalid')
			}
		},

    sign: {
      type: String,
      required: true,
      trim: true
    },

    mainRoutes: [{

      routeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
      },

      routeShortName: {
        type: String,
        required: true,
        unique: true,
        trim: true
      }
    }],

    alternatives: [{

      catalog: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },

      directions: [{

        catalog: {
          type: String,
          required: true,
          unique: true,
          trim: true
        },

        sign: {
          type: String,
          required: true,
          trim: true
        },

        departureCity: {
          type: String,
          required: true,
          trim: true
        },

        departureStation: {
          type: String,
          required: true,
          trim: true
        },

        destinationCity: {
          type: String,
          required: true,
          trim: true
        },

        destinationStation: {
          type: String,
          required: true,
          trim: true
        },

        color: {

          type: String,
          trim: true,
  
          validator(value) {
            if (!(/[0-9A-F]{6}/g.test(value))) throw new Error('Route color is invalid')
          }
          
        }
      }]
    }],

    type: {

      type: Number,
      required: true,

      validator(value) {
        if (!Number.isInteger(value)) throw new Error('Line type is invalid')
      }
    }
	},

	{
		timestamps: true
	}
)

const Line = mongoose.model('Line', LineSchema)
module.exports = Line