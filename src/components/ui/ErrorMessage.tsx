import React from 'react'
import { AlertCircle, XCircle, Info } from 'lucide-react'

interface ErrorMessageProps {
  message: string
  type?: 'error' | 'warning' | 'info'
  onRetry?: () => void
  className?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = 'error',
  onRetry,
  className = '',
}) => {
  const typeConfig = {
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-800 dark:text-red-200',
      iconColor: 'text-red-500',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-800 dark:text-yellow-200',
      iconColor: 'text-yellow-500',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-800 dark:text-blue-200',
      iconColor: 'text-blue-500',
    },
  }

  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div
      className={`flex items-center p-4 rounded-lg border ${config.bgColor} ${config.borderColor} ${className}`}
    >
      <Icon className={`w-5 h-5 mr-3 ${config.iconColor}`} />
      <div className={`flex-1 ${config.textColor}`}>
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`ml-3 text-sm font-medium ${config.textColor} hover:opacity-80 transition-opacity`}
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorMessage 