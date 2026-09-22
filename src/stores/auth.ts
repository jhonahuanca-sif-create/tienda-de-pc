import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token_jwt'))

  const guardarSesion = (jwtToken: string): void => {
    token.value = jwtToken
    localStorage.setItem('token_jwt', jwtToken)
  }

  const cerrarSesion = (): void => {
    token.value = null
    localStorage.removeItem('token_jwt')
  }

  return { token, guardarSesion, cerrarSesion }
})