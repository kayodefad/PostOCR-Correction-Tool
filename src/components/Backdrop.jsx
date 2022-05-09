import { useRef } from 'react';

const Backdrop = ({ children, show, handleClose, classNames }) => {
	const bgRef = useRef();

	const closeModal = (e) => {
		if (e.target === bgRef.current) {
			handleClose();
		}
	};

	return (
		<>
			{show && (
				<div
					ref={bgRef}
					onClick={closeModal}
					className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-[0.3] z-10 ${classNames}`}
				>
					{children}
				</div>
			)}
		</>
	);
};

export default Backdrop;
