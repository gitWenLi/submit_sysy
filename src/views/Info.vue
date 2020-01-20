<template>
  <div class="info">
    <my-echarts
     :titleText="titleText"
     :opinion="opinion"
     :opinionData="opinionData"
     ></my-echarts>
  </div>
</template>

<script>
import myEcharts from './echarts/echarts'

export default {
  components: {
    myEcharts
  },
  data () {
    return {
      titleText: '年龄分布统计',
      titleText2: '学历分布统计',
      // 扇形区域名称 lengend
      opinion: ['18-25岁', '26-40岁', '41-50岁'],
      opinion2: ['硕士', '本科', '专科', '其他'],
      // series
      opinionData: [
        { value: 600, name: '18-25岁' },
        { value: 300, name: '26-40岁' },
        { value: 200, name: '41-50岁' }
      ],
      opinionData2: [
        { value: 70, name: '硕士' },
        { value: 300, name: '本科' },
        { value: 470, name: '专科' },
        { value: 140, name: '其他' }
      ]
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
