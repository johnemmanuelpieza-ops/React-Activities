import Header from "../components/header";
import Footer from "../components/footer";

function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow mt-4 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to My Home Page</h2>
        <p className="mt-2 text-gray-600">Here you can find various resources and links.</p>
        <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">Featured Resources</h3>
        <ul className="mt-4 space-y-2">
          <li className="p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition">
          <a href="#" className="text-blue-600 hover:underline">Resource 1</a>
          </li>
          <li className="p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition">
          <a href="#" className="text-blue-600 hover:underline">Resource 2</a>
          </li>
          <li className="p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition">
          <a href="#" className="text-blue-600 hover:underline">Resource 3</a>
          </li>
        </ul>
        </div>
      </main>
      <Footer />
      </div>
    </>
  );
}

export default Home;