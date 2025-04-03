
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, Users, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-md bg-background/70 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-primary-foreground font-bold text-xl">O</span>
            </div>
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">OpenFix</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="hover:bg-blue-50 dark:hover:bg-blue-950/30">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12 py-20">
        <div className="flex-1 space-y-8 text-left">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 leading-tight">
            Modern Vulnerability Management for Development Teams
          </h1>
          <p className="text-xl text-muted-foreground">
            OpenFix helps teams track, manage, and fix security vulnerabilities with collaborative
            workflows and AI-powered assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md group transition-all">
                Get Started Free
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30">See Features</Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md aspect-video relative overflow-hidden rounded-2xl shadow-2xl border border-blue-100 dark:border-blue-900 group hover-lift animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/20 z-0"></div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="glass-card p-6 rounded-xl text-center">
                <Shield className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                <span className="text-xl font-semibold">Security Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gradient-to-b from-background to-blue-50/50 dark:from-background dark:to-blue-950/10">
        <div className="container mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Key Features</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Everything you need to manage vulnerabilities across your organization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together with your team to address security vulnerabilities"
              },
              {
                icon: Shield,
                title: "Asset Management",
                description: "Track all your assets and their associated vulnerabilities"
              },
              {
                icon: Zap,
                title: "AI Assistance",
                description: "Get intelligent recommendations powered by OpenAI's ChatGPT"
              },
              {
                icon: CheckCircle,
                title: "Vulnerability Tracking",
                description: "Comprehensive tools to manage the vulnerability lifecycle"
              },
              {
                icon: Shield,
                title: "Performance Dashboard",
                description: "Real-time analytics on your security posture"
              },
              {
                icon: Users,
                title: "Team Management",
                description: "Invite team members and manage permissions easily"
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 hover-lift border border-blue-100 dark:border-blue-900/30 group transition-all duration-300">
                <feature.icon className="h-10 w-10 text-blue-500 mb-4 p-1.5 bg-blue-50 dark:bg-blue-950/50 rounded-xl group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto py-20 text-center">
        <div className="max-w-3xl mx-auto glass-card rounded-3xl p-12 shadow-soft border border-blue-100 dark:border-blue-900/30">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Ready to secure your applications?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start managing vulnerabilities effectively with OpenFix today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md group">
                Get Started Free
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30">Log in</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted mt-auto border-t border-border">
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">O</span>
              </div>
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">OpenFix</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} OpenFix. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
