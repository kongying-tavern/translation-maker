const SkipRows = 1;

const KeyCol = 'B';

const KeyMapper = {
    D: {
        langName: '中文（简体）',
        langCode: 'zh-CN',
        useKey: true
    },
    E: {
        langName: 'English',
        langCode: 'en-US'
    },
    F: {
        langName: '日本語',
        langCode: 'ja-JP'
    },
    G: {
        langName: 'Esperanto',
        langCode: 'eo'
    }
};

module.exports = {
    SkipRows,
    KeyCol,
    KeyMapper
};
