// Filter options
const filterOptions = {
            price: [
              { label: 'Under $10', value: '0-10' },
              { label: '$10-$20', value: '10-20' },
              { label: '$20-$50', value: '20-50' },
            ],
            brand: [
              { label: 'Brand A', value: 'brand-a' },
              { label: 'Brand B', value: 'brand-b' },
            ],
          };
          
          // Product data
          const products = [
            { id: 1, name: 'Product 1', price: 15, brand: 'brand-a' },
            { id: 2, name: 'Product 2', price: 25, brand: 'brand-b' },
            { id: 3, name: 'Product 3', price: 35, brand: 'brand-a' },
          ];
          
          // Filter function
          function filterProducts(filterValues) {
            const filteredProducts = products.filter((product) => {
              const priceFilter = filterValues.price;
              const brandFilter = filterValues.brand;
              return (
                (priceFilter === undefined || product.price >= priceFilter.min && product.price <= priceFilter.max) &&
                (brandFilter === undefined || product.brand === brandFilter)
              );
            });
            return filteredProducts;
          }
          
          // Render filter options
          function renderFilterOptions() {
            const filterHtml = Object.keys(filterOptions).map((filterKey) => {
              const filterValues = filterOptions[filterKey];
              return `
                <div>
                  <h4>${filterKey}</h4>
                  <ul>
                    ${filterValues.map((filterValue) => `<li><input type="checkbox" value="${filterValue.value}">${filterValue.label}</li>`).join('')}
                  </ul>
                </div>
              `;
            }).join('');
            document.getElementById('filter-options').innerHTML = filterHtml;
          }
          
          // Render filtered products
          function renderFilteredProducts(filteredProducts) {
            const productHtml = filteredProducts.map((product) => `
              <div>
                <h4>${product.name}</h4>
                <p>Price: $${product.price}</p>
                <p>Brand: ${product.brand}</p>
              </div>
            `).join('');
            document.getElementById('filtered-products').innerHTML = productHtml;
          }
          
          // Initialize filter options and filtered products
          renderFilterOptions();
          const filteredProducts = filterProducts({});
          renderFilteredProducts(filteredProducts);
          
          // Update filtered products on filter change
          document.addEventListener('change', (event) => {
            if (event.target.type === 'checkbox') {
              const filterValues = getFilterValues();
              const filteredProducts = filterProducts(filterValues);
              renderFilteredProducts(filteredProducts);
            }
          });
          
          // Get filter values from checkboxes
          function getFilterValues() {
            const filterValues = {};
            Object.keys(filterOptions).forEach((filterKey) => {
              const checkboxes = document.querySelectorAll(`input[name="${filterKey}"]`);
              const values = Array.from(checkboxes).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
              if (values.length > 0) {
                filterValues[filterKey] =