import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/link';
import { WevApp } from 'meteor/webapp'
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  Meteor.publish('links',function(){
    return Links.find({});
  });
});

function onRoute(req,res,next){
  //find the first record matches that token:req.params.token
  const link = Links.findOne({token:req.params.token});

  //deal with link
  if(link){
    //increase cliks by 1 using Mongo modifier
    Links.update(link,{$inc:{clicks:1}});
    res.writeHead(307,{'Location':link.url});
    res.end();
  }else{
    next();
  }
}

const middleware = ConnectRoute(function(router){
  router.get('/:token',onRoute);
});

WebApp.connectHandlers
.use(middleware);
