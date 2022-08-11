import request from '@/utils/request'

// 获取员工列表 （简版）
export const getemployApi = () => {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取员工列表 完整
export const getemployInfoApi = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}
