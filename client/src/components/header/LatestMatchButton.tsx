import { Link } from 'react-router-dom';

export default function LatestMatchButton() {
    return (
        <Link
            className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors"
            to="/"
        >
            Latest Match
        </Link>
    );
}
