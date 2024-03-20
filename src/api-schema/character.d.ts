/*
 * Defines the schema for character entities within the application, including identifiers, user association, and narrative elements.
 */
export interface CharacterSchema {
  // Unique identifier for the character.
  id: string;

  // Identifier linking the character to a specific user.
  userId: string;

  // URL of the character's image.
  imageUrl: string;

  // The character's covert name or alias.
  coverName: string;

  // A brief description of the character.
  description: string;

  // Timestamp marking when the character was created.
  createdAt: Date;

  // Timestamp for when the character was deleted, if applicable; nullable for active characters.
  deletedAt: Date | null;
}
