import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8 text-sm">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold">
            Learnest<span className="text-blue-600">.ai</span>
          </h2>
          <p className="mt-3 text-gray-600">
            Learn skills that matter. Courses and ebooks designed for real-world success.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Platform</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link href="/courses" className="hover:text-blue-600">Courses</Link></li>
            <li><Link href="/ebook" className="hover:text-blue-600">Ebooks</Link></li>
            <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold mb-3">Account</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link href="/login" className="hover:text-blue-600">Login</Link></li>
            <li><Link href="/signup" className="hover:text-blue-600">Sign Up</Link></li>
            <li><Link href="/profile" className="hover:text-blue-600">Profile</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-gray-600">support@learnest.ai</p>
          <p className="text-gray-600 mt-2">© 2025 Learnest.ai</p>
        </div>

      </div>
    </footer>
  );
}
