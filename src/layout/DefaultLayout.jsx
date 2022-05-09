import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const DefaultLayout = () => {
	return (
		<>
			<Header />
			<div className='mt-8 px-20 mx-auto overflow-auto'>
				<Outlet />
			</div>
		</>
	);
};

export default DefaultLayout;
