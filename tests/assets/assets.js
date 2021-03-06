const fs = require('fs')
const path = require('path')

const appDir = (path.resolve(__dirname) + '/').replace('tests/assets/', '')
const mainFile = require(appDir + 'index.js')

const hashPage = fs.readFileSync(appDir + 'sample-pages/Hashrate Report.html')
const connectionPage = fs.readFileSync(appDir + 'sample-pages/Connection Report.html')
const resultPage = fs.readFileSync(appDir + 'sample-pages/Result Report.html')

const parsedPageObject = {
  cores: [
    { '2.5s': '39.4', '60s': '40.0', '15m': '40.1' },
    { '2.5s': '41.5', '60s': '41.8', '15m': '41.7' },
    { '2.5s': '39.8', '60s': '40.0', '15m': '40.0' },
    { '2.5s': '40.6', '60s': '40.4', '15m': '40.3' },
    { '2.5s': '40.8', '60s': '40.7', '15m': '40.7' },
    { '2.5s': '40.6', '60s': '40.5', '15m': '40.5' },
    { '2.5s': '39.8', '60s': '39.8', '15m': '39.8' }
  ],
  title: 'Hashrate Report',
  total: {
    '2.5s': '282.4',
    '60s': '283.1',
    '15m': '283.1'
  },
  highest: ' 284.6'
}

const poolConnectionData = {
  poolAddress: 'teracycle.net:3333',
  connectedSince: new Date('2017-07-04 15:17:24'),
  poolPing: '200',
  errorList: [
    {
      timeStamp: new Date('2017-07-04 00:59:15'),
      type: 'CALL error',
      details: ' Timeout while waiting for a reply'
    },
    {
      timeStamp: new Date('2017-07-04 01:01:32'),
      type: 'CONNECT error',
      details: ' Connection timed out'
    },
    {
      timeStamp: new Date('2017-07-04 18:17:14'),
      type: 'RECEIVE error',
      details: ' socket closed'
    }
  ]
}

const poolResultData = {
  topResults: [
    2734373,
    2405439,
    2053667,
    1754534,
    1259584,
    981937,
    848184,
    785344,
    701907,
    695705
  ],
  difficulty: 24154,
  info: {
    accepted: 1078,
    total: 1080,
    ratio: 0.9981,
    avgTime: 143.2
  },
  poolSideHash: 3728516,
  errorList: [
    {
      type: '[NETWORK ERROR]',
      count: '1',
      timeStamp: new Date('2017-07-04 00:59:15')
    },
    { type: 'Unauthenticated',
      count: '1',
      timeStamp: new Date('2017-07-04 18:17:14')
    }
  ]
}

const parsedNodesTotal = [
  {
    total: { '2.5s': '139.2', '60s': '161.6', '15m': undefined }
  },
  {
    total: { '2.5s': '139.2', '60s': '161.6', '15m': undefined }
  },
  {
    total: { '2.5s': '139.2', '60s': '161.6', '15m': undefined }
  }
]

const totalHashSum = {
  total: {
    '2.5s': '417.60',
    '60s': '484.80',
    '15m': '0.00'
  }
}

module.exports = {
  parsedPageObject: parsedPageObject,
  totalHashSum: totalHashSum,
  poolConnectionData: poolConnectionData,
  poolResultData: poolResultData,
  parsedNodesTotal: parsedNodesTotal,
  html: {
    hashPage: hashPage,
    connectionPage: connectionPage,
    resultPage: resultPage
  }
}
