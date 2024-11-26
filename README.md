
# BestPrice Project

## Overview

**BestPrice** is a web application designed to compare prices of products across various e-commerce platforms. The platform crawls data from multiple websites to present users with the best deals and provides links to the sellers offering competitive prices. It also displays a comprehensive list of vendors for each product along with their respective prices.

### Features

- **Price Comparison:** Retrieve and display the best price for a product from multiple online platforms.
- **Comprehensive Seller List:** Provide a list of all sellers with their prices for the selected product.
- **Direct Links to Deals:** Users can click on links to navigate directly to the product page on the respective e-commerce platform.

### Technologies

- **Frontend:** Vue.js for building an interactive and responsive user interface.
- **Backend:**
  - **ASP.NET Core:** Handles CRUD operations and serves as the main API for the web application.  
    GitHub Repository: [ASP.NET Core CRUD API](https://github.com/huynhpham2k4/PBL4/tree/master/Web_API)
  - **Flask and Selenium:** Used for web scraping to extract product data from e-commerce websites.  
    GitHub Repository: [Flask and Selenium Crawler](https://github.com/VanCongChiThanh/Crawler)

---

## Project Setup

### Install Dependencies
Run the following command to install the required dependencies:
```bash
npm install

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
