module.exports = (router, Users, passport) =>{
  router.get("/", isAuth, (req, res)=>{
     res.render("admin", {title: "iwin247::admin"});
  })
  return router;
}