import request from '@/utils/request'

// 获取所有角色列表
export const getRolesListApi = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

// 添加角色
export const addRoleApi = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
