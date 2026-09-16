'use client'
import { useState, useTransition } from 'react'
import {
  firstPassApprove,
  firstPassRequestChanges,
  firstPassPermReject,
  confirmReview,
} from '@/actions/ship'

type Decision = 'approved' | 'changes_requested' | 'perm_rejected'

interface ShipEvent {
  id: number
  seconds: number                 // originally tracked, read-only ceiling
  approvedSeconds?: number | null // first-pass reviewer's chosen value
  approvalStatus: string
  firstPassApprovalStatus: string
  firstPassReviewerNote?: string | null
  firstPassAuditNote?: string | null
}

function formatSeconds(totalSeconds: number) {
  const totalMinutes = Math.round(totalSeconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (hours === 0) return `${minutes}m`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}

export function ReviewPanel({ shipEvent }: { shipEvent: ShipEvent }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const [decision, setDecision] = useState<Decision>(
    (shipEvent.firstPassApprovalStatus as Decision) || 'approved'
  )
  const [reviewerNote, setReviewerNote] = useState(shipEvent.firstPassReviewerNote ?? '')
  const [auditNote, setAuditNote] = useState(shipEvent.firstPassAuditNote ?? '')

 const [approvedSecondsStr, setApprovedSecondsStr] = useState(
  String(Math.round(((shipEvent.approvedSeconds ?? shipEvent.seconds) / 3600) * 100) / 100)
)

  const boxClass = 'w-full rounded-xl border-2 border-[#c9a030]/40 bg-[#fdf0c2] p-3 text-base text-[#2A1A08]'
  const btnBase = 'px-5 py-2 rounded-xl border-2 border-[#24221C] font-semibold transition-colors disabled:opacity-50'

  if (shipEvent.approvalStatus !== 'pending' || done) {
    return (
      <div className="ml-2 mt-4 text-lg font-semibold text-[#2A1A08]">
        This ship event has been finalized.
      </div>
    )
  }

  const parsedSeconds = Math.round(Number(approvedSecondsStr) * 3600) 
  const secondsValid = Number.isFinite(parsedSeconds) && parsedSeconds >= 0 && parsedSeconds <= shipEvent.seconds

  const HoursOverrideInput = (
    <div>
      <label className="ml-1 text-sm text-[#69583C] block mb-1">
        Approved hours (tracked: {formatSeconds(shipEvent.seconds)})
      </label>
      <input
        type="number"
        step="0.1"
        min={0}
        max={shipEvent.seconds / 3600}
        className={boxClass}
        value={approvedSecondsStr}
        onChange={(e) => setApprovedSecondsStr(e.target.value)}
      />
      {!secondsValid && (
        <p className="text-red-600 text-sm mt-1">
          Must be between 0 and {(shipEvent.seconds / 3600).toFixed(2)}h
        </p>
      )}
    </div>
  )

  if (shipEvent.firstPassApprovalStatus === 'pending') {
    const runFirstPass = (kind: Decision) => {
      setError(null)

      if (kind === 'approved' && !secondsValid) {
        setError('Enter a valid approved-hours amount before approving')
        return
      }

      startTransition(async () => {
        let res
        if (kind === 'approved') {
          res = await firstPassApprove(shipEvent.id, parsedSeconds, reviewerNote || undefined, auditNote || undefined)
        } else if (kind === 'changes_requested') {
          res = await firstPassRequestChanges(shipEvent.id, reviewerNote || undefined, auditNote || undefined)
        } else {
          res = await firstPassPermReject(shipEvent.id, reviewerNote || undefined, auditNote || undefined)
        }
        if (!res.success) setError(res.error ?? 'Something went wrong')
        else setDone(true)
      })
    }

    return (
      <div className="ml-2 mt-4 flex flex-col gap-3">
        <h3 className="text-xl font-bold text-[#2A1A08]">First pass review</h3>

        {HoursOverrideInput}

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
          <button className={`${btnBase} bg-emerald-200 hover:bg-emerald-300`} disabled={isPending} onClick={() => runFirstPass('approved')}>
            Approve
          </button>
          <button className={`${btnBase} bg-amber-200 hover:bg-amber-300`} disabled={isPending} onClick={() => runFirstPass('changes_requested')}>
            Request Changes
          </button>
          <button className={`${btnBase} bg-red-200 hover:bg-red-300`} disabled={isPending} onClick={() => runFirstPass('perm_rejected')}>
            Permanently Reject
          </button>
        </div>
        {error && <p className="text-red-600 text-base">{error}</p>}
      </div>
    )
  }

  const submitConfirm = () => {
    setError(null)

    if (decision === 'approved' && !secondsValid) {
      setError('Enter a valid approved-hours amount before confirming an approval')
      return
    }

    startTransition(async () => {
      const res = await confirmReview(
        shipEvent.id,
        decision,
        decision === 'approved' ? parsedSeconds : 0,
        reviewerNote || undefined,
        auditNote || undefined
      )
      if (!res.success) setError(res.error ?? 'Something went wrong')
      else setDone(true)
    })
  }

  return (
    <div className="ml-2 mt-4 flex flex-col gap-3">
      <h3 className="text-xl font-bold text-[#2A1A08]">Confirm review</h3>
      <p className="text-sm text-[#69583C]">
        First pass: <span className="font-semibold">{shipEvent.firstPassApprovalStatus}</span>
        {shipEvent.approvedSeconds != null && ` (${formatSeconds(shipEvent.approvedSeconds)} approved)`}.
        Edit below if you disagree, or submit as-is to confirm.
      </p>

      <select className={boxClass} value={decision} onChange={(e) => setDecision(e.target.value as Decision)}>
        <option value="approved">Approve</option>
        <option value="changes_requested">Request Changes</option>
        <option value="perm_rejected">Permanently Reject</option>
      </select>

      {decision === 'approved' && HoursOverrideInput}

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

      <button className={`${btnBase} bg-emerald-200 hover:bg-emerald-300 w-fit`} disabled={isPending} onClick={submitConfirm}>
        Submit Final Decision
      </button>
      {error && <p className="text-red-600 text-base">{error}</p>}
    </div>
  )
}