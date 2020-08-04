const express = require('express')
const app = express()
const config = require('./config')
const client = require('twilio')(config.accountId, config.authToken)

app.get('/login', (req, res) => {
    client.verify.services(config.serviceId).verifications.create({
        to: `+${req.query.phoneNumber}`,
        channel: req.query.channel
    }).then(data => {
        res.status(200).send(data)
    })
})
app.get('/verify', (req, res) => {
    client.verify.services(config.serviceId).verificationChecks.create({
        to: `+${req.query.phoneNumber}`,
        code: req.query.code
    }).then(data => {
        res.status(200).send(data)
    })
})
app.listen(4000, () => {
    console.log("server started")
})