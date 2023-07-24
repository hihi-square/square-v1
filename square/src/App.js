import "./App.css";
import Header from "./routes/header";
import Footer from "./routes/footer";
import Main from "./routes/main";

function App() {
	return (
		<div className="App">
			<Header />
			<Main></Main>
			<Footer />
		</div>
	);
}

export default App;
