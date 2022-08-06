import request from '@/utils/request'

// 获取员工列表 （简版）
export const getemployApi = () => {
  return request({
    url: '/sys/user/simple'
  })
}
