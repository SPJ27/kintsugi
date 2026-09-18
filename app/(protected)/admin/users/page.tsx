import { db } from '@/db'
import { getSlackProfile } from '@/lib/auth-guard'
import { Kalam } from 'next/font/google'
import { UserSearch } from './user-search'

const kalamFont = Kalam({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
})

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = (q ?? '').trim().toLowerCase()

  const users = await db.query.user.findMany()

  const slackProfiles = await Promise.all(
    users.map((user) =>
      user.slackId ? getSlackProfile(user.slackId) : Promise.resolve(null)
    )
  )

  const profileById = new Map(
    users.map((user, i) => [user.id, slackProfiles[i]])
  )

  const filteredUsers = query
    ? users.filter((user) => {
        const profile = profileById.get(user.id)
        const haystack = [
          user.email,
          user.slackId,
          user.id,
          profile?.name,
          ...user.role,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(query)
      })
    : users

  return (
    <div className={`min-h-screen px-6 py-10 sm:px-10 ${kalamFont.className}`}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-baseline justify-between gap-6">
          <div>
            <h1 className="text-4xl font-semibold uppercase tracking-tight text-[#2A1A08]">
              Users
            </h1>
            <p className="mt-1 text-lg text-[#C4B282]">
              {filteredUsers.length}{' '}
              {filteredUsers.length === 1 ? 'person' : 'people'}
              {query ? ' matched' : ' logged'}
              {query && users.length !== filteredUsers.length && (
                <span className="text-[#69583C]"> of {users.length}</span>
              )}
            </p>
          </div>
          <UserSearch defaultValue={q ?? ''} />
        </div>

        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-sm border-2 border-dashed border-[#c9a030] bg-[#FDF2CB] px-6 py-16 text-center text-[#C4B282] text-2xl">
            No users here yet
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-sm border-2 border-dashed border-[#c9a030] bg-[#FDF2CB] px-6 py-16 text-center text-[#C4B282] text-2xl">
            No users match &ldquo;{q}&rdquo;
          </div>
        ) : (
          <div className="w-full overflow-x-scroll rounded-sm border-2 border-dashed border-[#c9a030] bg-[#2A1A08] shadow-sm">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b-2 border-dashed border-[#453416]">
                  <th className="whitespace-nowrap px-5 py-3 text-base font-normal text-[#69583C]">Email</th>
                  <th className="whitespace-nowrap px-5 py-3 text-base font-normal text-[#69583C]">Slack</th>
                  <th className="whitespace-nowrap px-5 py-3 text-base font-normal text-[#69583C]">Slack ID</th>
                  <th className="whitespace-nowrap px-5 py-3 text-base font-normal text-[#69583C]">Role</th>
                  <th className="whitespace-nowrap px-5 py-3 text-base font-normal text-[#69583C]">ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#453416]">
                {filteredUsers.map((user) => {
                  const profile = profileById.get(user.id)
                  return (
                    <tr key={user.id} className="transition-colors hover:bg-[#3A2C10]">
                      <td className="whitespace-nowrap px-5 py-3.5 text-lg text-[#F5E4B0]">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        {profile ? (
                          <div className="flex items-center gap-2">
                            {profile.image && (
                              <img
                                src={profile.image}
                                alt={profile.name}
                                className="h-6 w-6 rounded-full border border-[#453416]"
                              />
                            )}
                            <span className="text-sm text-[#C4B282]">{profile.name}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-[#69583C]">{user.slackId ?? '—'}</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <span className="text-sm text-[#69583C]">{user.slackId ?? '—'}</span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <div className="flex flex-nowrap gap-1.5">
                          {user.role.map((r) => (
                            <span
                              key={r}
                              className="inline-flex items-center whitespace-nowrap rounded-full border px-3 py-0.5 text-sm bg-[#3A2C10] text-[#C4B282] border-[#453416]"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-sm text-[#69583C]">
                        {user.id}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}