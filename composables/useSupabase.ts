const { auth } = useSupabaseAuthClient()
const client = useSupabaseClient()

export const useRating = async (rating: number, postId: number | string) => {
  if (!rating) return
  if (!postId) return

  const user = await auth.getUser()

  await client.from('ratings').insert({
    rating,
    post: postId,
    user_id: user.data.user?.id,
  })
}
