export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          slug: string | null
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          slug?: string | null
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          slug?: string | null
          sort_order?: number | null
        }
      }
      comments: {
        Row: {
          created_at: string | null
          id: number
          post: number | null
          text: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          post?: number | null
          text?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          post?: number | null
          text?: string | null
          user_id?: string | null
        }
      }
      posts: {
        Row: {
          created_at: string | null
          id: number
          image: string | null
          title: string | null
          user_id: string | null
          video: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          image?: string | null
          title?: string | null
          user_id?: string | null
          video?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          image?: string | null
          title?: string | null
          user_id?: string | null
          video?: string | null
        }
      }
      ratings: {
        Row: {
          created_at: string | null
          id: number
          post: number | null
          rating: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          post?: number | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          post?: number | null
          rating?: number | null
          user_id?: string | null
        }
      }
      users: {
        Row: {
          avatar: string | null
          email: string | null
          id: string
          username: string
        }
        Insert: {
          avatar?: string | null
          email?: string | null
          id: string
          username: string
        }
        Update: {
          avatar?: string | null
          email?: string | null
          id?: string
          username?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export interface PostResult {
  data: {
    created_at: string | null
    id: number
    image: string | null
    title: string | null
    user_id: string | null
    video: string | null
  }
  error: Error | null
}

export interface PostData {
  created_at: string | null
  id: number
  image: string | null
  title: string | null
  user_id: string | null
  video: string | null
}
