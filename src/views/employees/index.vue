<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="addEmploy"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="getemployList">
          <el-table-column type="index" label="序号" sortable />
          <el-table-column prop="username" label="姓名" sortable />
          <el-table-column label="头像" sortable>
            <template v-slot="{ row }">
              <img
                v-imgError="
                  'https://pyy-1313117903.cos.ap-guangzhou.myqcloud.com/pig1.png'
                "
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
              />
            </template>
          </el-table-column>
          <el-table-column prop="workNumber" label="工号" sortable />
          <el-table-column
            prop="formOfEmployment"
            :formatter="formatterOfEmployment"
            label="聘用形式"
            sortable
          />
          <el-table-column prop="departmentName" label="部门" sortable />
          <el-table-column label="入职时间" sortable>
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column prop="enableState" label="账户状态" sortable>
            <template v-slot="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template v-slot="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="Onremove(row.id)"
                >删除</el-button
              >
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

    <!-- 新增员工弹出层 -->
    <addEmployees
      @addSuccess="getemploy"
      :addEmployeesIsShow.sync="addEmployeesIsShow"
    />
  </div>
</template>

<script>
import { getemployInfoApi, delEmployeeApi } from '@/api/employees'
import employees from '@/constant/employees'
import addEmployees from './components/add-employees.vue'
export default {
  data() {
    return {
      getemployList: [],
      total: 0,
      pages: {
        page: 1,
        size: 10
      },
      addEmployeesIsShow: false
    }
  },

  components: { addEmployees },

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
    },
    formatterOfEmployment(a, b, value) {
      const findItem = employees.hireType.find((item) => item.id === value)
      return findItem ? findItem.value : '未知'
    },
    async Onremove(id) {
      try {
        await this.$confirm('确定删除该员工吗？')
        await delEmployeeApi(id)
        this.$message.success('删除成功')
        this.getemploy()
      } catch (error) {}
    },
    // 点击新增员工
    addEmploy() {
      this.addEmployeesIsShow = true
    }
  }
}
</script>

<style scoped lang="less"></style>
