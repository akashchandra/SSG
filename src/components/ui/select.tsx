import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, helperText, icon: Icon, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label ? (
          <label className="flex items-center gap-2 text-sm font-medium text-foreground" htmlFor={props.id}>
            {Icon ? <Icon className="h-4 w-4 text-muted-foreground" /> : null}
            <span>{label}</span>
          </label>
        ) : null}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronsUpDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        {helperText ? <p className="text-xs text-muted-foreground">{helperText}</p> : null}
      </div>
    );
  }
);
Select.displayName = "Select";
