import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface CustomImageProps extends Omit<ImageProps, 'alt' | 'className'> {
  alt: string;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  quality?: number;
  fill?: boolean;
  overlay?: boolean;
}

export function CustomImage({
  src,
  alt,
  className = '',
  priority = false,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 80,
  fill = false,
  overlay = false,
  ...props
}: CustomImageProps) {
  return (
    <div className={cn('relative overflow-hidden', !fill && 'w-full h-full')}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        className={cn(
          'object-cover transition-transform duration-300',
          !priority && 'hover:scale-105',
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
