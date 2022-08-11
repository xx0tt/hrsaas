<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <!-- 顶部按钮 -->
          <el-button type="primary" @click="addDialogVisible = true"
            >新增角色</el-button
          >
          <!-- 表单区域 -->
          <el-table border stripe :data="tableData" style="width: 100%">
            <el-table-column
              align="center"
              type="index"
              width="100px"
              label="序号"
            >
            </el-table-column>
            <el-table-column
              align="center"
              width="150px"
              prop="name"
              label="角色"
            >
            </el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="description"
              label="描述"
            >
            </el-table-column>
            <el-table-column align="center" prop="address" label="操作">
              <template>
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 页脚 -->
          <el-pagination
            layout="sizes,prev, pager, next"
            :page-size="pagesize"
            :total="total"
            :page-sizes="[2, 5, 10]"
            @current-change="currentChange"
            @size-change="sizeShange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            :closable="false"
            show-icon
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="formData.name" disabled style="width: 400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="formData.companyAddress"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                v-model="formData.mailbox"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="formData.remarks"
                type="textarea"
                :rows="3"
                disabled
                style="width: 400px"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 新增角色弹出层 -->
    <el-dialog
      @close="Onclose"
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <el-form
        ref="form"
        :model="addForm"
        :rules="addFormRules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addForm.region"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Onclose">取 消</el-button>
        <el-button type="primary" @click="OnAddrule">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRoleApi, getRolesListApi } from '@/api/role'
import { getCompanyInfoApi } from '@/api/company'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pagesize: 5,
      page: 1,
      addDialogVisible: false,
      addForm: {
        name: '',
        region: ''
      },
      addFormRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      formData: {}
    }
  },

  created() {
    this.getRolesList()
    this.getCompanyInfo()
  },

  methods: {
    async getRolesList() {
      const { rows, total } = await getRolesListApi({
        page: this.page,
        pagesize: this.pagesize
      })
      this.tableData = rows
      this.total = total
    },
    // 切换页脚
    currentChange(val) {
      this.page = val
      this.getRolesList()
    },
    // 切换页数
    sizeShange(val) {
      this.pagesize = val
      this.getRolesList()
    },
    // 点击确定添加
    async OnAddrule() {
      await this.$refs.form.validate()
      await addRoleApi(this.addForm)
      this.getRolesList()
      this.$message.success('添加成功')
      this.Onclose()
    },
    // 关闭弹层
    Onclose() {
      this.$refs.form.resetFields()
      this.addForm.region = ''
      this.addDialogVisible = false
    },
    // 获取公司信息
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId
      )

      this.formData = res
    }
  }
}
</script>

<style scoped lang="less"></style>
