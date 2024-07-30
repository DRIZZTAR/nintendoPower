import {
	Environment,
	Float,
	OrbitControls,
	PresentationControls,
	Stage,
} from '@react-three/drei';
import { Book } from './Book';

export const Experience = () => {
	return (
		<>
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
				minDistance={2}
				maxDistance={10}
				enableZoom={true}
				enablePan={false}
			/>
			<Environment preset='city' />
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
