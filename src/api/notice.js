import request from '@/utils/request';

export function getNotices(obj) {
  return request({
    url: '/notice',
    method: 'get',
    params: {
      status: obj.status,
      pageNumber: obj.pageNumber,
      limit: obj.limit
    }
  });
}

export function updateNotices(data) {
  return request({
    url: '/notice',
    method: 'put',
    data
  });
}

export function deleteNotices(data) {
  return request({
    url: '/notice',
    method: 'delete',
    data
  });
}

export function getNoticeCount() {
  return request({
    url: '/notice/count',
    method: 'get'
  });
}
