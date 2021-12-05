if (process.env.NODE_ENV === 'development') {
    module.exports = require('./service-dev.js')
} else {
    module.exports = require('./service.js')
}
