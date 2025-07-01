import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export function getRoleBadgeClass(role: string) {
  switch (role?.toLowerCase()) {
    case 'admin':
      return 'bg-yellow-400 text-yellow-900 border-yellow-400'; // gold
    case 'technician':
      return 'bg-blue-100 text-blue-700 border-blue-100'; // tech (current)
    case 'staff':
      return 'bg-purple-200 text-purple-800 border-purple-200'; // purple
    case 'student':
      return 'bg-green-100 text-green-700 border-green-100'; // green
    default:
      return 'bg-gray-200 text-gray-700 border-gray-200';
  }
}

export { Badge, badgeVariants }
