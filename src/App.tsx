import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

function App() {

  return (
		<Suspense fallback={<div>Loading...</div>}>
					<Router>
						<Routes>
							{routes.map((item) => (
								<Route path={item.path} element={item.element} key={item.path} />
							))}
						</Routes>
					</Router>
		</Suspense>
	);

}

export default App
