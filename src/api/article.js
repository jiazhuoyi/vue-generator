import request from '@/utils/request';

export function getArticleList() {
  return request({
    url: '/articles',
    method: 'get'
  });
}

export function sumbitArticle(data) {
  return request({
    url: '/article',
    method: 'post',
    data
  });
}

export function getArticleDetail(id) {
  return request({
    url: '/article',
    method: 'get',
    params: {
      id
    }
  });
}

export function deleteArticle(id) {
  return request({
    url: '/article',
    method: 'delete',
    params: {
      id
    }
  });
}
