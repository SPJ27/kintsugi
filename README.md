# Kintsugi 
 金継ぎ - break it. fix it. ship it.

## Description
Its a website made for ysws which is still in draft named as `kintsugi`. Kintsugi is Japanese art of reparing broken pottery by mending the cracks.

## Features
- Create Project
- Read Project
- Update Project
- Delete Project
- Ship Project
- Edit Project
- Time Tracking using hackatime
- Shipping Projects
- Approving, Rejecting, Requesting Changes, Perm Reject Projects
- Full Reviewers Dash - With showing time tracked on hackatime along with git commits, reviewer, reviewer notes, audit notes, and more...
- Admin Dash - User Models, Projects Models, Ship Event Models, and Audit Logs


## Tech Stack
- Next JS
- HC Auth
- Hackatime 
- Neon 
- TailwindCSS
- Framer Motion
- Drizzle
- PostgreSql
- Lucide Icons
- GIT
- GITHUB 
- Slack API

## Installation

1. Clone the Repository
```
git clone https://github.com/akshansh-kakkkar/kintsugi.git
```

2. Install the dependencies
```
bun install
```

3. Add the Env

```

DATABASE_URL=

HACKCLUB_CLIENT_ID =

HACKCLUB_CLIENT_SECRET = 

BETTER_AUTH_SECRET = 

BETTER_AUTH_URL = 

HACKATIME_CLIENT_ID =

HACKATIME_CLIENT_SECRET = 

HACKATIME_REDIRECT_URI = 

SLACK_BOT_TOKEN=

CDN_KEY=

```


4. Run the server

```
bun run dev
```

Link
###### https://kintsugi-xi.vercel.app/

## Contributions

1. spj (saksham jain) - almost all of the backend work, including database, auth integration, project management, ship events management, admin dashboard, full reviewing system, hackatime, etc.
2. akshansh (akshansh kakkar) - all frontend work, like adding all cool animations, project crud management, ship event frontend flow, project flow, etc.

`AI Note : AI was used minimally during development. primarily for research and debugging or fixing occasional bugs.`
