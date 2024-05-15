<template>
  <div
    class="compliance-entrance"
    @click.stop.prevent="handleClick">
    <img
      width="16"
      height="22"
      class="compliance-icon"
      src="./icon.svg" />
    <template v-if="loading">
      <span>loading ...</span>
    </template>
    <template v-else>
      <span>
        {{ complianceInfo.name }}
        {{ complianceInfo.version }}
      </span>
      <div
        v-if="complianceInfo.enableStatus == 1 && complianceInfo.firstEnable == 1"
        class="tag-wrap">
        NEW
      </div>
      <div
        v-if="
          complianceInfo.enableStatus == 1 &&
          complianceInfo.firstEnable == 0 &&
          complianceInfo.resultScore > 0
        "
        class="tag-wrap">
        {{ complianceInfo.resultScore }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import useComplianceHooks from './useComplianceHooks'

const { loading, queryCompliance, complianceInfo } = useComplianceHooks()

function handleClick() {
  console.log(`点击合规中心 -> 查看当前数据`, complianceInfo.value)
  if (complianceInfo.value.enableStatus == 1) {
    alert(`已配，该跳合规中心页\n${JSON.stringify(complianceInfo.value)}`)
  } else {
    alert(`未配，应跳转介绍页\n${JSON.stringify(complianceInfo.value)}`)
  }
}

defineExpose({
  queryCompliance,
})
</script>

<style scoped lang="postcss">
.compliance-entrance {
  position: relative;
  display: inline-flex;
  align-self: center;
  /* transform: translateY(6px); */
  padding: 5px 13px;
  margin-right: 25px;
  border-radius: 16px;
  background: #e6f3ff;
  font-size: 14px;
  color: #262626;
  line-height: 22px;
  cursor: pointer;

  .compliance-icon {
    width: 16px;
    height: 22px;
    margin-right: 8px;
  }

  .tag-wrap {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    min-width: 40px;
    height: 16px;
    background: linear-gradient(133deg, #f77845 0%, #ec4321 100%);
    border-radius: 8px 8px 8px 0px;
    font-size: 12px;
    color: #ffffff;
    line-height: 16px;
    letter-spacing: 1px;
    text-align: left;
    font-style: normal;
    text-align: center;
  }
}
</style>
