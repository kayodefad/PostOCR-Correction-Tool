import axios from 'axios';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';

const Result = () => {
	const [searchParams] = useSearchParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const { year, month, page } = Object.fromEntries([...searchParams]);
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await axios.post(
					'http://127.0.0.1:5000/?action=fetch_image',
					{
						month,
						year,
						image: page,
					}
				);
				console.log(response.data);
				setData(response.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		fetchData();
	}, [searchParams]);

	return (
		<>
			{loading && <Loading />}
			{data && (
				<>
					<div className='w-1/2'>
						<TransformWrapper
							initialScale={1}
							initialPositionX={0}
							initialPositionY={0}
						>
							{({ zoomIn, zoomOut, resetTransform, ...rest }) => (
								<>
									<div className='tools flex gap-4 mb-2'>
										<button
											className='rounded px-2 py-1 border border-[#1e3a8a] bg-[#1e3a8a] text-white text-xs hover:opacity-90 hover:transition-opacity'
											onClick={() => zoomIn()}
										>
											ZOOM IN +
										</button>
										<button
											className='rounded px-2 py-1 border border-[#1e3a8a] bg-[#1e3a8a] text-white text-xs hover:opacity-90 hover:transition-opacity'
											onClick={() => zoomOut()}
										>
											ZOOM OUT -
										</button>
										<button
											className='rounded px-2 py-1 border border-[#1e3a8a] bg-[#1e3a8a] text-white text-xs hover:opacity-90 hover:transition-opacity'
											onClick={() => resetTransform()}
										>
											RESET
										</button>
									</div>
									<div className='border border-[#1e3a8a]'>
										<TransformComponent>
											<img
												className='w-full'
												src={data.image_url}
												alt='document page'
											/>
										</TransformComponent>
									</div>
								</>
							)}
						</TransformWrapper>
					</div>
				</>
			)}
		</>
	);
};

export default Result;
