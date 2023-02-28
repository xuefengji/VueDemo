<template>
  <el-row class="home" :gutter=20>
    <el-col :span=8 style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImage" />
          <div class="&info">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-1-12</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span='16' style="padding-top: 20px">
      <div class="num">
        <el-card v-for="(item, index) in countData" :key="index" :body-style="{display: 'flex', padding: 0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
<!--        <div style="height: 280px" ref="echarts"></div>-->
        <echart style="height: 280px" :chartData="echartData.order"></echart>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
<!--          <div style="height: 260px" ref="userEcharts"></div>-->
          <echart style="height: 240px" :chartData="echartData.user"></echart>
        </el-card>
        <el-card style="height: 260px">
<!--          <div style="height: 240px" ref="videoEcharts"></div>-->
          <echart style="height: 240px" :chartData="echartData.video" :isAxisChart="false"></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {getData} from "../../api/data"
// import * as echarts from 'echarts'
import Echart from "@/components/ECharts"

export default {
  name: 'HomePage',
  components: {
    Echart
  },
  data () {
    return {
      userImage: require('@/assets/logo.png'),
      tableData: [],
      tableLabel: {
        name: '手机型号',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  mounted() {
    getData().then(res => {
      const { code, data } = res.data
      if(code === 20000){
        this.tableData = data.tableData
        let orderData = data.orderData
        let nameArray = Object.keys(orderData.data[0])
        let series = []
        nameArray.forEach(key => {
          series.push({
            name: key,
            data: orderData.data.map(item => item[key]),
            type: 'line'
          })
        })
        // console.log(nameArray)
        // const option = {
        //   xAxis: {
        //     data: orderData.date
        //   },
        //   yAxis: {},
        //   legend: {
        //     data: nameArray
        //   },
        //   series
        // }
        this.echartData.order.xData = orderData.date
        this.echartData.order.series = series
        // const E = echarts.init(this.$refs.echarts)
        // E.setOption(option)
        //柱状图
        // let userOption = {
        //   legend: {
        //     //图例文字颜色
        //     textStyle: {
        //       color: "#333"
        //     }
        //   },
        //   grid: {
        //     left: "20%"
        //   },
        //   tooltip: {
        //     trigger: "axis"
        //   },
        //   xAxis: {
        //     type: "category",
        //     data: data.userData.map(item => item.date),
        //     axisLine: {
        //       lineStyle: {
        //         color: "#17b3a3"
        //       }
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: "#333"
        //     }
        //   },
        //   yAxis: [
        //     {
        //       type: "value",
        //       axisLine: {
        //         lineStyle: {
        //           color: "#17b3a3"
        //         }
        //       }
        //     }
        //   ],
        //   color: ["#2ec7c9", "#b6a2de"],
        //   series: [
        //     {
        //       name: '新增用户',
        //       type: 'bar',
        //       data: data.userData.map(item => item.new)
        //     },
        //     {
        //       name: '活跃用户',
        //       type: 'bar',
        //       data: data.userData.map(item => item.active)
        //     },
        //   ]
        // }
        this.echartData.user.xData = data.userData.map(item => item.date)
        this.echartData.user.series = [
          {
            name: '新增用户',
            type: 'bar',
            data: data.userData.map(item => item.new)
          },
          {
            name: '活跃用户',
            type: 'bar',
            data: data.userData.map(item => item.active)
          },
        ]
        // const U = echarts.init(this.$refs.userEcharts)
        // U.setOption(userOption)
        // const videoOption = {
        //   tooltip: {
        //     trigger: "item"
        //   },
        //   color: [
        //       "#0f78f4",
        //       "#dd536b",
        //       "#9462e5",
        //       "#a6a6a6",
        //       "#elbb22",
        //       "#39c362",
        //       "#3ed1cf"
        //   ],
        //   series: [
        //     {
        //       data: data.videoData,
        //       type: "pie"
        //     }
        //   ]
        // }
        this.echartData.video.series = [
          {
            data: data.videoData,
            type: "pie"
          }
        ]
        // const V = echarts.init(this.$refs.videoEcharts)
        // V.setOption(videoOption)

      }
      console.log(res)
    }
    )
  }
}
</script>