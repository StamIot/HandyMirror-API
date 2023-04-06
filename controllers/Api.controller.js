const getHome = (_, res) => {
    res.status(200).json({
        salutation: 'Hello world',
    })
}

module.exports = {
    getHome,
}
