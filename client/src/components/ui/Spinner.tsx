interface SpinnerProps {
    variant?: 'light' | 'dark';
    size?: 'sm' | 'md' | 'lg';
}

export default function Spinner({ variant = 'dark', size = 'md' }: SpinnerProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    const colorClasses = {
        light: 'border-white border-t-transparent',
        dark: 'border-gray-800 border-t-transparent',
    };

    return (
        <div
            className={`${sizeClasses[size]} ${colorClasses[variant]} animate-spin rounded-full border-4`}
            role="status"
            aria-label="Loading"
        />
    );
}
