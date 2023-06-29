import { acceptHMRUpdate, defineStore } from 'pinia'
import { Category } from '~~/types'

export const useRoot = defineStore('root', () => {
  const client = useSupabaseClient()
  const categories = ref<Category[]>([])

  const getCategories = async () => {
    const { data } = await client.from('categories').select('id, name, slug, sort_order')

    categories.value = data
  }

  return {
    getCategories,
    categories,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoot, import.meta.hot))
}
