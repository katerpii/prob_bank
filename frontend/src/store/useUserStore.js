// src/store/userStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
        }),
        {
            name: 'user-store', // localStorage에 저장될 키 이름
        }
    )
)

export default useUserStore