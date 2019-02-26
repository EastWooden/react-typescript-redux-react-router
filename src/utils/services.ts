import axios from 'axios';
import { message } from 'antd';

const BASEURL = 'http://127.0.0.1:8080/admin'
const services = {
  register: '/register', //注册接口
  login:'/login',  //登录接口
  checkusername: '/checkUsername',  //检查用户名
  addArticle: '/addArticle', //添加文章
  getArticleList: '/getArticleList', //获取文章列表
  getArticleDetail: '/getArticleDetail', //获取文章详情内容
  deleteArticle: '/deleteArticle', //删除文章
  updateArticle: '/updateArticle', //更新文章
  getOcr: '/getIdcardInfo'//获取ocr技术
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
export function addArticle(params?:object) {
  instance.defaults.params = params;
  return instance.post(services.addArticle);
}

export function getArticleList(params?:object) {
  instance.defaults.params = params;
  return instance.post(services.getArticleList);
}
export function getArticleDetail(params?:object) {
  instance.defaults.params = params;
  return instance.post(services.getArticleDetail);
}

export function deleteArticle(params?:object) {
  instance.defaults.params = params;
  return instance.post(services.deleteArticle);
}

export function updateArticle(params?:object) {
  instance.defaults.params = params;
  return instance.post(services.updateArticle);
}

export function getOcr(params?:object) {
  instance.defaults.params = params;
  return instance.post(services.getOcr);
}