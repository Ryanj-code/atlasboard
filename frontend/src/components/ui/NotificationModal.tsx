import { X, Info } from "lucide-react";

type NotificationModalProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
};

const NotificationModal = ({
  isOpen,
  title = "Notification",
  message = "An action has occurred.",
  onClose,
}: NotificationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl border border-blue-200 dark:border-slate-600 shadow-xl transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 dark:text-zinc-300 hover:text-blue-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">{title}</h2>
        </div>

        {/* Message */}
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">{message}</p>

        {/* Action */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
