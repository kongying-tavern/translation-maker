function transText(str = '') {
    return str.replace(/\\n/g, '\n');
}

function trimStartDot(str = '') {
    return str.replace(/^\./g, '');
}

module.exports = {
    transText,
    trimStartDot
};
