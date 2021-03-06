var app = getApp();
var host = 'https://xcx.wmdhr.cn';

function request({
  url,
  data = {},
  method = 'POST'
}) {
  return new Promise(function(resolve, reject) {
    _request(url, resolve, reject, data, method)
  })
}

function _request(url, resolve, reject, data = {}, method = 'POST') {
  wx.request({
    url: host + url,
    // url: url,
    header: {
      // "content-type": "application/json"
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data,
    method: method,
    success: res => {
      resolve(res)
    },
    fail: () => {
      reject('接口请求失败')
    },
    complete: () => {
      wx.hideLoading();
    }
  })
}

module.exports = {
  request
}