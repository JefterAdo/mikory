import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // TODO: Implémenter la logique d'authentification réelle ici
    // (par exemple, vérifier les identifiants contre une base de données)

    // Pour l'instant, nous simulons une connexion réussie si email et password sont fournis
    if (email && password) {
      // Simuler un utilisateur et un token
      const user = {
        id: '123', // ID utilisateur factice
        email: email,
        firstName: 'Utilisateur',
        lastName: 'Test',
        role: 'USER', // ou 'ADMIN' si vous testez l'accès admin
      };
      const accessToken = 'faux_token_jwt_pour_le_test'; // Token factice

      return NextResponse.json({ 
        access_token: accessToken, 
        user: user 
      }, { status: 200 });
    } else {
      // Identifiants manquants
      return NextResponse.json({ message: 'Email et mot de passe requis' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erreur dans /api/auth/login:', error);
    return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
  }
}
