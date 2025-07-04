import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
  variant?: "default" | "dots" | "pulse";
}

export function LoadingSpinner({ 
  size = "md", 
  className, 
  text, 
  variant = "default" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const renderSpinner = () => {
    switch (variant) {
      case "dots":
        return (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        );
      
      case "pulse":
        return (
          <div className={cn(
            "rounded-full bg-blue-600 animate-pulse",
            sizeClasses[size]
          )} />
        );
      
      default:
        return (
          <div className={cn(
            "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
            sizeClasses[size]
          )} />
        );
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {renderSpinner()}
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
}
