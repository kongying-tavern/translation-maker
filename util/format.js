function transText(str = '') {
    return str.replace(/\\n/g, '\n');
}

module.exports = {
    transText
};
