import Page from './Page';
import { pages } from './UI';

export const Book = ({ ...props }) => {
	return (
		<group {...props}>
			{pages.map((pageData, index) =>
				index === 0 ? (
					<Page
						position-x={index * 0.15}
						key={index}
						number={index}
						{...pageData}
					/>
				) : null
			)}
		</group>
	);
};
