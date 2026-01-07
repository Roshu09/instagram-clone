import { NextResponse } from "next/server"

const BASE_POSTS = [
  {
    id: 1,
    username: "sarah_photos",
    image: "/sunset-beach.jpg",
    caption: "Beautiful sunset at the beach 🌅 #sunset #beach #ocean #photography",
    likes: 2847,
    likedBy: ["liam_beanz99", "emma_rose"],
    comments: [
      { username: "liam_beanz99", text: "Stunning shot! 📸", timestamp: "2h" },
      { username: "emma_rose", text: "Wow, absolutely beautiful!", timestamp: "4h" },
    ],
    location: "Malibu, California",
    timestamp: "1 day ago",
  },
  {
    id: 2,
    username: "mike_travels",
    image: "/majestic-mountain-vista.png",
    caption: "Hiking through the mountains ⛰️ #hiking #mountains #nature #adventure",
    likes: 5421,
    likedBy: ["john_doe", "travel_bug", "nature_lover"],
    comments: [
      { username: "john_doe", text: "Epic view!", timestamp: "5h" },
      { username: "travel_bug", text: "Adding this to my bucket list 🙌", timestamp: "6h" },
    ],
    location: "Rocky Mountains, Colorado",
    timestamp: "2 days ago",
  },
  {
    id: 3,
    username: "emma_foodie",
    image: "/food-dish.jpg",
    caption: "Delicious homemade pasta 🍝 Recipe in bio! #pasta #foodie #homemade #italian",
    likes: 8912,
    likedBy: ["chef_tony", "foodie_lover"],
    comments: [
      { username: "chef_tony", text: "Looks perfect! 👨‍🍳", timestamp: "1h" },
      { username: "foodie_lover", text: "Need the recipe ASAP!", timestamp: "3h" },
    ],
    location: "Rome, Italy",
    timestamp: "3 days ago",
  },
  {
    id: 4,
    username: "alex_designs",
    image: "/modern-workspace.jpg",
    caption: "New workspace setup complete! 💻 #workspace #setup #design #productive",
    likes: 2034,
    likedBy: ["design_pro", "workspace_goals"],
    comments: [{ username: "design_pro", text: "Clean setup! Love it", timestamp: "2h" }],
    location: "San Francisco, CA",
    timestamp: "4 days ago",
  },
  {
    id: 5,
    username: "fitness_coach_jen",
    image: "/diverse-fitness-group.png",
    caption: "Morning workout session with the crew 💪 #fitness #workout #motivation #fitfam",
    likes: 3456,
    likedBy: ["gym_rat", "healthy_living"],
    comments: [
      { username: "gym_rat", text: "Goals! 🔥", timestamp: "1h" },
      { username: "healthy_living", text: "Inspiring!", timestamp: "3h" },
    ],
    location: "Venice Beach, CA",
    timestamp: "5 days ago",
  },
  {
    id: 6,
    username: "photo_wanderer",
    image: "/photography-still-life.png",
    caption: "Capturing moments in time 📷 #photography #stilllife #art",
    likes: 1876,
    likedBy: ["art_lover", "creative_minds"],
    comments: [{ username: "art_lover", text: "Beautiful composition!", timestamp: "2h" }],
    location: "Paris, France",
    timestamp: "1 week ago",
  },
  {
    id: 7,
    username: "urban_explorer",
    image: "/vibrant-cityscape.png",
    caption: "City lights and late nights 🌃 #cityscape #urban #nightphotography",
    likes: 4532,
    likedBy: ["city_lover", "photographer_pro"],
    comments: [
      { username: "city_lover", text: "Amazing shot!", timestamp: "4h" },
      { username: "photographer_pro", text: "What camera did you use?", timestamp: "5h" },
    ],
    location: "Tokyo, Japan",
    timestamp: "1 week ago",
  },
  {
    id: 8,
    username: "nature_seeker",
    image: "/lush-forest-stream.png",
    caption: "Lost in nature 🌲 #nature #forest #hiking #peaceful",
    likes: 6234,
    likedBy: ["outdoor_enthusiast", "hiker_jane"],
    comments: [{ username: "outdoor_enthusiast", text: "This is paradise! 🌿", timestamp: "1h" }],
    location: "Pacific Northwest",
    timestamp: "1 week ago",
  },
  {
    id: 9,
    username: "travel_diary",
    image: "/diverse-travelers-world-map.png",
    caption: "Next destination: everywhere! ✈️ #travel #wanderlust #explore",
    likes: 7821,
    likedBy: ["adventure_seeker", "globe_trotter"],
    comments: [
      { username: "adventure_seeker", text: "Take me with you!", timestamp: "2h" },
      { username: "globe_trotter", text: "Living the dream 🌍", timestamp: "4h" },
    ],
    location: "World Tour",
    timestamp: "2 weeks ago",
  },
  {
    id: 10,
    username: "chef_marcus",
    image: "/diverse-food-spread.png",
    caption: "Sunday brunch spread 🥐☕ #brunch #food #yummy #weekend",
    likes: 5678,
    likedBy: ["brunch_lover", "food_critic"],
    comments: [{ username: "brunch_lover", text: "Can I come over? 😋", timestamp: "3h" }],
    location: "New York, NY",
    timestamp: "2 weeks ago",
  },
  {
    id: 11,
    username: "yoga_life",
    image: "/yoga-pose-sunset-beach.jpg",
    caption: "Finding balance 🧘‍♀️ #yoga #meditation #wellness #balance",
    likes: 4123,
    likedBy: ["wellness_guru", "mindful_mom"],
    comments: [{ username: "wellness_guru", text: "Beautiful practice 🙏", timestamp: "1h" }],
    location: "Bali, Indonesia",
    timestamp: "2 weeks ago",
  },
  {
    id: 12,
    username: "coffee_addict",
    image: "/latte-art-coffee-cup.jpg",
    caption: "But first, coffee ☕ #coffee #latteart #coffeetime #caffeine",
    likes: 3456,
    likedBy: ["barista_skills", "coffee_lover"],
    comments: [{ username: "barista_skills", text: "Perfect pour! ☕", timestamp: "2h" }],
    location: "Seattle, WA",
    timestamp: "3 weeks ago",
  },
  {
    id: 13,
    username: "pet_paradise",
    image: "/golden-retriever-puppy.png",
    caption: "Meet Charlie! 🐕 #dogsofinstagram #puppy #cute #goldenretriever",
    likes: 12456,
    likedBy: ["dog_lover", "puppy_fan", "animal_friends"],
    comments: [
      { username: "dog_lover", text: "Awww so cute! 🥰", timestamp: "1h" },
      { username: "puppy_fan", text: "I want one!", timestamp: "2h" },
    ],
    location: "Los Angeles, CA",
    timestamp: "3 weeks ago",
  },
  {
    id: 14,
    username: "artist_studio",
    image: "/abstract-colorful-art.png",
    caption: "New piece finished! 🎨 #art #painting #abstract #artist",
    likes: 2789,
    likedBy: ["art_collector", "gallery_owner"],
    comments: [{ username: "art_collector", text: "Is this for sale?", timestamp: "4h" }],
    location: "Brooklyn, NY",
    timestamp: "3 weeks ago",
  },
  {
    id: 15,
    username: "book_nook",
    image: "/cozy-reading-nook-books.jpg",
    caption: "Perfect reading spot 📚 #books #reading #cozy #bookstagram",
    likes: 3901,
    likedBy: ["bookworm", "reader_life"],
    comments: [{ username: "bookworm", text: "This is my dream space!", timestamp: "3h" }],
    location: "Portland, OR",
    timestamp: "1 month ago",
  },
]

function generatePost(id: number) {
  const usernames = [
    "sarah_photos",
    "mike_travels",
    "emma_foodie",
    "alex_designs",
    "fitness_coach_jen",
    "photo_wanderer",
    "urban_explorer",
    "nature_seeker",
    "travel_diary",
    "chef_marcus",
    "yoga_life",
    "coffee_addict",
    "pet_paradise",
    "artist_studio",
    "book_nook",
  ]

  const images = [
    "/sunset-beach.jpg",
    "/majestic-mountain-vista.png",
    "/food-dish.jpg",
    "/modern-workspace.jpg",
    "/diverse-fitness-group.png",
    "/photography-still-life.png",
    "/vibrant-cityscape.png",
    "/lush-forest-stream.png",
    "/diverse-travelers-world-map.png",
    "/diverse-food-spread.png",
    "/yoga-pose-sunset-beach.jpg",
    "/latte-art-coffee-cup.jpg",
    "/golden-retriever-puppy.png",
    "/abstract-colorful-art.png",
    "/cozy-reading-nook-books.jpg",
  ]

  const captions = [
    "Beautiful moment captured 📸 #photography #life",
    "Living my best life ✨ #grateful #blessed",
    "Adventure awaits! 🌍 #travel #explore",
    "Good vibes only 🌟 #positivity #motivation",
    "Making memories 💫 #friends #fun",
  ]

  const locations = ["Los Angeles, CA", "New York, NY", "Miami, FL", "San Francisco, CA", "Chicago, IL", "Seattle, WA"]

  return {
    id,
    username: usernames[id % usernames.length],
    image: images[id % images.length],
    caption: captions[id % captions.length],
    likes: Math.floor(Math.random() * 10000) + 500,
    likedBy: ["user1", "user2"],
    comments: [{ username: "follower123", text: "Love this! 😍", timestamp: "2h" }],
    location: locations[id % locations.length],
    timestamp: `${Math.floor(id / 5) + 1} days ago`,
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "5")

  const MAX_POSTS = 100
  const startIndex = (page - 1) * limit
  const endIndex = Math.min(startIndex + limit, MAX_POSTS)

  const paginatedPosts = []
  for (let i = startIndex; i < endIndex; i++) {
    if (i < BASE_POSTS.length) {
      paginatedPosts.push(BASE_POSTS[i])
    } else {
      paginatedPosts.push(generatePost(i + 1))
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 800))

  return NextResponse.json({
    posts: paginatedPosts,
    hasMore: endIndex < MAX_POSTS,
    total: MAX_POSTS,
  })
}
