import "./App.css";
import Header from "./routes/header";
import Footer from "./routes/footer";
import Main from "./routes/main";
import BottomSheet from "./routes/BottomSheet";

function App() {
	return (
		<div className="App">
			<Header />
			<Main></Main>
			<BottomSheet></BottomSheet>
			<Footer />
		</div>
	);
}

export default App;
