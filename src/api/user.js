import request from '@/utils/request'

// 登录接口
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 获取用户基本资料
export const getUserInfoApi = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

// 获取员工基本信息
export const getUserDetailApi = (id) => {
  return request({
    url: '/sys/user/' + id
  })
}

// 保存员工基本信息
export const UserDetailById = (data) => {
  return request({
    url: '/sys/user/' + data.id,
    method: 'put',
    data
  })
}
