import request from '@/utils/request';

export function getNotices() {
  return request({
    url: '/notice',
    method: 'get'
  });
}

export function updateNotices(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  });
}
