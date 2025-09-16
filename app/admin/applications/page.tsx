'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import AdminTable from '@/components/AdminTable'

// Sample data - in real app this would come from API
const sampleApplications = [
  {
    id: '1',
    user: {
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@email.com'
    },
    internship: {
      title: 'Développeur Frontend React'
    },
    status: 'PENDING',
    appliedAt: '2025-08-25T10:00:00Z',
    reviewedAt: null
  },
  {
    id: '2',
    user: {
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@email.com'
    },
    internship: {
      title: 'Data Analyst'
    },
    status: 'ACCEPTED',
    appliedAt: '2025-08-20T14:30:00Z',
    reviewedAt: '2025-08-22T09:15:00Z'
  },
  {
    id: '3',
    user: {
      firstName: 'Pierre',
      lastName: 'Durand',
      email: 'pierre.durand@email.com'
    },
    internship: {
      title: 'UX/UI Designer'
    },
    status: 'REJECTED',
    appliedAt: '2025-08-18T16:45:00Z',
    reviewedAt: '2025-08-19T11:30:00Z'
  }
]

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState(sampleApplications)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const columns = [
    {
      key: 'user',
      label: 'Candidat',
      sortable: true,
      render: (user: any) => (
        <div>
          <div className="font-medium text-gray-900">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      )
    },
    {
      key: 'internship',
      label: 'Stage',
      sortable: true,
      render: (internship: any) => internship.title
    },
    {
      key: 'status',
      label: 'Statut',
      sortable: true,
      render: (status: string) => {
        const statusConfig = {
          PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En attente' },
          ACCEPTED: { bg: 'bg-green-100', text: 'text-green-800', label: 'Accepté' },
          REJECTED: { bg: 'bg-red-100', text: 'text-red-800', label: 'Refusé' }
        }
        const config = statusConfig[status as keyof typeof statusConfig]
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded ${config.bg} ${config.text}`}>
            {config.label}
          </span>
        )
      }
    },
    {
      key: 'appliedAt',
      label: 'Date de candidature',
      sortable: true,
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR')
    },
    {
      key: 'reviewedAt',
      label: 'Date de révision',
      sortable: true,
      render: (date: string | null) => 
        date ? new Date(date).toLocaleDateString('fr-FR') : '-'
    }
  ]

  const handleView = (application: any) => {
    setSelectedApplication(application)
    setShowModal(true)
  }

  const handleStatusUpdate = (applicationId: string, newStatus: string) => {
    setApplications(applications.map(app => 
      app.id === applicationId 
        ? { 
            ...app, 
            status: newStatus,
            reviewedAt: new Date().toISOString()
          }
        : app
    ))
    setShowModal(false)
  }

  const handleDelete = (application: any) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer cette candidature ?`)) {
      setApplications(applications.filter(app => app.id !== application.id))
    }
  }

  const pendingCount = applications.filter(app => app.status === 'PENDING').length
  const acceptedCount = applications.filter(app => app.status === 'ACCEPTED').length
  const rejectedCount = applications.filter(app => app.status === 'REJECTED').length

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAdmin={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des candidatures</h1>
          <p className="mt-2 text-gray-600">Examinez et validez les candidatures des étudiants</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Acceptées</p>
                <p className="text-2xl font-bold text-gray-900">{acceptedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Refusées</p>
                <p className="text-2xl font-bold text-gray-900">{rejectedCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <AdminTable
          columns={columns}
          data={applications}
          onView={handleView}
          onDelete={handleDelete}
          searchPlaceholder="Rechercher par candidat ou stage..."
        />

        {/* Application Review Modal */}
        {showModal && selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Révision de candidature
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Candidate Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Informations du candidat</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Nom:</span>
                      <span className="ml-2 font-medium">
                        {selectedApplication.user.firstName} {selectedApplication.user.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <span className="ml-2">{selectedApplication.user.email}</span>
                    </div>
                  </div>
                </div>

                {/* Internship Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Stage demandé</h3>
                  <p className="text-sm">{selectedApplication.internship.title}</p>
                </div>

                {/* Application Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Détails de la candidature</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Date de candidature:</span>
                      <span className="ml-2">
                        {new Date(selectedApplication.appliedAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Statut actuel:</span>
                      <span className="ml-2 font-medium">
                        {selectedApplication.status === 'PENDING' && 'En attente'}
                        {selectedApplication.status === 'ACCEPTED' && 'Accepté'}
                        {selectedApplication.status === 'REJECTED' && 'Refusé'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedApplication.status === 'PENDING' && (
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleStatusUpdate(selectedApplication.id, 'REJECTED')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
                    >
                      Refuser
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedApplication.id, 'ACCEPTED')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors"
                    >
                      Accepter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

