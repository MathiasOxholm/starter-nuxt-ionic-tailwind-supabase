import { useRoot } from '@/stores/root'

export default defineNuxtPlugin(async () => {
  const { getCategories } = useRoot()

  // await getCategories()
})
