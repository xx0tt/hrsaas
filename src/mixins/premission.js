import permissionPoint from '@/constant/permission'
export default {
  data() {
    return {
      point: permissionPoint
    }
  },
  methods: {
    isHas(point) {
      return this.$store.state.permission.points.includes(point)
    }
  }
}
