import type { CSSProperties, ReactNode } from 'react'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '../data'
import { useIsMobile } from './useIsMobile'
import './readme.css'

const SANS = "'Inter', system-ui, sans-serif"
const SERIF = "'Cormorant Garamond', Georgia, serif"
const PINK = '#E05A82'
const CREAM = '#EDE8D3'
const MUTED = 'rgba(13,13,13,0.45)'
const BORDER = '2px solid #0D0D0D'

const chessGameEndImg = new URL(
  '../../screenshots-readme/chess-game-end.png',
  import.meta.url
).href
const matchHistoryImg = new URL(
  '../../screenshots-readme/match-history.png',
  import.meta.url
).href
const myProfileImg = new URL(
  '../../screenshots-readme/my-profile.png',
  import.meta.url
).href
const myFriendImg = new URL(
  '../../screenshots-readme/my-friend.png',
  import.meta.url
).href
const architectureImg = new URL(
  '../../screenshots-readme/System architecture diagram.png',
  import.meta.url
).href

type Project = (typeof PROJECTS)[0]

function ReadmeParagraph({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        margin: 0,
        fontFamily: SANS,
        fontSize: '0.92rem', // 👈 consistent everywhere
        lineHeight: 1.7,
        color: '#0D0D0D', // 👈 no more random gray tones
        maxWidth: '640px',
      }}
    >
      {children}
    </p>
  )
}

function ReadmeImage({
  src,
  alt,
  width = '100%',
}: {
  src: string
  alt: string
  width?: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '18px 0 22px',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width,
          maxWidth: '100%',
          borderRadius: '10px',
          border: '1px solid rgba(13,13,13,0.08)',
          boxShadow: '0 12px 30px rgba(13,13,13,0.08)',
        }}
      />
    </div>
  )
}

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre
      style={{
        margin: '18px 0',
        padding: '18px 20px',
        borderRadius: '10px',
        background: 'rgba(13,13,13,0.04)',
        border: '1px solid rgba(13,13,13,0.08)',
        overflowX: 'auto',
      }}
    >
      <code style={{ background: 'transparent', padding: 0, borderRadius: 0 }}>
        {children}
      </code>
    </pre>
  )
}

function ReadmeRule() {
  return <div style={{ borderTop: '1px solid rgba(13,13,13,0.1)' }} />
}

function ReadmeCard({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        borderRadius: '0px',
        background: 'transparent',
        borderBottom: '1px solid rgba(13,13,13,0.15)',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function ApiTable({
  rows,
}: {
  rows: Array<{ method: string; route: string; description: string }>
}) {
  return (
    <table
      style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}
    >
      <thead>
        <tr>
          {['Method', 'Route', 'Description'].map((label) => (
            <th
              key={label}
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                fontFamily: SANS,
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: PINK,
                borderBottom: '1px solid rgba(13,13,13,0.1)',
              }}
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={`${row.method}-${row.route}`}>
            <td
              style={{
                padding: '10px 12px',
                borderBottom: '1px solid rgba(13,13,13,0.06)',
              }}
            >
              <code>{row.method}</code>
            </td>
            <td
              style={{
                padding: '10px 12px',
                borderBottom: '1px solid rgba(13,13,13,0.06)',
              }}
            >
              <code>{row.route}</code>
            </td>
            <td
              style={{
                padding: '10px 12px',
                borderBottom: '1px solid rgba(13,13,13,0.06)',
                fontFamily: SANS,
                fontSize: '0.8rem',
                color: MUTED,
              }}
            >
              {row.description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ReadmeAccordionSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <ReadmeCard style={{ overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '18px 22px',
          border: 0,
          color: '#0D0D0D',
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            fontFamily: SERIF,
            fontSize: '1.4rem',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#0D0D0D',
            textTransform: 'none',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: SANS,
            fontSize: '0.72rem',
            fontWeight: 700,
            color: MUTED,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {open ? '−' : '+'}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 22px 22px' }}>
              <ReadmeRule />
              <div style={{ paddingTop: '18px' }}>{children}</div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ReadmeCard>
  )
}

function GameNiteReadme() {
  const isMobile = useIsMobile()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gap: '6px' }}>
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(2.6rem, 5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            borderBottom: '1px solid rgba(13,13,13,0.15)',
            paddingBottom: '12px',
          }}
        >
          Explore the System
        </h2>
      </div>

      <ReadmeAccordionSection title="Highlighted Features">
        {/* SUMMARY GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '14px',
            marginBottom: '18px',
          }}
        >
          {[
            ['Chess', 'Full rules, AI opponent, live Elo updates'],
            ['Match History', 'Filter, replay, and track performance'],
            ['Leaderboard', 'Live rankings, leagues, progression'],
            ['Friends System', 'Profiles, head-to-head stats'],
          ].map(([title, desc]) => (
            <div
              key={title}
              style={{
                border: '1px solid rgba(13,13,13,0.08)',
                padding: '12px 14px',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.3)',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: SERIF,
                  fontSize: '1.05rem',
                  fontWeight: 400,
                }}
              >
                {title}
              </p>
              <p
                style={{
                  margin: '4px 0 0',
                  fontFamily: SANS,
                  fontSize: '0.75rem',
                  color: MUTED,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>{' '}
        <h5
          style={{
            margin: '0 0 16px',
            fontFamily: SERIF,
            fontSize: '1.5rem',
            fontWeight: 400,
          }}
        >
          Chess
        </h5>
        <div style={{ display: 'grid', gap: '22px' }}>
          {/* GAMEPLAY */}
          <div style={{ display: 'grid', gap: '8px' }}>
            <span
              style={{
                fontFamily: SANS,
                fontSize: '0.62rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: MUTED,
              }}
            ></span>

            <ReadmeParagraph>
              Full rule enforcement via chess.js (including: castling, en
              passant, pawn promotion, check, stalemate, and checkmate.)
            </ReadmeParagraph>

            <ReadmeParagraph>
              Optional 5 10 30 minute time controls, resignation, and an AI
              opponent at three difficulty levels.
            </ReadmeParagraph>

            <ReadmeParagraph>
              Elo ratings update live the moment a game ends.
            </ReadmeParagraph>
          </div>

          {/* GAME RESULT IMAGE */}
          <div style={{ display: 'grid', gap: '8px' }}>
            <ReadmeImage
              src={chessGameEndImg}
              alt="Chess game end with Elo delta"
              width="500px"
            />

            <span
              style={{
                fontFamily: SANS,
                fontSize: '0.7rem',
                color: MUTED,
                textAlign: 'center',
              }}
            >
              Live Elo rating updates after each match
            </span>
          </div>

          {/* MATCH HISTORY */}
          <div style={{ display: 'grid', gap: '8px' }}>
            <span
              style={{
                fontFamily: SANS,
                fontSize: '0.62rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: MUTED,
              }}
            >
              Match History
            </span>

            <ReadmeParagraph>
              Every match is logged with opponent, result, exact rating delta,
              and date. Also, you can expand any chess game to step through
              moves on an inline replay board with the full move list.
            </ReadmeParagraph>
          </div>

          {/* MATCH HISTORY IMAGE */}
          <div style={{ display: 'grid', gap: '8px' }}>
            <ReadmeImage
              src={matchHistoryImg}
              alt="Match history with inline PGN replay"
              width="760px"
            />

            <span
              style={{
                fontFamily: SANS,
                fontSize: '0.7rem',
                color: MUTED,
                textAlign: 'center',
              }}
            >
              Filtered match history with replay board
            </span>
          </div>

          {/* ARCHITECTURE */}
          <div style={{ display: 'grid', gap: '8px' }}>
            <span
              style={{
                fontFamily: SANS,
                fontSize: '0.62rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: MUTED,
              }}
            >
              Architecture
            </span>

            <ReadmeParagraph>
              <strong>The game architecture is extensible by design.</strong>
            </ReadmeParagraph>

            <ReadmeParagraph>
              Each game implements a
              <code style={{ marginLeft: '6px' }}>
                GameLogic&lt;State, View&gt;
              </code>{' '}
              interface — start update isDone winner viewAs — and registers
              itself in a central service map.
            </ReadmeParagraph>

            <ReadmeParagraph>
              Adding a new game means dropping in one new file per layer (types,
              server logic, React component) with no changes to core
              infrastructure.
            </ReadmeParagraph>
          </div>
        </div>
      </ReadmeAccordionSection>

      <ReadmeAccordionSection title="Platform">
        <div style={{ display: 'grid', gap: '16px' }}>
          <ReadmeParagraph>
            <strong>Elo + Leagues</strong> — every completed match updates both
            players&apos; ratings using the standard Elo formula K=32. Cross a
            threshold and you&apos;re automatically promoted or demoted between
            Bronze Silver Gold. A live socket event fires so every connected
            client updates instantly.
          </ReadmeParagraph>
          <ReadmeParagraph>
            <strong>Leaderboard</strong> — global or friends-only, filterable by
            game type and league. Your own rank is always visible even if you
            fall outside the top 30.
          </ReadmeParagraph>
          <ReadmeParagraph>
            <strong>Friends and Profiles</strong> — every user has a public
            profile showing per-game ratings, progress to next league, win rate,
            and recent matches. On a friend&apos;s profile, you also see your
            head-to-head record against them.
          </ReadmeParagraph>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '16px',
            margin: '18px 0 10px',
          }}
        >
          <div>
            <img
              src={myProfileImg}
              alt="User profile"
              style={{
                width: '100%',
                borderRadius: '10px',
                border: '1px solid rgba(13,13,13,0.08)',
              }}
            />
            <p
              style={{
                margin: '8px 0 0',
                textAlign: 'center',
                fontFamily: SANS,
                fontSize: '0.72rem',
                color: MUTED,
              }}
            >
              Per-game ratings · league progress · win rate
            </p>
          </div>
          <div>
            <img
              src={myFriendImg}
              alt="Friend profile with head-to-head stats"
              style={{
                width: '100%',
                borderRadius: '10px',
                border: '1px solid rgba(13,13,13,0.08)',
              }}
            />
            <p
              style={{
                margin: '8px 0 0',
                textAlign: 'center',
                fontFamily: SANS,
                fontSize: '0.72rem',
                color: MUTED,
              }}
            >
              Head-to-head stats on any friend&apos;s profile
            </p>
          </div>
        </div>
        <div style={{ display: 'grid', gap: '16px', marginTop: '18px' }}>
          <ReadmeParagraph>
            <strong>Private Games</strong> — generate an invite code, share it,
            and spectators can watch live via the same WebSocket room.
          </ReadmeParagraph>
          <ReadmeParagraph>
            <strong>Auth</strong> — username/password or Google SSO via OAuth
            2.0. Both flow through a Passport.js strategy abstraction that
            issues the same JWT. The rest of the app never knows which provider
            was used.
          </ReadmeParagraph>
        </div>
      </ReadmeAccordionSection>

      <ReadmeAccordionSection title="System Architecture">
        <ReadmeImage
          src={architectureImg}
          alt="System Architecture"
          width="640px"
        />
        <blockquote
          style={{
            margin: 0,
            padding: '14px 18px',
            borderLeft: `3px solid ${PINK}`,
            background: 'rgba(224,90,130,0.06)',
            fontFamily: SANS,
            fontSize: '0.82rem',
            lineHeight: 1.75,
            color: '#0D0D0D',
            borderRadius: '0 10px 10px 0',
          }}
        >
          React communicates over REST for CRUD and WebSocket via Socket.io for
          live game state. Board state is authoritative server-side only — the
          client never mutates, only renders what it receives.
        </blockquote>
      </ReadmeAccordionSection>

      <ReadmeAccordionSection title="How It’s Built">
        <div style={{ display: 'grid', gap: '16px' }}>
          <ReadmeParagraph>
            <strong>Storage</strong> — a Keyv abstraction wraps every
            repository. In production a single env var points it at MongoDB. No
            conditionals scattered through the app, no code change required.
          </ReadmeParagraph>
          <ReadmeParagraph>
            <strong>Elo writes are atomic</strong> — when a game ends, the
            rating delta for both players is calculated and committed in a
            single service call. A crash mid-update can&apos;t leave one
            player&apos;s rating changed and the other&apos;s untouched.
          </ReadmeParagraph>
          <ReadmeParagraph>
            <strong>End-to-end type safety</strong> —{' '}
            <code>shared/src/socket.types.ts</code> is a single package imported
            by both client and server. If an event name or payload shape changes
            on one side, the build fails before anything ships.
          </ReadmeParagraph>
        </div>
        <CodeBlock>{`interface ServerToClientEvents {
  gameStateUpdated: (
    payload: TaggedGameView & { forPlayer: boolean },
  ) => void;
  gameRatingUpdated: (payload: { changes: RatingDelta[] }) => void;
  leagueChanged: (payload: { newLeague: League; oldLeague: League }) => void;
  friendRequestReceived: (payload: { from: SafeUserInfo }) => void;
}`}</CodeBlock>
        <ReadmeParagraph>
          <strong>Chess AI is async</strong> — after a human move, the AI
          response is scheduled with a short delay and runs outside the request
          cycle. The event loop never blocks waiting for minimax to finish. Hard
          mode uses alpha-beta pruning and piece-square tables at depth 3.
        </ReadmeParagraph>
      </ReadmeAccordionSection>

      <ReadmeAccordionSection title="API Routes">
        <div style={{ display: 'grid', gap: '28px' }}>
          <div>
            <h5
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontSize: '1.25rem',
                fontWeight: 400,
              }}
            >
              User
            </h5>
            <ReadmeCard style={{ marginTop: '12px', padding: '4px 0 0' }}>
              <ApiTable
                rows={[
                  {
                    method: 'POST',
                    route: '/api/user/signup',
                    description: 'Create account → JWT',
                  },
                  {
                    method: 'POST',
                    route: '/api/user/login',
                    description: 'Authenticate → JWT',
                  },
                  {
                    method: 'GET',
                    route: '/api/user/:username',
                    description: 'Public profile',
                  },
                  {
                    method: 'POST',
                    route: '/api/user/:username',
                    description: 'Update display name or password',
                  },
                  {
                    method: 'POST',
                    route: '/api/user/list',
                    description: 'Bulk user lookup',
                  },
                ]}
              />
            </ReadmeCard>
          </div>
          <div>
            <h5
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontSize: '1.25rem',
                fontWeight: 400,
              }}
            >
              Game
            </h5>
            <ReadmeCard style={{ marginTop: '12px', padding: '4px 0 0' }}>
              <ApiTable
                rows={[
                  {
                    method: 'POST',
                    route: '/api/game/create',
                    description: 'Create game (public or private)',
                  },
                  {
                    method: 'GET',
                    route: '/api/game/list',
                    description: 'Active games',
                  },
                  {
                    method: 'GET',
                    route: '/api/game/:id',
                    description: 'Game state',
                  },
                  {
                    method: 'POST',
                    route: '/api/game/join-by-code',
                    description: 'Join private game by invite code',
                  },
                ]}
              />
            </ReadmeCard>
          </div>
          <div>
            <h5
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontSize: '1.25rem',
                fontWeight: 400,
              }}
            >
              Friends
            </h5>
            <ReadmeCard style={{ marginTop: '12px', padding: '4px 0 0' }}>
              <ApiTable
                rows={[
                  {
                    method: 'POST',
                    route: '/api/friend/request',
                    description: 'Send friend request',
                  },
                  {
                    method: 'POST',
                    route: '/api/friend/respond',
                    description: 'Accept / decline',
                  },
                  {
                    method: 'POST',
                    route: '/api/friend/list',
                    description: 'Your friends',
                  },
                  {
                    method: 'POST',
                    route: '/api/friend/pending',
                    description: 'Pending requests',
                  },
                  {
                    method: 'POST',
                    route: '/api/friend/status',
                    description: 'Friendship status with a user',
                  },
                ]}
              />
            </ReadmeCard>
          </div>
          <div>
            <h5
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontSize: '1.25rem',
                fontWeight: 400,
              }}
            >
              Scores & Matches
            </h5>
            <ReadmeCard style={{ marginTop: '12px', padding: '4px 0 0' }}>
              <ApiTable
                rows={[
                  {
                    method: 'GET',
                    route: '/api/scores/leaderboard',
                    description: 'Global rankings',
                  },
                  {
                    method: 'POST',
                    route: '/api/scores/myrank',
                    description: 'Your current rank',
                  },
                  {
                    method: 'POST',
                    route: '/api/matches',
                    description: 'Match history with filters',
                  },
                ]}
              />
            </ReadmeCard>
          </div>
          <div>
            <h5
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontSize: '1.25rem',
                fontWeight: 400,
              }}
            >
              Forum
            </h5>
            <ReadmeCard style={{ marginTop: '12px', padding: '4px 0 0' }}>
              <ApiTable
                rows={[
                  {
                    method: 'POST',
                    route: '/api/thread/create',
                    description: 'New forum post',
                  },
                  {
                    method: 'GET',
                    route: '/api/thread/list',
                    description: 'All posts',
                  },
                  {
                    method: 'GET',
                    route: '/api/thread/:id',
                    description: 'Single post',
                  },
                  {
                    method: 'POST',
                    route: '/api/thread/:id/comment',
                    description: 'Add comment',
                  },
                ]}
              />
            </ReadmeCard>
          </div>
          <div>
            <h5
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontSize: '1.25rem',
                fontWeight: 400,
              }}
            >
              Auth
            </h5>
            <ReadmeCard style={{ marginTop: '12px', padding: '4px 0 0' }}>
              <ApiTable
                rows={[
                  {
                    method: 'GET',
                    route: '/auth/google',
                    description: 'Initiate Google OAuth',
                  },
                  {
                    method: 'GET',
                    route: '/auth/google/callback',
                    description: 'Google OAuth callback → JWT',
                  },
                ]}
              />
            </ReadmeCard>
          </div>
        </div>
      </ReadmeAccordionSection>

      <ReadmeAccordionSection title="Testing">
        <ReadmeParagraph>
          Three-layer coverage across every critical path.
        </ReadmeParagraph>
        <ApiTable
          rows={[
            {
              method: 'Unit',
              route: 'Vitest',
              description: 'Chess rules, Elo algorithm, auth, services',
            },
            {
              method: 'Integration',
              route: 'Vitest + supertest',
              description: 'All REST endpoints, Socket.io events',
            },
            {
              method: 'E2E',
              route: 'Playwright',
              description: 'Login, game creation, chat, full gameplay',
            },
          ]}
        />
        <CodeBlock>{`npm test          # run all layers
npm run check     # TypeScript, all packages
npm run lint      # ESLint, all packages`}</CodeBlock>
      </ReadmeAccordionSection>

      <ReadmeAccordionSection title="Quick Start">
        <CodeBlock>{`git clone https://github.com/kashvime/gamenite
cd gamenite && npm install
cp server/.env.example server/.env
npm run dev    # Vite :4530  ·  Express :8000`}</CodeBlock>
        <ReadmeParagraph>
          Test accounts: <code>user0/pwd0000</code> · <code>user1/pwd1111</code>{' '}
          · <code>user2/pwd2222</code> · <code>user3/pwd3333</code>
        </ReadmeParagraph>
      </ReadmeAccordionSection>

      <ReadmeAccordionSection title="Contributors">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '14px',
          }}
        >
          {[
            [
              'Kashvi',
              '@kashvime',
              'Database layer · Elo + league system · match history · game flow',
            ],
            ['Tanisha', '@tanishajoshii', 'Chess features · UI · profile page'],
            ['Ha', '@hanguyen04', 'Friends · leaderboard · private games'],
            ['Aunnie', '@Aunnieo', 'Google SSO · Chess AI · test coverage'],
          ].map(([name, handle, detail]) => (
            <ReadmeCard
              key={name}
              style={{
                padding: '16px 14px',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.28)',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: SANS,
                  fontWeight: 700,
                  color: '#0D0D0D',
                }}
              >
                {name}
              </p>
              <p
                style={{
                  margin: '4px 0 8px',
                  fontFamily: SANS,
                  fontSize: '0.78rem',
                  color: PINK,
                }}
              >
                {handle}
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: SANS,
                  fontSize: '0.74rem',
                  lineHeight: 1.6,
                  color: MUTED,
                }}
              >
                {detail}
              </p>
            </ReadmeCard>
          ))}
        </div>
      </ReadmeAccordionSection>
    </div>
  )
}

function ReadmeDrawer({ readme }: { readme: NonNullable<Project['readme']> }) {
  const isMobile = useIsMobile()
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        overflow: 'hidden',
        borderTop: '1.5px solid rgba(13,13,13,0.1)',
      }}
    >
      <div style={{ padding: isMobile ? '24px 20px' : '36px 40px 40px 112px' }}>
        {readme.overview.startsWith(
          'A full-stack multiplayer gaming platform supporting Chess, Nim, and Guess.'
        ) ? (
          <GameNiteReadme />
        ) : (
          <>
            {/* overview */}
            <p
              style={{
                fontFamily: SERIF,
                fontSize: '1.05rem',
                fontWeight: 400,
                color: '#0D0D0D',
                lineHeight: 1.75,
                maxWidth: '680px',
                marginBottom: '32px',
              }}
            >
              {readme.overview}
            </p>

            {/* sections */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? '1fr'
                  : readme.sections.length >= 3
                    ? 'repeat(3, 1fr)'
                    : `repeat(${readme.sections.length}, 1fr)`,
                gap: isMobile ? '24px' : '40px',
              }}
            >
              {readme.sections.map((sec) => (
                <div key={sec.title}>
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: PINK,
                      marginBottom: '14px',
                    }}
                  >
                    {sec.title}
                  </p>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '9px',
                    }}
                  >
                    {sec.points.map((pt, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'flex-start',
                        }}
                      >
                        <span
                          style={{
                            color: PINK,
                            fontSize: '0.55rem',
                            marginTop: '5px',
                            flexShrink: 0,
                          }}
                        >
                          ▸
                        </span>
                        <span
                          style={{
                            fontFamily: SANS,
                            fontSize: '0.78rem',
                            fontWeight: 300,
                            color: '#0D0D0D',
                            lineHeight: 1.65,
                          }}
                        >
                          {/* render inline code */}
                          {pt.split(/(`[^`]+`)/g).map((chunk, ci) =>
                            chunk.startsWith('`') && chunk.endsWith('`') ? (
                              <code
                                key={ci}
                                style={{
                                  fontFamily: 'monospace',
                                  fontSize: '0.73rem',
                                  background: 'rgba(13,13,13,0.07)',
                                  padding: '1px 5px',
                                  borderRadius: '2px',
                                }}
                              >
                                {chunk.slice(1, -1)}
                              </code>
                            ) : (
                              chunk
                            )
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

function ProjectRow({
  p,
  i,
  expanded,
  onToggle,
  isLast,
}: {
  p: Project
  i: number
  expanded: boolean
  onToggle: () => void
  isLast: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderBottom: isLast ? 'none' : BORDER }}
    >
      {/* main row — clickable */}
      <div
        onClick={p.readme ? onToggle : undefined}
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '72px 1fr 180px',
          gap: isMobile ? '10px' : '28px',
          padding: isMobile ? '28px 20px' : '52px 40px',
          alignItems: 'start',
          transition: 'background 0.2s',
          cursor: p.readme ? 'pointer' : 'default',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = 'rgba(224,90,130,0.08)')
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        {/* number */}
        {!isMobile && (
          <span
            style={{
              fontFamily: SANS,
              fontSize: '0.72rem',
              fontWeight: 700,
              color: PINK,
              paddingTop: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            {p.num}
          </span>
        )}

        {/* content */}
        <div>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '14px' }}>
            <h3
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight: 400,
                color: '#0D0D0D',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              {p.name}
            </h3>
            <span
              style={{
                fontFamily: SANS,
                fontSize: '0.7rem',
                fontWeight: 700,
                color: PINK,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {p.tagline}
            </span>
          </div>
          <p
            style={{
              fontFamily: SERIF,
              fontSize: '1.1rem',
              fontWeight: 400,
              color: '#0D0D0D',
              lineHeight: 1.75,
              maxWidth: '760px',
              marginBottom: '22px',
            }}
          >
            {p.desc}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              alignItems: 'center',
            }}
          >
            {p.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: SANS,
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  background: 'rgba(224,90,130,0.12)',
                  border: '1.5px solid rgba(224,90,130,0.5)',
                  color: PINK,
                  padding: '3px 12px',
                  borderRadius: '3px',
                  letterSpacing: '0.02em',
                }}
              >
                {t}
              </span>
            ))}
            {p.readme && (
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: MUTED,
                  marginLeft: '8px',
                  letterSpacing: '0.04em',
                }}
              >
                {expanded ? '↑ collapse' : '↓ readme'}
              </span>
            )}
          </div>
        </div>

        {/* links + year */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            gap: '10px',
            alignItems: isMobile ? 'center' : 'flex-end',
            justifySelf: isMobile ? 'start' : 'end',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontSize: '0.72rem',
              color: MUTED,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              minHeight: isMobile ? 'auto' : '36px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {p.year}
          </span>
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'row' : 'column',
              gap: '10px',
              alignItems: isMobile ? 'center' : 'flex-end',
            }}
          >
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontFamily: SANS,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  background: PINK,
                  color: '#fff',
                  padding: '9px 18px',
                  borderRadius: '999px',
                  transition: 'opacity 0.15s',
                  display: 'inline-block',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Live ↗
              </a>
            )}
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: SANS,
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#0D0D0D',
                borderBottom: '1.5px solid #0D0D0D',
                paddingBottom: '1px',
                transition: 'opacity 0.15s',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>

      {/* readme drawer */}
      <AnimatePresence>
        {expanded && p.readme && <ReadmeDrawer readme={p.readme} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Work() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [open, setOpen] = useState<string | null>(null)
  const isMobile = useIsMobile()

  return (
    <section
      id="projects"
      style={{ background: CREAM, borderTop: BORDER, borderBottom: BORDER }}
    >
      {/* header */}
      <div
        ref={ref}
        style={{
          padding: isMobile ? '40px 20px 0' : '64px 40px 0',
          borderBottom: BORDER,
        }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: SANS,
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: PINK,
            display: 'block',
            marginBottom: '28px',
          }}
        >
          Projects{' '}
          <span style={{ color: MUTED }}>
            - CLICK ON ANY PROJECT TO REVIEW DETAILS
          </span>
        </motion.span>

        <div style={{ overflow: 'hidden', paddingBottom: '18px' }}>
          <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
            <motion.h2
              initial={{ y: '108%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(5rem, 14vw, 14rem)',
                fontWeight: 300,
                color: '#0D0D0D',
                letterSpacing: '-0.04em',
                fontStyle: 'italic',
                display: 'block',
              }}
            >
              PROJECTS
            </motion.h2>
          </div>
        </div>
      </div>

      {/* project rows */}
      {PROJECTS.map((p, i) => (
        <ProjectRow
          key={p.num}
          p={p}
          i={i}
          expanded={open === p.num}
          isLast={i === PROJECTS.length - 1}
          onToggle={() => setOpen(open === p.num ? null : p.num)}
        />
      ))}

      <div style={{ height: '24px' }} />
    </section>
  )
}
