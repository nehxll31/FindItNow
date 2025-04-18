import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Signup({onToggle}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup successful");
    } catch (err) {
      setError(err.message);
    }
    if (!name || !email || !password || !confirmPassword) {
        setError("Please fill in all fields.");
        return;
      }
      
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
  
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signup successful");
      } catch (err) {
        setError(err.message);
      }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-5 flex flex-col gap-4">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-red-500">FindItNow</div>
          <h2 className="text-lg font-semibold text-gray-800 mt-2">Create Your Account</h2>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="email"
            placeholder="Example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <span
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
            {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSignup}
            className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600"
          >
            Signup
          </button>

          <div className="text-center text-gray-500">Or</div>

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-100">
              <FcGoogle size={20} />
              Google
            </button>
          </div>

          <p className="text-center text-sm mt-4">
  Already have an account?{" "}
  <button
    onClick={onToggle}
    className="text-red-500 font-semibold hover:underline"
  >
    Login
  </button>
</p>

        </div>
      </div>
    </div>
  );
}

export default Signup;
