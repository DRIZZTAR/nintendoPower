import { useHelper } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import {
	BoxGeometry,
	Vector3,
	Uint16BufferAttribute,
	Float32BufferAttribute,
	Color,
	Bone,
	MeshStandardMaterial,
	Skeleton,
	SkinnedMesh,
	SkeletonHelper,
} from 'three';

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.73; // 4:3 aspect ratio
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 5; // NUmber of bones
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

const pageGeometry = new BoxGeometry(
	PAGE_WIDTH,
	PAGE_HEIGHT,
	PAGE_DEPTH,
	PAGE_SEGMENTS,
	2
);

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skindIndexes = [];
const skinWeights = [];

for (let i = 0; i < position.count; i++) {
	// all vertices
	vertex.fromBufferAttribute(position, i); // get the vertex
	const x = vertex.x; // get the x position of the vertex

	const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH)); // get the skin index
	let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH; // get the skin weight
	// You can push these values to skindIndexes and skinWeights if needed
	skindIndexes.push(skinIndex, skinIndex + 1, 0, 0);
	skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute(
	'skinIndex',
	new Uint16BufferAttribute(skindIndexes, 4)
);

pageGeometry.setAttribute(
	'skinWeight',
	new Float32BufferAttribute(skinWeights, 4)
);

const whiteColor = new Color('white');

const pageMaterials = [
	new MeshStandardMaterial({ color: whiteColor }),
	new MeshStandardMaterial({ color: '#111' }),
	new MeshStandardMaterial({ color: whiteColor }),
	new MeshStandardMaterial({ color: whiteColor }),
	new MeshStandardMaterial({ color: 'pink' }),
	new MeshStandardMaterial({ color: 'blue' }),
];
export default function Page({ number, front, back, ...props }) {
	const group = useRef();

	const skinnedMeshRef = useRef();

	const manualSkinnedMesh = useMemo(() => {
		const bones = [];
		for (let i = 0; i <= PAGE_SEGMENTS; i++) {
			let bone = new Bone();
			bones.push(bone);
			if (i === 0) {
				bone.position.x = 0;
			} else {
				bone.position.x = SEGMENT_WIDTH;
			}
			if (i > 0) {
				bones[i - 1].add(bone); // attach bone to the previous bone
			}
		}

		const skeleton = new Skeleton(bones);

		const materials = pageMaterials;
		const mesh = new SkinnedMesh(pageGeometry, materials);
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.frustumCulled = false;
		mesh.add(skeleton.bones[0]);
		mesh.bind(skeleton);
		return mesh;
	}, []);

	useHelper(skinnedMeshRef, SkeletonHelper, 'red');

	return (
		<group {...props} ref={group}>
			<primitive object={manualSkinnedMesh} ref={skinnedMeshRef} />
		</group>
	);
}
