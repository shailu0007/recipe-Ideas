import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ quickOnly, setQuickOnly }) => {
  return (
     <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-yellow-50 via-orange-50 to-white border-b border-orange-200">
  <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
    <Link to="/" className="font-bold text-xl text-orange-600">🍴 Taylor's Recipe Ideas</Link>
          <label className="flex items-center gap-2 text-sm font-medium text-orange-700">
            <input
              type="checkbox"
              className="size-4 accent-orange-500"
              checked={quickOnly}
              onChange={(e) => setQuickOnly(e.target.checked)}
            />
            Quick
          </label>
        </div>
      </header>
  )
}

export default Header