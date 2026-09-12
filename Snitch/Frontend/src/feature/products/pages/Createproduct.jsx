import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useProduct from "../hook/useProduct.js";

/* ── Inline Icons ────────────────────────────────────────────────── */
const UploadIcon = () => (
  <svg
    className="w-5 h-5 text-zinc-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="w-3.5 h-3.5 text-zinc-300 hover:text-white"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SpinnerIcon = () => (
  <svg
    className="animate-spin -ml-1 mr-2 h-4 w-4 text-zinc-950"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/* ── Reusable Field Wrapper ───────────────────────────────────────── */
function FormField({ id, label, required, error, children, helperText }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-medium text-zinc-300 tracking-wide select-none"
        >
          {label} {required && <span className="text-zinc-500">*</span>}
        </label>
        {helperText && (
          <span className="text-[11px] text-zinc-500">{helperText}</span>
        )}
      </div>
      {children}
      {error && <p className="text-[12px] text-red-400 mt-1">{error}</p>}
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────── */
function Createproduct() {
  const { handlCreateProduct } = useProduct();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: {
      amount: "",
      currency: "INR",
    },
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Handle generic field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle price nested object change
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        [name]: value,
      },
    }));
    if (errors.priceAmount && name === "amount") {
      setErrors((prev) => ({ ...prev, priceAmount: "" }));
    }
  };

  const MAX_IMAGES = 7;

  // Process selected or dropped image files into data URLs (max 7)
  const processFiles = (files) => {
    const validImageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (validImageFiles.length === 0) return;

    if (images.length >= MAX_IMAGES) {
      setErrors((prev) => ({
        ...prev,
        images: `You can upload a maximum of ${MAX_IMAGES} images.`,
      }));
      return;
    }

    const availableSlots = MAX_IMAGES - images.length;
    const filesToProcess = validImageFiles.slice(0, availableSlots);

    if (validImageFiles.length > availableSlots) {
      setErrors((prev) => ({
        ...prev,
        images: `Maximum ${MAX_IMAGES} images allowed. Only ${availableSlots} more image${availableSlots > 1 ? "s" : ""} added.`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, images: "" }));
    }

    setImages((prev) => [...prev, ...filesToProcess]);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = ""; // Reset file input so identical files can be selected again
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length < MAX_IMAGES) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!form.productName.trim()) {
      newErrors.productName = "Product name is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Product description is required.";
    }

    const priceNum = parseFloat(form.price.amount);
    if (form.price.amount === "" || isNaN(priceNum) || priceNum < 0) {
      newErrors.priceAmount = "Please enter a valid non-negative price.";
    }

    if (images.length > MAX_IMAGES) {
      newErrors.images = `You can upload a maximum of ${MAX_IMAGES} images.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
     const formData = new FormData();

formData.append("productName", form.productName);
formData.append("description", form.description);
formData.append("price", form.price.amount);

formData.append("currency", form.price.currency);

images.forEach((image) => {
  formData.append("images", image);
});

await handlCreateProduct(formData);

      // On successful creation, navigate back or to products list
      navigate('/');
    } catch (err) {
      console.error("Failed to create product:", err);
      setServerError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create product. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col justify-start py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-170 mx-auto space-y-6">
        {/* ── Compact Header ── */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            Create Product
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Add a new product to your store.
          </p>
        </div>

        {/* ── Server Error Notification ── */}
        {serverError && (
          <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-md text-red-300 text-xs flex items-center justify-between">
            <span>{serverError}</span>
            <button
              type="button"
              onClick={() => setServerError("")}
              className="text-red-400 hover:text-red-200 ml-2 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* ── Main Form ── */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-zinc-900/40 border border-zinc-800/90 rounded-lg p-5 sm:p-7 space-y-6 shadow-sm"
        >
          {/* ── Section 1: Product Information ── */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-800/80 pb-2">
              Product Information
            </h2>

            <FormField
              id="productName"
              label="Product name"
              required
              error={errors.productName}
            >
              <input
                id="productName"
                name="productName"
                type="text"
                required
                value={form.productName}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className={`w-full bg-zinc-900/80 border ${
                  errors.productName ? "border-red-500/80" : "border-zinc-800"
                } text-zinc-100 placeholder-zinc-500 text-sm rounded-md px-3.5 py-2.5 outline-none transition-colors duration-150 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 hover:border-zinc-700`}
              />
            </FormField>

            <FormField
              id="description"
              label="Description"
              required
              error={errors.description}
            >
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={form.description}
                onChange={handleInputChange}
                placeholder="Describe your product"
                className={`w-full bg-zinc-900/80 border ${
                  errors.description ? "border-red-500/80" : "border-zinc-800"
                } text-zinc-100 placeholder-zinc-500 text-sm rounded-md px-3.5 py-2.5 outline-none transition-colors duration-150 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 hover:border-zinc-700 resize-y min-h-24`}
              />
            </FormField>
          </div>

          {/* ── Section 2: Pricing ── */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-800/80 pb-2">
              Pricing
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="sm:col-span-2">
                <FormField
                  id="priceAmount"
                  label="Price"
                  required
                  error={errors.priceAmount}
                >
                  <div className="relative rounded-md shadow-xs">
                    <input
                      id="priceAmount"
                      name="amount"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={form.price.amount}
                      onChange={handlePriceChange}
                      placeholder="0.00"
                      className={`w-full bg-zinc-900/80 border ${
                        errors.priceAmount
                          ? "border-red-500/80"
                          : "border-zinc-800"
                      } text-zinc-100 placeholder-zinc-500 text-sm rounded-md px-3.5 py-2.5 outline-none transition-colors duration-150 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 hover:border-zinc-700`}
                    />
                  </div>
                </FormField>
              </div>

              <div>
                <FormField id="priceCurrency" label="Currency">
                  <div className="relative">
                    <select
                      id="priceCurrency"
                      name="currency"
                      value={form.price.currency}
                      onChange={handlePriceChange}
                      className="w-full bg-zinc-900/80 border border-zinc-800 text-zinc-100 text-sm rounded-md px-3 py-2.5 outline-none transition-colors duration-150 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 hover:border-zinc-700 cursor-pointer appearance-none"
                    >
                      <option value="INR" className="bg-zinc-900 text-zinc-100">
                        INR (₹)
                      </option>
                      <option value="USD" className="bg-zinc-900 text-zinc-100">
                        USD ($)
                      </option>
                      <option value="EUR" className="bg-zinc-900 text-zinc-100">
                        EUR (€)
                      </option>
                      <option value="GBP" className="bg-zinc-900 text-zinc-100">
                        GBP (£)
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </FormField>
              </div>
            </div>
          </div>

          {/* ── Section 3: Product Images ── */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Product images
                </h2>
                <span className="text-[11px] text-zinc-500 font-normal">
                  (Max {MAX_IMAGES})
                </span>
              </div>
              <span className="text-[11px] text-zinc-500">
                {images.length} / {MAX_IMAGES}
              </span>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              id="product-images-input"
              type="file"
              multiple
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Upload Area */}
            {images.length >= MAX_IMAGES ? (
              <div className="border border-dashed border-zinc-800/80 rounded-md p-4 text-center bg-zinc-900/20 text-zinc-500 text-xs">
                Maximum image limit reached ({MAX_IMAGES}/{MAX_IMAGES})
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    fileInputRef.current?.click();
                  }
                }}
                className={`border border-dashed rounded-md p-5 text-center cursor-pointer transition-colors duration-150 flex flex-col items-center justify-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-zinc-400 ${
                  isDragging
                    ? "border-zinc-400 bg-zinc-800/40"
                    : "border-zinc-800 hover:border-zinc-600 bg-zinc-900/30 hover:bg-zinc-900/60"
                }`}
              >
                <UploadIcon />
                <p className="text-xs font-medium text-zinc-200 mt-1">
                  Upload product images
                </p>
                <p className="text-[11px] text-zinc-500">
                  PNG, JPG or WEBP (up to {MAX_IMAGES})
                </p>
              </div>
            )}

            {errors.images && (
              <p className="text-[12px] text-red-400 mt-1">{errors.images}</p>
            )}

            {/* Thumbnail Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 pt-1">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group aspect-square rounded-md overflow-hidden bg-zinc-950 border border-zinc-800"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Product preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(idx);
                        }}
                        title="Remove image"
                        className="p-1.5 bg-zinc-900/90 hover:bg-red-900/80 rounded-full text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Actions ── */}
          <div className="pt-4 border-t border-zinc-800/80 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-zinc-300 hover:text-white bg-transparent hover:bg-zinc-800/60 border border-zinc-800 rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-black bg-white hover:bg-zinc-200 active:bg-zinc-300 rounded-md transition-colors duration-150 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon />
                  <span>Creating...</span>
                </>
              ) : (
                "Create product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Createproduct;
