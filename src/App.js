import { Header, Main } from "./components";

function App({ children }) {
  return (
    <div className="h-screen w-full">
      <Header />
      <Main>{children}</Main>
    </div>
  );
}

export default App;
