import dayjs from 'dayjs'
// 在该文件中定义的函数可以变为过滤器
export const formatTime = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}
