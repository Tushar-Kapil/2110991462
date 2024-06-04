import { BrowserRouter as Router, Route } from "react-router-dom";
import AllProducts from "./pages/AllProducts";
import ProductDetail from "./pages/ProductDetail";

function App() {
  <Router>
    <Route exact path="/" component={AllProducts} />
    <Route path="/product/:productId" component={ProductDetail} />
  </Router>;
}

export default App;
