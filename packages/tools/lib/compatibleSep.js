const path = require("path");

function compatibleSep(p) {
    if (p && typeof p == "string") {
        const sep = path.sep;
        if (sep == "/") {
            return p;
        } else {
            return p.replace(/\\/g, '/');
        }
    }
    return p;
}

module.exports = compatibleSep;