"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Home, Search, PlusSquare, Clapperboard, User } from "lucide-react"
import PostCard from "@/components/post-card"
import { StoryCircle } from "@/components/story-circle"

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
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const observerTarget = useRef<HTMLDivElement | null>(null)
  const isFetching = useRef(false)

  // 🔹 Fetch posts (single source of truth)
  const fetchPosts = async (pageToLoad: number) => {
    if (isFetching.current || !hasMore) return

    isFetching.current = true
    setLoading(true)

    try {
      const res = await fetch(`/api/posts?page=${pageToLoad}&limit=5`)
      const data = await res.json()

      setPosts((prev) => {
        const ids = new Set(prev.map((p) => p.id))
        const uniqueNew = data.posts.filter(
          (p: Post) => !ids.has(p.id)
        )
        return [...prev, ...uniqueNew]
      })

      setHasMore(data.hasMore)
      setPage(pageToLoad)
    } catch (err) {
      console.error("Failed to load posts", err)
    } finally {
      isFetching.current = false
      setLoading(false)
    }
  }

  // 🔹 Initial load (page 1)
  useEffect(() => {
    fetchPosts(1)
  }, [])

  // 🔹 Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching.current) {
          fetchPosts(page + 1)
        }
      },
      { threshold: 0.1 }
    )

    const target = observerTarget.current
    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
    }
  }, [page, hasMore])

  const stories = [
    { username: "your story", imageUrl: "/user-profile.jpeg", hasStory: false },
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
      <header className="sticky top-0 z-50 bg-white border-b px-4 py-2.5">
        <div className="max-w-[470px] mx-auto">
          <h1
            className="text-2xl font-semibold"
            style={{ fontFamily: "'Billabong', cursive" }}
          >
            Instagram
          </h1>
        </div>
      </header>

      {/* Stories */}
      <div className="border-b px-4 py-4 bg-white sticky top-[53px] z-40">
        <div className="max-w-[470px] mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex gap-4">
            {stories.map((story, i) => (
              <StoryCircle
                key={i}
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
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {loading && (
          <div className="py-8 flex justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <p className="text-center text-sm text-gray-500 py-6">
            You’re all caught up 🎉
          </p>
        )}

        <div ref={observerTarget} className="h-10" />
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2">
        <div className="flex justify-around max-w-md mx-auto">
          <Link href="/feed"><Home /></Link>
          <Search />
          <PlusSquare />
          <Clapperboard />
          <Link href="/profile"><User /></Link>
        </div>
      </nav>
    </div>
  )
}
