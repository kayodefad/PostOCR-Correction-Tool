import { useEffect, useState } from 'react';
import axios from 'axios';
import Backdrop from '../components/Backdrop';
import CloseIcon from '../components/CloseIcon';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [imageList, setImageList] = useState([]);
	const [urlParams, setUrlParams] = useState({ year: '', month: '' });

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleMonthClick = async (year, month) => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				'http://127.0.0.1:5000/?action=list_month_images',
				{
					year,
					month,
				}
			);
			setImageList(data.image_list);
			setUrlParams({ year, month });
			setLoading(false);
			setShowModal(true);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const { data } = await axios.post(
					'http://127.0.0.1:5000/?action=list_years',
					{}
				);
				setData(Object.entries(data.years));
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			{loading && <Loading />}
			<div className=''>
				<h2 className='text-lg text-[#19557c] font-bold'>
					Data month-by-month
				</h2>
				<p className='text-gray-700 mt-4'>
					The observations were published as printed tables, each table
					containing data for one calendar month.
				</p>
				<div className='mt-4'>
					{data.map((el, i) => {
						return (
							<div
								key={i}
								className='flex gap-4 border-b-[1px] border-[#ddd] py-2 pr-2 w-fit'
							>
								<div>{el[0]}</div>
								<div className='flex gap-4'>
									{el[1].map((ele, i) => {
										return (
											<div
												onClick={() =>
													handleMonthClick(el[0], ele.toLowerCase())
												}
												key={i}
												className='relative'
											>
												<p className='text-[#cc7d06] underline cursor-pointer hover:transition-all hover:font-semibold flex items-center'>
													<span>{ele}</span>
												</p>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
				<Backdrop
					show={showModal}
					handleClose={handleCloseModal}
					classNames='flex items-center justify-center'
				>
					<div className='relative'>
						<div className='w-[700px] h-[400px] bg-white p-5 overflow-auto'>
							<h3 className='text-center mb-3 text-gray-700 font-semibold'>
								{`${urlParams.month.toUpperCase()} ${urlParams.year} IMAGES`}
							</h3>
							<div className='grid grid-cols-5 gap-4'>
								{imageList.map((el, i) => {
									return (
										<div
											onClick={() => {
												navigate(
													`/result?year=${urlParams.year}&month=${urlParams.month}&page=${el}`
												);
											}}
											className='text-sm text-[#cc7d06] underline cursor-pointer'
											key={i}
										>
											{el}
										</div>
									);
								})}
							</div>
						</div>
						<div
							onClick={handleCloseModal}
							className='absolute top-5 right-6 cursor-pointer'
						>
							<CloseIcon />
						</div>
					</div>
				</Backdrop>
			</div>
		</>
	);
};

export default Home;
