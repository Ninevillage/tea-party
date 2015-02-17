module.exports = function(Root, application) {
  var Router = application.get('modules').express.Router();
  
  Router.get('/', function(req,res) {
      res.render('index');
  });
  
  Router.get('/:slug', function(req,res,next) {
    if(!req.page) return next();
    res.render('page', {page: req.page});
  });
  
  Router.param('slug', function(req, res, next, slug) {
    application.get('models').Page.loadBySlug(slug, function(err, page) {
      if(err) return next(err);
      if(!page) return next();
      req.page = page;
      next();
    });
  });
  
  return Router;
};