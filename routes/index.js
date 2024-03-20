
const express = require('express');
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')
const url = require('url')
require('dotenv').config()

const NASA_API_KEY = process.env.NASA_API_KEY
const MARS_WEATHER_BASE_URL = process.env.MARS_WEATHER_BASE_URL

// Init cache
let cache = apicache.middleware

router.get('/', cache('2 minutes'), async (req, res, next) => {
    try {
        const params = new URLSearchParams({
            [MARS_WEATHER_BASE_URL]: NASA_API_KEY,
            ...url.parse(req.url, true).query,
        })

        const apiRes = await needle('get', `${MARS_WEATHER_BASE_URL}?${params}`)
        const data = apiRes.body

        // Log the request to public API
        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${MARS_WEATHER_BASE_URL}?${params}`)
        }

        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

module.exports = router