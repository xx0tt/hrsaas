import request from '@/utils/request'
/**
 * 获取公司信息
 * **/
export function getCompanyInfoApi(companyId) {
  return request({
    url: `/company/${companyId}`,
  })
}
