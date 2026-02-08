import { Modal } from '../ui';

interface ContactModalProps {
    show: boolean;
    onHide: () => void;
}

function ContactModal({ show, onHide }: ContactModalProps) {
    return (
        <Modal show={show} onHide={onHide} title="Contact" size="lg">
            <p className="text-gray-700 leading-relaxed">
                Mustadio is open source, but primarily maintained and hosted by SirBraneDamuj<br/>
                If you have any issues using the site or have feature requests, feel free to create issues on github.<br/>
                You can also usually find me on the official FFTBG discord #development channel. Ping me @SirBraneDamuj#0001<br/>
                If all else fails, you can email me zpthacker@gmail.com
            </p>
        </Modal>
    );
}

export default ContactModal;
