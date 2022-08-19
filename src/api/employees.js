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

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

// 给员工分配角色
export const assginRolesApi = (data) => {
  return request({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data
  })
}
