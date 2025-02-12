// src/store/userStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// localStorage에 권한, 비밀번호 노출됨
const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null })
        }),
        {
            name: 'user-store', // localStorage에 저장될 키 이름
        }
    )
)

export default useUserStore