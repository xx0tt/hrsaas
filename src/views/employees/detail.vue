<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="account" label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input v-model="formData.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="formData.password"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="user" label="个人详情"> <userInfo /> </el-tab-pane>
          <el-tab-pane name="job" label="岗位信息"> <jobInfo /></el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import userInfo from './components/user-info.vue'
import jobInfo from './components/job-info.vue'
import { getUserDetailApi, UserDetailById } from '@/api/user'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      activeName: Cookies.get('employeeDetailTab') || 'account',
      formData: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  components: { userInfo, jobInfo },
  methods: {
    // 获取员工资料
    async getUserInfo() {
      this.formData = await getUserDetailApi(this.$route.params.id)
    },
    // 更新员工信息
    async onSave() {
      await UserDetailById(this.formData)
      this.$message.success('更新成功')
    },
    handleClick() {
      Cookies.set('employeeDetailTab', this.activeName)
    }
  }
}
</script>

<style></style>
