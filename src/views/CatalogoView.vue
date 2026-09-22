<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Producto } from '../types/producto'

const API_URL = import.meta.env.VITE_API_BASE_URL
const productos = ref<Producto[]>([])

const cargarProductos = async () => {
  try {
    const res = await fetch(`${API_URL}/api_productos_detalle.php`)
    productos.value = await res.json()
  } catch (error) {
    console.error('Error al cargar catálogo:', error)
  }
}

onMounted(cargarProductos)
</script>

<template>
  <div class="container my-4">
    <h2 class="mb-4 fw-bold">📦 Catálogo de Productos</h2>
    <div class="row g-4">
      <div v-for="item in productos" :key="item.id" class="col-md-4">
        <div class="card h-100 shadow-sm border-0">
          <img 
            :src="item.imagen || 'https://via.placeholder.com/300x200?text=Hardware+PC'" 
            class="card-img-top p-3 rounded" 
            alt="Producto"
            style="height: 200px; object-fit: contain;"
          />
          <div class="card-body d-flex flex-column">
            <span class="badge bg-secondary mb-2 align-self-start">{{ item.categoria }}</span>
            <h5 class="card-title">{{ item.nombre }}</h5>
            <p class="card-text text-muted mb-4">Stock: {{ item.stock }} unidades</p>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <span class="fs-4 fw-bold text-success">Bs. {{ Number(item.precio).toFixed(2) }}</span>
              <button class="btn btn-outline-primary btn-sm">Añadir al carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>