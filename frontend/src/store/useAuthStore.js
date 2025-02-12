// src/store/authStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            setLoggedIn: (status) => set({ isLoggedIn: status }),
            logout: () => set({isLoggedIn: false })
        }),
        {
            name: 'auth-store', // localStorage에 저장될 키 이름
        }
    )
)

export default useAuthStore