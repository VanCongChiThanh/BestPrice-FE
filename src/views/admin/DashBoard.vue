<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Main content -->
      <div class="col-md-10">
        <h2 class="my-4">Tổng quan</h2>
        <div class="row g-4">
          <!-- Thêm các stats cards -->
          <div class="col-md-3" v-for="(stat, index) in statsCards" :key="index">
            <div :class="`card text-bg-${cardColors[index % cardColors.length]} h-100 text-light`">
              <div class="card-body">
                <h5 class="card-title">{{ stat.title }}</h5>
                <p class="card-text fs-3">{{ stat.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Thêm biểu đồ -->
        <div class="mt-5">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      statsCards: [
        { title: "Tổng doanh thu", value: "$12,000" },
        { title: "Lượng truy cập", value: "1,200" },
        { title: "Tổng số đối tác", value: "80" },
        { title: "Tổng số sản phẩm hiện có", value: "5700" },
      ],
      cardColors: ["primary", "success", "danger", "warning", "info", "secondary"],
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "Sales",
              data: [120, 190, 300, 500, 200, 300],
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
      });
    },
  },
};
</script>

<style>
.card.text-light .card-title,
.card.text-light .card-text {
  color: white !important;
}
</style>
