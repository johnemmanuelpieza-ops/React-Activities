import Header from "../components/header";
import Footer from "../components/footer";

function Contact() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-gray-100 p-6">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
            <p className="mb-6">We would love to hear from you!</p>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows="4" required></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600">Send Message</button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Contact;