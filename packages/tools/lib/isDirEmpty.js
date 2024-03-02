const fs = require("fs");
function isDirEmpty(dir, filterList = []) {
    let fileList = fs.readdirSync(dir);
    console.log(fileList)
    if (filterList && fileList.length > 0) {
        fileList = fileList.filter(key => !filterList.includes(key) && !key.startsWith("."))
    }
    return !fileList || fileList.length == 0
}

module.exports = isDirEmpty;