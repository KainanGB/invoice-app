'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import useOutsideClick from '@/hooks/useClickOutside';
import arrowDown from '@/assets/icon-arrow-down.svg';

export default function Filter() {
	const [isShowing, setIsShowing] = useState<boolean>(false);
	const componentRef = useRef();

	const handleOnClick = () => setIsShowing(!isShowing);

	useOutsideClick(componentRef.current!, () => {
		setIsShowing(false);
	});

	return (
		<div ref={componentRef as any} className="relative pr-5">
			<button className="flex items-center" onClick={handleOnClick}>
				<p className="mr-3 text-white font-medium">Filter</p>
				<Image src={arrowDown} alt="filter-toggle-arrow" />
			</button>

			{isShowing && (
				<div className="absolute top-8 right-0 bg-background-dark1 flex flex-col rounded-lg text-white font-medium overflow-hidden">
					<button className="px-10 py-2 hover:bg-gray-space">Draft</button>
					<button className="px-10 py-2 hover:bg-gray-space">Pending</button>
					<button className="px-10 py-2 hover:bg-gray-space">Paid</button>
				</div>
			)}
		</div>
	);
}
