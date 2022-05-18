const express = require('express')
const Agency = require('../models/guide')
const router = new express.Router()
const AfterMongooseQuery = require('../modules/AfterMongooseQuery')

router.post('/guides', (req, res) => {

    const guide = new Guide(req.body)

    guide.save().then(
        guide => AfterMongooseQuery.onfulfilled(guide, res, 201, guide),
        err => AfterMongooseQuery.onrejected(err, res)
    )

})

module.exports = router