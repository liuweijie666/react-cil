import axios from 'axios';
import {notification,} from 'antd';
import myBrowser from "../utils/judge"
// axios.defaults.timeout = 5000; //设置超时
axios.defaults.withCredentials = true;//携带Cookie
axios.defaults.transformRequest = [function (data) {
    let ret = '';
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }];
axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
axios.interceptors.request.use(function (config) {
    const _auth = localStorage.getItem('_auth')
    const token = _auth && JSON.parse(_auth).token
    if(!token){
        return config
    }
    const Authorization =`Bearer ${token}`
    config.headers['Authorization'] = Authorization
    return config
})
//这里拦截响应数据，对状态不为200的响应做了不同的处理

axios.interceptors.response.use(response=>response, (err)=>{
    if (err && err.response) {
        switch (err.response.status) {
            case 400: 
            notification.error({
                message: '请求错误',
                description: '请求错误(400)'
            })
            break;
            case 401:
            notification.error({
                message: '权限问题',
                description: '未授权，请重新登录(401)'
            }) 
            localStorage.removeItem('_auth')
            window.location.href = 'https://itsupport.lenovo.com:8443/Front/Home/WinLogin?returnUrl=/helpserver'
            break;
            case 403:  
            notification.error({
                message: '拒绝访问',
                description: '拒绝访问(403)'
            })  
            localStorage.removeItem('_auth')
            window.location.href = 'https://itsupport.lenovo.com:8443/Front/Home/WinLogin?returnUrl=/helpserver'
            break;
            case 404:  
            notification.error({
                message: '请求出错',
                description: '请求出错(404)'
            })  
            break;
            case 500:  
            notification.error({
                message: '错误信息',
                description: '服务器错误(500)'
            }) 
            break;
            default:  
            notification.error({
                message: '错误信息',
                description: `连接出错(${err.response.status})!`
            })  
        }
    }else{
        if(!myBrowser()==undefined){
            notification.error({
                message: '错误信息',
                description: err.message ? err.message :'连接服务器失败!'
            })   
        }
    }
    //这里必须return,不然错误进入这里后，下次进入axios后就then里就返回的内容了
    return Promise.reject(err)
})    

export default axios;
