import { Zap, Shield, Sparkles } from 'lucide-react';
import featureAI from '@/assets/feature-ai.png';
import featureSpeed from '@/assets/feature-speed.png';
import featureSecurity from '@/assets/feature-security.png';

const features = [
  {
    title: 'AI-Powered Intelligence',
    description: 'Leverage cutting-edge artificial intelligence to automate workflows, predict trends, and make data-driven decisions with confidence.',
    icon: Sparkles,
    image: featureAI,
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    title: 'Lightning-Fast Performance',
    description: 'Experience blazing-fast load times and seamless interactions. Our optimized infrastructure ensures your team stays productive.',
    icon: Zap,
    image: featureSpeed,
    gradient: 'from-green-500 to-blue-500',
  },
  {
    title: 'Enterprise-Grade Security',
    description: 'Rest easy with bank-level encryption, compliance certifications, and advanced security protocols protecting your data 24/7.',
    icon: Shield,
    image: featureSecurity,
    gradient: 'from-purple-500 to-pink-500',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features designed to accelerate your growth and transform the way you work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-lg hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 relative">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-16 h-16 rounded-xl object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <feature.icon className="w-8 h-8 text-primary mb-4" />
              
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.gradient} rounded-full mt-6 transition-all duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;