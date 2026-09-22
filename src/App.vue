<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand fw-bold">🖥️ TechStore PC</router-link>
      <div class="navbar-nav ms-auto">
        <router-link to="/" class="nav-link">Inicio</router-link>
        <router-link to="/catalogo" class="nav-link">Catálogo</router-link>
        <router-link to="/contacto" class="nav-link">Contacto</router-link>
        <router-link to="/admin" class="btn btn-outline-light ms-2 btn-sm">Admin</router-link>
      </div>
    </div>
  </nav>

  <main class="container my-4">
    <router-view />
  </main>
</template>

<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
</style>