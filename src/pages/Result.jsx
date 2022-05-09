import axios from 'axios';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { CSVLink } from 'react-csv';
import BackIcon from '../components/BackIcon';

const Result = () => {
	const [searchParams] = useSearchParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [allTables, setAllTables] = useState([]);

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
				setAllTables(Object.entries(response.data.tables));
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		fetchData();
	}, [searchParams]);

	const handleChange = (e, tableIndex, tabRow, cellValue) => {
		const currentTables = [...allTables];
		currentTables[tableIndex][1][tabRow][cellValue] = e.target.value;
		setAllTables(currentTables);
	};

	const { year, month, page } = Object.fromEntries([...searchParams]);

	return (
		<div>
			{loading && <Loading />}
			{data && (
				<>
					<Link className='mb-3 flex items-center' to='/'>
						<BackIcon />
						<span className='text-[#1e3a8a] text-sm ml-1'>Back</span>
					</Link>
					<div className='w-full'>
						<div className='fixed w-[42%]'>
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
												className='rounded px-2 py-1 border border-[#dcdde1] bg-[#1e3a8a] text-white text-xs hover:opacity-90 hover:transition-opacity'
												onClick={() => resetTransform()}
											>
												RESET
											</button>
										</div>
										<div className='border h-[80vh] overflow-auto'>
											<TransformComponent>
												<img
													className='w-full h-full object-cover'
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
							{allTables.map((table, tableIndex) => {
								return (
									<div key={tableIndex} className='border mb-4 overflow-auto'>
										<h3 className='text-md text-center my-2 font-semibold'>
											Table {tableIndex + 1}
										</h3>
										<>
											<table>
												<tbody>
													{table[1].map((tab, tabRow) => {
														return (
															<tr key={tabRow}>
																{tab.map((cell, cellValue) => {
																	return (
																		<td
																			key={cellValue}
																			className='border border-[#ddd] p-2 text-xs'
																		>
																			<input
																				className='h-7 text-xs border-transparent'
																				type='text'
																				value={
																					allTables[tableIndex][1][tabRow][
																						cellValue
																					]
																				}
																				onChange={(e) =>
																					handleChange(
																						e,
																						tableIndex,
																						tabRow,
																						cellValue
																					)
																				}
																			/>
																		</td>
																	);
																})}
															</tr>
														);
													})}
												</tbody>
											</table>
											<button className='rounded my-4 ml-4 px-2 py-2 border border-[#dcdde1] bg-[#1e3a8a] text-white text-xs hover:opacity-90 hover:transition-opacity'>
												<CSVLink
													filename={`${year}_${month}_${page}_Table_${
														tableIndex + 1
													}.csv`}
													data={allTables[tableIndex][1]}
												>
													Export to CSV
												</CSVLink>
											</button>
										</>
									</div>
								);
							})}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Result;
