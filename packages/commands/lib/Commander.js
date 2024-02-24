class Commander{
    constructor(args){
        if(!args){
            throw new Error("必须传递参数")
        }
        if(!Array.isArray(args)){
            throw new Error("参数必须为数组")
        }
        if(args.length < 1){
            throw new Error("参数列表为空")
        }
        this._args = args;
        let runner = new Promise((resolve,reject)=>{
            const chain = Promise.resolve();
            chain.then(()=>this.initArgs());
            chain.then(()=>this.init());
            chain.then(()=>this.exec());
            chain.then(resolve)
            chain.catch((e)=>{
                console.log(e.message);
                reject(e);
            })
        })
        this.runner = runner;
        
    }
    initArgs(){
        this._cmd = this._args[this._args.length - 1];
        this._args = this._args.slice(0,-1);
    }

    init(){
        throw new Error("必须实现init方法");
    }

    exec(){
        throw new Error("必须实现exec方法");
    }
}

module.exports = Commander;