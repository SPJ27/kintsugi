import { getHackatimeHours, getHackatimeProjects } from "./hackatime"

function parseGithubUrl(url: string) {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?(?:\/|$|\?|#)/)
  if (!match) return null
  return { owner: match[1], repo: match[2] }
}

type CommitNode = {
  oid: string
  message: string
  committedDate: string
  additions: number
  deletions: number
  author: { name: string; email: string; user: { login: string; avatarUrl: string } | null }
  seconds: number
}

export async function getCommits(repoUrl: string, hackatimeProjects: string[]) {
  const parsed = parseGithubUrl(repoUrl)
  if (!parsed) return null
  const { owner, repo } = parsed

  const query = `
    query ($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        defaultBranchRef {
          target {
            ... on Commit {
              history {
                nodes {
                  oid
                  message
                  committedDate
                  additions
                  deletions
                  author {
                    name
                    email
                    user { login avatarUrl }
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { owner, repo } }),
    next: { revalidate: 300 },
  })

  const json = await res.json()
  if (json.errors) {
    console.error('GitHub GraphQL error:', json.errors)
    return null
  }

  const nodes: CommitNode[] | undefined =
  json.data?.repository?.defaultBranchRef?.target?.history?.nodes

if (!nodes) return null
const sortedNodes = [...nodes].sort(
  (a, b) =>   new Date(a.committedDate).getTime() - new Date(b.committedDate).getTime()  
)
const updatedNodes = await Promise.all(
  sortedNodes.map(async (node, i) => {
    const nextNode = sortedNodes[i + 1] 
    const hours = await getHackatimeHours(
      hackatimeProjects,
      node.committedDate,
      nextNode?.committedDate ?? new Date().toISOString()
    )
    console.log('i', node.committedDate, nextNode?.committedDate ?? new Date().toISOString())
    return { ...node, hours }
  })
)

return updatedNodes
}
