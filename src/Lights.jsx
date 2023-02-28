export default function Lights() {
  return <>
    <pointLight intensity={ 1 } position={[-5, 3, -5]} color="blue" castShadow />
    <pointLight intensity={ 0.5   } position={[0, 3, 0]} color="pink" castShadow />
    <pointLight intensity={ 1 } position={[-7, 2, 0]} color="mediumpurple" castShadow />
    <ambientLight intensity={ 0.10 }/>
  </>
}