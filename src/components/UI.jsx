import { atom, useAtom } from 'jotai';
import { pictures } from './bookData.js';
import { useEffect, useState } from 'react';
import ScrollingText from './ScrollingText.jsx';

export const pageAtom = atom(0);
// Function to determine if a page should be a web page
const isWebPage = (index) => {
  // Example: Make every 5th page a web page
  return (index % 5 === 0 && index !== 0 && index !== pictures.length - 1);
};

// Function to get web URL for a page
const getWebUrl = (index) => {
  // Example: Rotate through a set of URLs
  const urls = ['https://www.tysonskakun.dev'];
  return urls[index % urls.length];
};

export const pages = [
  {
    front: 'cover',
    back: pictures[0],
  },
];

for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
    isWebPage: isWebPage(i),
    webUrl: isWebPage(i) ? getWebUrl(i) : undefined,
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: 'back',
});

export const UI = ({ toggleEnvironment, showEnvironment }) => {
	const [page, setPage] = useAtom(pageAtom);
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = event => {
			if (
				menuOpen &&
				!event.target.closest('.menu') &&
				!event.target.closest('.hamburger')
			) {
				closeMenu();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [menuOpen]);

	useEffect(() => {
		const audio = new Audio('/audios/page-flip-01a.mp3');
		audio.volume = 0.3;
		audio.play();
	}, [page]);

	return (
		<>
			<main className='pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col'>
				<div className='p-5 pointer-events-auto'>
					<h1 className='text-5xl font-light'>
						BATMAN <span className='text-xl'>2011</span>
					</h1>
					<p className='text-3xl font-light'>issue #01</p>
					<a
						className='text-red-900 font-medium'
						href='https://www.TysonSkakun.dev'
						target='_blank'
					>
						TysonSkakun.Dev
					</a>
				</div>
				<div className='w-full overflow-auto pointer-events-auto flex justify-center'>
					<div className='overflow-auto flex items-center gap-4 max-w-full p-5'>
						{[...pages].map((_, index) => (
							<button
								key={index}
								className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
									index === page
										? 'bg-white/90 text-black'
										: 'bg-black/30 text-white'
								}`}
								onClick={() => setPage(index)}
							>
								{index === 0 ? 'Cover' : `Page ${index}`}
							</button>
						))}
						<button
							className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
								page === pages.length
									? 'bg-white/90 text-black'
									: 'bg-black/30 text-white'
							}`}
							onClick={() => setPage(pages.length)}
						>
							Back Cover
						</button>
					</div>
				</div>
			</main>

			{/* <ScrollingText /> */}
			<div
				className={`hamburger ${menuOpen ? 'active' : ''}`}
				onClick={toggleMenu}
			>
				<div />
				<div />
				<div />
			</div>
			<div className={`menu ${menuOpen ? 'active' : ''}`}>
				<div className='menu-close' onClick={closeMenu}></div>
				<div className='menu-content p-10'>
					<div className='menu-item font-extrabold'>
						<a
							href='https://www.linkedin.com/in/tyson-skakun-tail/'
							target='_blank'
							rel='noopener noreferrer'
						>
							Hire Me
						</a>
					</div>
					<div className='menu-item font-bold'>Issues</div>
					<div className='menu-item font-bold'>Need to Buy</div>
					<div className='menu-item font-bold'>Bat Services</div>
				</div>
			</div>
		</>
	);
};
