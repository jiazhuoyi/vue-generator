import request from '@/utils/request';

export function updateUserInfo(data) {
  return request({
    url: '/user-info',
    method: 'put',
    data
  });
}

export function getUserInfo() {
  return request({
    url: '/user-info',
    method: 'get'
  });
}

export function getLoginlogs() {
  return request({
    url: '/login-logs',
    method: 'get'
  });
}

export function updatePassword(data) {
  return request({
    url: '/password',
    method: 'put',
    data
  });
}

export function getQiniuToken() {
  return request({
    url: '/qiniu-token',
    method: 'get'
  });
}

export function signup(data) {
  return request({
    url: '/signup',
    method: 'post',
    data
  });
}
