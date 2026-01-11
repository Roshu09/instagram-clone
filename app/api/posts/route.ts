import { NextResponse } from "next/server"

const BASE_POSTS = [
  {
    id: 1,
    username: "vivek",
    image: "/photo1.jpeg", // Your first photo
    caption: "Dosto ye mere college ka satabdi stambh hai 👾🤠#college #memories",
    likes: 150,
    likedBy: ["ujjwal", "akhil"],
    comments: [{ username: "ujjwal", text: "Acha Bhai!", timestamp: "2h" }],
    location: "HBTU, Kanpur",
    timestamp: "1 day ago",
  },
  {
    id: 2,
    username: "saif_khan_.18",
    image: "/photo2.jpeg", // Your second photo
    caption: "Bhai language samajh nhi aa rhi, koi smjha dena ",
    likes: 200,
    likedBy: ["Sabd prakash", "friend4"],
    comments: [{ username: "Sabd prakash", text: "okay🥸", timestamp: "3h" }],
    location: "LHC 1",
    timestamp: "2 days ago",
  },
  {
    id: 3,
    username: "Shishir_07",
    image: "/photo3.jpeg",
    caption: "JK temple guys visit krna na bhulna🛕, Next vlog me ayega! #temple #peace ",
    likes: 180,
    likedBy: ["nikhil_99"],
    comments: [],
    location: "Uttar Pradesh",
    timestamp: "3 days ago",
  },
  {
    id: 4,
    username: "pankaj",
    image: "/photo4.jpeg",
    caption: "Bdde bhai hum to yahi kre hai class me👍 #fun",
    likes: 220,
    likedBy: ["Aman_123"],
    comments: [],
    location: "Kanpur hi hai ji",
    timestamp: "4 days ago",
  },
  {
    id: 5,
    username: "saif_khan_.18",
    image: "/photo5.jpeg",
    caption: "guys follow krlo mera instagram account ye wala ban nhi hoga #followme #instagram ",
    likes: 190,
    likedBy: ["Tousif_Raza"],
    comments: [],
    location: "Location 5",
    timestamp: "5 days ago",
  },
  {
    id: 6,
    username: "Shivkant",
    image: "/photo6.jpeg",
    caption: "😀👍",
    likes: 210,
    likedBy: ["rahul"],
    comments: [{ username: "rahul", text: "Nice one!", timestamp: "1d" }],
    location: "New Auditorium",
    timestamp: "6 weeks+ ago",
  },
  {
    id: 7,
    username: "Aman_123",
    image: "/photo7.jpeg",
    caption: "sbkoi official whatsapp group me add ho jao jisne admission liya hai #HBTU ",
    likes: 175,
    likedBy: ["Zishan"],
    comments: [],
    location: "Location 7",
    timestamp: "3 month ago",
  },
  ]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "5")

  const startIndex = (page - 1) * limit
  const endIndex = Math.min(startIndex + limit, BASE_POSTS.length)

  const paginatedPosts = BASE_POSTS.slice(startIndex, endIndex)

  await new Promise((resolve) => setTimeout(resolve, 800))

  return NextResponse.json({
    posts: paginatedPosts,
    hasMore: endIndex < BASE_POSTS.length,
    total: BASE_POSTS.length,
  })
}
