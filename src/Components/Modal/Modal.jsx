import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className='modal-title-btn'>
                    <p className="modal-title" >{title} </p>
                    <button className="modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>

                {children}

                <div className='cancel-save-btn'>
                    <button className='cancel-btn' onClick={onClose}> Cancel </button>
                    <button className='save-btn' > Save </button>
                </div>

            </div>
        </div>
    );
};

export default Modal;
