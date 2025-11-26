import { create } from 'zustand';

interface LoadingStates {
    loading: boolean;
    fetching: boolean;
    processing: boolean;
    refreshCount: number;
}

interface LoadingActions {
    setLoading: (value: boolean) => void;
    setFetching: (value: boolean) => void;
    setProcessing: (value: boolean) => void;
    increaseRefresh: () => void;
    resetLoading: () => void;
}

const defaultState = {
    loading: false,
    fetching: false,
    processing: false,
    refreshCount: 0
};

export const useLoadingStore = create<LoadingStates & LoadingActions>((set) => ({
    ...defaultState,
    setLoading: (loading) => set(() => ({ loading })),
    setFetching: (fetching) => set(() => ({ fetching })),
    setProcessing: (processing) => set(() => ({ processing })),
    increaseRefresh: () => set((state) => ({ refreshCount: state.refreshCount + 1 })),
    resetLoading: () => set(defaultState),
}));