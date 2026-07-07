import { Modal } from '../ui';

interface ChangelogModalProps {
    show: boolean;
    onHide: () => void;
}

function ChangelogModal({ show, onHide }: ChangelogModalProps) {
    return (
        <Modal show={show} onHide={onHide} title="What's New" size="lg">
            <section className="text-gray-700 dark-theme:text-gray-200 leading-relaxed">
                <h3 className="text-lg font-semibold mb-2">July 7, 2026</h3>
                <ul className="list-disc ps-5">
                    <li>
                        The &quot;Notables&quot; feature, which shows certain items and abilities with bold text, is now controlled by <em>you</em>! Simply click any ability or item to have it permanently marked as &quot;notable&quot; for you. This is stored locally on your browser.
                    </li>
                </ul>
            </section>
        </Modal>
    );
}

export default ChangelogModal;
