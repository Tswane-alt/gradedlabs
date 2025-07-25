import React, { useState } from 'react';

// SAMPLE PRODUCT DATA
const products = [
  { id: 1, name: "Blue T-Shirt", category: "Clothing", price: 150, inStock: true },
  { id: 2, name: "Black Jeans", category: "Clothing", price: 300, inStock: false },
  { id: 3, name: "Red Sneakers", category: "Shoes", price: 500, inStock: true },
  { id: 4, name: "White Sneakers", category: "Shoes", price: 450, inStock: true },
  { id: 5, name: "Wireless Mouse", category: "Accessories", price: 250, inStock: true },
  { id: 6, name: "Office Chair", category: "Furniture", price: 1200, inStock: false },
  { id: 7, name: "Green T-Shirt", category: "Clothing", price: 160, inStock: true },
  { id: 8, name: "Bluetooth Headphones", category: "Accessories", price: 800, inStock: true },
  { id: 9, name: "Brown Boots", category: "Shoes", price: 650, inStock: false },
  { id: 10, name: "Desk Lamp", category: "Furniture", price: 180, inStock: true },
  { id: 11, name: "Yellow Shirt", category: "Clothing", price: 140, inStock: true },
  { id: 12, name: "Gaming Keyboard", category: "Accessories", price: 450, inStock: true }
];


// SEARCHBAR 
const SearchBar = ({ 
  searchQuery,           // Current search text 
  setSearchQuery,        // Function to update search text 
  selectedCategory,      // Current selected category 
  setSelectedCategory,   // Function to update category 
  showInStockOnly,       // Current checkbox state 
  setShowInStockOnly     // Function to update checkbox state 
}) => {
  // Define available categories - "All" is default to show everything
  const categories = ["All", "Clothing", "Shoes", "Accessories", "Furniture"];
  
  return (
    <div>
      {/* TEXT SEARCH INPUT */}

      <div>
        <label>Search by Name:</label>
        <br />
        <input
          type="text"
          placeholder="Type product name here..."
          value={searchQuery}  
          
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <br />
      
      {/* CATEGORY DROPDOWN FILTER */}
      
      <div>
        <label>Choose Category:</label>
        <br />
        <select
          value={selectedCategory}  
          // When user selects a different category, update  state
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {/* Using Array.map() to create option elements from categories array */}
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <br />
      
      {/* IN STOCK CHECKBOX FILTER */}
      
      <div>
        <input
          type="checkbox"
          id="inStock" 
          checked={showInStockOnly}  
          // When checkbox is clicked, update parent state with new boolean value
          onChange={(e) => setShowInStockOnly(e.target.checked)}
        />
        <label htmlFor="inStock">Show only products in stock</label>
      </div>
      
      <hr />
    </div>
  );
};


// PRODUCTITEM
const ProductItem = ({ product }) => {
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "5px" }}>
      {/* Display product name */}
      <h3>{product.name}</h3>
      
      {/* Display product category */}
      <p><strong>Category:</strong> {product.category}</p>
      
      {/* Display product price with R currency  */}
      <p><strong>Price:</strong> R{product.price}</p>
      
      {/* disply different text based on stock status */}
      <p><strong>Stock:</strong> {product.inStock ? 'Available' : 'Out of Stock'}</p>
    </div>
  );
};


// PRODUCTLIST 
const ProductList = ({ products }) => {
  //  Check if there are no products to display
  
  if (products.length === 0) {
    return (
      <div>
        <h2>No products found!</h2>
        <p>Try changing your search or filters.</p>
      </div>
    );
  }

  // If we have products to display, we want to show them
  return (
    <div>
      {/* Show count of filtered products */}
      <h2>Products Found: {products.length}</h2>
      
      {/*  Use Array.map() to show each product inthe list*/}
      {products.map(product => (

        // Using product.id to help React optimize rendering
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};


function App() {
  
  // STATE MANAGEMENT WITH HOOKS
  // Using useState hook to manage component state

  // stores what user types in search box
  const [searchQuery, setSearchQuery] = useState('');
  
  // stores products selected category from dropdown
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // stores whether "In Stock Only" checkbox is checked
  const [showInStockOnly, setShowInStockOnly] = useState(false);


  // FILTERING LOGIC
  //  filtering from the original 'products' array
  const filteredProducts = products.filter(product => {
    
    //  Check if product name contains search query
    // Using .toLowerCase() on both strings for case-insensitive matching
    // Using .includes() method for substring matching as required
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    //  Checking if product matches selected category
    // If "All" is selected, all categories match
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    //  Checking stock status
    // If checkbox is unchecked, all products match
    // If checkbox is checked, only in-stock products match
    const matchesStock = !showInStockOnly || product.inStock;
    
    //  Product must match all the active filters
    return matchesSearch && matchesCategory && matchesStock;
  });


  return (
    <div style={{ padding: "20px" }}>
      
      {/* HEADER */}
      <h1>ShopEasy Product Catalog</h1>
      <p>Welcome to our product search page!</p>
      
      {/* SEARCH AND FILTER CONTROLS */}
      <SearchBar
        searchQuery={searchQuery}                    // Current search text
        setSearchQuery={setSearchQuery}              // Function to update search text
        selectedCategory={selectedCategory}          // Current selected category
        setSelectedCategory={setSelectedCategory}    // Function to update category
        showInStockOnly={showInStockOnly}           // The  checkbox state
        setShowInStockOnly={setShowInStockOnly}     // Function to update checkbox
      />

      
      <ProductList products={filteredProducts} />
      
    </div>
  );
}


export default App;
