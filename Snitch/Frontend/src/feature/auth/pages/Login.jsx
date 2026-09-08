import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

/* ── tiny inline SVGs ─────────────────────────────────────────── */
const EyeOpen = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4.5 h-4.5"
  >
    <path d="M2 12s3.636-7 10-7 10 7 10 7-3.636 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosed = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4.5 h-4.5"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-6.364 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.364 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const ArrowRight = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

/* ── field wrapper ──────────────────────────────────────────────── */
function Field({ id, label, children }) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-[9px] font-bold tracking-[0.12em] uppercase text-zinc-500"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/* ── shared input class ─────────────────────────────────────────── */
const INPUT =
  "w-full bg-zinc-900/60 border border-zinc-800 text-zinc-100 placeholder-zinc-700 " +
  "px-3.5 py-2.5 text-[13px] rounded-none outline-none caret-white " +
  "transition-all duration-200 focus:border-zinc-400 focus:bg-zinc-900 hover:border-zinc-600";

/* ══════════════════════════════════════════════════════════════════ */
export default function Login() {
  const navigate = useNavigate();
  const { loginHandler } = useAuth();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPw, setShowPw] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await loginHandler(form);

    console.log("Login →", form);
    setForm({
      email: "",
      password: "",
    });
    navigate("/");
  };

  return (
    /* ── root: full viewport, no scroll ──────────────────────────── */
    <div className="h-screen w-screen overflow-hidden flex bg-[#080808]">
      {/* ════ LEFT PANEL ══════════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden">
        {/* layered background */}
        <div className="absolute inset-0 bg-linear-to-br from-zinc-950 via-[#0d0d0d] to-black" />
        {/* accent glow top-left */}
        <div
          className="absolute -top-32 -left-32 w-130 h-130 rounded-full
          bg-white/3 blur-3xl pointer-events-none"
        />
        {/* accent glow bottom-right */}
        <div
          className="absolute bottom-0 right-0 w-100 h-100 rounded-full
          bg-white/2.5 blur-3xl pointer-events-none"
        />
        {/* thin diagonal lines decoration */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)",
          }}
        />

        {/* top: wordmark */}
        <div className="relative z-10">
          <span className="text-white text-[11px] font-bold tracking-[0.3em] uppercase opacity-60">
            Snitch
          </span>
        </div>

        {/* center: hero text */}
        <div className="relative z-10 space-y-6">
          {/* big display text */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-600 mb-4">
              The drop is live
            </p>
            <h2
              className="text-white font-black leading-[0.92] tracking-tighter"
              style={{ fontSize: "clamp(3.5rem,6vw,5.5rem)" }}
            >
              DRESS
              <br />
              DIFFERENT.
            </h2>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
            Join thousands of tastemakers already on the platform. Get early
            access to exclusive drops.
          </p>

          {/* feature pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {["Free shipping", "Exclusive drops", "Seller tools"].map((t) => (
              <span
                key={t}
                className="border border-zinc-800 text-zinc-500 text-[10px] font-semibold
                  tracking-widest uppercase px-3 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* bottom: stats row */}
        <div className="relative z-10 flex gap-10">
          {[
            ["50K+", "Members"],
            ["200+", "Brands"],
            ["4.9", "Rating"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="text-white text-xl font-bold tracking-tight">{n}</p>
              <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-0.5">
                {l}
              </p>
            </div>
          ))}
        </div>

        {/* right-edge divider */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-zinc-800 to-transparent" />
      </div>

      {/* ════ RIGHT PANEL — form ══════════════════════════════════════ */}
      <div
        className="flex-1 flex flex-col h-full overflow-y-auto
        scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800"
      >
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-8">
          <div className="w-full max-w-90 space-y-6">
            {/* mobile-only brand */}
            <div className="lg:hidden text-center mb-2">
              <p className="text-white text-xs font-bold tracking-[0.3em] uppercase opacity-60">
                Snitch
              </p>
            </div>

            {/* heading */}
            <div className="space-y-1">
              <h1 className="text-white text-2xl font-bold tracking-tight">
                Welcome back
              </h1>
              <p className="text-zinc-600 text-[13px]">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors duration-150"
                >
                  Create one
                </Link>
              </p>
            </div>

            {/* ── form ── */}
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <Field id="email" label="Email">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className={INPUT}
                />
              </Field>

              <Field id="password" label="Password">
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className={`${INPUT} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center px-3.5
                      text-zinc-600 hover:text-zinc-300 transition-colors duration-150"
                    aria-label="Toggle password visibility"
                  >
                    {showPw ? <EyeOpen /> : <EyeClosed />}
                  </button>
                </div>
              </Field>

              {/* CTA */}
              <button
                id="login-btn"
                type="submit"
                className="group relative w-full mt-2 bg-white text-black text-[12px] font-bold
                  tracking-[0.08em] uppercase py-3.5 flex items-center justify-center gap-2.5
                  overflow-hidden transition-all duration-300 hover:bg-zinc-100 active:bg-zinc-200
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                  focus:ring-offset-[#080808]"
              >
                {/* shimmer sweep */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                  bg-linear-to-r from-transparent via-black/10 to-transparent
                  transition-transform duration-700 ease-in-out pointer-events-none"
                />
                <span>Sign In</span>
                <ArrowRight />
              </button>

              {/* terms */}
              <p className="text-zinc-700 text-[10px] text-center leading-relaxed pt-1">
                By signing in you agree to our{" "}
                <a
                  href="#"
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Terms
                </a>{" "}
                &amp;{" "}
                <a
                  href="#"
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>

        {/* bottom strip */}
        <div className="px-6 py-3 border-t border-zinc-900 flex items-center justify-between">
          <span className="text-[9px] text-zinc-700 tracking-widest uppercase">
            © 2026 Snitch
          </span>
          <span className="text-[9px] text-zinc-700 tracking-widest uppercase">
            Secure &amp; Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}