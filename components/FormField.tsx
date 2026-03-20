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

const FormField: React.FC<FormFieldProps> = ({ label, name, id, required, error, children }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-bold text-gray-700 dark:text-stone-300 mb-2 ml-1">
                {label} {required && <span className="text-burnt-orange dark:text-orange-400">*</span>}
            </label>
            {children}
            {error && (
                <p className="mt-2 ml-1 text-sm text-red-600 dark:text-red-400 font-medium flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1.5" strokeWidth={2} />
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormField;
