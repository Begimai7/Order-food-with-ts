import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { MainRoutes } from "./routes";


function AppContent() {
    return (
       <div>
         <MainRoutes />
       </div>
    );
}

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </Provider>
    );
};

export default App;
