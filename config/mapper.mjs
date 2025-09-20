const Tabs = ['TR_Main', 'TR_Map', 'TR_Item', 'TR_Res']

const SkipRows = 1

const SubGroupCol = 'C'

const KeyCol = 'B'

const KeyMapper = {
  F: {
    langName: '简体中文',
    langCode: 'zh-Hans'
  },
  G: {
    langName: '繁體中文',
    langCode: 'zh-Hant'
  },
  H: {
    langName: 'English',
    langCode: 'en-US'
  },
  I: {
    langName: '日本語',
    langCode: 'ja-JP'
  },
  J: {
    langName: '한국어',
    langCode: 'ko-KR'
  },
  K: {
    langName: 'Français',
    langCode: 'fr-FR'
  },
  L: {
    langName: 'Deutsch',
    langCode: 'de-DE'
  },
  M: {
    langName: 'Русский',
    langCode: 'ru-RU'
  },
  N: {
    langName: 'Esperanto',
    langCode: 'eo'
  }
}

export default {
  Tabs,
  SkipRows,
  SubGroupCol,
  KeyCol,
  KeyMapper
}
