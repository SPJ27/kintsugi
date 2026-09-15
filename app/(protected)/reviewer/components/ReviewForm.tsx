'use client'
import { useState, useTransition } from 'react'
import {
  firstPassApprove,
  firstPassRequestChanges,
  firstPassPermReject,
  confirmReview,
} from '@/actions/ship'
import { ExternalLink, GitCommit } from 'lucide-react'
import { Kalam, Rubik_Wet_Paint } from 'next/font/google'
import Image from 'next/image'

function formatSeconds(totalSeconds: number) {
  const totalMinutes = Math.round(totalSeconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) return `${minutes}m`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

// Manual time formatting instead of toLocaleTimeString: Intl output for the
// AM/PM marker (e.g. "AM" vs "am") can differ between the server's Node/ICU
// build and the browser's, which causes a hydration mismatch even though the
// underlying Date is identical. Formatting by hand guarantees the same
// string on server and client.
function formatTime(date: Date) {
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const period = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12
  if (hours === 0) hours = 12

  const paddedMinutes = minutes.toString().padStart(2, '0')
  return `${hours}:${paddedMinutes} ${period}`
}

function formatRelativeDate(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  const time = formatTime(date)

  if (diffDays === 0) return `Today, ${time}`
  if (diffDays === 1) return `Yesterday, ${time}`
  if (diffDays < 7) return `${diffDays}d ago, ${time}`

  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, ${time}`
}

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
})
const rubiksWetPaint = Rubik_Wet_Paint({
  subsets: ['latin'],
  weight: '400',
})

interface Project {
  name?: string
  description?: string | null
  bannerUrl?: string | null
}

interface CommitAuthorUser {
  login?: string | null
  avatarUrl?: string | null
}

interface CommitAuthor {
  name: string
  user?: CommitAuthorUser | null
}

interface CommitHours {
  totalSeconds?: number
}

interface Commit {
  oid: string
  message: string
  committedDate: string
  additions: number
  deletions: number
  author: CommitAuthor
  hours?: CommitHours | null
}

interface ShipEventUser {
  id: string
  name: string
  image?: string | null
  slackId: string | null
}

interface ShipEvent {
  id: number
  seconds: number
  createdAt: string | Date
  shipText?: string | null
  reviewerNote?: string | null
  user?: ShipEventUser | null
}

interface ReviewFormProps {
  project?: Project | null
  repoUrl?: string | null
  demoUrl?: string | null
  commits: Commit[] | null
  shipEvent: ShipEvent
}

interface ShipEvent {
  id: number
  seconds: number
  createdAt: string | Date
  shipText?: string | null
  reviewerNote?: string | null
  approvalStatus: string
  firstPassApprovalStatus: string
  firstPassReviewerNote?: string | null
  firstPassAuditNote?: string | null
  user?: ShipEventUser | null
}

type Decision = 'approved' | 'changes_requested' | 'perm_rejected'

export function ReviewPanel({ shipEvent }: { shipEvent: ShipEvent }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const [decision, setDecision] = useState<Decision>(
    (shipEvent.firstPassApprovalStatus as Decision) || 'approved'
  )
  const [reviewerNote, setReviewerNote] = useState(shipEvent.firstPassReviewerNote ?? '')
  const [auditNote, setAuditNote] = useState(shipEvent.firstPassAuditNote ?? '')

  const boxClass = 'w-full rounded-xl border-2 border-[#c9a030]/40 bg-[#fdf0c2] p-3 text-base text-[#2A1A08]'
  const btnBase = 'px-5 py-2 rounded-xl border-2 border-[#24221C] font-semibold transition-colors disabled:opacity-50'

  if (shipEvent.approvalStatus !== 'pending' || done) {
    return (
      <div className="ml-2 mt-4 text-lg font-semibold text-[#2A1A08]">
        This ship event has been finalized.
      </div>
    )
  }

  if (shipEvent.firstPassApprovalStatus === 'pending') {
    const runFirstPass = (fn: typeof firstPassApprove) => {
      setError(null)
      startTransition(async () => {
        const res = await fn(shipEvent.id, 500, reviewerNote || undefined, auditNote || undefined)
        if (!res.success) setError(res.error ?? 'Something went wrong')
        else setDone(true)
      })
    }

    return (
      <div className="ml-2 mt-4 flex flex-col gap-3">
        <h3 className="text-xl font-bold text-[#2A1A08]">First pass review</h3>
        <textarea
          className={boxClass}
          placeholder="Reviewer note (visible to submitter)"
          value={reviewerNote}
          onChange={(e) => setReviewerNote(e.target.value)}
          rows={2}
        />
        <textarea
          className={boxClass}
          placeholder="Audit note (internal only)"
          value={auditNote}
          onChange={(e) => setAuditNote(e.target.value)}
          rows={2}
        />
        <div className="flex gap-3 flex-wrap">
          <button
            className={`${btnBase} bg-emerald-200 hover:bg-emerald-300`}
            disabled={isPending}
            onClick={() => runFirstPass(firstPassApprove)}
          >
            Approve
          </button>
          <button
            className={`${btnBase} bg-amber-200 hover:bg-amber-300`}
            disabled={isPending}
            onClick={() => runFirstPass(firstPassRequestChanges)}
          >
            Request Changes
          </button>
          <button
            className={`${btnBase} bg-red-200 hover:bg-red-300`}
            disabled={isPending}
            onClick={() => runFirstPass(firstPassPermReject)}
          >
            Permanently Reject
          </button>
        </div>
        {error && <p className="text-red-600 text-base">{error}</p>}
      </div>
    )
  }

  const submitConfirm = () => {
    setError(null)
    startTransition(async () => {
      const res = await confirmReview(shipEvent.id, decision, reviewerNote || undefined, auditNote || undefined)
      if (!res.success) setError(res.error ?? 'Something went wrong')
      else setDone(true)
    })
  }

  return (
    <div className="ml-2 mt-4 flex flex-col gap-3">
      <h3 className="text-xl font-bold text-[#2A1A08]">Confirm review</h3>
      <p className="text-sm text-[#69583C]">
        First pass: <span className="font-semibold">{shipEvent.firstPassApprovalStatus}</span>.
        Edit below if you disagree, or submit as-is to confirm.
      </p>

      <select
        className={boxClass}
        value={decision}
        onChange={(e) => setDecision(e.target.value as Decision)}
      >
        <option value="approved">Approve</option>
        <option value="changes_requested">Request Changes</option>
        <option value="perm_rejected">Permanently Reject</option>
      </select>

      <textarea
        className={boxClass}
        placeholder="Reviewer note (visible to submitter)"
        value={reviewerNote}
        onChange={(e) => setReviewerNote(e.target.value)}
        rows={2}
      />
      <textarea
        className={boxClass}
        placeholder="Audit note (internal only)"
        value={auditNote}
        onChange={(e) => setAuditNote(e.target.value)}
        rows={2}
      />

      <button
        className={`${btnBase} bg-emerald-200 hover:bg-emerald-300 w-fit`}
        disabled={isPending}
        onClick={submitConfirm}
      >
        Submit Final Decision
      </button>
      {error && <p className="text-red-600 text-base">{error}</p>}
    </div>
  )
}