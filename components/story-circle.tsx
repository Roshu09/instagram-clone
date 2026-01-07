interface StoryCircleProps {
  username: string
  imageUrl: string
  hasStory?: boolean
}

export function StoryCircle({ username, imageUrl, hasStory = true }: StoryCircleProps) {
  return (
    <div className="flex flex-col items-center gap-1 flex-shrink-0">
      <div
        className={`${hasStory ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2.5px]" : ""} rounded-full flex-shrink-0`}
      >
        <div className="bg-white p-[3px] rounded-full">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={username}
            className="w-[66px] h-[66px] rounded-full object-cover block"
          />
        </div>
      </div>
      <span className="text-[11px] text-gray-800 max-w-[66px] truncate text-center">{username}</span>
    </div>
  )
}
