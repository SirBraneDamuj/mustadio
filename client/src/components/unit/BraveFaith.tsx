interface BraveFaithProps {
    brave: number;
    faith: number;
}

export default function BraveFaith({ brave, faith }: BraveFaithProps) {
    const isNotable = (val: number) => val < 50 || val > 70;

    return (
        <div>
            <span className={isNotable(brave) ? 'font-bold' : ''}>B: {brave}</span>
            <span> / </span>
            <span className={isNotable(faith) ? 'font-bold' : ''}>F: {faith}</span>
        </div>
    );
}
