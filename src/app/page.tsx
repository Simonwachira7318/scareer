'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Building2, 
  Mail, 
  MapPin, 
  Loader2, 
  Copy, 
  Download, 
  Moon, 
  Sun,
  Globe,
  TrendingUp,
  Clock,
  CheckCircle,
  ExternalLink,
  Filter,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import Footer from '@/components/Footer';

interface Company {
  id: string;
  companyName: string;
  emailContact: string;
  website?: string;
  industry: string;
  addressLocation: string;
  createdAt: string;
  searchRecords?: Array<{
    id: string;
    industry: string;
    country: string;
    resultsCount: number;
    createdAt: string;
  }>;
}

interface SearchRecord {
  id: string;
  industry: string;
  country: string;
  resultsCount: number;
  createdAt: string;
  companies: Company[];
}

const industryOptions = [
  'Health',
  'Staffing', 
  'IT',
  'Computing',
  'Tech',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Consulting',
  'Real Estate',
  'Agriculture',
  'Tourism',
  'Logistics',
  'Energy'
];

const countryOptions = [
  'Kenya',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'India',
  'South Africa',
  'Nigeria',
  'Ghana',
  'Uganda',
  'Tanzania',
  'Rwanda'
];

export default function Home() {
  const [industry, setIndustry] = useState('');
  const [country, setCountry] = useState('Kenya');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [expectedResults, setExpectedResults] = useState('10-20');
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  // Fetch existing companies on component mount
  useEffect(() => {
    fetchCompanies();
    // Set initial theme
    setTheme('system');
  }, []);

  const fetchCompanies = async () => {
    setFetching(true);
    setError(null);
    try {
      const response = await fetch('/api/scrape');
      const result = await response.json();
      
      if (result.success) {
        setCompanies(result.data);
        setSearchHistory(result.searchHistory || []);
      } else {
        setError(result.error || 'Failed to fetch companies');
      }
    } catch (err) {
      setError('Network error while fetching companies');
    } finally {
      setFetching(false);
    }
  };

  const handleScrape = async () => {
    if (!industry || !country) {
      setError('Please select both industry and country');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ industry, country, expectedResults }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(result.message);
        // Refresh the companies list
        await fetchCompanies();
        
        // Show success toast
        toast({
          title: "Scraping Complete!",
          description: `Found ${result.data.length} companies in ${industry} industry.`,
        });
      } else {
        setError(result.error || 'Failed to scrape companies');
      }
    } catch (err) {
      setError('Network error while scraping companies');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (email: string, companyName: string) => {
    try {
      // Fallback for browsers that don't support clipboard API
      if (!navigator.clipboard) {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        setCopiedEmail(email);
        toast({
          title: "Email Copied!",
          description: `${email} from ${companyName} copied to clipboard.`,
        });
        
        setTimeout(() => setCopiedEmail(null), 2000);
        return;
      }
      
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      toast({
        title: "Email Copied!",
        description: `${email} from ${companyName} copied to clipboard.`,
      });
      
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      toast({
        title: "Copy Failed",
        description: "Failed to copy email to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    if (companies.length === 0) return;

    const headers = ['Company Name', 'Email Contact', 'Website', 'Industry', 'Location', 'Created Date'];
    const csvContent = [
      headers.join(','),
      ...companies.map(company => [
        `"${company.companyName}"`,
        `"${company.emailContact}"`,
        `"${company.website || ''}"`,
        `"${company.industry}"`,
        `"${company.addressLocation}"`,
        `"${new Date(company.createdAt).toLocaleString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `companies_${industry || 'all'}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete!",
      description: `Exported ${companies.length} companies to CSV.`,
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header with Theme Toggle */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <Globe className="h-8 w-8 text-primary" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <Search className="h-4 w-4 text-primary absolute top-1 right-1" />
              </motion.div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                S-SCRAP
              </h1>
              <p className="text-sm text-muted-foreground">Scalable Scraping Platform</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/about'}
              className="gap-2"
            >
              <Award className="h-4 w-4" />
              About
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="gap-2"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </Button>
            
            {companies.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={exportToCSV}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            )}
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 space-y-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 py-12 relative overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ 
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"
            />
            <motion.div
              animate={{ 
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 0.9, 1]
              }}
              transition={{ 
                duration: 25, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-xl"
            />
          </div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Web Scraping</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6">
              Discover Companies
              <br />
              <span className="text-4xl md:text-6xl">Worldwide</span>
            </h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Advanced web scraping platform that sources <span className="text-primary font-semibold">real company data</span> from across the internet. 
              Find targeted business contacts in any industry, any country with <span className="text-primary font-semibold">AI precision</span>.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-8"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Real-time Data</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Global Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">AI Enhanced</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <Tabs defaultValue="scrape" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="scrape" className="gap-2">
              <Search className="h-4 w-4" />
              Scrape
            </TabsTrigger>
            <TabsTrigger value="results" className="gap-2">
              <Building2 className="h-4 w-4" />
              Results ({companies.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Scrape Tab */}
          <TabsContent value="scrape" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-2 shadow-xl bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <Filter className="h-8 w-8 text-primary" />
                  </motion.div>
                  <CardTitle className="flex items-center justify-center gap-2 text-3xl font-bold">
                    Search Parameters
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Configure your intelligent search parameters to discover companies in your target industry and location
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-3"
                    >
                      <Label htmlFor="industry" className="text-sm font-semibold flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Industry Target *
                      </Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger className="h-14 text-base border-2 hover:border-primary/50 transition-colors">
                          <SelectValue placeholder="Select target industry" />
                        </SelectTrigger>
                        <SelectContent className="max-h-80 overflow-y-auto border-2">
                          {industryOptions.map((option) => (
                            <SelectItem 
                              key={option} 
                              value={option}
                              className="py-3 hover:bg-primary/5"
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-3"
                    >
                      <Label htmlFor="country" className="text-sm font-semibold flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Geographic Region *
                      </Label>
                      <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger className="h-14 text-base border-2 hover:border-primary/50 transition-colors">
                          <SelectValue placeholder="Select target region" />
                        </SelectTrigger>
                        <SelectContent className="max-h-80 overflow-y-auto border-2">
                          {countryOptions.map((option) => (
                            <SelectItem 
                              key={option} 
                              value={option}
                              className="py-3 hover:bg-primary/5"
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3"
                    >
                      <Label htmlFor="results" className="text-sm font-semibold flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Expected Results Range
                      </Label>
                      <Select value={expectedResults} onValueChange={setExpectedResults}>
                        <SelectTrigger className="h-14 text-base border-2 hover:border-primary/50 transition-colors">
                          <SelectValue placeholder="Select results range" />
                        </SelectTrigger>
                        <SelectContent className="border-2">
                          <SelectItem value="1-10" className="py-3 hover:bg-primary/5">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">1-10</span>
                              <span className="text-sm text-muted-foreground">Quick search</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="10-20" className="py-3 hover:bg-primary/5">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">10-20</span>
                              <span className="text-sm text-muted-foreground">Standard results</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="20-30" className="py-3 hover:bg-primary/5">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">20-30</span>
                              <span className="text-sm text-muted-foreground">Deep search</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center pt-6"
                  >
                    <Button 
                      onClick={handleScrape} 
                      disabled={loading || !industry || !country}
                      size="lg"
                      className="px-16 py-8 text-xl font-semibold gap-4 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform hover:scale-105"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                          Scraping Online Sources...
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          >
                            <Globe className="h-6 w-6" />
                          </motion.div>
                          Launch AI Scraping
                        </>
                      )}
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-sm text-muted-foreground"
                  >
                    Powered by advanced AI algorithms • Real-time web scraping • Global data sources
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-2 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        Scraped Companies
                      </CardTitle>
                      <CardDescription>
                        {companies.length > 0 
                          ? `Found ${companies.length} companies in database` 
                          : 'No companies found. Start scraping to see results.'
                        }
                      </CardDescription>
                    </div>
                    {companies.length > 0 && (
                      <Badge variant="secondary" className="gap-2">
                        <TrendingUp className="h-3 w-3" />
                        {companies.length} Results
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {fetching ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                          <Skeleton className="h-4 w-1/4" />
                          <Skeleton className="h-4 w-1/4" />
                          <Skeleton className="h-4 w-1/4" />
                          <Skeleton className="h-4 w-1/4" />
                        </div>
                      ))}
                    </div>
                  ) : companies.length > 0 ? (
                    <div className="rounded-md border overflow-hidden">
                      <div className="max-h-96 overflow-y-auto">
                        <Table>
                          <TableHeader className="sticky top-0 bg-background">
                            <TableRow>
                              <TableHead>Company</TableHead>
                              <TableHead>Email Contact</TableHead>
                              <TableHead>Website</TableHead>
                              <TableHead>Industry</TableHead>
                              <TableHead>Location</TableHead>
                              <TableHead>Created</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <AnimatePresence>
                              {companies.map((company, index) => (
                                <motion.tr
                                  key={company.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="border-b hover:bg-muted/50 transition-colors"
                                >
                                  <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                      <Building2 className="h-4 w-4 text-muted-foreground" />
                                      {company.companyName}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-muted-foreground" />
                                      <div className="flex items-center gap-2">
                                        <a 
                                          href={`mailto:${company.emailContact}`} 
                                          className="text-primary hover:underline"
                                        >
                                          {company.emailContact}
                                        </a>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => copyToClipboard(company.emailContact, company.companyName)}
                                          className="h-6 w-6 p-0"
                                        >
                                          {copiedEmail === company.emailContact ? (
                                            <CheckCircle className="h-3 w-3 text-green-500" />
                                          ) : (
                                            <Copy className="h-3 w-3" />
                                          )}
                                        </Button>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Globe className="h-4 w-4 text-muted-foreground" />
                                      {company.website ? (
                                        <a 
                                          href={company.website} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-primary hover:underline flex items-center gap-1"
                                        >
                                          <span className="truncate max-w-[150px]">
                                            {company.website.replace('https://', '').replace('http://', '')}
                                          </span>
                                          <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                        </a>
                                      ) : (
                                        <span className="text-muted-foreground text-sm">N/A</span>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="secondary" className="gap-1">
                                      <ExternalLink className="h-3 w-3" />
                                      {company.industry}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm">
                                        {company.addressLocation}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-sm text-muted-foreground">
                                    {formatDateTime(company.createdAt)}
                                  </TableCell>
                                </motion.tr>
                              ))}
                            </AnimatePresence>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Building2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">No companies found</p>
                      <p className="text-sm">Use the scrape tab to start discovering company data</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-2 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Search History
                  </CardTitle>
                  <CardDescription>
                    Your recent scraping activities and results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {fetching ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                      ))}
                    </div>
                  ) : searchHistory.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {searchHistory.map((search, index) => (
                        <motion.div
                          key={search.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Search className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{search.industry}</span>
                            </div>
                            <span className="text-muted-foreground">in</span>
                            <span className="font-medium">{search.country}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">
                              {search.resultsCount} companies
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatDateTime(search.createdAt)}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">No search history</p>
                      <p className="text-sm">Start scraping to build your search history</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Status Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}