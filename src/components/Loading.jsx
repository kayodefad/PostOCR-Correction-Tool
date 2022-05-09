import loader from '../assets/images/loader.gif';

const Loading = () => {
	return (
		<div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-[0.3] z-10'>
			<div className='w-full h-full flex items-center justify-center'>
				<img className='w-12' src={loader} alt='loader gif' />
			</div>
		</div>
	);
};

export default Loading;
