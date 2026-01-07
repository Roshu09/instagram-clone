import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link href="/feed" className="text-xl md:text-2xl font-semibold" style={{ fontFamily: "serif" }}>
            Instagram
          </Link>

          <div className="flex gap-4 md:gap-6 text-sm md:text-base">
            <Link href="/feed" className="hover:text-[#8e8e8e] transition-colors">
              Feed
            </Link>
            <Link href="/profile" className="hover:text-[#8e8e8e] transition-colors">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
