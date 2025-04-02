import React, { ReactNode } from 'react';

interface CardProps {
    title?: string;
    subtitle?: string;
    children: ReactNode;
    footerContent?: ReactNode;
    imgSrc?: string;
    imgAlt?: string;
    className?: string;
    onClick?: () => void;
    elevation?: 'none' | 'low' | 'medium' | 'high';
    variant?: 'default' | 'outlined' | 'filled';
    showFooterButton?: boolean;
    footerButtonText?: string;
    onFooterButtonClick?: () => void;
    price?: number;
}

const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    children,
    footerContent,
    imgSrc,
    imgAlt,
    className = '',
    onClick,
    elevation = 'low',
    variant = 'default',
    showFooterButton = false,
    footerButtonText = 'View Details',
    onFooterButtonClick,
    price,
}) => {
    // Define elevation classes
    const elevationClasses = {
        none: '',
        low: 'shadow',
        medium: 'shadow-md',
        high: 'shadow-lg',
    };

    // Define variant classes
    const variantClasses = {
        default: 'bg-grey-800',
        outlined: 'bg-white border border-gray-200',
        filled: 'bg-gray-50',
    };

    const defaultFooterButton = (
        <button
            className="flex items-center justify-end text-blue-400 hover:text-blue-300 transition-colors"
            onClick={(e) => {
                e.stopPropagation();
                onFooterButtonClick?.();
            }}
        >
            <span className="mr-2">{footerButtonText}</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            </svg>
        </button>
    );

    return (
        <div
            className={`rounded-lg overflow-hidden p-4 relative ${elevationClasses[elevation]} ${variantClasses[variant]} ${className} ${onClick ? 'cursor-pointer transition-transform hover:scale-105' : ''}`}
            onClick={onClick}
        >
            {price !== undefined && (
                <div className="absolute top-15 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ₹{price}
                </div>
            )}

            {imgSrc && (
                <div className="w-full">
                    <img src={imgSrc} alt={imgAlt || 'Card image'} className="w-full h-48 object-cover" />
                </div>
            )}

            <div className="p-4">
                {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
                {subtitle && <h4 className="text-sm text-gray-600 mb-3">{subtitle}</h4>}

                <div className="mb-4">
                    {children}
                </div>

                {(footerContent || showFooterButton) && (
                    <div className="pt-3 border-t border-gray-100">
                        {footerContent || (showFooterButton && defaultFooterButton)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;