// 상수, 코드 모음.
'use strict'
const methods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
}

const codes = {
  prevPathName: 'prevPathName',
  activation: {
    ENABLED: 'Enabled',
    DISABLED: 'Disabled'
  },
  configKeys: {
    whiteListEnable: 'whiteListEnable',
    lbsEnabled: 'lbsEnabled',
    batteryMode: 'batteryMode',
    location: 'location',
    updatePageUnlock: 'updatePageUnlock'
  },
  msg: {
    areaSelection: {
      addCountry: 'Add Country.',
      addRegion: 'Add Region.',
      addCity: 'Add City.'
    }
  },
  productionTypes: {
    CLOUD: 'cloud',
    LOCAL: 'local-server',
    SERVER: 'server'
  },
  requests: {
    getAreas: {
      method: methods.GET,
      url: '/api/common/area'
    },
    getTagList: {
      method: methods.GET,
      url: '/api/common/stickerLabels'
    },
    getTagHistory: {
      method: methods.GET,
      url: '/api/common/stickerLabels/history'
    },
    getOverviewData: {
      method: methods.GET,
      url: '/api/common/stickerLabels/summary'
    },
    getPacketCount: {
      method: methods.GET,
      url: '/api/common/stickerLabels/packetSummary'
    },
    deleteTagInfo: {
      method: methods.DELETE,
      url: '/api/common/stickerLabels'
    },
    appTag: {
      method: methods.POST,
      url: '/api/common/stickerLabels'
    },
    applicationList: {
      method: methods.GET,
      url: '/api/common/stickerLabels/applications'
    },
    getApplicationChartata: {
      method: methods.GET,
      url: '/api/common/stickerLabels/applications/report'
    },
    getAssociatedTagList: {
      method: methods.GET,
      url: '/api/common/stickerLabels/applications/report/labels'
    }

  },
  errors: {
    templateNotFound: {
      code: '404',
      status: 404,
      msg: 'It can\'t find template with the value'
    },
    labelNotWhitelisted: {
      code: null,
      status: null,
      msg: 'label is not in the whiteList'
    },
    scheduleNotFound: {
      msg: 'Schedule information not found.'
    },
    passwordExpired: {
      msg: 'Your password was expired.'
    }
  },
  lbsSetting: {
    LBS_ENABLED_DEFAULT_SETTING: {
      enable: true,
      startTime: 1200,
      endTime: 16,
      gatheringEndTime: 1800,
      txPower: 2,
      txInterval: 30,
      threshold: 75
    },
    LBS_DISABLED_DEFAULT_SETTING: {
      enable: false
    }
  },
  LOCALHOST: 'localhost',
  ROW_CLASS: 'row-class',
  statusCode: {
    CONNCTED: Symbol.for('CONNCTED'),
    DISCONNCTED: Symbol.for('DISCONNCTED')
  },
  networkStatusColor: new Map([
    ['CONNECTED', 'bg-stable'],
    ['NOT_READY', 'bg-caution'],
    ['DISCONNECTED', 'bg-danger']
  ]),
  lbsSearchType: {
    getByStore: 'getByStore',
    getByLabelId: 'getByLabel',
    getByPosition: 'getByPosition',
    getByArticleId: 'getByArticleId',
    getByArticleName: 'getByArticleName'
  },
  whitelistFetchType: {
    none: 'NONE',
    add: 'ADD',
    delete: 'DELETE'
  },
  assignType: {
    assign: 'Assign',
    unassign: 'Unassign'
  },
  ACTIVE_PAGE: 'activePage',
  labelStatus: {
    PROCESSING: 'PROCESSING',
    SUCCESS: 'SUCCESS',
    TIMEOUT: 'TIMEOUT',
    UNASSIGNED: 'UNASSIGNED',
    UNASSIGNING: 'UNASSIGNING'
  },
  EXPORT_SIZE: 1000000000,
  TEMP: 'TEMP'
}

export default codes
