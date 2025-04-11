"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X, AlertCircle, CheckCircle, Info } from "lucide-react"

interface Notification {
  id: string
  type: "info" | "success" | "error"
  message: string
}

export function IDENotification() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (type: "info" | "success" | "error", message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications((prev) => [...prev, { id, type, message }])
    setTimeout(() => removeNotification(id), 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getIcon = (type: "info" | "success" | "error") => {
    switch (type) {
      case "info":
        return <Info className="w-5 h-5 text-blue-400" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="mb-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
          >
            <div className="flex items-center p-4 space-x-3">
              {getIcon(notification.type)}
              <span className="text-gray-300 font-mono">{notification.message}</span>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-4 text-gray-400 hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
