exports.jsonErrorResponse = function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        status: err.status,
        error: (process.env.NODE_ENV == 'development') ? err : {}
    });
};

exports.htmlErrorResponse = function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        status: err.status,
        error: (process.env.NODE_ENV == 'development') ? err : {}
    });
};