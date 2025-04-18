import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <Header /> */}
      <main className="p-4">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
