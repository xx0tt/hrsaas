<template>
  <div>
    <el-row type="flex" justify="end">
      <!-- 年份 -->
      <el-col :span="6" style="margin-right: 10px">
        <el-select @change="dateChange" v-model="currentYear">
          <el-option
            v-for="item in Years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <!-- 月份 -->
      <el-col :span="6">
        <el-select @change="dateChange" v-model="currenMonth">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 日历 -->
    <el-calendar v-model="currentDate">
      <template #dateCell="{ date }">
        <div class="cellday">
          {{ date.getDate() }}
          <span v-if="isWeek(date)" class="cellWeek">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentDate: null,
      currentYear: null,
      currenMonth: null,
      Years: []
    }
  },
  created() {
    this.initCaldndar()
  },
  methods: {
    initCaldndar() {
      const date = new Date()
      this.currentDate = date
      this.currentYear = date.getFullYear()
      this.currenMonth = date.getMonth() + 1
      this.Years = Array(11)
        .fill(this.currentYear - 5)
        .map((y, i) => y + i)
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    dateChange() {
      this.currentDate = this.currentYear + '-' + this.currenMonth
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-calendar__header {
  display: none;
}
::v-deep .el-calendar-table .el-calendar-day {
  height: 70px;
}
::v-deep .el-calendar-table__row .current,
::v-deep .el-calendar-table tr td:first-child,
::v-deep .el-calendar-table tr:first-child td,
::v-deep .el-calendar-table td,
::v-deep .el-calendar-table__row .next {
  border: none !important;
}
.cellday {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  .cellWeek {
    margin-left: 5px;
    color: #fff;
    width: 25px;
    height: 25px;
    display: inline-block;
    background-color: #fa7c4d;
    text-align: center;
    line-height: 25px;
    border-radius: 30px;
  }
}
</style>
