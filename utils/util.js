const BaseUrl = 'http://172.16.3.35:3000'

// 统一请求方法
const httpRequest = (opt, data = {}, header = {}) => {
    let promise = new Promise(function (resolve, reject) {
        wx: wx.request({
            url: BaseUrl + opt.url,
            data: data,
            header: header,
            method: opt.method,
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                resolve(res)
            },
            fail: function (err) {
                reject(err)
            }
        })
    })
    return promise;
}

export {
    httpRequest
}