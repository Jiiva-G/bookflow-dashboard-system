
import { Switch } from "@/components/ui/switch";

type AnimatedToggleProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
};

export function AnimatedToggle({ 
  checked, 
  onCheckedChange,
  label,
  description,
  size = "md"
}: AnimatedToggleProps) {
  // Size classes for different toggle sizes
  const getSizeClasses = () => {
    switch(size) {
      case "sm": return "scale-75 transform-origin-left";
      case "lg": return "scale-110 transform-origin-left";
      default: return "";
    }
  };

  return (
    <div className="flex items-center gap-3 group">
      <div className={`${getSizeClasses()}`}>
        <Switch 
          checked={checked} 
          onCheckedChange={onCheckedChange}
          className={`
            relative transition-all duration-300 ease-in-out
            data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500
            group-hover:shadow-md
          `}
        />
      </div>
      {(label || description) && (
        <div className="transition-opacity duration-200 group-hover:opacity-90">
          {label && <div className="font-medium text-sm">{label}</div>}
          {description && <div className="text-xs text-gray-500">{description}</div>}
        </div>
      )}
    </div>
  );
}

export default AnimatedToggle;
