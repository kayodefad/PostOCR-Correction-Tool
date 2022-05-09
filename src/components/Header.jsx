import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div className='sticky top-0 h-16 bg-blue-900 text-white flex items-center'>
			<div className='w-9/10 max-w-[700px] ml-20 font-bold text-xl'>
				<Link to='/'>PostOCR-Correction-Tool</Link>
			</div>
		</div>
	);
};

export default Header;
