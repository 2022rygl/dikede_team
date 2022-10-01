<template>
  <div class="home-container">
    <div class="content">
      <!-- 顶部行 -->
      <el-row class="outer-row">
        <!-- 左上一列 -->
        <el-col class="outer-left" :span="18">
          <!-- <div class="grid-content"> -->
          <el-row>
            <el-col :span="13">
              <div class="box home-sku-sale-stats bgc1">
                <div class="header">
                  <div class="title">
                    工单统计
                    <span class="sub-title">2022.09.01 ~ 2022.09.27</span>
                  </div>
                </div>
                <div class="body">
                  <div class="stats">
                    <div class="item">
                      <div class="num color1 text-shadow1">
                        {{ userTask.total }}
                      </div>
                      <div class="text color2">工单总数（个）</div>
                    </div>
                  </div>
                  <div class="stats">
                    <div class="item">
                      <div class="num color1 text-shadow1">
                        {{ userTask.progressTotal }}
                      </div>
                      <div class="text color2">完成工单（个）</div>
                    </div>
                  </div>
                  <div class="stats">
                    <div class="item">
                      <div class="num color1 text-shadow1">
                        {{ userTask.workCount }}
                      </div>
                      <div class="text color2">进行工单（个）</div>
                    </div>
                  </div>
                  <div class="stats">
                    <div class="item">
                      <div class="num color1 text-shadow1">
                        {{ userTask.cancelCount }}
                      </div>
                      <div class="text color2">取消工单（个）</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="11">
              <div class="box home-sku-sale-stats bgc2">
                <div class="header">
                  <div class="title">
                    销售统计
                    <span class="sub-title">2022.09.01 ~ 2022.09.27</span>
                  </div>
                </div>
                <div class="body">
                  <div class="stats">
                    <div class="item">
                      <div class="num color3 text-shadow2">
                        {{ orderCount }}
                      </div>
                      <div class="text color4">订单量（个）</div>
                    </div>
                  </div>
                  <div class="stats">
                    <div class="item">
                      <div class="num color3 text-shadow2">
                        {{ orderAmount }}
                      </div>
                      <div class="text color4">销售额（万元）</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 左下部分 -->
          <div class="box sku-sale-collect">
            <div class="header">
              <div class="title">
                销售数据
                <span class="sub-title">2022.09.26 ~ 2022.09.28</span>
              </div>
              <div class="week-month-year">
                <div
                  v-for="(way,index) in theWays"
                  :key="index"
                  :class="['item',{'is-checked':index===(!checkedIndex ? 0:checkedIndex)}]"
                  @click="changeSaleStat(index)"
                >{{ way }}</div>
                <!-- <div class="item is-checked">周</div>
                  <div class="item">月</div>
                  <div class="item">年</div> -->
              </div>
            </div>
            <div class="charts">
              <div ref="left" class="chart" style="height:100%">左</div>
              <div ref="right" class="chart" style="height:118%">右</div>
            </div>
          </div>
          <!-- </div> -->
        </el-col>

        <!-- 商品热榜 -->
        <el-col class="outer-right" :span="6">
          <div class="box bgc3 sku-sale-rank">
            <div class="header">
              <div class="title">
                商品热榜
                <span class="sub-title">2022.09.01 ~ 2022.09.27</span>
              </div>
            </div>
            <div class="body">
              <el-row v-for="(item, index) in topSkuList" :key="index">
                <el-col :span="5">
                  <div>
                    <div
                      :class="[
                        'top',
                        { top1: index === 0 },
                        { top2: index === 1 },
                        { top3: index === 2 },
                      ]"
                    >
                      {{ index + 1 }}
                    </div>
                  </div>
                </el-col>
                <el-col :span="13">
                  <div class="sku-name">{{ item.skuName }}</div>
                </el-col>
                <el-col :span="6">
                  <div class="count">{{ item.count }}单</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 底部行 -->
      <el-row class="bottom-row">
        <el-col :span="14">
          <div class="box partner-node-collect">
            <div class="header">
              <div class="title">合作商点位数Top5</div>
              <svg-icon icon-class="more" class="more svg-fill" @click="$router.push('/node/partner')" />
            </div>
            <!-- 图表 -->
            <el-row class="body is-align-middle">
              <el-col :span="17" style="height:100%">
                <div ref="bottom" style="height:100%" class="pie-chart">图表</div>
              </el-col>
              <el-col :span="7">
                <div class="collect">
                  <div class="count">{{ totalValue }} </div>
                  <div class="name">点位数</div>
                  <div class="count count2">{{ top5.length }}</div>
                  <div class="name">合作商数</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="box abnormal-equipment">
            <div class="header">
              <div class="title">异常设备监控</div>
              <svg-icon icon-class="more" class="more " />
            </div>
            <div class="empty">
              <img src="@/assets/empty.png" alt="">
              <div class="tips">暂无数据</div>
            </div>

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
import {
  getUserTaskAPI,
  getReportStatAPI,
  getOrderCountAPI,
  getOrderAmountAPI,
  getTopSkusAPI,
  getRegionCollectAPI,
  getNodeCollectAPI
} from '@/api'
import * as echarts from 'echarts'
// import dayjs from '@/utils/dayjs'
export default {
  name: 'HomeIndex',
  components: { SvgIcon },
  props: {},
  data() {
    return {
      theWays: ['周', '月', '年'],
      checkedIndex: 0,
      userTask: {},
      reportStat: '',
      orderCount: '',
      orderAmount: '',
      topSkuList: [],
      top5: [],
      totalValue: '',
      dayReports: {},
      regionStat: {}
    }
  },
  computed: {
  },
  watch: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getStatData()
  },
  async mounted() {
    await this.getSaleStat()
    await this.changeSaleStat()
    await this.getPiecharts()
    this.drawPieChart()
  },
  methods: {
    // 过滤图表数据
    filterSeries(series) {
      return series.map(item => (item / 100).toFixed(1))
    },
    async getStatData() {
      try {
        // 工单统计
        const id = this.$store.getters.userInfo.userId
        const res1 = await getUserTaskAPI(id, '2022-09-01 00:00:00', '2022-09-28 00:00:00')
        this.userTask = res1.data
        // 销售统计
        const res3 = await getOrderCountAPI('2022-09-01 00:00:00', '2022-09-28 00:00:00')
        this.orderCount = res3.data
        const res4 = await getOrderAmountAPI('2022-09-01 00:00:00', '2022-09-28 00:00:00')
        this.orderAmount = (res4.data / 10000).toFixed(2)
        // 商品热榜  top 10---------------------------------
        const skuRes = await getTopSkusAPI(10, '2022-09-01', '2022-09-29')
        this.topSkuList = skuRes.data
      } catch (err) {
        console.log(err)
      }
    },

    async getSaleStat() {
      // 26-28日销售额统计  折线图---------------------------
      const { data: { xAxis, series }} = await getReportStatAPI(1, '2022-09-26', '2022-09-29')
      this.dayReports.series = this.filterSeries(series)
      this.dayReports.xAxis = xAxis.map(item => '星期 ' + '天一二三四五六 '.charAt(new Date(item).getDay()))
      // console.log(this.dayReports)
      await this.drawLeftChart()
      // 销售分布  柱形图-------------------
      const { data: { xAxis: xAxis2, series: series2 }} = await getRegionCollectAPI('2022-09-26', '2022-09-29')
      // console.log(xAxis2, series2)
      this.regionStat.series = this.filterSeries(series2)
      this.regionStat.xAxis = xAxis2
      await this.drawRightChart()
    },
    async getPiecharts() {
      // 饼状图top5----------------------------
      const pieRes = await getNodeCollectAPI()
      console.log(pieRes)
      this.top5 = pieRes.data
      const totalValue = this.top5.reduce((sum, item) => {
        sum += item.value
        return sum
      }, 0)
      // console.log(totalValue)
      this.totalValue = totalValue
      this.top5 = this.top5.map(item => {
        item.value = (item.value / totalValue) * 100
        item.name = item.name + item.value + '%'
        return item
      })
      // console.log(this.top5)
    },
    async changeSaleStat(index = 0) {
      this.checkedIndex = index
      if (index === 0) {
        const { data: { xAxis, series }} = await getReportStatAPI(1, '2022-09-26', '2022-09-29')
        this.dayReports.series = this.filterSeries(series)
        this.dayReports.xAxis = xAxis.map(item => '星期 ' + '天一二三四五六 '.charAt(new Date(item).getDay()))
        await this.drawLeftChart()
        // dayjs('2019-01-25').format('DD/MM/YYYY') // '25/01/2019'
      } if (index === 1) {
        const { data: { xAxis, series }} = await getReportStatAPI(1, '2022-09-01', '2022-09-29')
        this.dayReports = { xAxis, series }
        this.dayReports.series = this.filterSeries(series)
        // this.dayReports.xAxis = xAxis.map(item => {
        //   item = dayjs(item).format('MM月DD日')
        //   return item
        // })
        // this.dayReports.xAxis = ['2022年1月', '', '', '2022年4月', '', '', '2022年7月', '', '']
        await this.drawLeftChart()
        // ----------------------------------
        const { data: { xAxis: xAxis2, series: series2 }} = await getRegionCollectAPI('2022-09-01', '2022-09-29')
        this.regionStat.series = this.filterSeries(series2)
        this.regionStat.xAxis = xAxis2
        await this.drawRightChart()
      }
      if (index === 2) {
        const { data: { xAxis, series }} = await getReportStatAPI(2, '2022-01-01', '2022-09-29')
        this.dayReports.series = this.filterSeries(series)
        console.log(xAxis)
        // xAxis.map()
        // this.dayReports.xAxis = xAxis.map(item => {
        //   item = dayjs(item).format('YYYY年MM月')
        //   return item
        // })
        this.dayReports.xAxis = ['2022年1月', '', '', '2022年4月', '', '', '2022年7月', '', '']
        await this.drawLeftChart()
        // ----------------------------------
        const { data: { xAxis: xAxis2, series: series2 }} = await getRegionCollectAPI('2022-01-01', '2022-09-29')
        this.regionStat.series = this.filterSeries(series2)
        this.regionStat.xAxis = xAxis2
        await this.drawRightChart()
      }
    },
    drawLeftChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.$refs.left)
      // 指定图表的配置项和数据
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              color: '#8c8c8c',
              backgroundColor: '#ffff'
            }
          }
        },
        color: ['#ff5757'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0
          },
          data: this.dayReports.xAxis,
          axisLine: {
            lineStyle: {
              color: '#9d9d9d'
            },
            axisLabel: {
              color: '#999999'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '单位：元',
          nameTextStyle: {
            color: '#9d9d9d'
          },
          axisLabel: {
            color: '#9d9d9d'
          }
        },
        series: [
          {
            name: '销售额',
            data: this.dayReports.series,
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 2
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#fecbcb' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }

            }
          }
        ],
        grid: {
          left: '18%',
          bottom: '8%',
          right: '5%'
        },
        title: {
          show: true,
          text: '销售额趋势图',
          left: 'center',
          top: 5,
          textStyle: {
            color: '#000',
            fontSize: 14
          }
        }
      }
      window.onresize = function() {
        myChart.resize()
      }

      // 使用刚指定的配置项和数据显示图表。
      option && myChart.setOption(option)
    },
    drawRightChart() {
      const myChart = echarts.init(this.$refs.right)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              color: '#8c8c8c',
              backgroundColor: '#ffff'
            }
          }
        },
        title: {
          show: true,
          text: '销售额趋势图',
          left: 'center',
          top: 5,
          textStyle: {
            color: '#000',
            fontSize: 14
          }
        },
        xAxis: {
          type: 'category',
          data: this.regionStat.xAxis,
          axisLine: {
            show: true,
            // 设置坐标轴颜色
            lineStyle: {
              color: '#b5b5b5'
            }
          },
          // 坐标轴刻度相关设置。
          axisTick: {
            show: false
          },
          boundaryGap: true,
          // 刻度标签与轴线之间的距离。
          axisLabel: {
            margin: 20
          }

        },
        yAxis: {
          type: 'value',
          name: '单位：元',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#b5b5b5' // 分割线颜色
            }
          }
        },
        series: [
          {
            data: this.regionStat.series,
            type: 'bar',
            barMaxHeight: '100%',
            barMaxWidth: '100%',
            nam: '销售额分布',
            barWidth: '20',
            itemStyle: {
              color: '#91b0ff',
              // 这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
              borderRadius: [5, 5, 0, 0]
            }
          }
        ]
      }
      window.onresize = function() {
        myChart.resize()
      }
      option && myChart.setOption(option)
    },
    drawPieChart() {
      const myChart = echarts.init(this.$refs.bottom)
      const option = {
        title: {
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/> 总占比：({d}%)'
          // formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: [40, 100],
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5
            },
            label: {
              show: true
            },
            emphasis: {
              label: {
                show: false
              }
            },
            data: this.top5
          }
        ]
      }
      window.onresize = function() {
        myChart.resize()
      }
      option && myChart.setOption(option)
    }
  }

}
</script>
<style lang="scss" scoped>
.home-container {
  background-color: #f8fafd;
  font-family: PingFangSC-Regular, PingFang SC;
}

.content {
  width: 100%;
  min-height: 580px;
  padding: 20px;

  // 公共样式
  .home-sku-sale-stats {
    display: flex;
    flex-direction: column;
    height: calc(20vh - 24px);
    min-height: 166px;
  }

  .text-shadow1 {
    text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
  }

  .text-shadow2 {
    text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
  }

  .color1 {
    color: #072074;
  }

  .color2 {
    color: #91a7dc;
  }

  .color3 {
    color: #ff5757;
  }

  .color4 {
    color: #de9690;
  }

  .bgc1 {
    background: #e9f3ff;
    background-image: url(~@/assets/images/task.png);
    background-repeat: no-repeat, no-repeat;
    background-position: 100% 60px, calc(30vh - 30px) 100px;
  }

  .bgc2 {
    background: #fbefe8 url(~@/assets/images/pinkpig.png) no-repeat calc(100% - 12px) 100%;
  }

  .bgc3 {
    background: #fbefe8 url(~@/assets/images/pinkpig.png) no-repeat calc(100% - 12px) 100%;
  }

  .box {
    padding: 20px;
    border-radius: 20px;
  }

  .num {
    height: 50px;
    font-size: 35px;
    font-weight: 600;
    line-height: 50px;
  }

  .text {
    height: 17px;
    margin-top: 3px;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
  }

  .header {
    display: flex;

    .title {
      flex: 1;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .sub-title {
      margin-left: 10px;
      font-size: 12px;
      font-weight: 400;
      color: #999;
    }
  }

  .outer-row {
    margin-left: -10px;
    margin-right: -10px;

    .outer-left {
      padding-left: 10px;
      padding-right: 10px;

      // background-color: skyblue;
      .el-col-13,
      .el-col-11 {
       min-height: 166px;
        padding-left: 10px;
        padding-right: 10px;
      }

      .body {
        display: flex;
        flex: 1;
        justify-content: space-around;

        .stats {
          height: 100%;
          flex: 1;
          display: flex;
          justify-content: space-evenly;
          align-items: center;

          .item {
            display: flex;
            flex-direction: column;
          }
        }
      }

      .sku-sale-collect {
        display: flex;
        flex-direction: column;
        height: calc(40vh - 68px);
        min-height: 352px;
        margin-top: 20px;
        background: #fff;

        .week-month-year {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 129px;
          height: 34px;
          background: rgba(233, 243, 255, .37);
          border-radius: 10px;

          .item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 37px;
            height: 25px;
            font-size: 14px;
            color: #9ca3b4;
            cursor: pointer;
          }

          .is-checked {
            background: #fff;
            box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
            border-radius: 7px;
            font-weight: 600;
            color: #333;
          }
        }

        .charts {
          flex: 1;
          display: flex;
          .chart {
          flex:1;
          height: 100%;

          }
        }
      }
    }
  }

  .outer-right {
    padding-left: 10px;
    padding-right: 10px;

    .sku-sale-rank {
      display: flex;
      flex-direction: column;
      height: calc(60vh - 72px);
      min-height: 538px;
      background: #fff;

      .body {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 20px;

        .top {
          display: inline-block;
          width: 16px;
          height: 20px;
          margin-left: 10px;
          text-align: center;
          font-size: 12px;
          background: url("~@/assets/ranks/rest.png");
          font-weight: 400;
          color: #e9b499;
          line-height: 14px;
        }

        .top1 {
          width: 21px;
          height: 20px;
          background: url("~@/assets/ranks/top1.png");
          color: #8e5900;
        }

        .top2 {
          width: 21px;
          height: 20px;
          background: url("~@/assets/ranks/top2.png");
          color: #494949;
        }

        .top3 {
          width: 21px;
          height: 20px;
          background: url("~@/assets/ranks/top3.png");
          color: #cf6d3d;
        }

        .sku-name {
          height: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          line-height: 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .count {
          height: 20px;
          font-size: 14px;
          font-weight: 400;
          color: #737589;
          line-height: 20px;
          text-align: right;
        }
      }
    }
  }

  .bottom-row {
    position: relative;
    margin-left: -10px;
    margin-right: -10px;
    margin-top: 20px;

    .el-col {
      padding-left: 10px;
      padding-right: 10px;
    }

    .partner-node-collect,
    .abnormal-equipment {
      display: flex;
      flex-direction: column;
      height: calc(40vh - 48px);
      min-height: 353px;
      background: #fff;

      .more {
        width: 16px;
        height: 16px;
        color: #5f84ff !important;
        fill: currentColor;
        stroke: none;
        vertical-align: middle;
      }
    }

    .partner-node-collect {

      .body {
        flex: 1;
        display: flex;
        align-items: center;
        margin-left: -10px;
        margin-right: -10px;

        .collect {
          width: 154px;
          height: 230px;
          padding-top: 47px;
          padding-left: 38px;
          background: linear-gradient(135deg, transparent, #f8f8f9 0) 0 0, linear-gradient(-135deg, transparent 12px, #f8f8f9 0) 100% 0, linear-gradient(-45deg, transparent, #f8f8f9 0) 100% 100%, linear-gradient(45deg, transparent 12px, #f8f8f9 0) 0 100%;
          background-size: 50% 50%;
          background-repeat: no-repeat;

          .count {
            height: 33px;
            font-size: 24px;
            font-weight: 600;
            color: #072074;
            line-height: 33px;
          }

          .count2 {
            margin-top: 20px;
          }

          .name {
            height: 17px;
            margin-top: 6px;
            font-size: 12px;
            font-weight: 400;
            color: #000412;
            line-height: 17px;
          }
        }

      }

    }

    .abnormal-equipment {
      .empty {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .tips {
          margin-top: 25px;
          color: #20232a;
          font-size: 14px;
        }
      }
    }

  }
}
</style>
