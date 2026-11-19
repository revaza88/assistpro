import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "ui-button inline-flex items-center justify-center gap-2 whitespace-normal text-center text-base font-bold [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "ui-button--primary",
        destructive: "ui-button--destructive",
        outline: "ui-button--outline",
        secondary: "ui-button--secondary",
        ghost: "ui-button--ghost",
        link: "ui-button--link underline-offset-4",
      },
      size: {
        default: "min-h-12 px-4 py-2",
        sm: "min-h-12 rounded-md px-3 py-2",
        lg: "min-h-12 rounded-md px-8 py-3",
        icon: "min-h-12 min-w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
