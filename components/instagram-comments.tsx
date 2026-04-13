"use client"

import { Heart, MessageCircle, Send } from "lucide-react"

interface Comment {
  username: string
  text: string
}

interface InstagramCommentsProps {
  likes: number
  topLikers: string[]
  comments: Comment[]
}

export function InstagramComments({ likes, topLikers, comments }: InstagramCommentsProps) {
  return (
    <div className="w-full border-t border-gray-800" style={{ backgroundColor: "#1c1e1c" }}>
      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* Icons */}
        <div className="flex items-center gap-4 mb-3">
          <Heart className="w-7 h-7 text-red-500 fill-red-500" />
          <MessageCircle className="w-7 h-7 text-blue-400" />
          <Send className="w-7 h-7 text-[#D4A574] text-white" />
        </div>

        {/* Likes count */}
        <div className="mb-3">
          <p className="text-white text-sm">
            <span className="font-semibold">{topLikers.join(", ")}</span> e outras{" "}
            <span className="font-semibold">{likes}</span> pessoas curtiram esse post...
          </p>
        </div>

        {/* Comments */}
        <div className="space-y-2">
          {comments.map((comment, index) => (
            <p key={index} className="text-white text-sm leading-relaxed">
              <span className="font-bold text-[#E4E4E4]">{comment.username}:</span>{" "}
              <span className="font-normal">{comment.text}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
