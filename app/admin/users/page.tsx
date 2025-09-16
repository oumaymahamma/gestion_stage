'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import AdminTable from '@/components/AdminTable'
import UserForm from '@/components/UserForm'

// Sample data - in real app this would come from API
const sampleUsers = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    role: 'USER',
    createdAt: '2025-08-15T10:00:00Z',
    profile: {
      skills: ['React', 'TypeScript', 'Node.js']
    }
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@email.com',
    role: 'USER',
    createdAt: '2025-08-20T14:30:00Z',
    profile: {
      skills: ['Python', 'SQL', 'Data Analysis']
    }
  },
  {
    id: '3',
    firstName: 'Admin',
    lastName: 'System',
    email: 'admin@internship.com',
    role: 'ADMIN',
    createdAt: '2025-08-01T09:00:00Z',
    profile: null
  }
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(sampleUsers)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const columns = [
    {
      key: 'firstName',
      label: 'Prénom',
      sortable: true
    },
    {
      key: 'lastName',
      label: 'Nom',
      sortable: true
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true
    },
    {
      key: 'role',
      label: 'Rôle',
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs font-medium rounded ${
          value === 'ADMIN' 
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {value === 'ADMIN' ? 'Administrateur' : 'Utilisateur'}
        </span>
      )
    },
    {
      key: 'createdAt',
      label: 'Date de création',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('fr-FR')
    },
    {
      key: 'profile',
      label: 'Compétences',
      render: (value: any) => (
        <div className="max-w-xs">
          {value?.skills ? (
            <div className="flex flex-wrap gap-1">
              {value.skills.slice(0, 3).map((skill: string, index: number) => (
                <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
              {value.skills.length > 3 && (
                <span className="text-xs text-gray-500">+{value.skills.length - 3}</span>
              )}
            </div>
          ) : (
            <span className="text-gray-400 text-sm">Aucune</span>
          )}
        </div>
      )
    }
  ]

  const handleEdit = (user: any) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const handleDelete = (user: any) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.firstName} ${user.lastName} ?`)) {
      setUsers(users.filter(u => u.id !== user.id))
    }
  }

  const handleView = (user: any) => {
    alert(`Voir les détails de ${user.firstName} ${user.lastName}`)
  }

  const handleSubmit = (formData: any) => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      if (editingUser) {
        // Update existing user
        setUsers(users.map(u => 
          u.id === editingUser.id 
            ? { ...u, ...formData }
            : u
        ))
      } else {
        // Create new user
        const newUser = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString(),
          profile: null
        }
        setUsers([newUser, ...users])
      }
      
      setShowForm(false)
      setEditingUser(null)
      setIsLoading(false)
    }, 1000)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingUser(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAdmin={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des utilisateurs</h1>
            <p className="mt-2 text-gray-600">Gérez tous les utilisateurs de la plateforme</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Nouvel utilisateur
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total utilisateurs</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.role === 'USER').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Administrateurs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.role === 'ADMIN').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <UserForm
                initialData={editingUser}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={isLoading}
                isEdit={!!editingUser}
              />
            </div>
          </div>
        )}

        {/* Users Table */}
        <AdminTable
          columns={columns}
          data={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          searchPlaceholder="Rechercher par nom, email..."
        />
      </div>
    </div>
  )
}

