import request from '@/utils/request'

// axios请求，request封装好了
export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
