import { X, AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

type ConfirmActionModalProps = {
  isOpen: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: ReactNode;
};

const ConfirmActionModal = ({
  isOpen,
  title = "Confirm Action",
  description = "Are you sure you want to proceed? This action cannot be undone.",
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  icon,
}: ConfirmActionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl border border-amber-200 dark:border-slate-600 shadow-xl transition-all">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-zinc-500 dark:text-zinc-300 hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          {icon ?? (
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          )}
          <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">{title}</h2>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">{description}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium rounded-xl bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-slate-600 transition-all"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-all"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
