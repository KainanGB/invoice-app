'use client';

import React, { useEffect, useState } from 'react';
import { reset, select } from '@/redux/features/filter-select.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';

import { FilterOptions } from '@/types';
import Image from 'next/image';
import arrowDown from '@/assets/icon-arrow-down.svg';
import arrowUp from '@/assets/icon-arrow-up.svg';
import { useClickOutside } from '@/hooks/useClickOutside';

export default function Filter() {
	const [arrowImage, setArrowImage] = useState<HTMLImageElement>(arrowDown);
	const [isShowing, setIsShowing] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const selectedFilter = useAppSelector(state => state.filterSelect);
	const componentRef = useClickOutside(() => setIsShowing(false));

	const handleToggleSelect = () => {
		setIsShowing(!isShowing);
	};

	const handleOnClick = (selectValue: FilterOptions) => {
		dispatch(select(selectValue.toLowerCase()));
		setIsShowing(!isShowing);
	};

	useEffect(() => {
		setArrowImage(isShowing ? arrowUp : arrowDown);
	}, [isShowing]);

	return (
		<div ref={componentRef} className="relative pr-5">
			<button className="flex items-center" onClick={handleToggleSelect}>
				<p className="mr-3 text-white font-medium text-sm">Filter</p>
				<Image src={arrowImage} alt="filter-toggle-arrow" />
			</button>

			{isShowing && (
				<div className="absolute top-8 right-0 bg-background-dark1 flex flex-col rounded-lg text-white font-medium overflow-hidden">
					<button
						className={`px-10 py-2 hover:bg-gray-space ${
							selectedFilter.value.toUpperCase() === FilterOptions.DRAFT
								? 'bg-gray-space'
								: 'bg-background-dark1'
						}`}
						onClick={() => handleOnClick(FilterOptions.DRAFT)}
					>
						Draft
					</button>
					<button
						className={`px-10 py-2 hover:bg-gray-space ${
							selectedFilter.value.toUpperCase() === FilterOptions.PENDING
								? 'bg-gray-space'
								: 'bg-background-dark1'
						}`}
						onClick={() => handleOnClick(FilterOptions.PENDING)}
					>
						Pending
					</button>
					<button
						className={`px-10 py-2 hover:bg-gray-space ${
							selectedFilter.value.toUpperCase() === FilterOptions.PAID
								? 'bg-gray-space'
								: 'bg-background-dark1'
						}`}
						onClick={() => handleOnClick(FilterOptions.PAID)}
					>
						Paid
					</button>
				</div>
			)}
		</div>
	);
}
