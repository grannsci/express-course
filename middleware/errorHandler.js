//module.exports = (err, req, res, next) => { //commonJS syntax
export default (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message,
    });
};