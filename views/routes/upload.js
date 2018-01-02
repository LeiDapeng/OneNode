var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var unzip = require("unzip");

/* 上传*/
router.post('/file/uploading', function(req, res){
    

//   生成multiparty对象，并配置上传目标路径
 var form = new multiparty.Form({uploadDir: './views/temp'});
//   上传完成后处理
  form.parse(req, function(err, fields, files) {
    var dirName=fields.dirName;
    var fileName=fields.fileName==''?'index.html':fields.fileName;
    console.log('文件名称'+fileName);
    console.log('文件路径'+dirName);
    console.log('是否为压缩包'+fields.isZip);

    var dstPath = './views/demo/'+dirName;
    if(!fs.existsSync(dstPath)){
        fs.mkdir(dstPath);
    }
    if(fields.isZip=='yes'){
      console.log(`temp:${files.inputFile[0].path},newL${dstPath}`)
      fs.createReadStream('./'+files.inputFile[0].path).pipe(unzip.Extract({ path: dstPath+'/'}));
      fs.unlinkSync('./'+files.inputFile[0].path);
      res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
      res.write('received upload:\n\n');
      res.end(files.inputFile[0].path);
    }else{
      var filesTmp = JSON.stringify(files,null,2);
      
          if(err){
            console.log('parse error: ' + err);
          } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.inputFile[0];
            var uploadedPath = inputFile.path;

      
            dstPath=dstPath+'/'+fileName;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function(err) {
              if(err){
                console.log('rename error: ' + err);
              } else {
                console.log('rename ok');
              }
              res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
              res.write('received upload:\n\n');
              res.end(dstPath);
           });
         }
    }
    
    

   
 });
});
function deleteall(path) {  
  var files = [];  
  if(fs.existsSync(path)) {  
      files = fs.readdirSync(path);  
      files.forEach(function(file, index) {  
          var curPath = path + "/" + file;  
          if(fs.statSync(curPath).isDirectory()) { // recurse  
              deleteall(curPath);  
          } else { // delete file  
              fs.unlinkSync(curPath);  
          }  
      });  
      fs.rmdirSync(path);  
  }  
};  
module.exports = router;