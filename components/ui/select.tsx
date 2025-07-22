// components/ui/select.tsx
import * as React from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export interface SelectProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ className, children, id, value, onChange, options = [], placeholder = "Select an option...", disabled = false, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value || '');
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    // Parse options from children if options prop is not provided
    const parsedOptions = React.useMemo(() => {
      if (options.length > 0) return options;
      
      const childOptions: SelectOption[] = [];
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === 'option') {
          const props = child.props as { value?: string; children?: React.ReactNode; disabled?: boolean };
          childOptions.push({
            value: props.value || '',
            label: typeof props.children === 'string' ? props.children : String(props.children || ''),
            disabled: props.disabled || false
          });
        }
      });
      return childOptions;
    }, [children, options]);

    const selectedOption = parsedOptions.find(option => option.value === selectedValue);

    // Handle click outside to close dropdown
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    // Handle keyboard navigation
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!isOpen) return;

        switch (event.key) {
          case 'Escape':
            setIsOpen(false);
            buttonRef.current?.focus();
            break;
          case 'ArrowDown':
            event.preventDefault();
            // Focus next option
            break;
          case 'ArrowUp':
            event.preventDefault();
            // Focus previous option
            break;
          case 'Enter':
          case ' ':
            event.preventDefault();
            // Select focused option
            break;
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      }
    }, [isOpen]);

    // Update internal state when value prop changes
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleSelect = (optionValue: string) => {
      setSelectedValue(optionValue);
      setIsOpen(false);
      onChange?.(optionValue);
      buttonRef.current?.focus();
    };

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    return (
      <div ref={ref} className="relative w-full" {...props}>
        <button
          ref={buttonRef}
          id={id}
          type="button"
          className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-accent hover:text-accent-foreground'
          } ${className || ''}`}
          onClick={handleToggle}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={id ? `${id}-label` : undefined}
        >
          <span className="flex items-center gap-2 flex-1 text-left overflow-hidden">
            {selectedOption?.icon && (
              <span className="text-lg flex-shrink-0" aria-hidden="true">
                {selectedOption.icon}
              </span>
            )}
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </span>
          <ChevronDown 
            className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95">
            <div role="listbox" className="p-1">
              {parsedOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">No options available</div>
              ) : (
                parsedOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={selectedValue === option.value}
                    className={`flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm cursor-pointer transition-colors ${
                      option.disabled 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none'
                    } ${selectedValue === option.value ? 'bg-accent text-accent-foreground' : ''}`}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    disabled={option.disabled}
                  >
                    {option.icon && (
                      <span className="text-lg flex-shrink-0" aria-hidden="true">
                        {option.icon}
                      </span>
                    )}
                    <span className="flex-1 text-left truncate">{option.label}</span>
                    {selectedValue === option.value && (
                      <Check className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };