import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: { monthly: 19.99, annual: 191.9 },
    description: "Perfect for small teams getting started",
    features: [
      "Up to 5 team members",
      "10GB storage",
      "Basic AI features",
      "Email support",
      "99.9% uptime SLA",
    ],
  },
  {
    name: "Professional",
    price: { monthly: 79.99, annual: 767.9 },
    description: "For growing teams that need more power",
    features: [
      "Up to 25 team members",
      "100GB storage",
      "Advanced AI features",
      "Priority support",
      "Custom integrations",
      "Advanced security",
      "SSO authentication",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: null, annual: null },
    description: "Custom solutions for large organizations",
    features: [
      "Unlimited team members",
      "Unlimited storage",
      "Enterprise AI features",
      "24/7 dedicated support",
      "Custom development",
      "On-premise deployment",
      "Advanced compliance",
      "SLA guarantees",
    ],
  },
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in">
            Choose the perfect plan for your team. All plans include a 14-day free trial.
          </p>

          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={!isAnnual ? "font-semibold" : "text-muted-foreground"}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 bg-primary rounded-full transition-colors"
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  isAnnual ? "translate-x-6" : ""
                }`}
              />
            </button>
            <span className={isAnnual ? "font-semibold" : "text-muted-foreground"}>
              Annual <span className="text-primary text-sm">(Save 20%)</span>
            </span>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col items-center gap-3">
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6">
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <div className="text-sm text-muted-foreground">14-day free trial. No credit card required.</div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative animate-fade-in transition-all duration-200 ${
                  plan.popular ? "border-primary shadow-glow" : ""
                } ${
                  plan.name === "Professional"
                    ? "hover:-translate-y-1 hover:shadow-xl hover:scale-[1.01] hover:bg-primary/5 hover:ring-1 hover:ring-primary/25 dark:hover:bg-primary/10"
                    : ""
                } ${
                  plan.name === "Enterprise"
                    ? "hover:-translate-y-1 hover:shadow-lg hover:ring-1 hover:ring-primary/30 hover:border-primary/40"
                    : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    {plan.price.monthly !== null ? (
                      <>
                        <span className="text-4xl font-bold">
                          ${
                            (isAnnual ? plan.price.annual : plan.price.monthly)
                              .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                          }
                        </span>
                        <span className="text-muted-foreground">
                          /{isAnnual ? "year" : "month"}
                        </span>
                        <div className="mt-2">
                          <span className="inline-flex items-center text-xs font-medium text-primary bg-primary/10 rounded-full px-2.5 py-1">
                            14-day free trial
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">Custom</span>
                        <div className="mt-2">
                          <span className="inline-flex items-center text-xs font-medium text-primary bg-primary/10 rounded-full px-2.5 py-1">
                            14-day free trial available
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full ${plan.popular ? "bg-gradient-primary" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.price.monthly !== null ? (
                      <Link to="/signup">Start Free Trial</Link>
                    ) : (
                      <Link to="/contact">Contact Sales</Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "Can I change plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes! All plans include a 14-day free trial with full access to features. No credit card required.",
              },
              {
                q: "What happens after my trial ends?",
                a: "You'll be prompted to choose a plan. Your data is safe and you can continue where you left off.",
              },
            ].map((faq, index) => (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
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

export default Pricing;
