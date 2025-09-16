# Internship Management System

Une application complète de gestion de stages avec authentification Clerk, espace admin et espace utilisateur.

## 🚀 Fonctionnalités

### Landing Page
- Page d'accueil attractive avec présentation des stages disponibles
- Design responsive avec Tailwind CSS
- Navigation intuitive

### Authentification (Clerk)
- Inscription et connexion sécurisées
- Gestion des sessions utilisateur
- Protection des routes privées

### Espace Utilisateur
- **Tableau de bord** : Vue d'ensemble des candidatures et progression
- **Profil** : Gestion des informations personnelles, compétences et CV
- **Tâches** : Accès aux parcours d'apprentissage avec soumission de projets
- **Candidatures** : Suivi des demandes de stage

### Espace Administrateur
- **Gestion des utilisateurs** : CRUD complet avec recherche et filtres
- **Gestion des stages** : Création et modification des offres
- **Validation des candidatures** : Acceptation/refus avec feedback
- **Suivi des soumissions** : Évaluation des livrables étudiants

## 🛠️ Technologies Utilisées

- **Frontend** : Next.js 15, React, TypeScript
- **Styling** : Tailwind CSS
- **Authentification** : Clerk
- **Base de données** : Prisma + PostgreSQL
- **Validation** : Zod
- **Déploiement** : Vercel (recommandé)

## 📁 Structure du Projet

```
internship-management/
├── app/                          # Pages Next.js (App Router)
│   ├── layout.tsx               # Layout global avec ClerkProvider
│   ├── page.tsx                 # Landing page
│   ├── login/page.tsx           # Page de connexion
│   ├── register/page.tsx        # Page d'inscription
│   ├── dashboard/               # Espace utilisateur
│   │   ├── page.tsx            # Tableau de bord
│   │   ├── profile/page.tsx    # Gestion du profil
│   │   └── tasks/[id]/page.tsx # Détail des tâches
│   ├── admin/                   # Espace administrateur
│   │   ├── page.tsx            # Dashboard admin
│   │   ├── users/page.tsx      # Gestion utilisateurs
│   │   ├── internships/page.tsx # Gestion stages
│   │   └── applications/page.tsx # Gestion candidatures
│   └── api/                     # API Routes
│       ├── users/route.ts
│       ├── internships/route.ts
│       └── applications/route.ts
├── components/                   # Composants réutilisables
│   ├── Navbar.tsx
│   ├── InternshipCard.tsx
│   ├── AdminTable.tsx
│   └── UserForm.tsx
├── lib/                         # Utilitaires
│   ├── db.ts                   # Connexion Prisma
│   ├── auth.ts                 # Gestion auth
│   └── validation.ts           # Schémas Zod
├── prisma/
│   └── schema.prisma           # Modèles de données
└── middleware.ts               # Protection des routes
```

## ⚙️ Installation et Configuration

### 1. Prérequis
- Node.js 18+ 
- PostgreSQL
- Compte Clerk (gratuit)

### 2. Installation des dépendances
```bash
npm install
```

### 3. Configuration de l'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Clerk Authentication (à remplacer par vos vraies clés)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database (à adapter selon votre configuration)
DATABASE_URL="postgresql://username:password@localhost:5432/internship_management?schema=public"

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

### 4. Configuration de Clerk

1. Créez un compte sur [clerk.com](https://clerk.com)
2. Créez une nouvelle application
3. Copiez vos clés dans le fichier `.env.local`
4. Configurez les URLs de redirection dans le dashboard Clerk

### 5. Configuration de la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma db push

# (Optionnel) Seed de données de test
npx prisma db seed
```

### 6. Lancement en développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 🗄️ Modèles de Données

### User
- Informations personnelles (nom, email)
- Rôle (USER/ADMIN)
- Profil (compétences, formation, expérience)

### Internship
- Titre, description, durée
- Dates de début/fin
- Capacité d'accueil
- Statut (actif/inactif)

### Application
- Lien utilisateur-stage
- Statut (PENDING/ACCEPTED/REJECTED)
- Dates de candidature et révision

### LearningPath & Task
- Parcours d'apprentissage structurés
- Tâches avec contenu et échéances
- Système de soumission et évaluation

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez automatiquement

### Autres plateformes
- Netlify
- Railway
- Heroku

## 🔧 Scripts Disponibles

```bash
npm run dev          # Développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linting
npm run type-check   # Vérification TypeScript
```

## 📝 Fonctionnalités à Développer

- [ ] Système de notifications en temps réel
- [ ] Chat intégré mentor-étudiant
- [ ] Export PDF des rapports
- [ ] Intégration calendrier
- [ ] API mobile
- [ ] Tests automatisés

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Consultez la documentation Clerk
- Vérifiez les logs de développement

## 🔗 Liens Utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Clerk](https://clerk.com/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)

