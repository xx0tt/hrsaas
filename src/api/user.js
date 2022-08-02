import request from '@/utils/request'

/**
 *
 * @param {Object} data mobile password
 * @returns Promise
 */
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
