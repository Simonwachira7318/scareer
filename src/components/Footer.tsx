'use client';

import { motion } from 'framer-motion';
import { Globe, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'About', href: '/about', icon: <Globe className="h-4 w-4" /> },
    { name: 'Portfolio', href: 'http://itswachira.netlify.app', icon: <ExternalLink className="h-4 w-4" />, external: true },
    { name: 'Contact', href: 'mailto:contact@example.com', icon: <Mail className="h-4 w-4" />, external: true },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: <Github className="h-5 w-5" /> },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: <Linkedin className="h-5 w-5" /> },
  ];

  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">S-SCRAP</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advanced web scraping platform powered by artificial intelligence. 
              Discover companies worldwide with real-time data extraction.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Always Innovating</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : '_self'}
                    rel={link.external ? 'noopener noreferrer' : ''}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                    {link.external && (
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-sm uppercase tracking-wider">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• AI-Powered Search</li>
              <li>• Real-time Data Extraction</li>
              <li>• Global Coverage</li>
              <li>• Export Capabilities</li>
              <li>• Search History</li>
              <li>• Smart Filtering</li>
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-sm uppercase tracking-wider">Connect</h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Developed by Simon Wachira Maina
              </p>
              <p className="text-xs text-muted-foreground">
                Full Stack Developer
              </p>
              <a
                href="http://itswachira.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline inline-flex items-center gap-1"
              >
                View Portfolio
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 pt-8 border-t"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} S-SCRAP Platform. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Powered by AI</span>
              <span>•</span>
              <span>Built with Next.js</span>
              <span>•</span>
              <span>TypeScript</span>
              <span>•</span>
              <span>Scalable Architecture</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}