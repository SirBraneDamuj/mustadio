import classnames from 'classnames';

interface BraveFaithProps {
    brave: number;
    faith: number;
}

export default function BraveFaith({ brave, faith }: BraveFaithProps) {
    const bfClasses = (val: number) => classnames({
        notable: val < 50 || val > 70,
    });

    return (
        <div className='flex-grow'>
            <span className={bfClasses(brave)}>B: {brave}</span>
            <span> / </span>
            <span className={bfClasses(faith)}>F: {faith}</span>
        </div>
    );
}
