import { useMemo, useState } from 'react'

const iconPaths = {
  search: '<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.6-3.6"></path>',
  home: '<path d="m3 10.7 9-7.3 9 7.3v9a1.3 1.3 0 0 1-1.3 1.3H16v-6H8v6H4.3A1.3 1.3 0 0 1 3 19.7z"></path>',
  library: '<rect x="4" y="3" width="3" height="18" rx="1"></rect><rect x="10" y="3" width="3" height="18" rx="1"></rect><path d="m16 4 4 16"></path>',
  plus: '<path d="M12 5v14M5 12h14"></path>',
  download: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v9m-4-4 4 4 4-4"></path>',
  play: '<path d="m9 7 8 5-8 5z" fill="currentColor" stroke="none"></path>',
  pause: '<path d="M8 6h3v12H8zm5 0h3v12h-3z" fill="currentColor" stroke="none"></path>',
  previous: '<path d="M7 6v12m10-11-8 5 8 5z" fill="currentColor" stroke="none"></path>',
  next: '<path d="M17 6v12M7 7l8 5-8 5z" fill="currentColor" stroke="none"></path>',
  volume: '<path d="M11 5 6 9H3v6h3l5 4zM15 9.5a4 4 0 0 1 0 5M17.8 7a7.5 7.5 0 0 1 0 10"></path>',
  heart: '<path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8z"></path>',
  queue: '<path d="M4 6h12M4 10h12M4 14h8m5 0 4 3-4 3z"></path>',
  device: '<rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M9 17h6"></path>',
}

function Icon({ name, size = 22, filled = false }) {
  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: iconPaths[name] }} />
}

const musicSections = [
  {
    id: 'trending', title: 'Trending songs', items: [
      { title: 'Sapphire', artist: 'Ed Sheeran', palette: 'ocean', art: 'portrait', mark: 'SAPPHIRE' },
      { title: 'Ordinary', artist: 'Alex Warren', palette: 'amber', art: 'sunset', mark: 'ORDINARY' },
      { title: 'Birds of a Feather', artist: 'Billie Eilish', palette: 'indigo', art: 'blur', mark: 'HIT ME HARD' },
      { title: 'Messy', artist: 'Lola Young', palette: 'rose', art: 'figure', mark: 'MESSY' },
      { title: 'Golden', artist: 'HUNTR/X', palette: 'violet', art: 'light', mark: 'GOLDEN' },
      { title: 'Espresso', artist: 'Sabrina Carpenter', palette: 'sky', art: 'type', mark: 'ESPRESSO' },
      { title: 'Love Me Not', artist: 'Ravyn Lenae', palette: 'crimson', art: 'orb', mark: 'LOVE ME NOT' },
      { title: 'End of Beginning', artist: 'Djo', palette: 'blue', art: 'grid', mark: 'DECIDE' },
    ],
  },
  {
    id: 'popular', title: 'Popular albums and singles', items: [
      { title: 'I’m The Problem', artist: 'Morgan Wallen', palette: 'paper', art: 'portrait', mark: 'I’M THE PROBLEM' },
      { title: 'Short n’ Sweet', artist: 'Sabrina Carpenter', palette: 'powder', art: 'type', mark: 'SHORT N’ SWEET' },
      { title: 'MAYHEM', artist: 'Lady Gaga', palette: 'mono', art: 'blur', mark: 'MAYHEM' },
      { title: 'HIT ME HARD AND SOFT', artist: 'Billie Eilish', palette: 'cobalt', art: 'figure', mark: 'HIT ME HARD' },
      { title: 'GNX', artist: 'Kendrick Lamar', palette: 'silver', art: 'grid', mark: 'GNX' },
      { title: 'The Rise and Fall of a Midwest Princess', artist: 'Chappell Roan', palette: 'pink', art: 'light', mark: 'MIDWEST' },
      { title: 'SOS Deluxe: LANA', artist: 'SZA', palette: 'green', art: 'orb', mark: 'LANA' },
    ],
  },
  {
    id: 'made-for-you', title: 'Made for you', items: [
      { title: 'Discover Weekly', artist: 'Your weekly mixtape of fresh music', palette: 'discover', art: 'portrait', mark: 'DISCOVER WEEKLY' },
      { title: 'Daily Mix 01', artist: 'SZA, Ravyn Lenae, Tems and more', palette: 'mix1', art: 'orb', mark: 'DAILY MIX 01' },
      { title: 'Daily Mix 02', artist: 'Billie Eilish, Lorde, Clairo and more', palette: 'mix2', art: 'light', mark: 'DAILY MIX 02' },
      { title: 'On Repeat', artist: 'Songs you can’t get enough of', palette: 'repeat', art: 'grid', mark: 'ON REPEAT' },
      { title: 'Release Radar', artist: 'The newest music from artists you follow', palette: 'radar', art: 'blur', mark: 'RELEASE RADAR' },
      { title: 'Time Capsule', artist: 'Songs to take you back in time', palette: 'capsule', art: 'sunset', mark: 'TIME CAPSULE' },
    ],
  },
]

const recentlyPlayed = [
  { title: 'Liked Songs', meta: 'Playlist • 124 songs', palette: 'liked', mark: '♥' },
  { title: 'Discover Weekly', meta: 'Playlist • Spotify', palette: 'discover', mark: 'D' },
  { title: 'Chill Mix', meta: 'Playlist • Spotify', palette: 'chill', mark: 'CHILL' },
]

function SpotifyLogo() {
  return (
    <a className="brand" href="#top" aria-label="Spotify home">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="currentColor" /><path d="M6.1 9.2c4-1.2 8.6-.8 12 .9M6.8 12.3c3.4-1 7.5-.7 10.4.8M7.5 15.1c2.7-.7 6-.5 8.6.7" fill="none" stroke="#000" strokeWidth="1.55" strokeLinecap="round" /></svg>
      <span>Spotify</span>
    </a>
  )
}

function AlbumArt({ item, small = false }) {
  return (
    <div className={`album-art palette-${item.palette} art-${item.art || 'type'} ${small ? 'album-art--small' : ''}`}>
      <span className="art-glow" /><span className="art-shape" /><span className="art-lines" /><span className="art-mark">{item.mark}</span>
    </div>
  )
}

function MediaCard({ item, currentTrack, onPlay }) {
  const isPlaying = currentTrack?.title === item.title && currentTrack.playing
  return (
    <article className={`media-card ${isPlaying ? 'is-playing' : ''}`}>
      <button className="art-button" onClick={() => onPlay(item)} aria-label={`${isPlaying ? 'Pause' : 'Play'} ${item.title} by ${item.artist}`}>
        <AlbumArt item={item} />
        <span className="card-play" aria-hidden="true"><Icon name={isPlaying ? 'pause' : 'play'} size={24} /></span>
      </button>
      <button className="track-title" onClick={() => onPlay(item)}>{item.title}</button>
      <p>{item.artist}</p>
    </article>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="side-primary" aria-label="Primary navigation"><a className="side-link active" href="#top"><Icon name="home" filled /><span>Home</span></a></nav>
      <section className="library-panel">
        <div className="library-head"><button className="side-link" type="button"><Icon name="library" /><span>Your Library</span></button><button className="icon-button" type="button" aria-label="Create playlist"><Icon name="plus" size={20} /></button></div>
        <div className="chip-row" role="group" aria-label="Library filters"><button type="button">Playlists</button><button type="button">Artists</button></div>
        <div className="library-list">
          {recentlyPlayed.map((item) => <button className="library-item" type="button" key={item.title}><AlbumArt item={item} small /><span><strong>{item.title}</strong><small>{item.meta}</small></span></button>)}
        </div>
        <div className="legal-links"><a href="#legal">Legal</a><a href="#privacy">Privacy Center</a><a href="#cookies">Cookies</a></div>
        <button className="language-button" type="button">◎ <span>English</span></button>
      </section>
    </aside>
  )
}

function TopBar({ query, setQuery, onNotify }) {
  return (
    <header className="topbar" id="top">
      <div className="topbar-logo"><SpotifyLogo /></div>
      <div className="topbar-center">
        <a href="#top" className="home-button" aria-label="Home"><Icon name="home" filled size={23} /></a>
        <label className="search-box"><Icon name="search" size={24} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What do you want to play?" aria-label="Search music" /><span className="search-divider" /><Icon name="library" size={21} /></label>
      </div>
      <nav className="top-actions" aria-label="Utility navigation">
        <div className="utility-links"><a href="#premium">Premium</a><a href="#support">Support</a><a href="#download">Download</a></div><span className="utility-divider" />
        <button className="install-button" type="button" onClick={() => onNotify('Spotify is ready to install from your browser.')}><Icon name="download" size={17} />Install App</button>
        <button className="signup-button" type="button" onClick={() => onNotify('Sign-up flow opened.')}>Sign up</button>
        <button className="login-button" type="button" onClick={() => onNotify('Welcome back — login flow opened.')}>Log in</button>
      </nav>
    </header>
  )
}

function Player({ currentTrack, setCurrentTrack }) {
  const item = currentTrack || musicSections[0].items[0]
  const isPlaying = Boolean(currentTrack?.playing)
  function togglePlayback() { setCurrentTrack((track) => ({ ...(track || item), playing: !track?.playing })) }
  return (
    <footer className="player" aria-label="Now playing">
      <div className="now-playing"><AlbumArt item={item} small /><div><strong>{item.title}</strong><span>{item.artist}</span></div><button className="player-icon heart" type="button" aria-label="Save to your library"><Icon name="heart" size={18} /></button></div>
      <div className="playback"><div className="playback-controls"><button type="button" aria-label="Previous"><Icon name="previous" size={18} /></button><button className="play-pause" type="button" onClick={togglePlayback} aria-label={isPlaying ? 'Pause' : 'Play'}><Icon name={isPlaying ? 'pause' : 'play'} size={22} /></button><button type="button" aria-label="Next"><Icon name="next" size={18} /></button></div><div className="progress-row"><span>{isPlaying ? '1:24' : '0:00'}</span><div className="progress"><span style={{ width: isPlaying ? '38%' : '0%' }} /></div><span>3:41</span></div></div>
      <div className="player-extras"><button type="button" aria-label="Queue"><Icon name="queue" size={18} /></button><button type="button" aria-label="Connect to device"><Icon name="device" size={18} /></button><Icon name="volume" size={19} /><div className="volume-bar"><span /></div></div>
    </footer>
  )
}

export default function App() {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState({})
  const [currentTrack, setCurrentTrack] = useState(null)
  const [notice, setNotice] = useState('')
  const filteredSections = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return musicSections
    return musicSections.map((section) => ({ ...section, items: section.items.filter((item) => `${item.title} ${item.artist}`.toLowerCase().includes(normalized)) })).filter((section) => section.items.length)
  }, [query])
  function playTrack(item) { setCurrentTrack((track) => ({ ...item, playing: track?.title === item.title ? !track.playing : true })) }
  function notify(message) { setNotice(message); window.setTimeout(() => setNotice(''), 2600) }
  return (
    <div className="app-shell">
      <TopBar query={query} setQuery={setQuery} onNotify={notify} /><Sidebar />
      <main className="main-content">
        <div className="ambient ambient-one" /><div className="ambient ambient-two" />
        {filteredSections.length ? filteredSections.map((section) => {
          const visibleItems = expanded[section.id] ? section.items : section.items.slice(0, 7)
          return <section className="music-section" key={section.id}><div className="section-heading"><h2>{section.title}</h2>{section.items.length > 6 && <button type="button" onClick={() => setExpanded((value) => ({ ...value, [section.id]: !value[section.id] }))}>{expanded[section.id] ? 'Show less' : 'Show all'}</button>}</div><div className={`media-grid ${expanded[section.id] ? 'expanded' : ''}`}>{visibleItems.map((item) => <MediaCard key={`${section.id}-${item.title}`} item={item} currentTrack={currentTrack} onPlay={playTrack} />)}</div></section>
        }) : <section className="empty-state"><span><Icon name="search" size={34} /></span><h2>No songs found for “{query}”</h2><p>Check the spelling or try searching for another artist or track.</p></section>}
        <div className="content-footer">Music for every moment.</div>
      </main>
      <Player currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} />
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}
