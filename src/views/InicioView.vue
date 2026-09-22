<script setup lang="ts">
// Modifica esta URL para cambiar la imagen de fondo del Banner
const urlImagenBanner = 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1600&q=80'
</script>

<template>
  <div>
    <!-- Hero Banner con Filtro Oscuro y URL de Fondo -->
    <div 
      class="hero-banner d-flex align-items-center justify-content-center text-center text-white rounded-4 shadow-lg mb-5"
      :style="{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url(${urlImagenBanner})` }"
    >
      <div class="px-3">
        <span class="badge bg-primary text-uppercase px-3 py-2 mb-3 tracking-wider">TechStore PC 2026</span>
        <h1 class="display-3 fw-extrabold mb-3 title-gradient">El Poder Supremo para tu Setup</h1>
        <p class="lead mb-4 text-light max-w-2xl mx-auto">
          Encuentra los componentes de gama alta, laptops gamer y hardware exclusivo al mejor precio.
        </p>
        <div class="d-flex justify-content-center gap-3">
          <router-link to="/catalogo" class="btn btn-primary btn-lg px-4 shadow-glow">
             Catálogo
          </router-link>
          <router-link to="/contacto" class="btn btn-outline-light btn-lg px-4">
             Contactar
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.hero-banner {
  height: 420px;
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.title-gradient {
  background: linear-gradient(135deg, #ffffff 0%, #a5f3fc 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.shadow-glow {
  box-shadow: 0 0 20px rgba(13, 110, 253, 0.5);
  transition: all 0.3s ease;
}

.shadow-glow:hover {
  box-shadow: 0 0 30px rgba(13, 110, 253, 0.8);
  transform: translateY(-2px);
}
</style>