import * as React from "react"
import PropTypes from 'prop-types'
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))

Card.propTypes = {
  className: PropTypes.string
}

Card.defaultProps = {
  className: ''
}

Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))

CardHeader.propTypes = {
  className: PropTypes.string
}

CardHeader.defaultProps = {
  className: ''
}

CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))

CardTitle.propTypes = {
  className: PropTypes.string
}

CardTitle.defaultProps = {
  className: ''
}

CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))

CardDescription.propTypes = {
  className: PropTypes.string
}

CardDescription.defaultProps = {
  className: ''
}

CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))

CardContent.propTypes = {
  className: PropTypes.string
}

CardContent.defaultProps = {
  className: ''
}

CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))

CardFooter.propTypes = {
  className: PropTypes.string
}

CardFooter.defaultProps = {
  className: ''
}

CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }