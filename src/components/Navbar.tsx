import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Vote, Home, CheckCircle, LogIn, LogOut } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

/**
 * Main navigation bar with keyboard-accessible links
 */
const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { speak, settings } = useAccessibility();
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    if (settings.voiceMode) speak("You have been logged out");
    navigate('/');
  };

  const navItems = [
    { path: '/', label: t.nav.home, icon: Home },
    { path: '/vote', label: t.nav.vote, icon: Vote },
    { path: '/confirmation', label: t.nav.confirmation, icon: CheckCircle },
  ];

  const handleNavFocus = (label: string) => {
    if (settings.voiceMode) {
      speak(`Navigate to ${label}`);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 glass-surface border-b border-border/50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
            onFocus={() => handleNavFocus(t.nav.home)}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
              <Vote className="w-5 h-5 text-primary" />
            </div>
            <span className="font-heading font-bold text-lg hidden sm:block">
              IncluVote
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ul className="flex items-center gap-1 sm:gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onFocus={() => handleNavFocus(item.label)}
                      className={`
                        flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg
                        font-medium text-sm transition-all touch-target
                        ${isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }
                      `}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Auth Button */}
            {user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

