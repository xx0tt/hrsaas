<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部 -->
      <pageTools :isShowLeft="false">
        <template #right>
          <el-button type="primary" size="small" @click="addPernission('0', 1)">
            添加权限
          </el-button>
        </template>
      </pageTools>
      <!-- 表单区域 -->
      <el-card shadow="never" style="margin-top: 20px">
        <el-table
          row-key="id"
          :data="permissions"
          style="width: 100%"
          ref="table"
        >
          <el-table-column label="名称">
            <template v-slot="{ row }">
              <i
                @click="expend(row)"
                v-if="row.children"
                class="el-icon-folder-opened"
              ></i>
              <span @click="expend(row)"> {{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="标识" align="center" />
          <el-table-column prop="description" label="描述" align="center" />
          <el-table-column label="操作" align="center">
            <template v-slot="{ row }">
              <el-button type="text" @click="addPernission(row.id, 2)">
                添加
              </el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text" @click="removePer(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 新增权限弹出层 -->
    <!-- 放置一个弹层 用来编辑新增节点 -->
    <el-dialog
      title="新增权限点"
      :visible.sync="AddDialog"
      @close="btnCancel"
      destroy-on-close
    >
      <!-- 表单 -->
      <el-form
        ref="perForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width: 90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  addPermission,
  getPermissionList,
  removePermission
} from '@/api/permission'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      permissions: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      AddDialog: false
    }
  },

  created() {
    this.getPermissions()
  },

  methods: {
    // 获取列表
    async getPermissions() {
      const res = await getPermissionList()
      this.permissions = transListToTree(res, '0')
    },
    // 点击确定
    async btnOK() {
      await this.$refs.perForm.validate()
      await addPermission(this.formData)
      this.$message.success('添加成功')
      this.getPermissions()
      this.btnCancel()
    },
    // 删除权限点
    async removePer(id) {
      await removePermission(id)
      this.$message.success('删除权限点成功')
      this.getPermissions()
    },
    // 关闭弹窗
    btnCancel() {
      this.AddDialog = false
    },
    // 点击添加权限
    addPernission(id, type) {
      this.AddDialog = true
      this.formData.pid = id
      this.formData.type = type
    },
    // 点击展开数据
    expend(row) {
      row.isShow = !row.isShow
      this.$refs.table.toggleRowExpansion(row, row.isShow)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
