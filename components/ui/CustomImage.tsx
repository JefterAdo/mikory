import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import React from 'react';

interface CustomImageProps extends Omit<ImageProps, 'alt' | 'className'> {
  alt: string;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  quality?: number;
  fill?: boolean;
  overlay?: boolean;
  containerClassName?: string;
  disableHoverEffect?: boolean;
}

function CustomImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 80,
  fill = false,
  overlay = false,
  disableHoverEffect = false,
  ...props
}: CustomImageProps): JSX.Element {
  return (
    <div 
      className={cn(
        'relative overflow-hidden', 
        !fill && 'w-full h-full',
        containerClassName
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        className={cn(
          'object-cover transition-transform duration-300',
          !disableHoverEffect && 'hover:scale-105',
          className
        )}
        priority={priority}
        loading={loading}
        quality={quality}
        {...props}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      )}
    </div>
  );
}

export default CustomImage;
