import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowUpDown, Check, X } from "lucide-react";
import ProductCard from "../components/ProductCard";

// IMPORT DYNAMIC DATA FROM data.js
import { products } from "../assets/Data"; 

const Collection = () => {
    const [subcategorySearch, setSubcategorySearch] = useState(""); 
    const [selectedSubcategories, setSelectedSubcategories] = useState([]); 
    const [sortOption, setSortOption] = useState("relevant"); 
    const [searchParams] = useSearchParams();
    
    // Mobile View States
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Read parameters dynamically from searchParams object on every render pass
    const categoryFromUrl = searchParams.get("Category");
    const subcategoryFromUrl = searchParams.get("SubCategory");
    const textSearchFromUrl = searchParams.get("search");

    // Predefined subcategories list available in scope
    const subCategoriesList = [
        "T-Shirts",
        "Oversized T-Shirts",
        "Hoodies",
        "Sweatshirts",
        "Jerseys",
        "Long Sleeve T-Shirts",
    ];

    // Lock background scrolling when filter modal overlay is active on mobile screens
    useEffect(() => {
        if (isMobileFilterOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMobileFilterOpen]);

    // Combined and watched the entire searchParams object to catch the first render instantly
    useEffect(() => {
        // 1. Sync Subcategory Parameters
        if (subcategoryFromUrl) {
            const matchedSubcat = subCategoriesList.find(
                (sub) => sub.toLowerCase() === subcategoryFromUrl.toLowerCase()
            );
            if (matchedSubcat) {
                setSelectedSubcategories([matchedSubcat]);
            }
        } else {
            setSelectedSubcategories([]);
        }

        // 2. Clear subcategories if a brand new main Category selection drops in
        if (categoryFromUrl) {
            const categoryMap = {
                "man": "Man",
                "woman": "Woman",
                "sports": "Sports",
            };
            const mappedCategory = categoryMap[categoryFromUrl.toLowerCase()];
            if (mappedCategory && !subcategoryFromUrl) {
                setSelectedSubcategories([]); 
            }
        }
    }, [searchParams]);

    // Filter sidebar checkboxes dynamically based on sidebar search input
    const filteredSubcategoriesList = subCategoriesList.filter((subCat) =>
        subCat.toLowerCase().includes(subcategorySearch.toLowerCase())
    );

    const handleSubcategoryChange = (subCat) => {
        setSelectedSubcategories((prev) =>
            prev.includes(subCat)
                ? prev.filter((item) => item !== subCat)
                : [...prev, subCat]
        );
    };

    const clearAllFilters = () => {
        setSelectedSubcategories([]);
        setSubcategorySearch("");
    };

    // Filter and Sort Processing
    const getProcessedProducts = () => {
        let result = products.filter((product) => {
            // 1. Filter by Sidebar Checkboxes or synced URL state
            const matchesSubcategory =
                selectedSubcategories.length === 0 ||
                (product.subCategory && selectedSubcategories.includes(product.subCategory));

            // 2. Filter by Main Top Category
            const matchesCategory = 
                !categoryFromUrl || 
                (product.category && product.category.toLowerCase() === categoryFromUrl.toLowerCase());

            // 3. Filter by Free-Text Search Input Box
            const matchesTextSearch = 
                !textSearchFromUrl ||
                (product.name && product.name.toLowerCase().includes(textSearchFromUrl.toLowerCase())) ||
                (product.subCategory && product.subCategory.toLowerCase().includes(textSearchFromUrl.toLowerCase())) ||
                (product.category && product.category.toLowerCase().includes(textSearchFromUrl.toLowerCase()));

            return matchesSubcategory && matchesCategory && matchesTextSearch;
        });

        // Sort Products
        if (sortOption === "low-high") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOption === "high-low") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortOption === "newest") {
            result.sort((a, b) => b.id - a.id); 
        }

        return result;
    };

    const processedProducts = getProcessedProducts();

    // Reusable filter inner component content structure to maintain DRY patterns
    const FilterContents = () => (
        <>
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-sm text-gray-800 tracking-wide">Sub-Categories</h4>
                {selectedSubcategories.length > 0 && (
                    <span className="text-[11px] font-bold bg-[#A47A46]/10 text-[#A47A46] px-2 py-0.5 rounded-md">
                        {selectedSubcategories.length} Selected
                    </span>
                )}
            </div>
            
            {/* Inner Subcategory Filter Search Input */}
            <div className="relative mb-4">
                <input 
                    type="text"
                    placeholder="Quick filter types..."
                    value={subcategorySearch}
                    onChange={(e) => setSubcategorySearch(e.target.value)}
                    className="w-full bg-gray-50 text-xs rounded-xl py-2.5 pl-3 pr-8 outline-none border border-gray-100 focus:border-[#A47A46] focus:bg-white transition-all placeholder-gray-400"
                />
                <Search size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Subcategory Checkbox Check Items Stack */}
            <div className="space-y-1.5 max-h-[60vh] lg:max-h-[260px] overflow-y-auto pr-1 subtle-scrollbar">
                {filteredSubcategoriesList.map((subCat) => {
                    const isChecked = selectedSubcategories.includes(subCat);
                    return (
                        <label
                            key={subCat}
                            className={`flex items-center justify-between gap-3 cursor-pointer p-2.5 lg:p-2 rounded-xl transition-all group border ${
                                isChecked 
                                    ? 'bg-amber-50/40 border-amber-100 text-[#A47A46]' 
                                    : 'border-transparent hover:bg-gray-50 text-gray-700'
                            }`}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleSubcategoryChange(subCat)}
                                    className="hidden"
                                />
                                <div
                                    className={`w-5 h-5 lg:w-4.5 lg:h-4.5 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                                        isChecked
                                            ? "bg-[#A47A46] border-[#A47A46] shadow-sm shadow-amber-700/20"
                                            : "border-gray-200 bg-white group-hover:border-gray-300"
                                    }`}
                                >
                                    {isChecked && <Check size={11} className="text-white stroke-[3.5]" />}
                                </div>
                                <span className={`text-[14px] lg:text-[13.5px] truncate transition-colors ${isChecked ? 'font-bold' : 'font-medium group-hover:text-gray-900'}`}>
                                    {subCat}
                                </span>
                            </div>
                        </label>
                    );
                })}

                {filteredSubcategoriesList.length === 0 && (
                    <div className="text-center py-6">
                        <p className="text-xs text-gray-400 font-medium">No category matches matching details</p>
                    </div>
                )}
            </div>
        </>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10 font-sans selection:bg-amber-100 selection:text-[#A47A46]">
            
            {/* Heading Section */}
            <div className="text-center mb-6 lg:mb-10">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                    Our Premium Collections
                </h1>
                <div className="w-12 h-1 bg-[#A47A46] mx-auto mt-2.5 rounded-full"></div>
                <p className="text-gray-500 text-xs sm:text-sm mt-2.5 max-w-md mx-auto px-2">
                    Explore curated designs crafted for comfort and daily premium identity expressions.
                    {(categoryFromUrl || subcategoryFromUrl || textSearchFromUrl) && (
                        <span className="flex flex-wrap justify-center gap-1.5 mt-2.5">
                            {categoryFromUrl && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 text-[#A47A46] text-[10px] font-bold rounded-full border border-amber-100 uppercase tracking-wider">
                                    Category: {categoryFromUrl}
                                </span>
                            )}
                            {subcategoryFromUrl && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 text-[#A47A46] text-[10px] font-bold rounded-full border border-amber-100 uppercase tracking-wider">
                                    Subcategory: {subcategoryFromUrl}
                                </span>
                            )}
                            {textSearchFromUrl && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 text-[#A47A46] text-[10px] font-bold rounded-full border border-amber-100 uppercase tracking-wider">
                                    Search: "{textSearchFromUrl}"
                                </span>
                            )}
                        </span>
                    )}
                </p>
            </div>

            {/* Layout Flex Box Grid Matrix */}
            <div className="grid grid-cols-12 gap-0 lg:gap-8 items-start">
                
                {/* --- 1. DESKTOP FILTER SIDEBAR (Hidden on Mobile viewports) --- */}
                <div className="hidden lg:block col-span-3 sticky top-28 z-20">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 bg-gray-50/70 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2.5 text-gray-800">
                                <SlidersHorizontal size={16} className="text-[#A47A46]" />
                                <span className="font-bold text-[15px] tracking-wide text-gray-900">Filters</span>
                            </div>
                            {selectedSubcategories.length > 0 && (
                                <button 
                                    onClick={clearAllFilters}
                                    className="text-xs font-bold text-gray-400 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                    <X size={12} /> Clear
                                </button>
                            )}
                        </div>
                        <div className="p-5">
                            <FilterContents />
                        </div>
                    </div>
                </div>

                {/* --- 2. MOBILE FLOATING ACTION TOOLBAR OVERLAY TRIGGER SYSTEM --- */}
                <div className="col-span-12 lg:hidden mb-4 sticky top-14 z-30 bg-[#fbfbfa]/90 backdrop-blur-md py-2 -mx-4 px-4 border-b border-gray-100">
                    <div className="flex items-center justify-between gap-3">
                        {/* Interactive Filter Button Trigger */}
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 active:bg-gray-50 text-gray-800 rounded-xl py-2.5 text-xs font-bold shadow-xs transition-colors"
                        >
                            <SlidersHorizontal size={14} className="text-[#A47A46]" />
                            <span>Filters</span>
                            {selectedSubcategories.length > 0 && (
                                <span className="w-4 h-4 bg-[#A47A46] text-white rounded-full text-[9px] flex items-center justify-center font-black">
                                    {selectedSubcategories.length}
                                </span>
                            )}
                        </button>

                        {/* Interactive Dynamic Native Native Sort Selection Shell */}
                        <div className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 relative rounded-xl text-gray-800 py-2.5 text-xs font-bold shadow-xs">
                            <ArrowUpDown size={14} className="text-gray-400" />
                            <select 
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            >
                                <option value="relevant">Relevance</option>
                                <option value="low-high">Price: Low to High</option>
                                <option value="high-low">Price: High to Low</option>
                                <option value="newest">Newest Arrivals</option>
                            </select>
                            <span className="truncate pr-1">
                                {sortOption === "relevant" && "Relevance"}
                                {sortOption === "low-high" && "Price: Low-High"}
                                {sortOption === "high-low" && "Price: High-Low"}
                                {sortOption === "newest" && "Newest"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* --- 3. PRODUCT DISPLAY VIEW GRID CANVAS --- */}
                <div className="col-span-12 lg:col-span-9">
                    
                    {/* Grid Desktop Utility Context Metrics Header (Hidden on Mobile Toolbar instead) */}
                    <div className="hidden lg:flex items-center justify-between gap-4 mb-6 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="text-[13px] sm:text-sm text-gray-500 font-semibold px-2">
                            {processedProducts.length} Premium Items
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl px-2.5 py-1.5 gap-2 group focus-within:border-[#A47A46] transition-colors">
                                <ArrowUpDown size={14} className="text-gray-400 group-focus-within:text-[#A47A46]" />
                                <select 
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="bg-transparent text-[13px] border-none outline-none font-bold text-gray-700 cursor-pointer pr-1"
                                >
                                    <option value="relevant">Relevance</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                    <option value="newest">Newest Arrivals</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Item Count Indicator Badge */}
                    <div className="block lg:hidden text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-3 px-1">
                        Showing {processedProducts.length} items
                    </div>

                    {/* Products Grid Output Display Container */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                        {processedProducts.map((product) => {
                            const adaptedProduct = {
                                ...product,
                                image: product.image || (product.images && product.images[0])
                            };

                            return (
                                <div key={product.id} className="transform active:scale-[0.98] transition-transform duration-150">
                                    <ProductCard product={adaptedProduct} />
                                </div>
                            );
                        })}
                    </div>

                    {/* Zero Results Handle Box */}
                    {processedProducts.length === 0 && (
                        <div className="text-center py-16 lg:py-24 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 mt-2">
                            <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Search size={18} />
                            </div>
                            <h3 className="text-md font-bold text-gray-800">
                                No Matching Products Found
                            </h3>
                            <p className="text-gray-400 text-xs mt-1 max-w-xs mx-auto px-4">
                                Try resetting the sidebar selections or changing your search criteria terms.
                            </p>
                            <button
                                onClick={clearAllFilters}
                                className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* --- 4. SLIDING MOBILE DRAWER PORTAL MODAL DIALOG --- */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
                    
                    {/* Backdrop Tint Sheet Layer */}
                    <div 
                        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
                        onClick={() => setIsMobileFilterOpen(false)}
                    />

                    {/* Bottom Sliding Form Base Frame Container */}
                    <div className="relative bg-white w-full rounded-t-[2rem] max-h-[85vh] flex flex-col shadow-2xl z-10 overflow-hidden transform transition-transform duration-300 animate-slide-up">
                        
                        {/* Drag Top Notch Pill Decorator */}
                        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto my-3 shrink-0" />

                        {/* Drawer Header Toolbar Layout */}
                        <div className="px-5 pb-3 border-b border-gray-100 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal size={15} className="text-[#A47A46]" />
                                <span className="font-extrabold text-[16px] text-gray-900">Filter Collections</span>
                            </div>
                            <div className="flex items-center gap-4">
                                {selectedSubcategories.length > 0 && (
                                    <button 
                                        onClick={clearAllFilters}
                                        className="text-xs font-bold text-rose-500 underline underline-offset-2"
                                    >
                                        Clear All
                                    </button>
                                )}
                                <button 
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 active:bg-gray-200 transition-colors"
                                >
                                    <X size={15} />
                                </button>
                            </div>
                        </div>

                        {/* Interactive Form Drawer Content Wrapper */}
                        <div className="p-5 overflow-y-auto">
                            <FilterContents />
                        </div>

                        {/* Mobile Drawer Bottom Sticky Footer Call To Action Box */}
                        <div className="p-4 bg-gray-50 border-t border-gray-100 shrink-0">
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="w-full bg-[#A47A46] active:bg-[#8A6336] text-white text-center font-bold text-sm py-3.5 rounded-xl shadow-sm tracking-wide transition-colors"
                            >
                                Apply Controls ({processedProducts.length} Items)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Collection;