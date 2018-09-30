import axios from 'axios';
import { message } from 'antd';

const BASEURL = 'http://127.0.0.1:9090/admin'
const services = {
  register: '/register',
  login:'/login',
  checkusername: '/checkUsername'
}
axios.defaults.headers.post['Accept'] = 'application/x-www-form-urlencoded,text/plain, */*';
const instance = axios.create();
instance.defaults.timeout = 300000;
instance.defaults.baseURL = BASEURL;
// instance.defaults.headers = {

// }
// 添加一个请求拦截器
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

instance.interceptors.response.use(res => {
  //Do something with response data
  let ress: any = res;
  if(res.status !== 200) {
    message.error('服务器出错')
  } else {
    return ress;
  }
}, (err: any) => {
  return Promise.reject(err);
})

export function register(params: object) {
  instance.defaults.params = params;
  return instance.post(services.register);
}

export function login(params?:object) {
  instance.defaults.params = params;
  return instance.post(services.login)
}

export function checkusername(params:object) {
  instance.defaults.params = params;
  return instance.post(services.checkusername);
}
