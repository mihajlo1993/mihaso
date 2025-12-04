"use client"

import { cn } from "@/lib/utils"
import { GradientBackground } from "./gradient-background"
import type { Profile } from "@/lib/data"

interface ProfileAvatarProps {
  profile: Profile
  selected?: boolean
  onClick?: () => void
  size?: "sm" | "md" | "lg"
}

export function ProfileAvatar({ profile, selected, onClick, size = "md" }: ProfileAvatarProps) {
  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-24 h-24 text-3xl",
    lg: "w-32 h-32 text-4xl",
  }

  return (
    <button
      onClick={onClick}
      className={cn("group flex flex-col items-center gap-3 transition-all duration-200", onClick && "cursor-pointer")}
    >
      <GradientBackground
        type={profile.avatarGradient}
        overlay={false}
        className={cn(
          "flex items-center justify-center rounded-md transition-all duration-200",
          sizeClasses[size],
          selected
            ? "ring-2 ring-white ring-offset-2 ring-offset-black"
            : "group-hover:scale-110 group-hover:ring-2 group-hover:ring-white/50 group-hover:shadow-lg group-hover:shadow-white/10",
        )}
      >
        <span className="font-bold text-white drop-shadow-lg">{profile.avatarFace}</span>
      </GradientBackground>
      {size !== "sm" && (
        <div className="text-center">
          <p
            className={cn(
              "font-medium text-gray-400 transition-colors",
              "group-hover:text-white",
              selected && "text-white",
            )}
          >
            {profile.name}
          </p>
          <p className="text-xs text-gray-600">{profile.role}</p>
        </div>
      )}
    </button>
  )
}
