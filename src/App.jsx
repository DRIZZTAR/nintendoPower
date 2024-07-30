import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Experience } from './components/Experience';
import { UI } from './components/UI';

function App() {
	return (
		<>
			<UI />
			<Loader />
			<Canvas shadows camera={{ position: [-0.5, 2, 4], fov: 55, }}>
				<group position-y={0.1}>
					<Suspense fallback={null}>
						<Experience />
					</Suspense>
				</group>
			</Canvas>
		</>
	);
}

export default App;
