const fs = require("fs");
function isDirEmpty(dir, filterList = []) {
    console.log(dir)
    let fileList = fs.readdirSync(dir);
    console.log(fileList)
    if (filterList && fileList.length > 0) {
        fileList = fileList.filter(key => !filterList.includes(key) && !key.startsWith("."))
    }
    console.log("sss",fileList)
    return !fileList || fileList.length == 0
}

module.exports = isDirEmpty;