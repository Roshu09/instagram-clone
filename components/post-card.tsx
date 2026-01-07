"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

export default function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes || 0)
  const [comments, setComments] = useState<Comment[]>(post.comments || [])
  const [showAllComments, setShowAllComments] = useState(false)
  const [newComment, setNewComment] = useState("")

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  const handlePostComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        username: "you",
        text: newComment,
        timestamp: "now",
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  const displayedComments = showAllComments ? comments : comments.slice(0, 2)

  return (
    <div className="bg-white">
      {/* Post Header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-3">
          <Avatar className="w-[32px] h-[32px] border border-gray-200">
            <AvatarImage src={`/.jpg?key=httzs&height=32&width=32&query=${post.username}`} alt={post.username} />
            <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-[13px] text-black">{post.username}</span>
            {post.location && <span className="text-[11px] text-gray-600">{post.location}</span>}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-transparent p-0 h-auto w-auto">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </Button>
      </div>

      {/* Post Image */}
      <div className="aspect-square bg-[#fafafa]">
        <img src={post.image || "/placeholder.svg"} alt={post.caption} className="w-full h-full object-cover" />
      </div>

      {/* Post Actions */}
      <div className="px-3 py-2 space-y-2">
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleLike} className="p-0 h-auto w-auto hover:bg-transparent">
              {liked ? (
                <svg
                  className="w-[26px] h-[26px] hover:opacity-50 transition-opacity"
                  viewBox="0 0 48 48"
                  fill="#ed4956"
                >
                  <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </svg>
              ) : (
                <svg
                  className="w-[26px] h-[26px] hover:opacity-50 transition-opacity"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </svg>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="p-0 h-auto w-auto hover:bg-transparent">
              <svg
                className="w-[26px] h-[26px] hover:opacity-50 transition-opacity"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4z"></path>
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="p-0 h-auto w-auto hover:bg-transparent">
              <svg
                className="w-[26px] h-[26px] hover:opacity-50 transition-opacity"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
              </svg>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setBookmarked(!bookmarked)}
            className="p-0 h-auto w-auto hover:bg-transparent"
          >
            {bookmarked ? (
              <svg
                className="w-[24px] h-[24px] hover:opacity-50 transition-opacity"
                viewBox="0 0 48 48"
                fill="currentColor"
              >
                <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1z"></path>
              </svg>
            ) : (
              <svg
                className="w-[24px] h-[24px] hover:opacity-50 transition-opacity"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
              </svg>
            )}
          </Button>
        </div>

        {likeCount > 0 && (
          <div className="font-semibold text-[13px] text-black">{likeCount.toLocaleString()} likes</div>
        )}

        {post.likedBy && post.likedBy.length > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-2">
              {post.likedBy.slice(0, 2).map((user, index) => (
                <Avatar key={index} className="w-[17px] h-[17px] border-2 border-white">
                  <AvatarImage src={`/.jpg?height=17&width=17&query=${user}`} />
                  <AvatarFallback className="text-[8px]">{user[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-[13px] text-black">
              Liked by <span className="font-semibold">{post.likedBy[0]}</span>
              {post.likedBy.length > 1 && (
                <>
                  {" "}
                  and <span className="font-semibold">{post.likedBy.length - 1} others</span>
                </>
              )}
            </span>
          </div>
        )}

        {/* Post Caption */}
        <div className="text-[13px] leading-[18px]">
          <span className="font-semibold mr-1.5 text-black">{post.username}</span>
          <span className="text-black">{post.caption}</span>
        </div>

        {/* Comments Section */}
        {comments.length > 0 && (
          <div className="space-y-1">
            {comments.length > 2 && !showAllComments && (
              <button
                onClick={() => setShowAllComments(true)}
                className="text-[13px] text-gray-500 hover:text-gray-700"
              >
                View all {comments.length} comments
              </button>
            )}
            {displayedComments.map((comment, index) => (
              <div key={index} className="text-[13px] leading-[18px]">
                <span className="font-semibold mr-1.5 text-black">{comment.username}</span>
                <span className="text-black">{comment.text}</span>
              </div>
            ))}
            {showAllComments && comments.length > 2 && (
              <button
                onClick={() => setShowAllComments(false)}
                className="text-[13px] text-gray-500 hover:text-gray-700"
              >
                Show less
              </button>
            )}
          </div>
        )}

        <div className="text-[10px] text-gray-500 uppercase tracking-wide">{post.timestamp || "1 DAY AGO"}</div>
      </div>

      {/* Comment Input Field */}
      <div className="border-t border-gray-100 px-3 py-2 flex items-center gap-2">
        <button className="hover:opacity-50 transition-opacity">
          <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="24" cy="24" r="20"></circle>
            <path d="M15 24h18M24 15v18"></path>
          </svg>
        </button>
        <Input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
          className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-[13px] p-0 h-auto"
        />
        {newComment.trim() && (
          <button onClick={handlePostComment} className="text-[#0095f6] font-semibold text-[13px] hover:opacity-50">
            Post
          </button>
        )}
      </div>
    </div>
  )
}
