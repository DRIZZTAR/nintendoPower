import { useAtom } from 'jotai';
import Page from './Page';
import { pages, pageAtom } from './UI';

export const Book = ({ ...props }) => {
	const [page] = useAtom(pageAtom);

	return (
		<group {...props} rotation-y={-Math.PI / 2}>
			{pages.map((pageData, index) => (
				<Page
					key={index}
					page={page}
					number={index}
					{...pageData}
					opened={page > index}
          bookClosed={page === 0 || page === pages.length}
				/>
			))}
		</group>
	);
};
