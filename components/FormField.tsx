import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
    label: React.ReactNode;
    name: string;
    id: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
}

// ⚡ Bolt Optimization: Wrapped FormField in React.memo() to prevent unnecessary re-renders.
// In forms with multiple fields (like ContactForm), typing in one field updates parent state
// and previously caused all unmemoized FormField components to re-render.
const FormField: React.FC<FormFieldProps> = React.memo(({ label, name, id, required, error, children }) => {
    const errorId = `${id}-error`;
    const childWithA11y = React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
            'aria-invalid': !!error,
            'aria-describedby': error ? errorId : undefined,
          })
        : children;

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-bold text-gray-700 dark:text-stone-300 mb-2 ml-1">
                {label} {required && <span className="text-burnt-orange dark:text-orange-400">*</span>}
            </label>
            {childWithA11y}
            <div aria-live="polite">
                {error && (
                    <div id={errorId} className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
});

FormField.displayName = 'FormField';

export default FormField;
