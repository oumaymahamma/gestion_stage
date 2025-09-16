'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import AdminTable from '@/components/AdminTable'

// Sample data - in real app this would come from API
const sampleInternships = [
  {
    id: '1',
    title: 'Développeur Frontend React',
    description: 'Stage de 6 mois pour apprendre React, TypeScript et les bonnes pratiques du développement frontend.',
    duration: 6,
    capacity: 3,
    startDate: '2025-09-01T00:00:00Z',
    endDate: '2026-03-01T00:00:00Z',
    isActive: true,
    applications: 5
  },
  {
    id: '2',
    title: 'Data Analyst',
    description: 'Stage de 4 mois pour maîtriser l\'analyse de données avec Python, SQL et les outils de visualisation.',
    duration: 4,
    capacity: 2,
    startDate: '2025-10-01T00:00:00Z',
    endDate: '2026-02-01T00:00:00Z',
    isActive: true,
    applications: 8
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    description: 'Stage de 5 mois pour développer vos compétences en design d\'interface et expérience utilisateur.',
    duration: 5,
    capacity: 1,
    startDate: '2025-11-01T00:00:00Z',
    endDate: '2026-04-01T00:00:00Z',
    isActive: false,
    applications: 2
  }
]

export default function AdminInternshipsPage() {
  const [internships, setInternships] = useState(sampleInternships)
  const [showForm, setShowForm] = useState(false)
  const [editingInternship, setEditingInternship] = useState<any>(null)

  const columns = [
    {
      key: 'title',
      label: 'Titre',
      sortable: true
    },
    {
      key: 'duration',
      label: 'Durée',
      sortable: true,
      render: (value: number) => `${value} mois`
    },
    {
      key: 'capacity',
      label: 'Places',
      sortable: true
    },
    {
      key: 'applications',
      label: 'Candidatures',
      sortable: true,
      render: (value: number) => (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {value}
        </span>
      )
    },
    {
      key: 'startDate',
      label: 'Date de début',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('fr-FR')
    },
    {
      key: 'isActive',
      label: 'Statut',
      sortable: true,
      render: (value: boolean) => (
        <span className={`px-2 py-1 text-xs font-medium rounded ${
          value 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Actif' : 'Inactif'}
        </span>
      )
    }
  ]

  const handleEdit = (internship: any) => {
    setEditingInternship(internship)
    setShowForm(true)
  }

  const handleDelete = (internship: any) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le stage "${internship.title}" ?`)) {
      setInternships(internships.filter(i => i.id !== internship.id))
    }
  }

  const handleView = (internship: any) => {
    alert(`Voir les détails du stage "${internship.title}"`)
  }

  const handleToggleStatus = (internship: any) => {
    setInternships(internships.map(i => 
      i.id === internship.id 
        ? { ...i, isActive: !i.isActive }
        : i
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAdmin={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des stages</h1>
            <p className="mt-2 text-gray-600">Créez et gérez les offres de stage</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Nouveau stage
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total stages</p>
                <p className="text-2xl font-bold text-gray-900">{internships.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Stages actifs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {internships.filter(i => i.isActive).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Places totales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {internships.reduce((sum, i) => sum + i.capacity, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Candidatures</p>
                <p className="text-2xl font-bold text-gray-900">
                  {internships.reduce((sum, i) => sum + i.applications, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <InternshipForm
                initialData={editingInternship}
                onSubmit={(data) => {
                  // Handle form submission
                  console.log('Form data:', data)
                  setShowForm(false)
                  setEditingInternship(null)
                }}
                onCancel={() => {
                  setShowForm(false)
                  setEditingInternship(null)
                }}
                isEdit={!!editingInternship}
              />
            </div>
          </div>
        )}

        {/* Internships Table */}
        <AdminTable
          columns={columns}
          data={internships}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          searchPlaceholder="Rechercher par titre..."
        />
      </div>
    </div>
  )
}

// Internship Form Component
function InternshipForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isEdit = false 
}: {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
  isEdit?: boolean
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    duration: initialData?.duration || 3,
    capacity: initialData?.capacity || 1,
    startDate: initialData?.startDate ? initialData.startDate.split('T')[0] : '',
    endDate: initialData?.endDate ? initialData.endDate.split('T')[0] : '',
    isActive: initialData?.isActive ?? true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) || 0 : value
    }))
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {isEdit ? 'Modifier le stage' : 'Nouveau stage'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Durée (mois) *
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="1"
              max="12"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de places *
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date de début *
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date de fin *
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Stage actif
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            {isEdit ? 'Modifier' : 'Créer'}
          </button>
        </div>
      </form>
    </div>
  )
}

