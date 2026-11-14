import Header from "../components/header";
import Footer from "../components/footer";

function About() {
    return (
        <>
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Header />
                <main className="flex-grow flex items-center justify-center p-8">
                    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">About Us</h1>
                        <p className="text-lg text-gray-600">
                            Welcome to our About page! Here you can learn more about our mission, values, and the team behind our project. We are dedicated to providing the best service possible and ensuring customer satisfaction.
                        </p>
                        <p className="mt-4 text-lg text-gray-600">
                            Our team consists of experienced professionals who are passionate about what they do. We believe in continuous improvement and strive to innovate in our field.
                        </p>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default About;