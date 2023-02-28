import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { Camera } from 'three'

THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const floorMaterial = new THREE.MeshStandardMaterial({ color: 'lightgrey' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'pink' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'skyblue' })

const BlockStart = ({ position = [ 0, 0, 0 ] }) => {
	return <group position={ position }>
		<mesh
			geometry={ boxGeometry }
			material={ floorMaterial }
			position={ [ 0, -0.1, 0 ] }
			scale={ [ 4, 0.2, 4 ] }
			receiveShadow
		/>
	</group>
}

const BlockEmpty = ({ position = [ 0, 0, 0 ] }) => {
	return <group position={ position }>
		<mesh
			geometry={ boxGeometry }
			material={ floorMaterial }
			position={ [ 0, -0.1, 0 ] }
			scale={ [ 4, 0.2, 4 ] }
			receiveShadow
		/>
	</group>
}

const BlockSpinner = ({ position = [ 0, 0, 0 ] }) => {
	const obstacle = useRef()
	const [ speed ] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? - 1 : 1))

	useFrame((state) => {
		const time = state.clock.getElapsedTime()

    const rotation = new THREE.Quaternion()
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
    obstacle.current.setNextKinematicRotation(rotation)
	})

	return <group position={ position }>
		<mesh
			geometry={ boxGeometry }
			material={ floorMaterial }
			position={ [ 0, - 0.1, 0 ] }
			scale={ [ 4, 0.2, 4 ] }
			receiveShadow
		/>
		<RigidBody ref={ obstacle } type="kinematicPosition" position={ [ 0, 0.3, 0 ] } restitution={ 0.2 } friction={ 0 }>
			<mesh
				geometry={ boxGeometry }
				material={ obstacleMaterial }
				scale={ [ 3.5, 0.3, 0.3 ] }
				castShadow
				receiveShadow
			/>
		</RigidBody>
	</group>
}

const BlockLimbo = ({ position = [ 0, 0, 0 ] }) =>{
    const obstacle = useRef()
		const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2)

		useFrame((state) => {
			const time = state.clock.getElapsedTime()
	
			const y = Math.sin(time + timeOffset) + 1.15
			obstacle.current.setNextKinematicTranslation({ x: position[0], y: position[1] + y, z: position[2] })
		})

    return <group position={ position }>
			<mesh geometry={ boxGeometry } material={ floorMaterial } position={ [ 0, - 0.1, 0 ] } scale={ [ 4, 0.2, 4 ] }  receiveShadow />
			<RigidBody ref={ obstacle } type="kinematicPosition" position={ [ 0, 0.3, 0 ] } restitution={ 0.2 } friction={ 0 }>
				<mesh
					geometry={ boxGeometry }
					material={ obstacleMaterial }
					scale={ [ 3.5, 0.3, 0.3 ] }
					castShadow
					receiveShadow
				/>
			</RigidBody>
    </group>
}

const BlockAxe = ({ position = [ 0, 0, 0 ] }) =>{
	const obstacle = useRef()
	const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2)

	useFrame((state) => {
		const time = state.clock.getElapsedTime()

    const x = Math.sin(time + timeOffset) * 1.25
    obstacle.current.setNextKinematicTranslation({ x: position[0] + x, y: position[1] + 0.75, z: position[2] })
	})

	return <group position={ position }>
		<mesh geometry={ boxGeometry } material={ floorMaterial } position={ [ 0, - 0.1, 0 ] } scale={ [ 4, 0.2, 4 ] }  receiveShadow />
		<RigidBody ref={ obstacle } type="kinematicPosition" position={ [ 0, 0.3, 0 ] } restitution={ 0.2 } friction={ 0 }>
			<mesh
				geometry={ boxGeometry }
				material={ obstacleMaterial }
				scale={ [ 1.5, 1.5, 0.3 ] }
				castShadow
				receiveShadow
			/>
		</RigidBody>
	</group>
}

const BlockEvent = ({ position = [ 0, 0, 0 ] }) => {
	return <group position={ position }>
		<mesh
			geometry={ boxGeometry }
			material={ floorMaterial }
			position={ [ 0, -0.1, 0 ] }
			scale={ [ 4, 0.2, 4 ] }
			receiveShadow
		/>
	</group>
}

const Bounds = ({ position= [ 0, 0, 0 ], length = 1 }) => {
	return <>
		<RigidBody type="fixed" restitution={ 0.2 } friction={ 0 }>
			<group position={ position }>
				<mesh
					position={ [0, 0.81, 2 * (length - 1) ] }
					geometry={ boxGeometry }
					material={ wallMaterial }
					scale={ [ 0.3, 2, 4 * length ] }
					castShadow
					receiveShadow
				/>
			</group>
		</RigidBody>
	</>
}

const Bounds2 = ({ position= [ 0, 0, 0 ], length = 1 }) => {
	return <>
		<RigidBody type="fixed" restitution={ 0.2 } friction={ 0 }>
			<group position={ position }>
				<mesh
					position={ [2 * (length - 1), 0.81, 0] }
					geometry={ boxGeometry }
					material={ wallMaterial }
					scale={ [ 4 * length, 2, 0.3 ] }
					castShadow
					receiveShadow
				/>
			</group>
		</RigidBody>
	</>
}

export default function Level() {
	// const deg2rad = degrees => degrees * (Math.PI / 180)
	// useFrame((state) => {
	// 	// state.camera.rotation.set(0, 0, 0)
	// 	state.camera.position.set( 6, 18, 7)
	// })

  return <>
		<RigidBody type="fixed" restitution={ 0.2 }
				friction={ 1 }>
			<CuboidCollider args={ [ 8, 0.2, 8] } position={ [ 0, -0.2, 0] }/>
		</RigidBody>

		<BlockStart position={ [ -6, 0, -6 ] } />
		<BlockAxe position={ [ -6, 0, -2 ] } />
		<BlockLimbo position={ [ -6, 0, 2 ] } />
		<BlockSpinner position={ [ -6, 0, 6 ] } />

		<BlockEmpty position={ [ -2, 0, -6 ] } />
		<BlockEmpty position={ [ -2, 0, -2 ] } />
		<BlockEvent position={ [ -2, 0, 2 ] } />
		<BlockSpinner position={ [ -2, 0, 6 ] } />

		<BlockEvent position={ [ 2, 0, -6 ] } />
		<BlockEmpty position={ [ 2, 0, -2 ] } />
		<BlockEmpty position={ [ 2, 0, 2 ] } />
		<BlockEvent position={ [ 2, 0, 6 ] } />

		<BlockEmpty position={ [ 6, 0, -6 ] } />
		<BlockEvent position={ [ 6, 0, -2 ] } />
		<BlockEmpty position={ [ 6, 0, 2 ] } />
		<BlockEmpty position={ [ 6, 0, 6 ] } />

		<Bounds position={ [ -8, 0, -6 ] } length={ 4 } />
		<Bounds position={ [ 8, 0, -6 ] } length={ 4 } />
		<Bounds2 position={ [ -6, 0, -8 ] } length={ 4 } />
		<Bounds2 position={ [ -6, 0, 8 ] } length={ 4 } />

		<Bounds position={ [ -4, 0, -2 ] } length={ 2 } />
		<Bounds2 position={ [-2, 0, 4 ] } length={ 1 } />
  </>
}