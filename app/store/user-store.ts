import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserInfo } from '../lib/types';

interface UserStates {
    userId: number;
    userInfo: UserInfo;
}

interface UserActions {
    setUserInfo: (value: UserInfo) => void;
    resetUser: () => void;
}

const defaultState: UserStates = {
    userId: 1,
    userInfo: {
        id: 1,
        code: '1001',
        fullname: 'Somchai Sangsuwan',
        email: 'somchai.sangsuwan@example.com',
        isAdmin: true,
        exp: 0,
        iat: 0,
    } 
};

export const useUserStore = create<UserStates & UserActions>()(
    persist(
        (set) => ({
            ...defaultState,
            setUserInfo: (userInfo) => set(() => {
                return {
                    userId: userInfo.id,
                    userInfo: userInfo
                }
            }),
            resetUser: () => set({ ...defaultState }),
        }),
        {
            name: 'user-store',
            partialize: (state) => ({ userId: state.userId, userInfo: state.userInfo })
        }
    )
);