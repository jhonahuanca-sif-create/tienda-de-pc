<script setup lang="ts">
defineProps<{
  titulo: string
  subtitulo: string
  imagenUrl: string
}>()
</script>

<template>
  <div 
    class="banner-header text-white text-center py-5 mb-4 rounded shadow"
    :style="{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${imagenUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '250px'
    }"
  >
    <div class="container d-flex flex-column justify-content-center h-100 py-4">
      <h1 class="display-4 fw-bold">{{ titulo }}</h1>
      <p class="lead mb-0">{{ subtitulo }}</p>
    </div>
  </div>
</template>