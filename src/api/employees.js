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

// 删除员工
export const delEmployeeApi = (id) => {
  return request({
    url: '/sys/user/' + id,
    method: 'DELETE'
  })
}

// 新增员工
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

// 批量导入员工
export const importEMployessApi = (data) => {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}
