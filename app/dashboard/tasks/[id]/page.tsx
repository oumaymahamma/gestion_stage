'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

// Sample task data - in real app this would come from API
const sampleTasks: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Introduction aux données',
    description: 'Découvrez les concepts fondamentaux de l\'analyse de données et familiarisez-vous avec les outils de base.',
    content: `
# Introduction aux données

## Objectifs
- Comprendre les types de données
- Apprendre les concepts de base de l'analyse
- Se familiariser avec les outils

## Contenu du cours
### 1. Types de données
Les données peuvent être classées en plusieurs catégories :
- **Données quantitatives** : numériques, mesurables
- **Données qualitatives** : catégorielles, descriptives

### 2. Sources de données
- Bases de données relationnelles
- APIs
- Fichiers CSV/Excel
- Web scraping

### 3. Outils recommandés
- Python (pandas, numpy)
- SQL
- Excel/Google Sheets

## Exercice pratique
Téléchargez le dataset fourni et effectuez une première exploration des données.
    `,
    contentType: 'TEXT',
    deadline: '2025-09-15T23:59:59Z',
    status: 'APPROVED',
    submission: {
      githubUrl: 'https://github.com/user/data-intro-project',
      submittedAt: '2025-08-15T14:30:00Z',
      feedback: 'Excellent travail ! Votre analyse est claire et bien structurée.'
    }
  },
  '2': {
    id: '2',
    title: 'Analyse exploratoire',
    description: 'Apprenez à explorer et analyser un jeu de données pour en extraire des insights significatifs.',
    content: `
# Analyse exploratoire des données

## Objectifs
- Maîtriser les techniques d'exploration de données
- Créer des visualisations informatives
- Identifier les patterns et anomalies

## Étapes de l'analyse
### 1. Nettoyage des données
- Gestion des valeurs manquantes
- Détection des outliers
- Normalisation des formats

### 2. Analyse descriptive
- Statistiques de base
- Distribution des variables
- Corrélations

### 3. Visualisation
- Graphiques appropriés selon le type de données
- Tableaux de bord interactifs

## Livrables attendus
1. Notebook Jupyter avec l'analyse complète
2. Rapport de synthèse (2-3 pages)
3. Visualisations exportées

## Ressources
- Dataset : [Lien vers les données]
- Documentation pandas
- Guide de visualisation avec matplotlib/seaborn
    `,
    contentType: 'TEXT',
    deadline: '2025-09-05T23:59:59Z',
    status: 'PENDING',
    submission: null
  }
}

export default function TaskPage() {
  const params = useParams()
  const taskId = params.id as string
  const task = sampleTasks[taskId]

  const [submissionUrl, setSubmissionUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Tâche non trouvée</h1>
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              Retour au tableau de bord
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!submissionUrl.trim()) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      alert('Soumission envoyée avec succès !')
      setSubmissionUrl('')
      setIsSubmitting(false)
    }, 1000)
  }

  const isDeadlinePassed = new Date(task.deadline) < new Date()
  const daysUntilDeadline = Math.ceil((new Date(task.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/dashboard" className="hover:text-gray-700">
                Tableau de bord
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{task.title}</li>
          </ol>
        </nav>

        {/* Task Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h1>
              <p className="text-gray-600">{task.description}</p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                task.status === 'APPROVED' 
                  ? 'bg-green-100 text-green-800'
                  : task.status === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {task.status === 'APPROVED' && 'Approuvé'}
                {task.status === 'PENDING' && 'En attente'}
                {task.status === 'REQUIRES_CHANGES' && 'Modifications requises'}
              </div>
            </div>
          </div>

          {/* Deadline Info */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-600">Échéance:</span>
              <span className={`ml-1 font-medium ${isDeadlinePassed ? 'text-red-600' : 'text-gray-900'}`}>
                {new Date(task.deadline).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            {!isDeadlinePassed && (
              <div className={`text-sm ${daysUntilDeadline <= 3 ? 'text-red-600' : 'text-green-600'}`}>
                {daysUntilDeadline > 0 
                  ? `${daysUntilDeadline} jour${daysUntilDeadline > 1 ? 's' : ''} restant${daysUntilDeadline > 1 ? 's' : ''}`
                  : 'Échéance aujourd\'hui'
                }
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contenu de la tâche</h2>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {task.content}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submission Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statut de soumission</h3>
              
              {task.submission ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium text-green-800">Soumis</span>
                    </div>
                    <p className="text-sm text-green-700 mb-2">
                      Soumis le {new Date(task.submission.submittedAt).toLocaleDateString('fr-FR')}
                    </p>
                    <a 
                      href={task.submission.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      Voir sur GitHub
                    </a>
                  </div>

                  {task.submission.feedback && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Retour du formateur</h4>
                      <p className="text-sm text-blue-700">{task.submission.feedback}</p>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmission} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lien GitHub du projet
                    </label>
                    <input
                      type="url"
                      value={submissionUrl}
                      onChange={(e) => setSubmissionUrl(e.target.value)}
                      placeholder="https://github.com/username/repository"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || isDeadlinePassed}
                    className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                      isDeadlinePassed
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isSubmitting ? 'Soumission...' : isDeadlinePassed ? 'Échéance dépassée' : 'Soumettre'}
                  </button>
                </form>
              )}
            </div>

            {/* Resources */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ressources utiles</h3>
              <div className="space-y-3">
                <a 
                  href="#" 
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-900">Dataset d'exemple</div>
                      <div className="text-sm text-gray-500">Données pour l'exercice pratique</div>
                    </div>
                  </div>
                </a>

                <a 
                  href="#" 
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-900">Documentation</div>
                      <div className="text-sm text-gray-500">Guide complet des outils</div>
                    </div>
                  </div>
                </a>

                <a 
                  href="#" 
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-900">Vidéo tutoriel</div>
                      <div className="text-sm text-gray-500">Démonstration pratique</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

