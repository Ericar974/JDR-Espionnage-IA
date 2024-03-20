/*
 * Interface for mission data, capturing key details for operations, including locations and timing.
 */
export interface MissionSchema {
  // Unique identifier for the mission; can be null if not yet assigned.
  id: string | null;

  // Name of the mission
  name: string | null;

  // The country where the mission is to take place.
  country: string;

  // Narrative scenario of the game; optional and can be null.
  scenario: string;

  // Status of the mission, indicating whether it's waiting, in progress, or completed.
  status: 'Waiting' | 'Playing' | 'Completed' | null;

  // Specific location or place of the mission within the country.
  place: string;

  // Scheduled date and time for the mission.
  date: Date;
}
