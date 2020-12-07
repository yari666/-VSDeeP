// 定义访问的根目录
let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://aist.feieee.com:8080'
    // baseUrl = 'http://192.168.3.2:44391/api/app/'
} else {
    // baseUrl = 'http://192.168.3.2:44391/api/app/'
    baseUrl = 'http://aist.feieee.com:8080'
}

export { baseUrl }