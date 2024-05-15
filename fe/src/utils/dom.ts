import type { ComponentInternalInstance } from 'vue'

export function getTargetInstExposed(
  inst: ComponentInternalInstance,
  targetName: string,
  result?: any
) {
  if (inst.type.name != targetName) {    
    // console.log('没找到 -> 继续找', inst.parent?.type)    
    if (inst.parent) {
      return getTargetInstExposed(inst.parent, targetName)
    } else {
      // console.log('到了根节点依旧没找到')
      return null
    }
  } else {
    result = inst
    if (result.type.name === targetName) {
      console.log(`找到了符合的实例 -->`, result)
      return result.exposed
    }
  }
}
