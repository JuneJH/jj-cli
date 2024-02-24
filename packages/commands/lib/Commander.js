class Commander{
    constructor(){
        console.log("初始化Commader");
        
    }


    init(){
        throw new Error("必须实现init方法");
    }

    exec(){
        throw new Error("必须实现exec方法");
    }
}