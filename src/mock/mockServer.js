/**
 * 使用mockjs提供模拟数据接口
 */
import Mock from 'mockjs'
import data from './data.json'

// 映射路由接口
Mock.mock('/api2/seller', {
  code: 0,
  data: data.seller
})
Mock.mock('/api2/goods', {
  code: 0,
  data: data.goods
})
Mock.mock('/api2/ratings', {
  code: 0,
  data: data.ratings
})

// 不用使用export
