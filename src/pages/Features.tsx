import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, Zap, Database, Cloud, Lock, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Advanced machine learning algorithms that adapt to your workflow",
    benefits: ["Smart automation", "Predictive analytics", "Natural language processing"],
  },
  {
    icon: Zap,
    title: "Lightning Performance",
    description: "Optimized infrastructure delivering sub-second response times",
    benefits: ["99.9% uptime SLA", "Global CDN", "Auto-scaling"],
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance certifications",
    benefits: ["SOC 2 Type II", "GDPR compliant", "End-to-end encryption"],
  },
  {
    icon: Database,
    title: "Smart Data Management",
    description: "Intelligent data organization and retrieval systems",
    benefits: ["Real-time sync", "Automatic backups", "Version control"],
  },
  {
    icon: Cloud,
    title: "Cloud Integration",
    description: "Seamless integration with major cloud platforms",
    benefits: ["AWS & Azure support", "Multi-cloud strategy", "Easy migration"],
  },
  {
    icon: Lock,
    title: "Advanced Access Control",
    description: "Granular permissions and role-based access",
    benefits: ["SSO integration", "2FA authentication", "Audit logs"],
  },
];

const Features = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Powerful Features for Modern Teams
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in">
            Everything you need to accelerate your workflow, protect your data, and scale with confidence
          </p>
          <Button asChild size="lg" className="bg-gradient-primary animate-fade-in">
            <Link to="/signup">Start Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using JETA to transform their workflow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-primary">
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
