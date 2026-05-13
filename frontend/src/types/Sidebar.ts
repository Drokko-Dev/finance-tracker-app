export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: () => void; // ← agregar esto
}
