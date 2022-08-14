<template>
  <div class="dashboard-container">
    <div class="app-container">
      <updateExecl :beforeUpload="beforeUpload" :onSuccess="onSuccess" />
    </div>
  </div>
</template>

<script>
import employees from '@/constant/employees'
const { mapKeyPath } = employees
import { importEMployessApi } from '@/api/employees'
import { formatTime } from '@/filters'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    // 上传之前的回调
    beforeUpload({ name }) {
      if (!name.endsWith('.xlsx')) return false
      return true
    },
    // 上传成功的回调
    async onSuccess({ results }) {
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in mapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            // excel 时间戳转换成 js时间
            const ExcTime = item[key]
            const date = new Date((ExcTime - 1) * 24 * 60 * 60 * 1000)
            date.setFullYear(date.getFullYear() - 70)
            obj[mapKeyPath[key]] = formatTime(date)
          } else {
            obj[mapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      await importEMployessApi(newArr)
      this.$message.success('上传成功')
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less"></style>
