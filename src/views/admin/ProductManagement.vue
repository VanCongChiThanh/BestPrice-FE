<template>
<div class="container mt-3">
    <h3>Danh sách sản phẩm</h3>
    <div class="col-lg-10 col-md-10 col-sm-9 col-xs-12">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
                <button type="button" @click="openModal" class="btn btn-success btn-xs" title="Thêm sản phẩm">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div>
                <input type="text" class="form-control" placeholder="Search products..." @keyup.enter="performSearch" v-model="tempsearchQuery" style="width: 300px;" />
            </div>
        </div>
        <table id="dt-employee" class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in paginatedProducts" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td><img :src="product.imageUrl" alt="Product Image" style="width: 100px; height: auto;"></td>
                    <td style="padding: 0;">
                        <div class="d-flex justify-content-center align-items-center">
                            <button class="btn btn-link text-primary" @click="editProduct(product)" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-link text-danger" @click="deleteProduct(product.id)" title="Delete">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav>
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="currentPage--">Previous</button>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                    <button class="page-link" @click="currentPage = page">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="currentPage++">Next</button>
                </li>
            </ul>
        </nav>
    </div>
    <div v-if="isModalVisible" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document">
            <form @submit.prevent="saveProduct">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title"> Add/Edit Product</h4>
                    </div>
                    <div class="modal-body">
                        <div class="infoProduct">
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="name" class="control-label">Name</label>
                                    <input type="text" class="form-control" v-model="currentProduct.name" placeholder="Name" required>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="categoryId">Category</label>
                                    <select v-model="currentProduct.category_id" class="form-control">
                                        <option :value="1">Điện thoại</option>
                                        <option :value="2">Laptop</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="imageUrl" class="control-label">Image URL</label>
                                <input type="text" class="form-control " v-model="currentProduct.image_url" placeholder="Image URL" required>
                            </div>

                        </div>
                        <div class="accordion mt-3" id="productPriceAccordion">
                            <div class="accordion-item" v-for="(price, index) in product_prices" :key="index">
                                <div class="accordion-header" :id="'heading' + index">
                                    <h5 class="mb-0">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="true" :aria-controls="'collapse' + index">
                                            Distributor #{{ index + 1 }}
                                        </button>
                                    </h5>
                                </div>
                                <div :id="'collapse' + index" class="collapse" :aria-labelledby="'heading' + index" data-parent="#productPriceAccordion">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label for="productId">Product ID</label>
                                            <input type="text" class="form-control" v-model="price.product_id" placeholder="Product ID">
                                        </div>
                                        <div class="form-group">
                                            <label for="price">Price</label>
                                            <input type="text" class="form-control" v-model="price.price" placeholder="Price">
                                        </div>
                                        <div class="form-group">
                                            <label for="productUrl">Product URL</label>
                                            <input type="text" class="form-control" v-model="price.product_url" placeholder="Product URL">
                                        </div>
                                        <div class="form-group">
                                            <label for="websiteId">Website ID</label>
                                            <input type="text" class="form-control" v-model="price.website_id" placeholder="Website ID">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center mt-3">
                                <button @click="addProductPrice" class="btn btn-primary">Add New Distributor</button>
                            </div>

                        </div>
                    </div>

                    <div class="modal-footer">
                        <input type="hidden" v-model="currentProduct.id" />
                        <input type="submit" class="btn btn-info" :value="isEditing ? 'Update' : 'Save'" />
                        <button type="button" class="btn btn-danger" @click="closeModal">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div v-if="isModalVisible" class="modal-backdrop fade show"></div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchQuery: '',
            products: [],
            tempsearchQuery:'',
            product_prices: [],
            currentProduct: {
                id: null,
                name: '',
                image_url: '',
                category_id: '',

            },
            isEditing: false,
            isModalVisible: false,
            currentPage: 1,
            itemsPerPage: 15
        };
    },

    created() {
        this.fetchProducts();
    },
    methods: {
        fetchProducts() {
            axios.get('https://localhost:7108/api/Product')
                .then(response => {
                    this.products = response.data;
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        },
        openModal() {
            this.currentProduct = {
                id: null,
                name: '',
                image_url: '',
                category_id: '',
            };
            this.isEditing = false;
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
            this.product_prices = [];
        },
        saveProduct() {
            if (this.isEditing) {
                axios.put(`https://localhost:7108/api/Product/${this.currentProduct.id}`, this.currentProduct)
                    .then(() => {
                        this.fetchProducts();
                        this.closeModal();
                    })
                    .catch(error => {
                        console.error('Error updating product:', error);
                    });
            } else {
                axios.post('https://localhost:7108/api/Product', this.currentProduct)
                    .then(() => {
                        this.fetchProducts();
                        this.closeModal();
                    })
                    .catch(error => {
                        console.error('Error adding product:', error);
                    });
            }
        },
        editProduct(product) {
            this.currentProduct = {
                ...product
            };
            this.isEditing = true;
            this.isModalVisible = true;
        },
        deleteProduct(id) {
            axios.delete(`https://localhost:7108/api/Product/${id}`)
                .then(() => {
                    this.fetchProducts();
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
                });
        },
        addProductPrice() {
            this.product_prices.push({
                product_id: this.currentProduct.id || null,
                price: '',
                product_url: '',
                website_id: ''
            });
        }, performSearch() {
            this.searchQuery = this.tempsearchQuery;
        },
    },
    computed: {
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredProducts.slice(start, start + this.itemsPerPage);
        },
        totalPages() {
            return Math.ceil(this.products.length / this.itemsPerPage);
        },filteredProducts() {
        return this.searchQuery ? this.products.filter(product =>
            product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        ) : this.products;
       },
    },

};
</script>

<style>
table {
    table-layout: auto;
}

.modal {
    display: none;
}

.modal.show {
    display: block;
}

.modal-backdrop {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1040;
}
</style>
