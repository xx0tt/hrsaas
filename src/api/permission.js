import request from '@/utils/request'

// 获取权限点
export const getPermissionList = () => {
  return request({
    url: '/sys/permission'
  })
}
