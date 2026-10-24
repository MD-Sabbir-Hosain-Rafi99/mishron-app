"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Phone, X, CheckCircle2, Plus, Minus, Trash2, Eye, Search, ArrowUp } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";

export default function MishronLandingPage() {
  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Cart & Checkout States
  const [cart, setCart] = useState([]);
  const [deliveryArea, setDeliveryArea] = useState("inside");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Load & Save Cart from LocalStorage
  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem("mishron_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("mishron_cart", JSON.stringify(cart));
    }
  }, [cart, isClient]);

  // Scroll to Top Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Products Data
  const products = [
    {
      id: 1,
      name: "নদীর তাজা মাছ",
      price: "৩৫০ ৳",
      numericPrice: 350,
      image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=500&q=80",
      description: "সম্পূর্ণ ক্যামিকেল মুক্ত নদীর তাজা মাছ",
      fullDetails: "আমাদের নদীর মাছ সম্পূর্ণ প্রাকৃতিক পরিবেশ থেকে সংগৃহীত। এতে কোনো ধরনের ফরমালিন বা ক্ষতিকর কেমিক্যাল ব্যবহার করা হয়নি। প্রতিদিন ভোরের তাজা মাছ সরাসরি আপনার রান্নাঘরে পৌঁছে দেওয়া আমাদের লক্ষ্য। ওজনে ১০০% সঠিক এবং পরিষ্কার করা অবস্থায় ডেলিভারি দেওয়া হয়।",
      searchTags: ["fish", "মাছ", "nodir mach", "তাজা মাছ"]
    },
    {
      id: 2,
      name: "অর্গানিক শাকসবজি",
      price: "১২০ ৳",
      numericPrice: 120,
      image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=500&q=80",
      description: "সরাসরি কৃষকের মাঠ থেকে সংগৃহীত",
      fullDetails: "রাসায়নিক সার ও কীটনাশক মুক্ত আমাদের এই অর্গানিক শাকসবজি। আমাদের নিজস্ব কৃষক দলের মাধ্যমে সরাসরি মাঠ থেকে তুলে আপনার ঠিকানায় পাঠানো হয়। এতে পুষ্টিগুণ থাকে অটুট এবং স্বাদ হয় অসাধারণ। পরিবারকে সুস্থ রাখতে অর্গানিক সবজির কোনো বিকল্প নেই।",
      searchTags: ["vegetables", "সবজি", "shak", "shaksobji", "organic"]
    },
    {
      id: 3,
      name: "সুন্দরবনের খাঁটি মধু",
      price: "৮০০ ৳",
      numericPrice: 800,
      image: "https://cdn.ghorerbazar.com/productImages/17670011109tVEr.jpg",
      description: "১০০% প্রাকৃতিক ও খাঁটি মধু",
      fullDetails: "সুন্দরবনের গহীন বন থেকে মৌয়ালদের সংগ্রহ করা ১০০% খাঁটি ও প্রাকৃতিক মধু। এতে কোনো প্রকার চিনি বা কৃত্রিম স্বাদ মেশানো হয়নি। নিয়মিত মধু সেবনে রোগ প্রতিরোধ ক্ষমতা বাড়ে এবং শরীর সুস্থ থাকে। আমরা গ্যারান্টি দিয়ে থাকি আমাদের মধু সম্পূর্ণ ভেজালমুক্ত।",
      searchTags: ["honey", "মধু", "modhu", "khati modhu"]
    },
  ];

  // Dynamic Search Filter Logic
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.searchTags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, products]);

  // Cart Logic Functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.numericPrice * item.quantity, 0);
  const deliveryCharge = deliveryArea === "inside" ? 60 : 120;
  const total = subtotal + deliveryCharge - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "MISHRON50") {
      setDiscount(50);
      alert("কুপন সফলভাবে যুক্ত হয়েছে! ৫০ ৳ ছাড় পেলেন।");
    } else {
      setDiscount(0);
      alert("ভুল কুপন কোড! দয়া করে সঠিক কোড দিন।");
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    alert("আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!");
    setIsCheckoutOpen(false);
    setCart([]);
    localStorage.removeItem("mishron_cart");
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fdfa] font-sans relative overflow-x-hidden flex flex-col">

      {/* =========================================
          Main Navbar Section (Height Increased & Logo Enlarged)
      ========================================= */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-green-100 flex flex-col">
        <div className="px-6 py-8 md:py-10 flex flex-col md:flex-row justify-between items-center w-full gap-6 md:gap-0 max-w-7xl mx-auto">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={(e) => scrollToSection(e, 'home')}>
            <img src="/ChatGPT Image Aug 1, 2026, 09_35_08 AM.png" alt="Mishron Logo" className="h-16 md:h-24 w-auto object-contain" />
          </div>

          {/* Dynamic Search Bar (Center) */}
          <div className="w-full md:w-[500px] lg:w-[600px] flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="পণ্য খুঁজুন (যেমন: মধু, মাছ, Honey)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length > 0) {
                    const productsSection = document.getElementById('products');
                    if (productsSection) {
                      window.scrollTo({
                        top: productsSection.offsetTop - 100,
                        behavior: 'smooth'
                      });
                    }
                  }
                }}
                className="w-full border-2 border-green-200 rounded-full py-3.5 px-6 pr-14 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition shadow-sm text-gray-700 font-medium text-lg"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 p-2.5 rounded-full text-white hover:bg-green-700 transition">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Icon (Right) */}
          <div className="flex items-center gap-3 shrink-0 hidden md:flex">
            <div className="relative cursor-pointer bg-green-50 p-4 rounded-full hover:bg-green-100 transition shadow-sm border border-green-200" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="text-green-700 w-7 h-7" />
              {isClient && cartCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-orange-500 text-white text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full">
                  {cartCount}
                </motion.span>
              )}
            </div>
          </div>

          {/* Mobile Cart Icon (Absolute for better layout on small screens) */}
          <div className="md:hidden absolute top-8 right-6">
            <div className="relative cursor-pointer bg-green-50 p-3 rounded-full hover:bg-green-100 transition shadow-sm border border-green-200" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="text-green-700 w-6 h-6" />
              {isClient && cartCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                  {cartCount}
                </motion.span>
              )}
            </div>
          </div>

        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* =========================================
            Banner Section (ID: home)
        ========================================= */}
        <motion.div id="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full max-w-7xl mx-auto mt-6 px-4 pt-4">
          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-green-500/20">
            <img src="/mishron.com.jpg" alt="Mishron Banner" className="w-full h-auto object-cover max-h-[500px]" />
          </div>
        </motion.div>

        {/* =========================================
            Products Section (ID: products)
        ========================================= */}
        <div id="products" className="max-w-7xl mx-auto py-24 px-4 min-h-[50vh]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-3">আমাদের সেরা পণ্য</h2>
            <p className="text-gray-600 font-medium text-lg">১০০% প্রাকৃতিক ও অর্গানিক পণ্যের সমাহার</p>

            {searchQuery && (
              <p className="mt-4 text-orange-600 font-bold text-lg">
                "{searchQuery}" এর জন্য {filteredProducts.length} টি পণ্য পাওয়া গেছে
              </p>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Search className="w-20 h-20 mx-auto mb-5 text-gray-300" />
              <h3 className="text-3xl font-bold text-gray-700">দুঃখিত! কোনো পণ্য পাওয়া যায়নি।</h3>
              <p className="mt-3 text-lg">দয়া করে অন্য কোনো নাম দিয়ে সার্চ করুন।</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-8 bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition text-lg"
              >
                সব পণ্য দেখুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.4 }} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 group flex flex-col">
                  <div className="overflow-hidden h-64 relative cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 text-center flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{product.description}</p>
                    <p className="text-2xl font-bold text-orange-600 mb-6">{product.price}</p>
                    <div className="flex gap-3 mt-auto">
                      <button onClick={() => setSelectedProduct(product)} className="w-1/2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 font-bold py-3 px-2 rounded-xl flex items-center justify-center gap-1 transition-colors text-sm">
                        <Eye className="w-5 h-5" /> বিস্তারিত
                      </button>
                      <button onClick={() => addToCart(product)} className="w-1/2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-2 rounded-xl flex items-center justify-center gap-1 transition-colors text-sm shadow-md">
                        <ShoppingCart className="w-5 h-5" /> কার্টে যোগ
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* =========================================
            About Us Section (ID: about)
        ========================================= */}
        <motion.div id="about" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-7xl mx-auto pb-24 px-4">
          <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" alt="About Mishron" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-green-900/10"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block bg-green-100 text-green-800 font-bold px-5 py-2 rounded-full text-sm tracking-wide">
                আমাদের সম্পর্কে
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
                প্রাকৃতিক ও ভেজালমুক্ত <br />খাবারের বিশ্বস্ত নাম <span className="text-green-600">মিশ্রণ</span>
              </h2>
              <p className="text-gray-600 leading-relaxed font-medium text-lg">
                'মিশ্রণ' (Mishron) হলো আপনার পরিবারের সুস্বাস্থ্য নিশ্চিত করার একটি বিশ্বস্ত প্রতিষ্ঠান। আমরা বিশ্বাস করি, সুস্থ জীবনের জন্য ভেজালমুক্ত ও প্রাকৃতিক খাবারের কোনো বিকল্প নেই।
              </p>
              <p className="text-gray-600 leading-relaxed font-medium text-lg">
                আমাদের মূল লক্ষ্য হলো সরাসরি কৃষক, মৌয়াল এবং প্রান্তিক পর্যায় থেকে সংগ্রহ করা ১০০% অর্গানিক, কেমিক্যাল-মুক্ত এবং তাজা পণ্য আপনাদের দোরগোড়ায় পৌঁছে দেওয়া। গুণগত মান এবং বিশুদ্ধতার সাথে আমরা কোনো আপস করি না।
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* =========================================
          Footer Section (Height Significantly Increased)
      ========================================= */}
      <footer className="bg-green-900 text-green-100 py-24 md:py-32 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">

          {/* Brand Info */}
          <div>
            <h3 className="text-4xl font-bold text-white mb-4">মিশ্রণ (Mishron)</h3>
            <p className="text-green-200/90 text-lg font-medium leading-relaxed">
              আপনার বিশ্বস্ত অর্গানিক শপ। <br />প্রাকৃতিক ও ভেজালমুক্ত খাবারের এক অনন্য সমাহার।
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-xl font-bold text-white mb-2">যোগাযোগ করুন</h4>
            <div className="flex items-center gap-4 bg-green-800 px-8 py-4 rounded-full shadow-inner border border-green-700">
              <Phone className="w-6 h-6 text-orange-400" />
              <span className="font-bold text-2xl font-mono text-white tracking-widest">01730-913832</span>
            </div>
            <p className="text-base text-green-300 mt-2">যেকোনো প্রয়োজনে আমাদের কল করুন</p>
          </div>

          {/* Social Links & Copyright */}
          <div className="flex flex-col items-center md:items-end gap-8">
            <div>
              <h4 className="text-xl font-bold text-white mb-4 text-center md:text-right">আমাদের সাথে যুক্ত থাকুন</h4>
              <div className="flex gap-5">
                <a href="https://facebook.com/mishronbd" target="_blank" rel="noreferrer" className="bg-green-800 p-5 rounded-full hover:bg-orange-500 text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-1"><FaFacebook className="w-7 h-7" /></a>
                <a href="https://instagram.com/mishronbd" target="_blank" rel="noreferrer" className="bg-green-800 p-5 rounded-full hover:bg-orange-500 text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-1"><FaInstagram className="w-7 h-7" /></a>
                <a href="https://YouTube.com/mishronbd" target="_blank" rel="noreferrer" className="bg-green-800 p-5 rounded-full hover:bg-orange-500 text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-1"><FaYoutube className="w-7 h-7" /></a>
              </div>
            </div>
            <div className="text-base text-green-400 font-medium pt-6 border-t border-green-800 w-full md:text-right text-center">
              &copy; {new Date().getFullYear()} Mishron BD. All rights reserved.
            </div>
          </div>

        </div>
      </footer>

      {/* =========================================
          Product Details Modal
      ========================================= */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-5xl bg-white z-50 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
              <button onClick={() => setSelectedProduct(null)} className="md:hidden absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-md z-10"><X className="w-6 h-6 text-red-600 font-bold" /></button>
              <div className="w-full md:w-1/2 h-72 md:h-auto relative">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
                <button onClick={() => setSelectedProduct(null)} className="hidden md:block absolute top-6 right-6 text-gray-400 hover:text-red-600 transition bg-gray-50 p-2 rounded-full hover:bg-red-50"><X className="w-6 h-6 font-bold" /></button>
                <h2 className="text-4xl font-bold text-gray-800 mb-2 mt-2 md:mt-0">{selectedProduct.name}</h2>
                <p className="text-3xl font-bold text-orange-600 mb-8">{selectedProduct.price}</p>
                <div className="space-y-4 mb-10 flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-2">পণ্যের বিবরণ:</h3>
                  <p className="text-gray-700 leading-relaxed text-base font-medium">{selectedProduct.fullDetails}</p>
                </div>
                <div className="flex gap-4 mt-auto pt-6 border-t">
                  <button onClick={() => addToCart(selectedProduct)} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-lg"><ShoppingCart className="w-6 h-6" /> কার্টে যোগ করুন</button>
                  <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); setIsCartOpen(false); setIsCheckoutOpen(true); }} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md text-lg">এখুনি কিনুন</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =========================================
          Side Cart Drawer
      ========================================= */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed top-0 right-0 h-full w-[85%] sm:w-[450px] bg-white z-50 shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-6 border-b bg-green-50 shrink-0">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-7 h-7 text-green-700" />
                  <h2 className="text-2xl font-bold text-gray-800">আপনার শপিং কার্ট</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2.5 bg-white hover:bg-red-100 text-red-500 rounded-full transition shadow-sm border border-gray-200"><X className="w-6 h-6 font-bold" /></button>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                {!isClient || cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4 font-medium">
                    <ShoppingCart className="w-20 h-20 text-gray-300" />
                    <p className="text-xl text-gray-600">আপনার কার্ট সম্পূর্ণ ফাঁকা!</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg leading-tight mb-1">{item.name}</h4>
                          <p className="text-orange-600 font-bold text-base mb-3">{item.numericPrice * item.quantity} ৳</p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                              <button onClick={() => updateQuantity(item.id, -1)} className="p-2.5 hover:bg-gray-200 text-gray-800 transition rounded-l-lg"><Minus className="w-4 h-4 font-bold" /></button>
                              <span className="w-10 text-center text-lg font-bold text-gray-900">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="p-2.5 hover:bg-gray-200 text-gray-800 transition rounded-r-lg"><Plus className="w-4 h-4 font-bold" /></button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition ml-auto bg-red-50 p-2.5 rounded-lg border border-red-100"><Trash2 className="w-5 h-5" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-6 border-t bg-gray-50 shrink-0">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-800 text-xl">সাব টোটাল:</span>
                  <span className="font-bold text-orange-600 text-2xl">{subtotal} ৳</span>
                </div>
                <button disabled={cart.length === 0} className={`w-full font-bold py-4 rounded-xl transition shadow-md text-xl ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed text-gray-200' : 'bg-orange-500 hover:bg-orange-600 text-white'}`} onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}>
                  অর্ডার সম্পন্ন করুন
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =========================================
          Checkout Form Modal
      ========================================= */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCheckoutOpen(false)} className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-3xl bg-white z-50 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="bg-green-600 p-5 text-white flex justify-between items-center shrink-0">
                <h2 className="text-2xl font-bold flex items-center gap-3"><CheckCircle2 className="w-7 h-7" /> চেকআউট ফর্ম</h2>
                <button onClick={() => setIsCheckoutOpen(false)} className="hover:bg-green-700 p-2 text-white rounded-full transition bg-green-700/50"><X className="w-6 h-6 font-bold" /></button>
              </div>
              <div className="p-8 overflow-y-auto flex-1">
                <form id="orderForm" onSubmit={handleOrderSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">আপনার নাম *</label>
                      <input required type="text" placeholder="যেমন: Sabbir Hossain" className="w-full border-2 border-gray-300 rounded-xl p-4 font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">মোবাইল নাম্বার *</label>
                      <input required type="tel" placeholder="017XX XXXXXX" className="w-full border-2 border-gray-300 rounded-xl p-4 font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">সম্পূর্ণ ঠিকানা *</label>
                      <textarea required rows="4" placeholder="বাড়ি নং, রোড নং, এলাকা" className="w-full border-2 border-gray-300 rounded-xl p-4 font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"></textarea>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200 h-fit space-y-5">
                    <h3 className="font-bold text-gray-900 border-b-2 border-gray-200 pb-3 text-xl">অর্ডার সামারি</h3>
                    <div className="space-y-3">
                      <p className="text-base font-bold text-gray-800">ডেলিভারি এরিয়া নির্বাচন করুন:</p>
                      <label className="flex items-center gap-3 cursor-pointer p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-green-400 transition">
                        <input type="radio" name="area" value="inside" checked={deliveryArea === "inside"} onChange={() => setDeliveryArea("inside")} className="text-green-600 focus:ring-green-500 w-5 h-5" />
                        <span className="text-base font-bold text-gray-800">ঢাকার ভেতরে (৬০ ৳)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-green-400 transition">
                        <input type="radio" name="area" value="outside" checked={deliveryArea === "outside"} onChange={() => setDeliveryArea("outside")} className="text-green-600 focus:ring-green-500 w-5 h-5" />
                        <span className="text-base font-bold text-gray-800">ঢাকার বাইরে (১২০ ৳)</span>
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input type="text" placeholder="কুপন কোড (যদি থাকে)" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="w-full border-2 border-gray-300 rounded-xl p-3 font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" />
                      <button type="button" onClick={handleApplyCoupon} className="bg-gray-800 text-white px-6 rounded-xl font-bold hover:bg-gray-900 transition text-sm">Apply</button>
                    </div>
                    <div className="border-t-2 border-gray-200 pt-5 space-y-4 text-base">
                      <div className="flex justify-between text-gray-700 font-bold"><span>সাব টোটাল ({cartCount} আইটেম):</span><span>{subtotal} ৳</span></div>
                      <div className="flex justify-between text-gray-700 font-bold"><span>ডেলিভারি চার্জ:</span><span>+ {deliveryCharge} ৳</span></div>
                      {discount > 0 && <div className="flex justify-between text-green-600 font-bold bg-green-50 p-2 rounded-lg border border-green-100"><span>ডিসকাউন্ট (কুপন):</span><span>- {discount} ৳</span></div>}
                      <div className="flex justify-between font-bold text-2xl text-gray-900 border-t-2 border-gray-200 pt-4"><span>সর্বমোট:</span><span className="text-orange-600">{total} ৳</span></div>
                      <div className="text-center text-sm text-red-600 mt-4 font-bold bg-red-100 p-3 rounded-xl border border-red-200">Cash on Delivery (পণ্য হাতে পেয়ে পেমেন্ট করুন)</div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="p-6 border-t bg-gray-50 shrink-0">
                <button type="submit" form="orderForm" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition shadow-md text-2xl tracking-wide">অর্ডার কনফার্ম করুন</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =========================================
          Scroll to Top Button
      ========================================= */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-2xl z-40 transition-all hover:scale-110 border-2 border-white"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}