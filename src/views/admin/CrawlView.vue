<template>
<div class="container mt-4">
    <div class="column ">
        <!-- Form to input crawl details -->
        <div class="col-md-12">
            <div class="card" style="height: 600px; overflow: hidden;">
                <div class="card-header text-white d-flex justify-content-center align-items-center">
                    <h4 class="mb-0">Crawl dữ liệu</h4>
                </div>
                <div class="card-body" style="overflow-y: auto;">
                    <form @submit.prevent="submitCrawlForm">
                        <div id="accordionExample" class="accordion">
                            <div v-for="(data, index) in formData" :key="index" class="accordion-item">
                                <div class="d-flex align-items-center">
                                    
                                    <h3 class="accordion-header flex-grow-1" :id="'heading' + index">
                                        <button class="accordion-button" type="button" :data-bs-toggle="'collapse'" :data-bs-target="'#collapse' + index" :aria-expanded='false' :aria-controls="'collapse' + index">
                                            {{ data.site_name || 'Nhập thông tin cần lấy dữ liệu' }}
                                        </button>
                                    </h3>
                                    <input type="checkbox" v-model="data.isSelected" class="form-check-input me-2" />
                                </div>
                                <div :id="'collapse' + index" class="accordion-collapse collapse " :aria-labelledby="'heading' + index">
                                    <div class="accordion-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label :for="'site_name_' + index">Site Name</label>
                                                    <input type="text" v-model="data.site_name" class="form-control" :id="'site_name_' + index" required>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label :for="'url_' + index">URL</label>
                                                    <input type="text" v-model="data.url" class="form-control" :id="'url_' + index" required>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label :for="'category_' + index">Category</label>
                                                    <select v-model="data.category_id" class="form-control" :id="'category_' + index">
                                                        <option :value="1">Điện thoại</option>
                                                        <option :value="2">Laptop</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label :for="'name_selector_' + index">Name Selector</label>
                                                    <input type="text" v-model="data.selectors.name_selector" class="form-control" :id="'name_selector_' + index">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label :for="'price_selector_' + index">Price Selector</label>
                                                    <input type="text" v-model="data.selectors.price_selector" class="form-control" :id="'price_selector_' + index">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label :for="'link_selector_' + index">Link Selector</label>
                                                    <input type="text" v-model="data.selectors.link_selector" class="form-control" :id="'link_selector_' + index">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label :for="'image_selector_' + index">Image Selector</label>
                                                    <input type="text" v-model="data.selectors.image_selector" class="form-control" :id="'image_selector_' + index">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-4">
                            <button type="button" class="btn btn-secondary me-3" @click="addForm">
                                Add Another
                            </button>
                            <button type="submit" class="btn btn-primary">
                                Crawl Data
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
        <div class="col-md-12 ">
            <div v-if="crawlStatus === 'loading'">Đang lấy dữ liệu...</div>
            <div v-if="crawlStatus === 'success'">Thành công!</div>
            <div v-if="crawlStatus === 'error'">Lấy dữ liệu thất bại!</div>
        </div>
        <div class="col-md-12">
            <div class="card" style="height: 600px; display: flex; flex-direction: column;">
                <div class="card-header  text-white d-flex justify-content-center align-items-center">
                    <h4 class="mb-0">Thông tin sản phẩm lấy dữ liệu được</h4>
                </div>
                <div class="card-body" style="flex: 1; overflow-y: auto;">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th style="width: 20%">Tên sản phẩm</th>
                                <th style="width: 20%">Link sản phẩm</th>
                                <th style="width: 15%">Giá sản phẩm</th>
                                <th style="width: 15%">Hình ảnh</th>
                                <th style="width: 10%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in statusLog" :key="index">
                                <td>
                                    <div v-if="!product.isEditing">
                                        {{ product.product_name }}
                                    </div>
                                    <input v-if="product.isEditing" v-model="product.product_name" class="form-control  text-black border-0" />
                                </td>
                                <td class="text-truncate" style="max-width: 200px;">
                                    <div v-if="!product.isEditing">
                                        <a :href="product.product_link" target="_blank">link sản phẩm</a>
                                    </div>
                                    <div v-else>
                                        <input v-model="product.product_link" class="form-control" />
                                    </div>
                                </td>
                                <td>{{ product.product_price }}</td>
                                <td>
                                    <div v-if="!product.isEditing">
                                        <img :src="product.product_image" alt="Product Image" style="width: 50px;" />
                                    </div>
                                    <div v-else>
                                        <input v-model="product.product_image" class="form-control" />
                                    </div>
                                </td>
                                <td>
                                    <button class="btn btn-primary btn-sm me-3" @click="toggleEdit(index)">
                                        <i class="fas fa-edit" v-if="!product.isEditing"></i>
                                        <i class="fas fa-save" v-else></i>
                                    </button>
                                    <button class="btn btn-danger btn-sm" @click="deleteProduct(product)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div class="card-footer d-flex justify-content-center" style="position: sticky; bottom: 0; background-color: white;">
                    <button @click="saveCrawledData" class="btn btn-success w-20">Lưu tất cả sản phẩm</button>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
export default {
    name: 'CrawlView',
    data() {
        return {
            formData: [{
                site_name: '',
                url: '',
                category_id: null,
                selectors: {
                    name_selector: '',
                    price_selector: '',
                    link_selector: '',
                    image_selector: ''
                }
            }],
            statusLog: [],
            crawlStatus: ''
        };
    },
    mounted() {
        this.loadInitialData();
    },
    methods: {
        async loadInitialData() {
            try {
                const response = await this.axios.get('https://localhost:7108/api/CrawlData');
                const sites = response.data;

                this.formData = sites.map(site => ({
                    site_name: site.siteName || '',
                    url: site.url || '',
                    category_id: site.categoryId || null,
                    isSelected: false, // Mặc định không chọn
                    selectors: {
                        name_selector: site.nameSelector || '',
                        price_selector: site.priceSelector || '',
                        link_selector: site.linkSelector || '',
                        image_selector: site.imageSelector || ''
                    }
                }));
            } catch (error) {
                console.error('Error fetching initial site data:', error);
            }
        },
        async submitCrawlForm() {
            try {
                this.statusLog = [];
                const selectedSites = this.formData.filter(data => data.isSelected);

                if (selectedSites.length === 0) {
                    this.statusLog.push('Vui lòng chọn ít nhất một site để crawl.');
                    return;
                }

                this.crawlStatus = 'loading';

                for (const data of selectedSites) {
                    try {
                        const response = await this.axios.post('http://localhost:5000/crawl', data);
                        const products = response.data.map(product => ({
                            ...product,
                            isEditing: false
                        }));
                        this.statusLog.push(...products);
                    } catch (error) {
                        this.statusLog.push({
                            error: error.message
                        });
                    }
                }
                this.crawlStatus = 'success';
                console.log('Status Log:', this.statusLog);
            } catch (error) {
                this.crawlStatus = 'error';
                console.error('Error:', error);
                this.statusLog = [{
                    error: error.message
                }];
            }
        },
        addForm() {
            this.formData.push({
                site_name: '',
                url: '',
                category_id: null,
                selectors: {
                    name_selector: '',
                    price_selector: '',
                    link_selector: '',
                    image_selector: ''
                }
            });
        },
        removeForm(index) {
            this.formData.splice(index, 1);
        },
        async saveCrawledData() {
            try {

                console.log('Current statusLog:', this.statusLog);

                const products = this.statusLog;

                const productsToSave = products.map(product => ({
                    product_name: product.product_name || '',
                    product_price: product.product_price || '',
                    product_link: product.product_link || '',
                    product_image: product.product_image || ''
                })).filter(product => product.product_name);

                if (productsToSave.length === 0) {
                    console.log('Không có sản phẩm hợp lệ để lưu.');
                    return;
                }
                const selectedSites = this.formData.filter(data => data.isSelected);

                for (const formData of selectedSites) {
                    const response = await this.axios.post('http://localhost:5000/add_products', {
                        products: productsToSave,
                        category_id: formData.category_id,
                        site_name: formData.site_name
                    });

                    if (response.data.status === 'success') {
                        this.statusLog.push(`Dữ liệu cho trang ${formData.site_name} đã được lưu thành công!`);
                    } else {
                        this.statusLog.push(`Lưu dữ liệu cho trang ${formData.site_name} thất bại. Phản hồi: ` + JSON.stringify(response.data));
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                this.statusLog.push(`Lỗi khi lưu dữ liệu: ${error.message}`);
            }
        },
        toggleEdit(index) {
            if (this.statusLog[index]) {
                this.statusLog[index].isEditing = !this.statusLog[index].isEditing;
            } else {
                console.error(`Sản phẩm tại index ${index} không tồn tại.`);
            }
        },

        deleteProduct(index) {
            if (this.statusLog[index]) {
                this.statusLog.splice(index, 1);
            } else {
                console.error(`Không thể xóa sản phẩm tại index ${index} vì không tồn tại.`);
            }
        }

    }
};
</script>

<style scoped>
.container {
    margin-top: 20px;
}

.card {

    margin-bottom: 20px;
}

.card-header {
    background-color: #2596be;
    padding: 5px;
}

.card-body {
    background-color: rgb(255, 255, 255);
    padding: 20px;
}

.pre {
    white-space: pre-wrap;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
    overflow: auto;
}

label {
    font-size: 0.9rem;
}
</style>
