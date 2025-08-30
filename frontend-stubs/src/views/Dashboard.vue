<template>
  <div class="p-6">
    <h2 class="text-xl font-semibold">Dashboard</h2>
    <div class="mt-4 grid grid-cols-2 gap-4">
      <div class="p-4 bg-white shadow rounded">
        <div class="text-gray-500">Clicks</div>
        <div class="text-2xl">{{ summary.clicks }}</div>
      </div>
      <div class="p-4 bg-white shadow rounded">
        <div class="text-gray-500">Conversions</div>
        <div class="text-2xl">{{ summary.conversions }}</div>
      </div>
      <div class="p-4 bg-white shadow rounded">
        <div class="text-gray-500">Revenue</div>
        <div class="text-2xl">{{ summary.revenue }}</div>
      </div>
      <div class="p-4 bg-white shadow rounded">
        <div class="text-gray-500">Payout</div>
        <div class="text-2xl">{{ summary.payout }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const summary = ref({ clicks: 0, conversions: 0, revenue: 0, payout: 0 })

onMounted(async () => {
  try {
    const base = import.meta.env.VITE_API_BASE || '/api/v1'
    const { data } = await axios.get(`${base}/stats/summary`)
    summary.value = data
  } catch (e) {
    // noop
  }
})
</script>

