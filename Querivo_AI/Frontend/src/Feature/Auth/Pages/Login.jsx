import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const { handlelogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Enter a valid email.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitMessage("Please fix the highlighted fields.");
      return;
    }

    setErrors({});
    setSubmitMessage("Login successful. Welcome back.");

    const payload = {
      email,
      password,
    };

handlelogin(payload);
navigate("/dashboard");
console.log("after handlelogin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_32%),linear-gradient(135deg,#020617_0%,#0b1120_38%,#111827_100%)] px-4 py-4 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/75 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.75)] backdrop-blur-xl sm:p-7">
        <div className="mb-6 text-center">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-violet-500 text-base font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
              Q
            </div>
          </div>

          <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-cyan-300/90">
            QuerivoAi
          </div>

          <h1 className="text-2xl font-bold text-white">Welcome back</h1>

          <p className="mt-2 text-sm text-slate-400">Login to your account</p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  email: "",
                }));
                setSubmitMessage("");
              }}
              placeholder="you@example.com"
              className={`w-full rounded-xl border bg-slate-900/80 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition ${
                errors.email
                  ? "border-red-400 focus:border-red-400"
                  : "border-white/10 focus:border-cyan-400"
              }`}
            />

            <p className="mt-2 h-4 text-xs text-red-300">
              {errors.email || " "}
            </p>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  password: "",
                }));
                setSubmitMessage("");
              }}
              placeholder="Enter your password"
              className={`w-full rounded-xl border bg-slate-900/80 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition ${
                errors.password
                  ? "border-red-400 focus:border-red-400"
                  : "border-white/10 focus:border-cyan-400"
              }`}
            />

            <p className="mt-2 h-4 text-xs text-red-300">
              {errors.password || " "}
            </p>
          </div>

          <p
            className={`h-5 text-sm ${
              submitMessage.includes("Please fix")
                ? "text-red-300"
                : "text-emerald-300"
            }`}
          >
            {submitMessage || " "}
          </p>

          <button
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-cyan-400 to-violet-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-cyan-300 hover:text-cyan-200"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
