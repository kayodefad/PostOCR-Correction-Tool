import axios from 'axios';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';

const Result = () => {
	const [searchParams] = useSearchParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	let allTables = [];

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
				setData(response.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		fetchData();
	}, [searchParams]);

	if (data) {
		allTables = Object.entries(data.tables);
	}

	return (
		<div>
			{loading && <Loading />}
			{data && (
				<div className='w-full'>
					<div className='fixed w-[40%]'>
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
									<div className='border'>
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
					{/* Tables */}
					<div className='ml-[50%] w-[50%] overflow-auto'>
						{allTables.map((table, i) => {
							return (
								<div key={i} className='border mb-4 overflow-auto'>
									<h3 className='text-md text-center my-2 font-semibold'>
										Table {i + 1}
									</h3>
									<table>
										<tbody>
											{table[1].map((tab, i) => {
												return (
													<tr key={i}>
														{tab.map((t, i) => {
															return (
																<td
																	key={i}
																	className='border border-[#ddd] p-2 text-xs'
																>
																	{t}
																</td>
															);
														})}
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default Result;
