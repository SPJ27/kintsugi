'use client'
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

const ReviewForm = ({ project, repoUrl, demoUrl, commits, shipEvent }: ReviewFormProps) => {
  const tagClass = 'shrink-0 py-1 mx-2 bg-[#2A1A08] text-lg px-4 h-11 items-center text-center justify-center flex rounded-2xl border-2 text-[#f0c14d] border-[#f0c14d]'

  return (
    <div>
      <div className={`min-h-screen px-6 py-10 sm:px-10 ${kalam.className}`}>
        <div className="mx-auto max-w-4xl">
          <div className="w-full shadow-[3px_5px_0_rgba(26,18,9,0.18)] flex flex-col rounded-4xl border-[4px] border-[#24221C] bg-[#e8b93f] p-4">
            <div className="w-full px-6 py-6 rounded-4xl border-[3px] gap-2 bg-[#fff9e8] border-[#24221C] flex flex-col">

              {project?.bannerUrl && (
                <div className="flex justify-center items-center">
                  <div className="relative w-full h-64 shrink-0 overflow-hidden rounded-3xl border-4 border-[#24221C]">
                    <Image src={project.bannerUrl} alt={project?.name ?? ''} fill className="object-cover" />
                  </div>
                </div>
              )}

              <div className="relative h-10 mb-2 mt-2">
                <h1 className={`absolute left-[7px] top-[4px] text-center text-3xl select-none md:text-4xl leading-none tracking-[2px] text-[#1a1209] ${rubiksWetPaint.className}`}>
                  {project?.name}
                </h1>
                <h1 className={`absolute select-none text-center md:text-4xl text-3xl translate-x-2 leading-none tracking-[2px] text-[#f0c14d] ${rubiksWetPaint.className} [-webkit-text-stroke:0.7px_#1a1209]`}>
                  {project?.name}
                </h1>
              </div>

              <div className="flex kintsugi-scrollbar w-full overflow-x-auto overflow-y-hidden">
                <div className="flex w-max gap-2 items-center">
                  <div className={tagClass}>{formatSeconds(shipEvent.seconds)}</div>

                  {demoUrl && (
                    <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={`${tagClass} gap-2`}>
                      <ExternalLink size={18} />
                      Demo
                    </a>
                  )}

                  {repoUrl && (
                    <a href={repoUrl} target="_blank" rel="noopener noreferrer" className={`${tagClass} gap-2`}>
                      <GitCommit size={18} />
                      Repo
                    </a>
                  )}

                </div>
              </div>

              <div className="ml-2 my-1 text-lg">
                {project?.description || 'No description added yet.'}
              </div>

              <div className="flex items-center gap-2 ml-2 mt-1 text-base text-[#69583C]">
                {shipEvent.user?.image && (
                  <Image src={shipEvent.user.image} alt={shipEvent.user.name} width={24} height={24} className="rounded-full" />
                )}
                <span className="font-semibold text-[#2A1A08]">{shipEvent.user?.slackId}</span>
                <span>·</span>
                <span>Shipped {formatRelativeDate(shipEvent.createdAt.toString())}</span>
              </div>

              {shipEvent.shipText && (
                <div className="ml-2 mt-3 text-lg text-[#2A1A08] bg-[#fdf0c2] border-2 border-[#c9a030]/40 rounded-2xl p-4">
                  {shipEvent.shipText}
                </div>
              )}

              {shipEvent.reviewerNote && (
                <div className="ml-2 mt-2 text-sm text-[#69583C]">
                  <span className="font-semibold text-[#2A1A08]">Reviewer note:</span> {shipEvent.reviewerNote}
                </div>
              )}

              <div className="mt-6">
                <h2 className="ml-2 text-2xl font-bold text-[#2A1A08] mb-3">Commits</h2>

                {!repoUrl && <p className="ml-2 text-lg text-red-600">No repo URL on this project.</p>}
                {repoUrl && commits === null && (
                  <p className="ml-2 text-lg text-red-600">Couldn&apos;t load commits for {repoUrl}.</p>
                )}
                {commits?.length === 0 && <p className="ml-2 text-lg text-[#69583C]">No commits found.</p>}

                <div className="relative">
                  {commits && commits.length > 0 && (
                    <div className="absolute left-[19px] top-2 bottom-2 w-[3px] bg-[#c9a030]/40" />
                  )}

                  <div className="flex flex-col">
                    {commits?.map((c) => (
                      <div key={c.oid} className="relative flex gap-4 py-3 group">
                        <div className="relative z-10 mt-1.5 w-[39px] flex justify-center shrink-0">
                          <div className="w-3 h-3 rounded-full bg-[#c9a030] border-2 border-[#fff9e8] ring-2 ring-[#c9a030]/50 group-hover:bg-[#2A1A08] group-hover:ring-[#2A1A08]/50 transition-colors" />
                        </div>

                        <div className="flex-1 min-w-0 pb-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-lg text-[#2A1A08] leading-snug">{c.message.split('\n')[0]}</p>
                            <span className="text-sm text-[#c9a030] shrink-0 mt-0.5">
                              {c.oid.slice(0, 7)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-1.5 text-sm text-[#69583C]">
                            {c.author.user?.avatarUrl && (
                              <img src={c.author.user.avatarUrl} alt={c.author.name} className="w-5 h-5 rounded-full" />
                            )}
                            <span className="font-semibold text-[#2A1A08]">
                              {c.author.user?.login ?? c.author.name}
                            </span>
                            <span>·</span>
                            <span>{formatRelativeDate(c.committedDate)}</span>

                            <span className="ml-auto flex items-center gap-2.5">
                              <span className="text-emerald-700">+{c.additions}</span>
                              <span className="text-red-600">-{c.deletions}</span>
                              {c.hours && (
                                <span className="text-[#2A1A08] bg-[#fdf0c2] border border-[#c9a030]/40 px-2 py-0.5 rounded-lg">
                                  {formatSeconds(c.hours.totalSeconds || 0)}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ReviewForm