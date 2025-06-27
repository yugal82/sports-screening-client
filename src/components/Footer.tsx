import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerSections = [
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Blog', 'Contact Us'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Terms of Service', 'Privacy Policy', 'Feedback'],
  },
  {
    title: 'Sports',
    links: ['Soccer', 'Cricket', 'F1 Racing', 'Upcoming Events'],
  },
];

const socialLinks = [
  { icon: Facebook, name: 'Facebook' },
  { icon: Twitter, name: 'Twitter' },
  { icon: Instagram, name: 'Instagram' },
  { icon: Linkedin, name: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="bg-[#282828] text-white border-t border-[#333] pt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand and Socials */}
          <div className="md:col-span-1">
            <a href="/" className="text-3xl font-bold text-[#1DB954]">
              Electric Stadium
            </a>
            <p className="mt-4 text-[#B3B3B3] max-w-xs">Your ultimate destination for live sports screenings.</p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a key={social.name} href="#" className="text-[#B3B3B3] hover:text-[#1DB954] transition-colors">
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-white tracking-wider">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#B3B3B3] hover:text-[#1DB954] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-[#535353] text-center text-[#B3B3B3]">
          <small>&copy; {new Date().getFullYear()} Electric Stadium. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
