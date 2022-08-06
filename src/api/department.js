import request from '@/utils/request'

// 获取组织架构
export const getDeptsApi = () => {
  return request({
    url: '/company/department'
  })
}

// 删除部门
export const delDeptsApi = (id) => {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}

// 新增部门
export const addDeptsApi = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

// 获取部门详情
export const getDeptbyIdApi = (id) => {
  return request({
    url: '/company/department/' + id
  })
}

// 根据ID修改部门详情
export const setDeptbyApi = (data) => {
  return request({
    url: '/company/department/' + data.id,
    method: 'PUT',
    data
  })
}
