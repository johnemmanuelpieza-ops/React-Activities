function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left side - Branding */}
        <p className="text-sm">&copy; 2025 MyCompany. All rights reserved.</p>
        
        {/* Right side - Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
          <a href="/terms" className="hover:text-white transition">Terms of Service</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;