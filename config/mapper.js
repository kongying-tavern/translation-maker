const SkipRows = 1;

const SubGroupCol = 'C';

const KeyCol = 'B';

const KeyMapper = {
    E: {
        langName: '中文（简体）',
        langCode: 'zh-CN',
        useKey: true
    },
    F: {
        langName: 'English',
        langCode: 'en-US'
    },
    G: {
        langName: '日本語',
        langCode: 'ja-JP'
    },
    H: {
        langName: 'Esperanto',
        langCode: 'eo'
    }
};

module.exports = {
    SkipRows,
    SubGroupCol,
    KeyCol,
    KeyMapper
};
