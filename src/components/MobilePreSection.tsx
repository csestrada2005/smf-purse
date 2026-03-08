import { FullPageSection } from './FullPageScroll';

interface MobilePreSectionProps {
  title: string;
  image: string;
  id?: string;
}

const MobilePreSection = ({ title, image, id }: MobilePreSectionProps) => {
  return (
    <FullPageSection id={id} className="relative">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <h2 className="font-editorial text-4xl sm:text-5xl text-white uppercase tracking-[0.08em] text-center drop-shadow-lg">
          {title}
        </h2>
      </div>
    </FullPageSection>
  );
};

export default MobilePreSection;
