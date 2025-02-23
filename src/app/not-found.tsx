'use client';
import FuzzyText from '@/components/blocks/TextAnimations/FuzzyText';

export default async function NotFound() {
  return (
    <div className={'w-full h-full flex items-center justify-center'}>
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
        404
      </FuzzyText>
    </div>
  );
}
