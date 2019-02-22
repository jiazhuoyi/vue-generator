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

export function updatePassword(data) {
  return request({
    url: '/password',
    method: 'put',
    data
  });
}
