import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, RotateCcw, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Toast from '../components/Toast';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Filter state
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'All';
  const sort = searchParams.get('sort') || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const inStock = searchParams.get('inStock') === 'true';
  const page = Number(searchParams.get('page')) || 1;

  const [localSearch, setLocalSearch] = useState(search);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products whenever search params change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category && category !== 'All') params.append('category', category);
        if (sort) params.append('sort', sort);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (inStock) params.append('inStock', 'true');
        params.append('page', page);
        params.append('limit', 12);

        const { data } = await api.get(`/products?${params.toString()}`);
        setProducts(data.products || []);
        setTotalPages(data.pages || 1);
        setTotalProducts(data.totalProducts || 0);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch medicines');
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [search, category, sort, minPrice, maxPrice, inStock, page]);

  // Sync local search when URL changes
  useEffect(() => {
    setLocalSearch(search);
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
  }, [search, minPrice, maxPrice]);

  const updateFilters = (newParams) => {
    const current = Object.fromEntries(searchParams.entries());
    const merged = { ...current, ...newParams, page: 1 };

    // Remove empty parameters
    Object.keys(merged).forEach((k) => {
      if (!merged[k] || merged[k] === 'All' || merged[k] === false) {
        delete merged[k];
      }
    });

    setSearchParams(merged);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters({ search: localSearch.trim() });
  };

  const handlePriceApply = (e) => {
    e.preventDefault();
    updateFilters({ minPrice: localMinPrice, maxPrice: localMaxPrice });
  };

  const handleResetFilters = () => {
    setLocalSearch('');
    setLocalMinPrice('');
    setLocalMaxPrice('');
    setSearchParams({});
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}

      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>
            Medicines & Healthcare Products
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
            Showing {products.length} of {totalProducts} verified medicines
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          type="button"
          className="btn btn-outline mobile-filter-btn"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          style={{ display: 'none' }}
        >
          <SlidersHorizontal size={18} /> Filters
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: '2rem' }} className="products-layout">
        {/* Sidebar Filters */}
        <aside
          className={`sidebar-filters ${mobileFilterOpen ? 'open' : ''}`}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.5rem',
            height: 'fit-content',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid #f1f5f9',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }}>
              <Filter size={18} color="#0d9488" /> Filter Catalog
            </div>
            <button
              onClick={handleResetFilters}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              title="Reset all filters"
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>

          {/* Search Box */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Search Keywords</label>
            <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Medicine or brand..."
                className="form-input"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#0d9488',
                  cursor: 'pointer',
                }}
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Categories Filter */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Categories</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={() => updateFilters({ category: 'All' })}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: category === 'All' ? '#f0fdfa' : 'transparent',
                  color: category === 'All' ? '#0d9488' : '#334155',
                  fontWeight: category === 'All' ? '700' : '500',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                <span>All Categories</span>
                <span>{totalProducts}</span>
              </button>

              {categories.map((cat) => (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() => updateFilters({ category: cat.name })}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor:
                      category.toLowerCase() === cat.name.toLowerCase()
                        ? '#f0fdfa'
                        : 'transparent',
                    color:
                      category.toLowerCase() === cat.name.toLowerCase()
                        ? '#0d9488'
                        : '#334155',
                    fontWeight:
                      category.toLowerCase() === cat.name.toLowerCase()
                        ? '700'
                        : '500',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  <span>{cat.name}</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                    {cat.productCount !== undefined ? cat.productCount : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Price Range (₹)</label>
            <form onSubmit={handlePriceApply}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                <input
                  type="number"
                  placeholder="Min"
                  className="form-input"
                  value={localMinPrice}
                  onChange={(e) => setLocalMinPrice(e.target.value)}
                  style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }}
                />
                <span style={{ color: '#94a3b8' }}>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="form-input"
                  value={localMaxPrice}
                  onChange={(e) => setLocalMaxPrice(e.target.value)}
                  style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }}
                />
              </div>
              <button type="submit" className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                Apply Price
              </button>
            </form>
          </div>

          {/* In Stock Only Checkbox */}
          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#334155',
              }}
            >
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => updateFilters({ inStock: e.target.checked })}
              />
              In Stock Only
            </label>
          </div>
        </aside>

        {/* Main Content Area */}
        <main>
          {/* Top Sort Bar */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Active Category: <strong style={{ color: '#0d9488' }}>{category}</strong>
              {search && (
                <>
                  {' '}
                  | Search: <em>"{search}"</em>
                </>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>
                Sort By:
              </label>
              <select
                className="form-select"
                value={sort}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Products List Grid */}
          {loading ? (
            <Loader text="Loading medicines..." />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : products.length === 0 ? (
            <div
              className="card"
              style={{
                textAlign: 'center',
                padding: '4rem 1.5rem',
                backgroundColor: '#ffffff',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                No Medicines Match Your Criteria
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Try adjusting your search terms, changing the category, or clearing the price filters.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleResetFilters}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} onToast={showToast} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '3rem',
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    disabled={page <= 1}
                    onClick={() => updateFilters({ page: page - 1 })}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      type="button"
                      className={`btn btn-sm ${page === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => updateFilters({ page: i + 1 })}
                      style={{ minWidth: '36px' }}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    disabled={page >= totalPages}
                    onClick={() => updateFilters({ page: page + 1 })}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .products-layout {
            grid-template-columns: 1fr !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
          .sidebar-filters {
            display: none;
          }
          .sidebar-filters.open {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;
