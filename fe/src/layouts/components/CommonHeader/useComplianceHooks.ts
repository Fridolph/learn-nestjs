import { ref, onMounted } from 'vue'

export interface IComplianceInfo {
  firstEnable: 1 | 0
  enableStatus: 1 | 0
  resultScore: number
  name: string
  version: string
}

export default function useComplianceHooks() {
  const loading = ref<boolean>(false)
  const complianceInfo = ref<IComplianceInfo>({
    firstEnable: 0, // 1首次开启, 0非首次开启
    enableStatus: 0, // 1启用, 0未启用
    resultScore: 0,
    name: '合规中心',
    version: '',
  })

  async function queryCompliance() {
    loading.value = true
    const res = await mockData()
    console.log(`queryCompliance -->`, res)

    localStorage.setItem('SAAS_COMPLIANCE_INFO', JSON.stringify(res.data))
    complianceInfo.value = res.data
    loading.value = false
  }

  onMounted(() => {
    console.log('页面加载 -> 初始化请求合规数据')
    queryCompliance()
  })

  return {
    loading,
    queryCompliance,
    complianceInfo,
  }
}

function mockData(): Promise<{ code: number; message: string; data: IComplianceInfo }> {
  let randomNumber = 0
  return new Promise((resolve, reject) => {
    // 模拟数据
    const info: IComplianceInfo = {
      // 首次开启
      firstEnable: 0,
      // 是否启用
      enableStatus: 0,
      resultScore: 0,
      name: '合规中心',
      version: '',
    }
    randomNumber = Math.random()
    if (randomNumber > 0.8) {
      info.firstEnable = 1
      info.enableStatus = 1
      info.resultScore = +(randomNumber * 100).toFixed(2)
      info.version = 'Beta'
    } else if (randomNumber > 0.5 && randomNumber <= 0.8) {
      info.firstEnable = 0
      info.enableStatus = 1
      info.resultScore = +(randomNumber * 100).toFixed(2)
      info.version = 'Beta'
    } else if (randomNumber > 0.2 && randomNumber <= 0.5) {
      info.firstEnable = 0
      info.enableStatus = 1
      info.resultScore = +(randomNumber * 100).toFixed(2)
      info.version = '正式版'
    } else {
      info.firstEnable = 0
      info.enableStatus = 0
      info.resultScore = +(randomNumber * 100).toFixed(2)
      info.version = '正式版'
    }

    setTimeout(() => {
      resolve({
        code: 0,
        message: 'success',
        data: info,
      })
    }, 999)
  })
}
