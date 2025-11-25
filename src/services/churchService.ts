import { Church } from '@/types/entities';
import { getDatabase } from '@/lib/mongodb';
import { mockChurches } from '@/data/mockData';

const COLLECTION_NAME = 'churches';

export async function getAllChurches(): Promise<Church[]> {
  try {
    const db = await getDatabase();
    if (!db) {
      console.warn('Database not available, using mock data');
      return mockChurches;
    }

    const churches = await db.collection<Church>(COLLECTION_NAME).find({}).toArray();
    
    // If no churches in database, return mock data
    if (churches.length === 0) {
      console.warn('No churches found in database, using mock data');
      return mockChurches;
    }

    return churches.map(church => ({
      ...church,
      id: church.id || church._id?.toString() || ''
    }));
  } catch (error) {
    console.error('Error fetching churches:', error);
    return mockChurches;
  }
}

export async function getChurchById(id: string): Promise<Church | null> {
  try {
    const db = await getDatabase();
    if (!db) {
      return mockChurches.find(church => church.id === id) || null;
    }

    const church = await db.collection<Church>(COLLECTION_NAME).findOne({ id });
    
    if (!church) {
      return mockChurches.find(church => church.id === id) || null;
    }

    return {
      ...church,
      id: church.id || church._id?.toString() || ''
    };
  } catch (error) {
    console.error('Error fetching church by id:', error);
    return mockChurches.find(church => church.id === id) || null;
  }
}

export async function createChurch(church: Omit<Church, 'id'>): Promise<Church> {
  try {
    const db = await getDatabase();
    if (!db) {
      throw new Error('Database not available');
    }

    const newChurch: Church = {
      ...church,
      id: Date.now().toString()
    };

    await db.collection<Church>(COLLECTION_NAME).insertOne(newChurch);
    return newChurch;
  } catch (error) {
    console.error('Error creating church:', error);
    throw error;
  }
}

export async function updateChurch(id: string, updates: Partial<Church>): Promise<Church | null> {
  try {
    const db = await getDatabase();
    if (!db) {
      throw new Error('Database not available');
    }

    const result = await db.collection<Church>(COLLECTION_NAME).findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after' }
    );

    if (!result) {
      return null;
    }

    return {
      ...result,
      id: result.id || result._id?.toString() || ''
    };
  } catch (error) {
    console.error('Error updating church:', error);
    throw error;
  }
}

export async function deleteChurch(id: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (!db) {
      throw new Error('Database not available');
    }

    const result = await db.collection<Church>(COLLECTION_NAME).deleteOne({ id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting church:', error);
    throw error;
  }
}
