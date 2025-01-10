import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, XCircle, X } from "lucide-react";

type AlertType = "success" | "warning" | "error";

interface AlertStyles {
  background: string;
  border: string;
  text: string;
  icon: JSX.Element;
  ringColor: string;
}

type AlertStylesMap = Record<AlertType, AlertStyles>;

interface AlertProps {
  type: AlertType;
  message: string;
  onClose: () => void;
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({
  type = "success",
  message,
  onClose,
  duration = 5000,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const alertStyles = {
    success: {
      background: "bg-green-50 dark:bg-green-900/30",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-800 dark:text-green-100",
      ringColor: "ring-green-500/30",
      icon: (
        <div className="rounded-full bg-green-100 dark:bg-green-900 p-1">
          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-300" />
        </div>
      ),
    },
    warning: {
      background: "bg-yellow-50 dark:bg-yellow-900/30",
      border: "border-yellow-200 dark:border-yellow-800",
      text: "text-yellow-800 dark:text-yellow-100",
      ringColor: "ring-yellow-500/30",
      icon: (
        <div className="rounded-full bg-yellow-100 dark:bg-yellow-900 p-1">
          <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-300" />
        </div>
      ),
    },
    error: {
      background: "bg-red-50 dark:bg-red-900/30",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-800 dark:text-red-100",
      ringColor: "ring-red-500/30",
      icon: (
        <div className="rounded-full bg-red-100 dark:bg-red-900 p-1">
          <XCircle className="w-4 h-4 text-red-600 dark:text-red-300" />
        </div>
      ),
    },
  } satisfies AlertStylesMap;

  const { background, border, text, icon, ringColor } = alertStyles[type];

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed top-4 mx-4 right-0 left-0 md:left-auto md:right-4 z-50 md:max-w-sm w-auto transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
      role="alert"
      aria-live="polite"
    >
      <div
        className={`
          ${background} ${border} ${text} ${ringColor}
          rounded-lg border p-3 shadow-lg backdrop-blur-sm
          ring-1 dark:shadow-black/10
        `}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0" aria-hidden="true">
            {icon}
          </div>
          <div className="flex-1 ml-1">
            <p className="text-sm font-medium leading-5">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className={`
              flex-shrink-0 rounded-full p-1 
              ${text} hover:bg-black/5 dark:hover:bg-white/10 
              transition-colors
            `}
            aria-label="Cerrar alerta"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
