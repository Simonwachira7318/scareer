import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST() {
  try {
    // Delete all companies from the database
    const deleteResult = await db.company.deleteMany({});
    
    // Also delete all search records since they're related to companies
    await db.searchRecord.deleteMany({});

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deleteResult.count} companies and all search records`,
      deletedCount: deleteResult.count
    });

  } catch (error) {
    console.error('Error clearing companies:', error);
    return NextResponse.json(
      { error: 'Failed to clear companies', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}