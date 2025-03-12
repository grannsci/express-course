//module.exports = (req, res, next) => { //commonJS syntax
export default (req, res, next) => { //ES6 syntax
    res.status(404).json({message: 'Not found'});
    next(); // call the next middleware
};