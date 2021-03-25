import request from '@/request'

const COMMON_PARAMS = { rSource: 'hbgj', entrance: 'wechat'};

export {
  helpDetail,
  setOperator
}


function helpDetail(e) {
  return request.gateway({
    method: 'POST',
    url: '/gateway/ticket/operator',
    sidFields: ['uid', 'pid','userCouponGuid'],
    data: {
      pid: 201006,
      userCouponGuid:e.id||'',
      ...COMMON_PARAMS
    }
  })
}

function setOperator(e) {
  return request.gateway({
    method: 'POST',
    url: '/gateway/ticket/operator',
    sidFields: ['uid', 'pid','userCouponGuid','appinfo'],
    data: {
      pid: 201007,
      userCouponGuid:e.id||'',
      ...COMMON_PARAMS
    }
  })
}
