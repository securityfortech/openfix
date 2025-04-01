
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">O</span>
            </div>
            <span className="font-bold text-xl">OpenFix</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12 py-20">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Modern Vulnerability Management for Development Teams
          </h1>
          <p className="text-xl text-muted-foreground">
            OpenFix helps teams track, manage, and fix security vulnerabilities with collaborative
            workflows and AI-powered assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">Get Started Free</Button>
            </Link>
            <Link to="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">See Features</Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md aspect-video bg-muted rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-muted-foreground text-lg">Dashboard Preview</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-muted py-20">
        <div className="container mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage vulnerabilities across your organization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Team Collaboration",
                description: "Work together with your team to address security vulnerabilities"
              },
              {
                title: "Asset Management",
                description: "Track all your assets and their associated vulnerabilities"
              },
              {
                title: "AI Assistance",
                description: "Get intelligent recommendations powered by OpenAI's ChatGPT"
              },
              {
                title: "Vulnerability Tracking",
                description: "Comprehensive tools to manage the vulnerability lifecycle"
              },
              {
                title: "Performance Dashboard",
                description: "Real-time analytics on your security posture"
              },
              {
                title: "Team Management",
                description: "Invite team members and manage permissions easily"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Ready to secure your applications?</h2>
          <p className="text-xl text-muted-foreground">
            Start managing vulnerabilities effectively with OpenFix today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">Log in</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted mt-auto border-t border-border">
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">O</span>
              </div>
              <span className="font-bold">OpenFix</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} OpenFix. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
