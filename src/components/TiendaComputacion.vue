<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import type { Categoria, Producto } from '../types/producto'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const authStore = useAuthStore()

const API_URL = 'http://localhost:8080/tienda_api'

const categorias = ref<Categoria[]>([])
const productos = ref<Producto[]>([])
const nuevoProducto = ref({ nombre: '', precio: 0, stock: 1, categoria_id: 0 })

const cargarDatos = async (): Promise<void> => {
  try {
    const resCat = await fetch(`${API_URL}/api_categorias.php`)
    categorias.value = await resCat.json()

    const resProd = await fetch(`${API_URL}/api_productos_detalle.php`)
    productos.value = await resProd.json()
  } catch (error) {
    console.error('Error al cargar datos:', error)
  }
}

const guardarProducto = async (): Promise<void> => {
  if (nuevoProducto.value.categoria_id === 0) return alert('Seleccione una categoría.')

  await fetch(`${API_URL}/api_productos.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authStore.token}`
    },
    body: JSON.stringify(nuevoProducto.value)
  })

  nuevoProducto.value = { nombre: '', precio: 0, stock: 1, categoria_id: 0 }
  await cargarDatos()
}

const exportarPDF = (): void => {
  const doc = new jsPDF()
  doc.text('Reporte Oficial de Inventario - TechStore PC', 14, 15)

  const filas = productos.value.map(p => [
    `#${p.id}`,
    p.nombre,
    p.categoria,
    `${p.stock} un.`,
    `Bs. ${Number(p.precio).toFixed(2)}`
  ])

  autoTable(doc, {
    head: [['ID', 'Producto / Equipo', 'Categoría', 'Stock', 'Precio']],
    body: filas,
    startY: 20
  })

  doc.save('inventario_tienda_pc.pdf')
}

onMounted(cargarDatos)
</script>

<template>
  <div class="container my-4">
    <header class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold text-dark">🖥️ Tienda de Computación - Panel de Control</h2>
      <button @click="exportarPDF" class="btn btn-danger shadow-sm">📄 Exportar PDF</button>
    </header>

    <section class="card mb-4 shadow-sm border-0">
      <div class="card-header bg-dark text-white fw-semibold">Registrar Nuevo Componente / Equipo</div>
      <div class="card-body bg-light">
        <form @submit.prevent="guardarProducto" class="row g-3">
          <div class="col-md-4">
            <label class="form-label">Nombre del Producto</label>
            <input v-model="nuevoProducto.nombre" type="text" class="form-control" placeholder="Ej: GPU RTX 4060" required />
          </div>
          <div class="col-md-3">
            <label class="form-label">Precio (Bs.)</label>
            <input v-model.number="nuevoProducto.precio" type="number" step="0.01" class="form-control" required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Stock</label>
            <input v-model.number="nuevoProducto.stock" type="number" class="form-control" required />
          </div>
          <div class="col-md-3">
            <label class="form-label">Categoría</label>
            <select v-model="nuevoProducto.categoria_id" class="form-select" required>
              <option :value="0" disabled>Seleccione categoría...</option>
              <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
                {{ cat.nombre }}
              </option>
            </select>
          </div>
          <div class="col-12 text-end">
            <button type="submit" class="btn btn-primary px-4">Guardar Producto</button>
          </div>
        </form>
      </div>
    </section>

    <div class="table-responsive shadow-sm rounded">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in productos" :key="item.id">
            <td>#{{ item.id }}</td>
            <td class="fw-semibold">{{ item.nombre }}</td>
            <td><span class="badge bg-info text-dark">{{ item.categoria }}</span></td>
            <td>{{ item.stock }} unidades</td>
            <td class="fw-bold text-success">Bs. {{ Number(item.precio).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>