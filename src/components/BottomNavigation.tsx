import { Link, useLocation } from 'react-router-dom'

export function BottomNavigation() {
  const location = useLocation()

  function isActive(path: string) {
    return location.pathname === path
  }

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        border-t
        border-zinc-800
        bg-zinc-950/95
        backdrop-blur-xl
      "
    >

      <div
        className="
          mx-auto
          flex
          max-w-5xl
          items-center
          justify-around
          px-6
          py-4
        "
      >

        <Link
          to="/"
          className={`
            text-sm
            font-medium
            transition

            ${
              isActive('/')
                ? 'text-white'
                : 'text-zinc-500'
            }
          `}
        >
          Presets
        </Link>

        <Link
          to="/setlists"
          className={`
            text-sm
            font-medium
            transition

            ${
              isActive('/setlists')
                ? 'text-white'
                : 'text-zinc-500'
            }
          `}
        >
          Setlists
        </Link>

        <Link
          to="/amps"
          className={`
            text-sm
            font-medium
            transition

            ${
              isActive('/amps')
                ? 'text-white'
                : 'text-zinc-500'
            }
          `}
        >
          Amps
        </Link>

        <Link
          to="/backup"
          className={`
            text-sm
            font-medium
            transition

            ${
              isActive('/backup')
                ? 'text-white'
                : 'text-zinc-500'
            }
          `}
        >
          Backup
        </Link>

      </div>

    </div>
  )
}
