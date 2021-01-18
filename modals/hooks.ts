import { createContext, createContextHook } from "../utils/context-hook";

interface ModalState {
  openModal: (value: ModalType) => void;
  closeModal: () => void;
}

export type ModalType = "REGISTER" | "LOGIN" | "LICENSES" | "CONTACT";

export const ModalContext = createContext<ModalState>('modal');
export const useModal = createContextHook(ModalContext);
