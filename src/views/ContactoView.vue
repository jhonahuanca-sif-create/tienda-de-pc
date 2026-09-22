<template>
  <div class="container my-4">
    <h2 class="mb-4 fw-bold">📩 Contáctanos</h2>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent class="card p-4 shadow-sm border-0">
          <div class="mb-3">
            <label class="form-label">Nombre completo</label>
            <input type="text" class="form-control" placeholder="Tu nombre" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Correo Electrónico</label>
            <input type="email" class="form-control" placeholder="nombre@correo.com" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Mensaje</label>
            <textarea class="form-control" rows="4" placeholder="¿En qué te podemos ayudar?" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
        </form>
      </div>
      <div class="col-md-6 d-flex align-items-center">
        <div class="p-4">
          <h4>Atención al Cliente</h4>
          <p>📍 La Paz, Bolivia</p>
          <p>📞 Teléfono: +591 70000000</p>
          <p>✉️ Email: ventas@techstore.com</p>
        </div>
      </div>
    </div>
  </div>
</template>