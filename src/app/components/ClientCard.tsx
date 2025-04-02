'use client';

import Card from './Goalcard';

interface ClientCardProps {
    className?: string;
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    showFooterButton?: boolean;
    footerButtonText?: string;
    onFooterButtonClick?: () => void;
    price?: number;
}

export default function ClientCard(props: ClientCardProps) {
    return (
        <Card {...props} />
    );
} 