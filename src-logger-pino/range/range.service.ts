import { Bind, Injectable, Param } from '@nestjs/common'

@Injectable()
export class RangeService {
  getRange() {
    return {
      code: 0,
      data: [],
      msg: '请求数据为空',
    }
  }

  getRangeParam(size?: number) {
    let ret = handleParams(size)    
    
    return {
      code: 0,
      data: ret,
      msg: '请求成功',
    }
  }
}

function handleParams(num: number) {
  let ret = []

  for (let i = 0; i < num; i++) {
    ret.push('' + (i + 1))
  }
  return ret
}
