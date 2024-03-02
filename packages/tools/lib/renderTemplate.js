const ejs = require("ejs");
const glob = require("glob");
const path = require("path");
const fse = require("fs-extra");
function renderTemplate(options){
    const {dir,ignore="",data} = options;
    return new Promise((resolve,reject)=>{
        function cb(err,files){
            if(err){
                reject(err);
            };
            Promise.all(files.map(file=>{
                const filePath = path.join(dir,file);
                return new Promise((reso,reje)=>{
                    ejs.renderFile(filePath,data,{},(err,res)=>{
                        if(err){
                            reje(err);
                        }else{
                            fse.writeFileSync(filePath,res);
                            reso(res);
                        }
                    })
                })
            })).then(()=>{
                resolve()
            }).catch(err=>{
                reject(err);
            })

        }
        glob("**",{
            cwd:dir,
            ignore,
            nodir:true,
        },cb);
    })
}

module.exports = renderTemplate;