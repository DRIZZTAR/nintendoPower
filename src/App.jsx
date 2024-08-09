import { AsciiRenderer, Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Experience } from './components/Experience';
import { UI } from './components/UI';
import { Analytics } from '@vercel/analytics/react';

function App() {
	return (
		<>
			<UI />
			<Loader />
			<Canvas shadows camera={{ position: [-0.5, 2, 4], fov: 35 }}>
				<group position-y={0.1}>
					<Suspense fallback={null}>
						<Experience />
					</Suspense>
				</group>
			</Canvas>
			<Analytics />
		</>
	);
}

export default App;
