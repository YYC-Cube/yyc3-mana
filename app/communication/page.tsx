"use client"

import { Sidebar } from "@/components/sidebar"
import { CommunicationModule } from "@/components/communication-module"

export default function CommunicationPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <CommunicationModule />
      </main>
    </div>
  )
}
