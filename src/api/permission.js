import request from '@/utils/request'

// 获取权限
export function getPermissionList() {
  return request({
    url: '/sys/permission',
  })
}

/**
 * @params {Object} data 
enVisible	string	非必须			
name	string	非必须			
code	string	非必须			
description	string	非必须			
type	number	非必须			
pid
 * @returns promise
 */
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data,
  })
}
