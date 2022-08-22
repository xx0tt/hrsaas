import request from '@/utils/request'

// 获取权限点
export const getPermissionList = () => {
  return request({
    url: '/sys/permission'
  })
}

// 添加权限点
export const addPermission = (data) => {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}

// 删除权限点
export const removePermission = (id) => {
  return request({
    url: '/sys/permission/' + id,
    method: 'DELETE'
  })
}
