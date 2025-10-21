import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO, TechCorp",
    content: "JETA transformed how our team collaborates. The AI-powered features saved us countless hours.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CEO, StartupXYZ",
    content: "The security features give us peace of mind. Best investment we've made for our infrastructure.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager, InnovateCo",
    content: "Lightning-fast performance and intuitive interface. Our team was up and running in minutes.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Loved by Teams Worldwide</h2>
          <p className="text-xl text-muted-foreground">
            See what our customers have to say about JETA
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
