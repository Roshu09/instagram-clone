"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import PostCard from "@/components/post-card"
import { StoryCircle } from "@/components/story-circle"
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
      { threshold: 0.1 },
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
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
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-2.5">
        <div className="flex items-center justify-between max-w-[470px] mx-auto">
          <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Billabong', cursive" }}>
            Instagram
          </h1>
          <div className="flex items-center gap-5">
            <button className="hover:opacity-70 transition-opacity">
              <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
            </button>
            <button className="hover:opacity-70 transition-opacity relative">
              <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
              </svg>
              <span className="absolute -top-0.5 -right-0.5 bg-[#ed4956] text-white text-[9px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-gray-200 px-4 py-4 bg-white sticky top-[53px] z-40">
        <div className="max-w-[470px] mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-1">
            {stories.map((story, index) => (
              <StoryCircle key={index} username={story.username} imageUrl={story.imageUrl} hasStory={story.hasStory} />
            ))}
          </div>
        </div>
      </div>

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

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around h-12 max-w-[470px] mx-auto px-2">
          <Link href="/feed" className="p-2 hover:opacity-70 transition-opacity">
            <svg className="w-6 h-6" viewBox="0 0 48 48" fill="currentColor">
              <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
            </svg>
          </Link>
          <button className="p-2 hover:opacity-70 transition-opacity">
            <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="20" cy="20" r="16"></circle>
              <path d="M40 40l-9.172-9.172"></path>
            </svg>
          </button>
          <button className="p-2 hover:opacity-70 transition-opacity">
            <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M31.8 48H16.2c-6.6 0-9.6-1.6-12.1-4.1S0 38.4 0 31.8V16.2C0 9.6 1.6 6.6 4.1 4.1S9.6 0 16.2 0h15.6c6.6 0 9.6 1.6 12.1 4.1S48 9.6 48 16.2v15.6c0 6.6-1.6 9.6-4.1 12.1S38.4 48 31.8 48zM16.2 3C10 3 7.8 4.6 6.1 6.2S3 10 3 16.2v15.6c0 6.2 1.6 8.4 3.2 10.1C7.8 43.4 10 45 16.2 45h15.6c6.2 0 8.4-1.6 10.1-3.2S45 38.2 45 31.8V16.2c0-6.2-1.6-8.4-3.2-10.1C40.2 4.6 38 3 31.8 3H16.2z"></path>
              <path d="M36 24c0 6.6-5.4 12-12 12s-12-5.4-12-12 5.4-12 12-12 12 5.4 12 12"></path>
            </svg>
          </button>
          <button className="p-2 hover:opacity-70 transition-opacity">
            <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2"></rect>
              <rect x="27" y="3" width="18" height="18" rx="2"></rect>
              <rect x="3" y="27" width="18" height="18" rx="2"></rect>
              <rect x="27" y="27" width="18" height="18" rx="2"></rect>
            </svg>
          </button>
          <Link href="/profile" className="p-2 hover:opacity-70 transition-opacity">
            <div className="w-6 h-6 rounded-full border-2 border-black overflow-hidden">
              <img src="/user-profile.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </Link>
        </div>
      </nav>
    </div>
  )
}
