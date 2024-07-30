import React, { useState } from 'react';
import {
	Environment,
	Float,
	OrbitControls,
	PresentationControls,
	Stage,
	Html,
} from '@react-three/drei';
import { Book } from './Book';

export const Experience = () => {
	const [showEnvironment, setShowEnvironment] = useState(false);

	// const [hidden, set] = useState(false);

	const toggleEnvironment = () => {
		setShowEnvironment(prevState => !prevState);
	};

	return (
		<>
			{/* <Html
				position={[0, 1.4, -1]}
				occlude
				onOcclude={set}
				style={{
					transition: 'all 0.5s',
					opacity: hidden ? 0 : 1,
					transform: `scale(${hidden ? 0.5 : 1})`,
				}}
			>
				<div className='relative'>
					<button
						className='px-4 py-2 bg-slate-700/20 text-white rounded-lg shadow-lg hover:bg-slate-900/40 focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all'
						onClick={toggleEnvironment}
					>
						Environment
					</button>
				</div>
			</Html> */}
			<Float
				rotation-x={-Math.PI / 4}
				floatIntensity={1}
				speed={0.4}
				rotationIntensity={2}
			>
				{/* <PresentationControls
          enabled={true} // the controls can be disabled by setting this to false
          global={false} // Spin globally or by dragging the model
          cursor={true} // Whether to toggle cursor style on drag
          snap={true} // Snap-back to center (can also be a spring config)
          speed={1.5} // Speed factor
          rotation={[0, 0, 0]} // Default rotation
          polar={[0, Math.PI / 1]} // Vertical limits
          azimuth={[-Infinity, Infinity]} // Horizontal limits
          config={{ mass: 1, tension: 170, friction: 45 }} // Spring config
        > */}
				<Book />
				{/* </PresentationControls> */}
			</Float>
			<OrbitControls
				makeDefault
				minDistance={1}
				maxDistance={8}
				enableZoom={true}
				enablePan={false}
			/>
			{/* {showEnvironment &&  */}
				<Environment preset='night' />
			{/* } */}
			<directionalLight
				position={[2, 5, 2]}
				intensity={2}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				shadow-bias={-0.0001}
			/>
			<mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
				<planeGeometry args={[100, 100]} />
				<shadowMaterial transparent opacity={0.3} />
			</mesh>
		</>
	);
};
