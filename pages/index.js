import SignUp from "../Components/Login";



export default function Home(props) {
  const {signUp} = props
  return (
    <>
      <SignUp value={signUp}/>
    </>
  )
}
export async function getStaticProps(){
  return {
    props:{
signUp:'Sign Up'
    }
  }
}
