const request = require("./request");
function getProjectTempalteInfo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: "10200",
                message: "请求成功",
                data: {
                    data: [
                        {
                            id: "1",
                            pkgName: "jj-cli-template",
                            name: "admin",
                            label: "基于umijs后台管理模版",
                            version: "1.0.0",
                            descrption: "基于umijs4.0的后台管理模版",
                            tag: "project",
                            install_cmd:"npm i --registry=https://registry.npmmirror.com",
                            start_cmd:"npm run start"
                        }, {
                            id: "2",
                            pkgName: "jj-cli-template",
                            name: "dashboard",
                            label: "基于umijs数据可视化模版",
                            version: "1.0.0",
                            descrption: "基于umijs4.0的数据可视化管理",
                            tag: "project",
                            install_cmd:"npm install",
                            start_cmd:"npm run start"
                        }
                    ],
                    total: 2,
                }
            })
        })
    })
    return require.get()
}


module.exports = getProjectTempalteInfo;