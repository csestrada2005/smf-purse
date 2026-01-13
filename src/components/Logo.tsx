import logoImage from '@/assets/logo.jpeg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  };

  return (
    <div className={`${className} animate-float`}>
      <img 
        src={logoImage} 
        alt="Brand Logo" 
        className={`${sizeClasses[size]} object-contain rounded-full shadow-gold`}
      />
    </div>
  );
};

export default Logo;
