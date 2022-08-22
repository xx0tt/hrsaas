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

// 删除角色
export const removeRoleApi = (id) => {
  return request({
    url: '/sys/role/' + id,
    method: 'DELETE'
  })
}

// 获取角色详情
export const getRolesInfo = (id) => {
  return request({
    url: '/sys/role/' + id
  })
}

// 给角色分配权限
export const assignPrem = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}
