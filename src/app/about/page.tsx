'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Search, 
  Building2, 
  Mail, 
  ExternalLink, 
  Database, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp,
  Code,
  Smartphone,
  Server,
  Brain,
  Target,
  Award,
  GraduationCap,
  Briefcase,
  Github,
  Linkedin
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Footer from '@/components/Footer';

export default function About() {
  const { theme } = useTheme();

  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "AI-Powered Search",
      description: "Advanced artificial intelligence algorithms that intelligently search and extract company data from across the web."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Coverage",
      description: "Access company data from multiple countries and regions worldwide with comprehensive geographic coverage."
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Real-time Data",
      description: "Live web scraping ensures you get the most current and up-to-date company information available."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Data Quality",
      description: "Intelligent validation and verification processes ensure high-quality, accurate company data."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Optimized scraping algorithms deliver results quickly and efficiently, saving you valuable time."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "User-Friendly",
      description: "Intuitive interface designed for professionals of all technical levels to use with ease."
    }
  ];

  const technologies = [
    { name: "Next.js 15", icon: <Code className="h-6 w-6" />, description: "React framework for production" },
    { name: "TypeScript", icon: <Code className="h-6 w-6" />, description: "Type-safe JavaScript development" },
    { name: "Tailwind CSS", icon: <Code className="h-6 w-6" />, description: "Utility-first CSS framework" },
    { name: "Prisma", icon: <Database className="h-6 w-6" />, description: "Next-generation ORM" },
    { name: "SQLite", icon: <Database className="h-6 w-6" />, description: "Lightweight database" },
    { name: "Framer Motion", icon: <Zap className="h-6 w-6" />, description: "Production-ready motion library" },
    { name: "shadcn/ui", icon: <Smartphone className="h-6 w-6" />, description: "Beautiful UI components" },
    { name: "AI SDK", icon: <Brain className="h-6 w-6" />, description: "Artificial intelligence integration" }
  ];

  const useCases = [
    {
      title: "Sales Teams",
      description: "Find qualified leads and contact information for targeted outreach campaigns.",
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "Marketing Professionals",
      description: "Research companies for market analysis and competitor intelligence gathering.",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: "Business Development",
      description: "Identify potential partners and acquisition targets in specific industries.",
      icon: <Building2 className="h-6 w-6" />
    },
    {
      title: "Recruiters",
      description: "Discover companies and contacts for talent acquisition and placement services.",
      icon: <Users className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
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
              <p className="text-sm text-muted-foreground">About the Platform</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              Back to Platform
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 space-y-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 py-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6"
          >
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">Professional Grade Web Scraping</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6">
            About S-SCRAP
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A cutting-edge web scraping platform that leverages artificial intelligence to discover and extract 
            real company data from across the internet. Built for professionals who need accurate, 
            up-to-date business intelligence.
          </p>
        </motion.section>

        {/* Platform Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Platform Overview</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              S-SCRAP represents the next generation of web scraping technology, combining powerful AI algorithms 
              with an intuitive user interface to deliver unparalleled business intelligence capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our sophisticated system combines multiple technologies to deliver accurate and comprehensive company data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Intelligent Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The system uses advanced AI-powered search algorithms to scan the web for companies matching your criteria. 
                  Our intelligent parsing technology extracts relevant information from various sources including websites, 
                  business directories, and professional networks.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">AI-Powered</Badge>
                  <Badge variant="secondary">Multi-Source</Badge>
                  <Badge variant="secondary">Real-time</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Data Processing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Extracted data undergoes rigorous validation and processing. Our system verifies email formats, 
                  validates website URLs, and ensures data consistency before storing it in our secure database. 
                  Advanced deduplication algorithms ensure data quality.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Validated</Badge>
                  <Badge variant="secondary">Deduplicated</Badge>
                  <Badge variant="secondary">Structured</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Enhancement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  When web sources are limited, our AI generation capabilities create realistic company data 
                  based on industry patterns and geographic specifics. This ensures you always get comprehensive 
                  results, even for niche industries or regions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Smart Fallback</Badge>
                  <Badge variant="secondary">Pattern-Based</Badge>
                  <Badge variant="secondary">Context-Aware</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  User Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The platform features an intuitive interface with powerful filtering options, export capabilities, 
                  and search history tracking. Users can easily configure search parameters, view results, 
                  and export data in various formats for seamless integration with their workflows.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Intuitive</Badge>
                  <Badge variant="secondary">Exportable</Badge>
                  <Badge variant="secondary">Trackable</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Technology Stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Technology Stack</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Built with cutting-edge technologies to ensure performance, reliability, and scalability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="text-center h-full border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="text-primary mb-2 flex justify-center">
                      {tech.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{tech.name}</h3>
                    <p className="text-xs text-muted-foreground">{tech.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Use Cases */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Who Can Benefit</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              S-SCRAP is designed for professionals and organizations that need accurate company data for various business purposes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {useCase.icon}
                      {useCase.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {useCase.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Developer Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Developer</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Meet the developer behind S-SCRAP
            </p>
          </div>

          <Card className="border-2 max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                <img 
                  src="https://simonimageurl.netlify.app/images/sy1.png" 
                  alt="Simon Wachira Maina"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-3xl">Simon Wachira Maina</CardTitle>
              <CardDescription className="text-lg">
                Full Stack Developer for Web and Mobile Applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Education</h4>
                      <p className="text-sm text-muted-foreground">
                        Bachelor of Science in Software Engineering
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Kirinyaga University, Class of 2025
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Specialization</h4>
                      <p className="text-sm text-muted-foreground">
                        Full Stack Development
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Web & Mobile Applications
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Technical Skills</h4>
                      <p className="text-sm text-muted-foreground">
                        React, Next.js, TypeScript, Node.js
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Mobile Development, Database Design
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Focus Areas</h4>
                      <p className="text-sm text-muted-foreground">
                        AI Integration, Web Scraping
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Scalable Applications, UX/UI Design
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => window.open('http://itswachira.netlify.app', '_blank')}
                    className="gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Portfolio
                  </Button>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>Available for freelance projects</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}