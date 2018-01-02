var express = require('express');
var router = express.Router();
var sqlProxy = require('../mysql/SQLProxy').default;

router.get('/list', function(req, res, next) {
  let p=req.query;
  console.log(`通用sql调用:key${p.key},ps${p.ps},n${p.n}`);
  if(!p.ps){
    p.ps=[];
  }else{
    p.ps=p.ps.split(',');
  }
  if(!p.n){
    p.n=1;
  }
  sqlProxy.list(p.key,p.ps,p.n,10,(list)=>{
    let resBody={};
    resBody.code=0;
    resBody.data=list;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(resBody);
  });
});

router.get('/insert', function(req, res, next) {
  let p=req.query;
  console.log(`通用sql调用:key${p.key},ps${p.ps}`);
  if(!p.ps){
    p.ps=[];
  }else{
    p.ps=p.ps.split(',');
  }
  sqlProxy.insert(p.key,p.ps,(json)=>{
    let resBody={};
    resBody.code=0;
    resBody.data=json;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(resBody);
  });
});

router.get('/update', function(req, res, next) {
  let p=req.query;
  console.log(`通用sql调用:key${p.key},ps${p.ps}`);
  if(!p.ps){
    p.ps=[];
  }else{
    p.ps=p.ps.split(',');
  }
  sqlProxy.update(p.key,p.ps,(json)=>{
    let resBody={};
    resBody.code=0;
    resBody.data=json;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(resBody);
  });
});



module.exports = router;
