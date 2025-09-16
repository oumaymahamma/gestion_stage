'use client'

import Link from 'next/link'
import { useState } from 'react'

interface InternshipCardProps {
  id: string
  title: string
  description: string
  duration: number
  capacity: number
  startDate: string
  endDate: string
  isActive: boolean
  canApply?: boolean
  hasApplied?: boolean
  applicationStatus?: 'PENDING' | 'ACCEPTED' | 'REJECTED'
}

export default function InternshipCard({
  id,
  title,
  description,
  duration,
  capacity,
  startDate,
  endDate,
  isActive,
  canApply = true,
  hasApplied = false,
  applicationStatus
}: InternshipCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getStatusColor = () => {
    if (!hasApplied) return 'bg-blue-600 hover:bg-blue-700'
    
    switch (applicationStatus) {
      case 'PENDING':
        return 'bg-yellow-600 hover:bg-yellow-700'
      case 'ACCEPTED':
        return 'bg-green-600 hover:bg-green-700'
      case 'REJECTED':
        return 'bg-red-600 hover:bg-red-700'
      default:
        return 'bg-gray-600 hover:bg-gray-700'
    }
  }

  const getStatusText = () => {
    if (!hasApplied) return 'Postuler'
    
    switch (applicationStatus) {
      case 'PENDING':
        return 'En attente'
      case 'ACCEPTED':
        return 'Accepté'
      case 'REJECTED':
        return 'Refusé'
      default:
        return 'Candidature'
    }
  }

  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${
        isHovered ? 'shadow-lg transform -translate-y-1' : ''
      } ${!isActive ? 'opacity-75' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        {!isActive && (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Inactif
          </span>
        )}
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {description}
      </p>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Durée: {duration} mois</span>
          <span>Places: {capacity}</span>
        </div>
        
        <div className="text-sm text-gray-500">
          <div>Début: {formatDate(startDate)}</div>
          <div>Fin: {formatDate(endDate)}</div>
        </div>
      </div>
      
      {canApply && isActive && (
        <div className="flex space-x-2">
          {hasApplied && applicationStatus === 'ACCEPTED' ? (
            <Link 
              href={`/dashboard`}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-center text-sm font-medium transition-colors"
            >
              Voir le parcours
            </Link>
          ) : (
            <button 
              className={`flex-1 ${getStatusColor()} text-white py-2 px-4 rounded-md text-center text-sm font-medium transition-colors`}
              disabled={hasApplied}
            >
              {getStatusText()}
            </button>
          )}
          
          <Link 
            href={`/internships/${id}`}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Détails
          </Link>
        </div>
      )}
    </div>
  )
}

