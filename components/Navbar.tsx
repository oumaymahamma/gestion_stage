'use client'

import Link from 'next/link'
import { useUser, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  isAdmin?: boolean
}

export default function Navbar({ isAdmin = false }: NavbarProps) {
  const { isSignedIn, user } = useUser()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/')
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={isAdmin ? "/admin" : "/"} className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              {isAdmin ? 'Admin - ' : ''}Internship Management
            </Link>
            
            {/* Navigation Links */}
            {isSignedIn && (
              <div className="hidden md:ml-8 md:flex md:space-x-8">
                {isAdmin ? (
                  <>
                    <Link 
                      href="/admin" 
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname === '/admin'
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Tableau de bord
                    </Link>
                    <Link 
                      href="/admin/users" 
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/admin/users')
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Utilisateurs
                    </Link>
                    <Link 
                      href="/admin/internships" 
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/admin/internships')
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Stages
                    </Link>
                    <Link 
                      href="/admin/applications" 
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/admin/applications')
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Candidatures
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/" 
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname === '/'
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Accueil
                    </Link>
                    <Link 
                      href="/dashboard" 
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/dashboard')
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Mon espace
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                {isAdmin && (
                  <Link 
                    href="/" 
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Voir le site
                  </Link>
                )}
                
                {!isAdmin && (
                  <Link 
                    href="/dashboard/profile" 
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Profil
                  </Link>
                )}
                
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Se connecter
                </Link>
                <Link 
                  href="/register" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

