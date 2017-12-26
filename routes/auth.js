module.exports = (router, Users, passport) =>{
  router.get('/signin', (req, res)=>{
     return res.status(200).send("로그인 화면");
   });
  router.post('/signup', async (req, res) => {
      const data = req.body;
      console.log(data);
      const new_user = new Users(data);
      try{
        var result = await new_user.save();
      }catch(e){
        if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
        if(e instanceof ValidationError) return res.status(400).json({message: e.message});
        if(e instanceof paramsError) return res.status(400).json({message: e.message});
      }
      return res.status(200).json(result);
  })
  
  .post('/signin',passport.authenticate('local'), (req,res)=>{
    res.redirect('/');  
  })

  .get('/auto/:token', (req, res)=>{
     var params = ['token'];

     if(check_param(req.params, params)){
       const token = req.params.token;
       Users.findOne({token: token}, {_id: 0, passwd: 0},(err, user) =>{
         if(err) return res.status(500).send("DB error"); 
         if(user) return res.status(200).json({id: user.id, name: user.name, token: user.token});
         else return res.status(404).send("user not found");
       });
     }else{
       return res.status(400).send("param missing or null");
     }
  })
  
  //social auth
  .get('/github/token', passport.authenticate('github-token'), (req, res)=>{
    if (req.user) {
      Users.findOne({github_id: req.user._json.id}, {_id: 0}, (err, users)=>{
        if(err) err;
        if(users) return res.status(200).send(users);
        else{
          github_user = new Users({
            github_id: req.user._json.id,
            name: req.user._json.name,
            token: rndString.generate(),
          });
          github_user.save((err, result)=>{
            if(err) return res.stauts(500).send("DB err");
            if(result) return res.status(200).json(github_user);
          });
        }
      });
    }else res.status(401).send("unauthed");
  })

  .get('/fb/token', passport.authenticate('facebook-token'), (req, res)=>{
    if (req.user) {
      Users.findOne({facebook_id: req.user._json.id}, {_id: 0}, (err, users)=>{
        if(err) err;
        if(users) res.status(200).send(users);
        else{
          facebook_user = new Users({
            facebook_id: req.user._json.id,
            name: req.user._json.name,
            token: rndString.generate(),
          });
          facebook_user.save((err, result)=>{
            if(err) return res.stauts(500).send("DB err");
            if(result) return res.status(200).json(facebook_user);
          });
        }
      });
    } else  res.status(401).send("unauthed");
  })

  .get('/tw/token', passport.authenticate('twitter-token'), (req, res) =>{
    if(req.user) {
      Users.findOne({twitter_id: req.user._json.id}, {_id: 0}, (err, users)=>{
        if(err) err;
        if(users) res.status(200).send(users);
        else{
          twitter_user = new Users({
            twitter_id: req.user._json.id,
            name: req.user._json.name,
            token: rndString.generate(),
          });
          twitter_user.save((err, result)=>{
            if(err) return res.stauts(500).send("DB err");
            if(result) return res.status(200).json(twitter_user);
          });
        }
      });
    } else  res.status(401).send(req.user);
  })

  .post('/logout', (req, res)=>{
    req.logout();
    return res.redirect('/');
  });


  return router;
}
