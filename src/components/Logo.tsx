import logoImage from '@/assets/logo.jpeg';
interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}
const Logo = ({
  className = '',
  size = 'md'
}: LogoProps) => {
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-14 w-14',
    lg: 'h-16 w-16'
  };
  return <div className={`${className} animate-float`}>
      
    </div>;
};
export default Logo;