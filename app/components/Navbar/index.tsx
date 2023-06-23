'use client';

import Image from 'next/image';
import headerLogo from '@/assets/header-logo.svg';
import themeToggle from '@/assets/icon-sun.svg';
import profileIcon from '@/assets/logo.svg';

export default function Navbar() {
	return (
		<nav className="flex w-screen  bg-background-dark1">
			<div className="flex justify-between w-full">
				<Image src={headerLogo} height={70} alt="App logo" />
				<button className="self-center mr-6">
					<Image src={themeToggle} alt="Toggle dark mode" />
				</button>
			</div>
			<div className="flex border-l border-gray-space px-8">
				<button className="self-center">
					<Image src={profileIcon} alt="Profile Image" />
				</button>
			</div>
		</nav>
	);
}
