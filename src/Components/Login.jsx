import { useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login({ onToggle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); 

  const handleLogin = async () => {
    setError(""); 

    
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    
    console.log("Login attempt with:", email, password);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError("Google login failed. Please try again."); 
      console.error("Google Login error", err);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-5 flex flex-col gap-5">
        <div className="text-center">
          <div className="text-3xl font-bold text-red-500">FindItNow</div>
          <h2 className="text-base font-semibold text-gray-800 mt-1">Login To Your Account</h2>
        </div>

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

        
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="text-sm text-red-500 hover:underline self-end">Forgot Password?</button>

        <button 
          onClick={handleLogin}  
          className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600"
        >
          Login
        </button>

        <div className="text-center text-gray-500 text-sm">Or</div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-100"
        >
          <FcGoogle size={20} />
          Google
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <button onClick={onToggle} className="text-red-500 font-semibold hover:underline">
            Signup
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;