import React from 'react'
import { db } from '@/db/index'
import { JetBrains_Mono } from 'next/font/google'

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const typeStyles: Record<string, string> = {
  error: 'bg-red-950 text-red-400 border-red-800',
  auth: 'bg-yellow-950 text-yellow-400 border-yellow-800',
  project: 'bg-blue-950 text-blue-400 border-blue-800',
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date(date))
}

function formatMetadata(metadata: string | null) {
  if (!metadata) return ''
  const truncated = metadata.length > 60 ? metadata.slice(0, 60) + '…' : metadata
  return { full: metadata, truncated }
}

const page = async () => {
  const logs = await db.query.logs.findMany()

  return (
    <div className={`min-h-screen  px-6 py-10 sm:px-10 ${monoFont.className}`}>
      <div className="mx-auto max-w-6xl">
    
        <div className="w-full overflow-x-auto rounded-lg border border-zinc-800 bg-[#111111] shadow-sm">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 ">
                <th className="whitespace-nowrap px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-500">Time</th>
                <th className="whitespace-nowrap px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-500">Type</th>
                <th className="whitespace-nowrap px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-500">Title</th>
                <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-500">Description</th>
                <th className="whitespace-nowrap px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-500">Location</th>
                <th className="whitespace-nowrap px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-500">User</th>
                <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-500">Metadata</th>
                <th className="whitespace-nowrap px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-500">ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {logs.map((log) => {
                const meta = formatMetadata(log.metadata)
                const typeClass = typeStyles[log.type?.toLowerCase?.()] ?? typeStyles.debug

                return (
                  <tr key={log.id} className="transition-colors hover:bg-[#1a1a1a]">
                    <td className="whitespace-nowrap px-4 py-2.5 text-xs text-zinc-500">
                      {formatDate(log.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5">
                      <span className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium uppercase ${typeClass}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 font-medium text-zinc-200">
                      {log.title}
                    </td>
                    <td className="px-4 py-2.5 text-zinc-400">
                      <span className="line-clamp-1 max-w-[280px]">{log.description}</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5">
                      <span className="inline-flex items-center rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-xs text-zinc-400">
                        {log.location}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-xs text-zinc-500">
                      {log.userId}
                    </td>
                    <td className="px-4 py-2.5">
                      {typeof meta === 'object' ? (
                        <span
                          title={meta.full}
                          className="cursor-help rounded bg-zinc-900 px-2 py-0.5 text-xs text-zinc-500"
                        >
                          {meta.truncated}
                        </span>
                      ) : (
                        <span className="text-xs text-zinc-600">{meta}</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-xs text-zinc-600">
                      {log.id}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page