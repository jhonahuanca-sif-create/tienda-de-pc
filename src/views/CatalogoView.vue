<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Producto } from '../types/producto'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/tienda_api'
const productos = ref<Producto[]>([])

// Banner superior
const urlBannerCat = 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=80'

// Mapeo dinámico de imágenes por categoría para la base de datos
const imagenesCategoria: Record<string, string> = {
  'Monitores': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
  'Tarjetas de Video': 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80',
  'Procesadores': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80',
  'Laptops Gaming': 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80'
}

const imagenPorDefecto = 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80'

const cargarProductos = async () => {
  try {
    const res = await fetch(`${API_URL}/api_productos_detalle.php`)
    const data = await res.json()

    if (Array.isArray(data)) {
      productos.value = data.map((p: Producto) => ({
        ...p,
        imagen: p.imagen || imagenesCategoria[p.categoria] || imagenPorDefecto
      }))
    }
  } catch (error) {
    console.error('Error al parsear el JSON:', error)
  }
}

onMounted(cargarProductos)
</script>

<template>
  <div class="container my-4">
    <!-- Banner Superior -->
    <div 
      class="p-5 mb-4 text-white rounded-4 shadow-lg banner-hero"
      :style="{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url('${urlBannerCat}')` }"
    >
      <h1 class="fw-bold display-5">📦 Catálogo de Productos</h1>
      <p class="fs-5 text-light mb-0">Explora componentes y laptops al mejor precio del mercado.</p>
    </div>

    <!-- Grid de Tarjetas desde la Base de Datos -->
    <div class="row g-4">
      <div v-for="item in productos" :key="item.id" class="col-12 col-md-6 col-lg-4">
        <div class="card bg-dark text-white h-100 shadow border-secondary hover-card overflow-hidden rounded-4">
          
          <div class="position-relative bg-black text-center p-3 img-wrapper">
            <span class="badge bg-primary position-absolute top-0 start-0 m-3 shadow-sm px-3 py-2">
              {{ item.categoria }}
            </span>
            <img 
              :src="item.imagen" 
              :alt="item.nombre"
              class="img-fluid rounded product-img"
            />
          </div>

          <div class="card-body d-flex flex-column p-4">
            <h5 class="card-title fw-bold text-light mb-2">{{ item.nombre }}</h5>
            <p class="card-text text-muted small mb-3">
              Stock disponible: <span class="fw-bold text-info">{{ item.stock }} unids.</span>
            </p>

            <div class="mt-auto d-flex justify-content-between align-items-center pt-3 border-top border-secondary">
              <div>
                <small class="text-muted d-block">Precio</small>
                <span class="fs-4 fw-bold text-success">Bs. {{ Number(item.precio).toFixed(2) }}</span>
              </div>
              <button class="btn btn-primary btn-sm px-3 shadow-sm rounded-pill">
                🛒 Comprar
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner-hero {
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hover-card {
  transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
}

.hover-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5) !important;
}

.img-wrapper {
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-img {
  max-height: 100%;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.hover-card:hover .product-img {
  transform: scale(1.08);
}
</style>