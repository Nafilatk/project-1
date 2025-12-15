// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e: any) => {
//     e.preventDefault();

//     const res = await axios.get(
//       `http://localhost:5000/users?email=${email}&password=${password}`
//     );

//     if (res.data.length === 0) {
//       setError("Invalid credentials");
//       return;
//     }

//     localStorage.setItem("user", JSON.stringify(res.data[0]));
//     router.push("/");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form
//         onSubmit={handleLogin}
//         className="w-full max-w-sm border p-6 rounded-xl shadow"
//       >
//         <h1 className="text-2xl font-bold mb-4">Login</h1>

//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

//         <input
//           placeholder="Email"
//           className="w-full p-2 border rounded mb-3"
//           required
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           placeholder="Password"
//           type="password"
//           className="w-full p-2 border rounded mb-4"
//           required
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="w-full bg-blue-600 text-white py-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
