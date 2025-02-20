import { Container } from "react-bootstrap"
import { Outlet } from "react-router"
import { Header } from "./components/Header/Header"
import { Footer } from "./components/Footer/Footer"


function App() {

	return (
		<>
			<Header />
			<main className='py-3'>
				<Container>
					<Outlet />
				</Container>
			</main>
			<Footer />
    </>
	)
}

export default App
