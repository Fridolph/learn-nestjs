import { ref } from 'vue'

export default function useCommonHeader() {
  const toggle = ref<boolean>(false)
  const handleToggle = () => {
    toggle.value = !toggle.value
  }
  return {
    toggle,
    handleToggle,
  }
}
