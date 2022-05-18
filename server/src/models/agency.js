const mongoose = require('mongoose')
const validator = require('validator')

const AgencySchema = new mongoose.Schema (
	{
		catalog: {
			type: Number,
			required: true,
			unique: true,

			validator(value) {
				if (!Number.isInteger(value)) throw new Error('Agency catalog number is invalid')
			}
		},

		name: {
			type: String,
			required: true,
			trim: true
		}
	},

	{
		timestamps: true
	}
)

const Agency = mongoose.model('Agency', AgencySchema)
module.exports = Agency