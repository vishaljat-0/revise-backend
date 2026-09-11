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

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
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
     const success = await loginHandler(form);

  if (!success) return;

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

              {/* divider */}
              <div className="relative my-3 flex items-center justify-center">
                <div className="w-full border-t border-zinc-800" />
                <span className="absolute bg-[#080808] px-3 text-[10px] uppercase tracking-widest text-zinc-600">
                  or
                </span>
              </div>

              {/* Continue with Gmail */}
              <button
                 type="button"
                onClick={(e)=>{
                  window.location.href="/api/auth/google"
                }}
                className="w-full border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700
                  text-zinc-200 text-[12px] font-semibold tracking-[0.06em] uppercase py-3 px-4
                  flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer"
              >
                <GoogleIcon />
                <span>Continue with Gmail</span>
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