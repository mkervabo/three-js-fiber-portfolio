import * as THREE from 'three'
import { useRapier, RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useEffect, useState, useRef } from 'react'
import { useKeyboardControls } from '@react-three/drei'



export default function Player() {
	const [ subscribeKeys, getKeys ] = useKeyboardControls()
	const body = useRef()
	const { rapier, world } = useRapier()
	const rapierWorld = world.raw()

	const jump = () =>{
		const origin = body.current.translation()
    origin.y -= 0.31
    const direction = { x: 0, y: - 1, z: 0 }
    const ray = new rapier.Ray(origin, direction)
		const hit = rapierWorld.castRay(ray, 10, true)

    if(hit.toi < 0.15)
        body.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
	}
	useEffect(() =>{
		const unsubscribeJump = subscribeKeys(
			(state) => state.jump,
			(value) =>{
				if(value)
					jump()
			}
		)

		return () => unsubscribeJump()
	}, [])

	useFrame((state, delta) => {

		/**
		 * Controls
		 */

		const { forward, backward, leftward, rightward } = getKeys()
    
		const impulse = { x: 0, y: 0, z: 0 }
    const torque = { x: 0, y: 0, z: 0 }

    const impulseStrength = 0.25 * delta
    const torqueStrength = 0.25 * delta

		if(forward)
    {
        impulse.z -= impulseStrength
        torque.x -= torqueStrength
    }

    if(rightward)
    {
        impulse.x += impulseStrength
        torque.z -= torqueStrength
    }

    if(backward)
    {
        impulse.z += impulseStrength
        torque.x += torqueStrength
    }
    
    if(leftward)
    {
        impulse.x -= impulseStrength
        torque.z += torqueStrength
    }

		body.current.applyImpulse(impulse)
    body.current.applyTorqueImpulse(torque)
	})

	return <>
		<RigidBody
			ref={ body }
			colliders="ball"
			restitution={ 0.2 }
			friction={ 1 } 
			linearDamping={ 0.2 }
			angularDamping={ 0.2 }
			position={ [ 0, 1, 0 ] }
		>
				<mesh castShadow receiveShadow>
						<icosahedronGeometry args={ [ 0.3, 1 ] } />
						<meshStandardMaterial flatShading color="white" />
				</mesh>
		</RigidBody>
</>
}