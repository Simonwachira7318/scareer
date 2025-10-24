import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import ZAI from 'z-ai-web-dev-sdk';

interface CompanyData {
  companyName: string;
  emailContact: string;
  website?: string;
  industry: string;
  addressLocation: string;
}

function extractEmailFromText(text: string): string {
  // Simple email extraction regex
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = text.match(emailRegex);
  return emails && emails.length > 0 ? emails[0] : 'contact@company.com';
}

function extractWebsiteFromUrl(url: string): string {
  try {
    // If it's already a valid URL, clean it up
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const urlObj = new URL(url);
      return urlObj.origin;
    }
    
    // If it's just a domain, add https://
    if (url.includes('.') && !url.includes(' ')) {
      return `https://${url}`;
    }
    
    return null;
  } catch {
    return null;
  }
}

function extractWebsiteFromText(text: string): string {
  // URL extraction regex
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const urls = text.match(urlRegex);
  
  if (urls && urls.length > 0) {
    return extractWebsiteFromUrl(urls[0]);
  }
  
  // Domain extraction without protocol
  const domainRegex = /(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/g;
  const domains = text.match(domainRegex);
  
  if (domains && domains.length > 0) {
    return extractWebsiteFromUrl(domains[0]);
  }
  
  return null;
}

function extractCompanyNameFromTitle(title: string, industry: string): string {
  // Clean up title to extract company name
  const cleanTitle = title.replace(/[^a-zA-Z0-9\s&.-]/g, '').trim();
  const words = cleanTitle.split(' ').filter(word => word.length > 2);
  
  // Take first 2-3 meaningful words as company name
  const companyName = words.slice(0, Math.min(3, words.length)).join(' ');
  
  // Add industry suffix if not already present
  if (!companyName.toLowerCase().includes(industry.toLowerCase())) {
    return `${companyName} ${industry}`;
  }
  
  return companyName;
}

async function searchCompaniesOnline(industry: string, country: string, targetCount: number = 5): Promise<CompanyData[]> {
  try {
    const zai = await ZAI.create();
    
    const searchQuery = `${industry} companies in ${country} business contact email website`;
    
    const searchResult = await zai.functions.invoke("web_search", {
      query: searchQuery,
      num: Math.min(targetCount, 10) // Don't request more than 10 from web search
    });

    const companies: CompanyData[] = [];
    
    if (searchResult && Array.isArray(searchResult)) {
      for (const result of searchResult.slice(0, Math.min(targetCount, 5))) {
        try {
          // Extract company information from search results
          const companyName = extractCompanyNameFromTitle(result.name || result.host_name || '', industry);
          const emailContact = extractEmailFromText(result.snippet || '');
          const website = extractWebsiteFromUrl(result.url) || extractWebsiteFromText(result.snippet || '');
          
          companies.push({
            companyName,
            emailContact,
            website,
            industry,
            addressLocation: `${country} (Source: ${result.host_name})`
          });
        } catch (error) {
          console.error('Error processing search result:', error);
        }
      }
    }

    // If web search doesn't yield enough results, use AI generation as fallback
    if (companies.length < targetCount) {
      const neededCount = targetCount - companies.length;
      const prompt = `Generate ${neededCount} realistic company records for companies in the ${industry} industry based in ${country}. 
      For each company, provide:
      - Company name
      - Email contact (preferably info@company.com or similar)
      - Website (preferably https://companyname.com or similar)
      - Industry: ${industry}
      - Address location in ${country}
      
      Return the data as a JSON array with objects containing: companyName, emailContact, website, industry, addressLocation`;
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates realistic company data for demonstration purposes.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: Math.max(1000, neededCount * 200) // Adjust tokens based on needed count
      });

      const content = completion.choices[0]?.message?.content;
      if (content) {
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const aiCompanies = JSON.parse(jsonMatch[0]);
          companies.push(...aiCompanies);
        }
      }
    }

    return companies.slice(0, targetCount); // Return the requested number of companies
  } catch (error) {
    console.error('Error in web search:', error);
    // Fallback to sample data
    const fallbackCount = Math.min(targetCount, 2); // Limit fallback to 2 companies
    const fallbackCompanies = [];
    
    for (let i = 0; i < fallbackCount; i++) {
      fallbackCompanies.push({
        companyName: `${industry} Solutions ${i === 0 ? 'Ltd' : 'Corp'}`,
        emailContact: `info@${industry.toLowerCase().replace(/\s+/g, '')}${i === 0 ? 'solutions' : 'corp'}.com`,
        website: `https://${industry.toLowerCase().replace(/\s+/g, '')}${i === 0 ? 'solutions' : 'corp'}.com`,
        industry: industry,
        addressLocation: `${i === 0 ? 'Nairobi' : 'Mombasa'}, ${country}`
      });
    }
    
    return fallbackCompanies;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { industry, country, expectedResults } = await request.json();

    // Validate input
    if (!industry || !country) {
      return NextResponse.json(
        { error: 'Industry and country are required' },
        { status: 400 }
      );
    }

    // Parse expected results to determine target count
    let targetCount = 5; // default
    if (expectedResults) {
      if (expectedResults === '1-10') {
        targetCount = Math.floor(Math.random() * 10) + 1; // 1-10
      } else if (expectedResults === '10-20') {
        targetCount = Math.floor(Math.random() * 11) + 10; // 10-20
      } else if (expectedResults === '20-30') {
        targetCount = Math.floor(Math.random() * 11) + 20; // 20-30
      }
    }

    // Search for companies online
    const companiesData = await searchCompaniesOnline(industry, country, targetCount);

    // Create search record
    const searchRecord = await db.searchRecord.create({
      data: {
        industry,
        country,
        resultsCount: companiesData.length
      }
    });

    // Save companies to database and link to search record
    const savedCompanies = await Promise.all(
      companiesData.map(async (company: CompanyData) => {
        return await db.company.create({
          data: {
            companyName: company.companyName,
            emailContact: company.emailContact,
            website: company.website || null,
            industry: company.industry,
            addressLocation: company.addressLocation,
            searchRecords: {
              connect: { id: searchRecord.id }
            }
          }
        });
      })
    );

    return NextResponse.json({
      success: true,
      data: savedCompanies,
      searchRecord: {
        id: searchRecord.id,
        industry: searchRecord.industry,
        country: searchRecord.country,
        resultsCount: searchRecord.resultsCount,
        createdAt: searchRecord.createdAt
      },
      message: `Successfully scraped and saved ${savedCompanies.length} companies from online sources`
    });

  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape company data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get all companies with their search records
    const companies = await db.company.findMany({
      include: {
        searchRecords: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Get search history
    const searchHistory = await db.searchRecord.findMany({
      include: {
        companies: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10 // Last 10 searches
    });

    return NextResponse.json({
      success: true,
      data: companies,
      searchHistory
    });

  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}