"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Home, Search, PlusSquare, User, Grid3x3, Clapperboard, UserSquare2, Plus, Menu } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="sticky top-0 bg-white border-b border-[#dbdbdb] px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-black">sunflower_power77</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-1">
            <Plus className="w-6 h-6" />
          </button>
          <button className="p-1">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="flex-1 pb-14">
        <div className="px-4 py-4">
          <div className="flex items-center gap-6 mb-4">
            {/* Profile Picture with gradient ring */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-white p-[3px]">
                  <Avatar className="w-full h-full">
                    <AvatarImage src="/user-profile.jpg" alt="sunflower_power77" />
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              {/* Blue verified badge */}
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <Plus className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 flex justify-around text-center">
              <div>
                <div className="font-semibold text-black">54</div>
                <div className="text-sm text-[#8e8e8e]">Posts</div>
              </div>
              <div>
                <div className="font-semibold text-black">852</div>
                <div className="text-sm text-[#8e8e8e]">Followers</div>
              </div>
              <div>
                <div className="font-semibold text-black">756</div>
                <div className="text-sm text-[#8e8e8e]">Following</div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <p className="font-semibold text-sm text-black">Autumn Lopez</p>
            <p className="text-sm text-black">Big into hiking & nature 🌲</p>
          </div>

          {/* Edit Profile Button */}
          <Button
            variant="outline"
            className="w-full rounded-lg border-[#dbdbdb] text-sm font-semibold mb-2 bg-transparent"
          >
            Edit Profile
          </Button>

          {/* Story Highlights */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
            {[
              { name: "Travel", image: "/diverse-travelers-world-map.png" },
              { name: "Nature", image: "/lush-forest-stream.png" },
              { name: "Hikes", image: "/diverse-food-spread.png" },
            ].map((highlight) => (
              <div key={highlight.name} className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="w-16 h-16 rounded-full border border-[#dbdbdb] p-[2px]">
                  <div className="w-full h-full rounded-full bg-[#fafafa] overflow-hidden">
                    <img
                      src={highlight.image || "/placeholder.svg"}
                      alt={highlight.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs text-black">{highlight.name}</span>
              </div>
            ))}
            {/* New Story */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="w-16 h-16 rounded-full border border-[#dbdbdb] flex items-center justify-center">
                <Plus className="w-6 h-6 text-[#8e8e8e]" />
              </div>
              <span className="text-xs text-black">New</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-[#dbdbdb] flex">
          <button className="flex-1 py-3 border-t border-black -mt-[1px] flex items-center justify-center">
            <Grid3x3 className="w-6 h-6" />
          </button>
          <button className="flex-1 py-3 flex items-center justify-center text-[#8e8e8e]">
            <Clapperboard className="w-6 h-6" />
          </button>
          <button className="flex-1 py-3 flex items-center justify-center text-[#8e8e8e]">
            <UserSquare2 className="w-6 h-6" />
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-[2px]">
          {[
            "/diverse-travelers-world-map.png",
            "/diverse-food-spread.png",
            "/lush-forest-stream.png",
            "/diverse-fitness-group.png",
            "/photography-still-life.png",
            "/vibrant-cityscape.png",
            "/diverse-travelers-world-map.png",
            "/diverse-food-spread.png",
            "/lush-forest-stream.png",
          ].map((image, i) => (
            <div key={i} className="aspect-square bg-[#fafafa]">
              <img src={image || "/placeholder.svg"} alt={`Post ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#dbdbdb] px-4 py-2">
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
            <User className="w-6 h-6 fill-current" />
          </Link>
        </div>
      </nav>
    </div>
  )
}
