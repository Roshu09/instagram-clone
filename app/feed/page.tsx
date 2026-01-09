"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import PostCard from "@/components/post-card"
import { StoryCircle } from "@/components/story-circle"
import { Home, Search, PlusSquare, Clapperboard, User } from "lucide-react"
import Link from "next/link"

type Comment = {
  username: string
  text: string
  timestamp: string
}

type Post = {
  id: number
  username: string
  image: string
  caption: string
  likes?: number
  likedBy?: string[]
  comments?: Comment[]
  location?: string
  timestamp?: string
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerTarget = useRef<HTMLDivElement>(null)

  const loadPosts = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const res = await fetch(`/api/posts?page=${page}&limit=5`)
      const data = await res.json()

      setPosts((prev) => [...prev, ...data.posts])
      setHasMore(data.hasMore)
      setPage((prev) => prev + 1)
    } catch (error) {
      console.error("Failed to load posts:", error)
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore])

  useEffect(() => {
    loadPosts()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadPosts()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) observer.observe(currentTarget)

    return () => {
      if (currentTarget) observer.unobserve(currentTarget)
    }
  }, [hasMore, loading, loadPosts])

  const stories = [
    { username: "your story", imageUrl: "/user-profile.jpg", hasStory: false },
    { username: "username", imageUrl: "/lush-forest-stream.png" },
    { username: "username", imageUrl: "/diverse-travelers-world-map.png" },
    { username: "username", imageUrl: "/diverse-food-spread.png" },
    { username: "username", imageUrl: "/diverse-fitness-group.png" },
    { username: "username", imageUrl: "/photography-still-life.png" },
    { username: "username", imageUrl: "/vibrant-cityscape.png" },
  ]

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-2.5">
        <div className="flex items-center justify-between max-w-[470px] mx-auto">
          <h1
            className="text-2xl font-semibold"
            style={{ fontFamily: "'Billabong', cursive" }}
          >
            Instagram
          </h1>
        </div>
      </header>

      {/* Stories */}
      <div className="border-b border-gray-200 px-4 py-4 bg-white sticky top-[53px] z-40">
        <div className="max-w-[470px] mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-1">
            {stories.map((story, index) => (
              <StoryCircle
                key={index}
                username={story.username}
                imageUrl={story.imageUrl}
                hasStory={story.hasStory}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Feed */}
      <main className="max-w-[470px] mx-auto">
        <div className="divide-y divide-gray-100">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {loading && (
          <div className="py-8 flex justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <div className="py-8 text-center text-gray-500 text-sm">
            <p>You're all caught up!</p>
            <p className="text-xs mt-1">You've seen all posts</p>
          </div>
        )}

        <div ref={observerTarget} className="h-10" />
      </main>

      {/* Bottom Navbar (Lucide icons – SAME as ProfilePage) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#dbdbdb] px-4 py-2 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link href="/feed" className="p-2">
            <Home className="w-6 h-6" />
          </Link>

          <button className="p-2">
            <Search className="w-6 h-6" />
          </button>

          <button className="p-2">
            <PlusSquare className="w-6 h-6" />
          </button>

          <button className="p-2">
            <Clapperboard className="w-6 h-6" />
          </button>

          <Link href="/profile" className="p-2">
            <User className="w-6 h-6" />
          </Link>
        </div>
      </nav>
    </div>
  )
}
