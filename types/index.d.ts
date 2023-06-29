export interface User {
  avatar?: string
  username: string
}

export interface UserComment {
  created_at: string
  id: number
  users: User
  text: string
}

export interface UserRating {
  created_at: string
  id: number
  user: User
  rating: number
}

export interface Post {
  created_at: string
  id: number
  title: string
  image: string
  hashtags?: string[]
  user: User
  comments?: UserComment[]
  ratings?: UserRating[]
}

export interface Category {
  id: number
  name: string
  slug: string
}

export interface SupaFile {
  name: string
  file: File
}
