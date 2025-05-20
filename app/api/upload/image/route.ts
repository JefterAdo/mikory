import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'Aucun fichier fourni.' }, { status: 400 });
    }

    // Vérifier le type de fichier (optionnel mais recommandé)
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, message: 'Type de fichier non supporté.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Générer un nom de fichier unique pour éviter les conflits
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads/blog');
    const imagePath = path.join(uploadDir, filename);

    // Écrire le fichier sur le serveur
    await writeFile(imagePath, buffer);

    console.log(`Fichier sauvegardé sur: ${imagePath}`);

    // Retourner l'URL publique de l'image
    const publicUrl = `/uploads/blog/${filename}`;
    return NextResponse.json({ success: true, url: publicUrl });

  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de l\'upload de l\'image.' }, { status: 500 });
  }
}
