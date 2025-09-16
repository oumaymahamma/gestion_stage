import Navbar from '@/components/Navbar'
import InternshipCard from '@/components/InternshipCard'

// Sample data - in real app this would come from API
const sampleInternships = [
  {
    id: '1',
    title: 'Développeur Frontend React',
    description: 'Stage de 6 mois pour apprendre React, TypeScript et les bonnes pratiques du développement frontend. Vous travaillerez sur des projets réels avec une équipe expérimentée.',
    duration: 6,
    capacity: 3,
    startDate: '2025-09-01T00:00:00Z',
    endDate: '2026-03-01T00:00:00Z',
    isActive: true
  },
  {
    id: '2',
    title: 'Data Analyst',
    description: 'Stage de 4 mois pour maîtriser l\'analyse de données avec Python, SQL et les outils de visualisation. Formation complète aux techniques d\'analyse moderne.',
    duration: 4,
    capacity: 2,
    startDate: '2025-10-01T00:00:00Z',
    endDate: '2026-02-01T00:00:00Z',
    isActive: true
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    description: 'Stage de 5 mois pour développer vos compétences en design d\'interface et expérience utilisateur. Projets variés et mentoring personnalisé.',
    duration: 5,
    capacity: 1,
    startDate: '2025-11-01T00:00:00Z',
    endDate: '2026-04-01T00:00:00Z',
    isActive: true
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Trouvez votre stage idéal
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Découvrez des opportunités de stage avec des parcours d'apprentissage structurés et un suivi personnalisé.
          </p>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Parcours structurés</h3>
            <p className="text-gray-600">Des parcours d'apprentissage progressifs avec des tâches guidées et des échéances claires.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Suivi personnalisé</h3>
            <p className="text-gray-600">Un accompagnement individuel avec des retours détaillés sur vos réalisations.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Projets concrets</h3>
            <p className="text-gray-600">Travaillez sur des projets réels qui enrichiront votre portfolio professionnel.</p>
          </div>
        </div>

        {/* Internships Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Stages disponibles
          </h2>
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {sampleInternships.map((internship) => (
              <InternshipCard
                key={internship.id}
                {...internship}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Prêt à commencer votre parcours ?
          </h2>
          <p className="text-gray-600 mb-6">
            Rejoignez notre plateforme et découvrez des opportunités de stage adaptées à vos ambitions.
          </p>
          <div className="space-x-4">
            <a 
              href="/register" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Créer un compte
            </a>
            <a 
              href="/login" 
              className="inline-block border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Se connecter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

