// 로그인한 사용자의 정보
import { create } from 'zustand'

const useUserStore = create((set) => ({
    // 기본 사용자 정보
    profile: {
        id: null,
        email: '',
        nickname: ''
    },

    // 프로필 업데이트 메서드
    updateProfile: (newProfileData) => set((state) => ({
        profile: { ...state.profile, ...newProfileData}
    })),

    // 사용자 설정
    // settings: {
    //     theme: 'light',
    // }

    // 설정 변경 메서드
    // updateSettings: (newSettings) => set((state) => ({
    //     settings: { ...state.settings, ...newSettings }
    // })),


}))

export default useUserStore