import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Lightbulb, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to empowering teams with cutting-edge technology",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Every decision we make starts with understanding your needs",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Constantly pushing boundaries to deliver breakthrough solutions",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Maintaining the highest standards in everything we build",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Building the Future of Work
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            JETA was founded with a simple mission: make powerful technology accessible to every team
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Founded in 2020, JETA emerged from a simple observation: teams were struggling with 
                fragmented tools, security concerns, and slow performance. We knew there had to be a better way.
              </p>
              <p>
                Our founders, a team of engineers and designers from leading tech companies, came together 
                to build a platform that combines AI-powered intelligence, enterprise-grade security, and 
                lightning-fast performance in one seamless experience.
              </p>
              <p>
                Today, we're proud to serve over 10,000 teams worldwide, helping them work smarter, 
                faster, and more securely. But we're just getting started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Alex Thompson", role: "CEO & Co-Founder" },
              { name: "Sarah Kim", role: "CTO & Co-Founder" },
              { name: "Marcus Johnson", role: "VP of Engineering" },
            ].map((member, index) => (
              <Card key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4" />
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
