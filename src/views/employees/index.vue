<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="getemployList">
          <el-table-column type="index" label="序号" sortable />
          <el-table-column prop="username" label="姓名" sortable />
          <el-table-column prop="workNumber" label="工号" sortable />
          <el-table-column prop="formOfEmployment" label="聘用形式" sortable />
          <el-table-column prop="departmentName" label="部门" sortable />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable />
          <el-table-column prop="enableState" label="账户状态" sortable />
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :page-size="pages.size"
            :total="total"
            layout="prev, pager, next"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getemployInfoApi } from '@/api/employees'
export default {
  data() {
    return {
      getemployList: [],
      total: 0,
      pages: {
        page: 1,
        size: 10
      }
    }
  },

  created() {
    this.getemploy()
  },

  methods: {
    async getemploy() {
      const { rows, total } = await getemployInfoApi(this.pages)
      this.getemployList = rows
      this.total = total
    },
    currentChange(val) {
      this.pages.page = val
      this.getemploy()
    }
  }
}
</script>

<style scoped lang="less"></style>
