import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

function Register() {
  const { handleregister } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) {
      nextErrors.username = "Username is required.";
    } else if (username.trim().length < 3) {
      nextErrors.username = "Username must be at least 3 characters.";
    }

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
    setSubmitMessage("Registration successful. Your account is ready.");
    const payload = {
      username,
      email,
      password,
    };
    handleregister(payload);
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_32%),linear-gradient(135deg,#020617_0%,#0b1120_38%,#111827_100%)] px-4 py-3 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/75 p-4 shadow-[0_25px_70px_rgba(15,23,42,0.75)] backdrop-blur-xl sm:p-6">
        <div className="mb-5 text-center">
          <div className="mb-3 flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-violet-400 to-cyan-400 text-base font-bold text-slate-950 shadow-lg shadow-violet-500/20">
              Q
            </div>
          </div>

          <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-violet-300/90">
            QuerivoAi
          </div>

          <h1 className="text-2xl font-bold text-white">Create account</h1>

          <p className="mt-1 text-sm text-slate-400">
            Register to start using QuerivoAi
          </p>
        </div>

        <form className="space-y-2" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block text-sm font-medium text-slate-200"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: "" }));
                setSubmitMessage("");
              }}
              placeholder="johnai"
              className={`w-full rounded-xl border bg-slate-900/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition ${
                errors.username
                  ? "border-red-400 focus:border-red-400"
                  : "border-white/10 focus:border-violet-400"
              }`}
            />

            <p className="mt-1 h-3.5 text-[11px] text-red-300">
              {errors.username || " "}
            </p>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-200"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
                setSubmitMessage("");
              }}
              placeholder="you@example.com"
              className={`w-full rounded-xl border bg-slate-900/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition ${
                errors.email
                  ? "border-red-400 focus:border-red-400"
                  : "border-white/10 focus:border-violet-400"
              }`}
            />

            <p className="mt-1 h-3.5 text-[11px] text-red-300">
              {errors.email || " "}
            </p>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-slate-200"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
                setSubmitMessage("");
              }}
              placeholder="Create a password"
              className={`w-full rounded-xl border bg-slate-900/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition ${
                errors.password
                  ? "border-red-400 focus:border-red-400"
                  : "border-white/10 focus:border-violet-400"
              }`}
            />

            <p className="mt-1 h-3.5 text-[11px] text-red-300">
              {errors.password || " "}
            </p>
          </div>

          <p
            className={`h-4 text-xs ${
              submitMessage.includes("Please fix")
                ? "text-red-300"
                : "text-emerald-300"
            }`}
          >
            {submitMessage || " "}
          </p>

          <button
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-violet-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-violet-300 hover:text-violet-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
