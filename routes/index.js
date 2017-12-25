module.exports = (router)=>{
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'iwin247' });
  });

  router.get('/test', (req,res)=>{
    return res.status(200).json({test: "asdf"});
  });

  router.post('/test', (req,res)=>{
    return res.status(200).json(req.body);
  });
  return router;
}
