/*
 * Interface for mission data, capturing key details for operations, including locations and timing.
 */
export interface MissionSchema {
  // Unique identifier for the mission; can be null if not yet assigned.
  id: string | null;

  // The country where the mission is to take place.
  country: string;

  // Specific location or place of the mission within the country.
  place: string;

  // Scheduled date and time for the mission.
  date: Date;
}
