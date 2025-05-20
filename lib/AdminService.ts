import { PrismaClient } from "@prisma/client";
import { validateEmail, validateRequiredFields } from "./utils";

const prisma = new PrismaClient();

export class AdminService {
  // Gestion des utilisateurs
  static async createUser(userData: {
    email: string;
    password: string;
    name?: string;
    role?: string;
  }) {
    // Validation
    if (!validateEmail(userData.email)) {
      throw new Error("Email invalide");
    }

    if (!validateRequiredFields(userData, ["email", "password"])) {
      throw new Error("Champs obligatoires manquants");
    }

    // Création dans la base de données
    try {
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password: userData.password, // Note: Devrait être hashé
          name: userData.name,
          role: userData.role || "USER",
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'utilisateur: ${error}`);
    }
  }

  // Gestion des articles
  static async createPost(postData: {
    title: string;
    content: string;
    authorId: number;
    slug?: string;
  }) {
    // Validation
    if (!validateRequiredFields(postData, ["title", "content", "authorId"])) {
      throw new Error("Champs obligatoires manquants");
    }

    // Création dans la base de données
    try {
      const post = await prisma.post.create({
        data: {
          title: postData.title,
          content: postData.content,
          authorId: postData.authorId,
          slug: postData.slug || generateSlug(postData.title),
        },
      });
      return post;
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'article: ${error}`);
    }
  }

  // Méthodes supplémentaires pour la récupération, mise à jour, suppression...
  static async getUsers(page: number = 1, limit: number = 10) {
    return prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  static async getPosts(page: number = 1, limit: number = 10) {
    return prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: { author: true },
    });
  }
}
