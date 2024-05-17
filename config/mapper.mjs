const Tabs = ['TR_Main', 'TR_Map', 'TR_Item', 'TR_Res']

const SkipRows = 1

const SubGroupCol = 'C'

const KeyCol = 'B'

const KeyMapper = {
  E: {
    langName: '简体中文',
    langCode: 'zh-Hans'
  },
  F: {
    langName: '繁體中文',
    langCode: 'zh-Hant'
  },
  G: {
    langName: 'English',
    langCode: 'en-US'
  },
  H: {
    langName: '日本語',
    langCode: 'ja-JP'
  },
  I: {
    langName: '한국어',
    langCode: 'ko-KR'
  },
  J: {
    langName: 'Français',
    langCode: 'fr-FR'
  },
  K: {
    langName: 'Deutsch',
    langCode: 'de-DE'
  },
  L: {
    langName: 'Русский',
    langCode: 'ru-RU'
  },
  M: {
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
