export type Instructor = {
  name: string;
  role: string;
  experience?: string;
  languages?: string[];
};

// Vide tant que les profils ne sont pas fournis et vérifiés.
// La page /instructeurs affiche alors un état temporaire propre.
export const instructors: Instructor[] = [];
