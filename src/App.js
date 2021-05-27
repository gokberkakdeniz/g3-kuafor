import { Provider } from "react-redux";
import { Header, Main } from "./components";
import { store } from "./store";

function App({ children }) {
  return (
    <Provider store={store}>
      <div className="h-screen w-screen bg-primary">
        <Header />
        <Main>{children}</Main>
      </div>
    </Provider>
  );
}

export default App;
