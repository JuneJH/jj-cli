const Spinner = require("cli-spinner").Spinner;

function loading(msg,str="/|\\/"){
    const s = new Spinner(msg+' %s');
    s.setSpinnerString(str);
    s.start();
    return ()=>s.stop(true);
}
module.exports = loading;