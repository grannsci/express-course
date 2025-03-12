//since there is only one middleware function,
//we can export it directly as a function (import with filename)
export default (req, res, next) => {
    const {url, method} = req;
    const date = new Date();
    console.log(`${date} - ${method} - ${url}`);
    next(); // call the next middleware
};


