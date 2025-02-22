import FuzzyText from "@/components/blocks/TextAnimations/FuzzyText";

export default async function NotFound() {
    return (
        <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
            404
        </FuzzyText>
    )
}