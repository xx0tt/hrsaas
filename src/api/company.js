import request from '@/utils/request'

// 获取公司信息
export const getCompanyInfoApi = (id) => {
  return request({
    url: '/company/' + id
  })
}
