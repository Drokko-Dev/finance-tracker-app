import { LogoSVG } from "@/assets/svg";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
}

export const LoadingSpinner = ({
  fullScreen = false,
  message,
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center transition-colors duration-300 ${
        fullScreen ? "h-screen w-full bg-main-bg" : "h-full w-full"
      }`}
    >
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-border-subtle rounded-full"></div>
        <div className="w-16 h-16 border-2 border-t-accent border-transparent rounded-full animate-spin absolute top-0"></div>
        <div className="absolute animate-pulse">
          <LogoSVG className="w-6 h-6 text-accent" />
        </div>
      </div>

      {message && (
        <span className="mt-6 text-text-subtle font-medium tracking-tight animate-pulse">
          {message}
        </span>
      )}
    </div>
  );
};
