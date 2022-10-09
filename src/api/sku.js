import request from '@/utils/request'

/**
 * 商品类型搜索
 * @returns
 */
export const skuClassSearchAPI = (pageIndex, pageSize, className) =>
  request({
    url: '/vm-service/skuClass/search',
    method: 'GET',
    params: { pageIndex, pageSize, className }
  })

/**
 * 删除商品类型
 * @returns
 */
export const delskuClassAPI = (classId) =>
  request({
    url: `/vm-service/skuClass/${classId}`,
    method: 'DELETE'
  })

/**
   * 修改商品类型
   * @param {*} classId
   * @returns
   */
export const changeskuClassAPI = (className, classId) =>
  request({
    url: `/vm-service/skuClass/${classId}`,
    method: 'PUT',
    data: { className }
  })

/**
 *新增商品类型
 * @param {*} className
 * @returns
 */
export const addskuClassAPI = (className) =>
  request({
    url: '/vm-service/skuClass',
    method: 'POST',
    data: { className }
  })

/**
 * 商品搜索
 * @returns
 */
export const skuSearchAPI = (pageIndex, pageSize, skuName) =>
  request({
    url: '/vm-service/sku/search',
    method: 'GET',
    params: { pageIndex, pageSize, skuName }
  })

/**
   * 新增商品
   * @param {*} skuName
   * @param {*} skuImage
   * @param {*} price
   * @param {*} classId
   * @param {*} unit
   * @param {*} brandName
   * @returns
   */
export const addskuAPI = (skuName, skuImage, price, classId, unit, brandName) =>
  request({
    url: '/vm-service/sku',
    method: 'POST',
    data: { skuName, skuImage, price, classId, unit, brandName }
  })

/**
   * 修改商品
   * @param {*} skuName
   * @param {*} skuImage
   * @param {*} price
   * @param {*} classId
   * @param {*} unit
   * @param {*} brandName
   * @param {*} skuId
   * @returns
   */
export const changeskuAPI = (skuName, skuImage, price, classId, unit, brandName, skuId) =>
  request({
    url: `/vm-service/sku/${skuId}`,
    method: 'PUT',
    data: { skuName, skuImage, price, classId, unit, brandName }
  })

/**
 * 图片上传
 * @param {*} data
 * @returns
 */
export const UploadPic = (data) =>
  request({
    url: '/vm-service/sku/fileUpload',
    method: 'POST',
    data
  })

/**
 * 数据导入
 * @param {*} data
 * @returns
 */
export const Upload = (data) =>
  request({
    url: '/vm-service/sku/upload',
    method: 'POST',
    data
  })
