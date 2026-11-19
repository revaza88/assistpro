import { brandLogo } from '@shared/brand';

export default function BrandLogo({ footer = false }: { footer?: boolean }) {
  return <img className="brand-logo" src={brandLogo.src}
    alt={brandLogo.alt} width={brandLogo.width} height={brandLogo.height}
    loading={footer ? 'lazy' : 'eager'} decoding="async" />;
}
