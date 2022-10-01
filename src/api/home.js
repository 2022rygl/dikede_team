import request from '@/utils/request'

// 获取用户基本信息
export const getUserInfoAPI = (id) =>
  request({
    url: `/user-service/user/${id}`,
    method: 'GET'

  })

// 获取合作商总数
export const getPartnerCountAPI = (id) =>
  request({
    url: '/user-service/partner/count',
    method: 'GET'

  })

/**
 * 获取用户工作量(工单统计)
 * @param {Number|String} userId  用户id
 * @param {String} start 开始时间
 * @param {String} end  结束时间
 * @returns Promise
 */
export const getUserTaskAPI = (userId, start, end) =>
  request({
    url: '/task-service/task/userWork',
    method: 'GET',
    params: { userId, start, end }
  })

/**
 *获取销售额统计
 * @param {Number} collectType  统计时间类型，1:按日统计，2:按月统计
 * @param {String} start 开始日期
 * @param {String} end  结束日期
 * @returns Promise
 */
export const getReportStatAPI = (collectType, start, end) =>
  request({
    url: `/order-service/report/amountCollect/${collectType}/${start}/${end}`,
    method: 'GET'

  })

// 根据地区汇总销售额数据(销售量分布)
export const getRegionCollectAPI = (start, end) =>
  request({
    url: `/order-service/report/regionCollect//${start}/${end}`,
    method: 'GET'

  })

// 获取一定时间范围之内的订单总数
export const getOrderCountAPI = (start, end) =>
  request({
    url: '/order-service/report/orderCount',
    method: 'GET',
    params: {
      start, end
    }
  })

// 获取一定时间范围之内的收入
export const getOrderAmountAPI = (start, end) =>
  request({
    url: '/order-service/report/orderAmount',
    method: 'GET',
    params: {
      start, end
    }
  })

// 获取销售前几的商品
export const getTopSkusAPI = (topValue, start, end) =>
  request({
    url: `/order-service/report/skuTop/${topValue}/${start}/${end}`,
    method: 'GET'

  })

// 合作商点位汇总统计
export const getNodeCollectAPI = () =>
  request({
    url: '/vm-service/node/nodeCollect',
    method: 'GET'

  })

// 获取点位总数
export const getCountAPI = () =>
  request({
    url: '/vm-service/node/count',
    method: 'GET'

  })
