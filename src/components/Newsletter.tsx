import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <div className="bg-gradient-primary rounded-lg p-8 text-center">
      <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
      <p className="text-white/90 mb-6">
        Get the latest news and updates delivered to your inbox
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
        />
        <Button type="submit" variant="secondary" className="whitespace-nowrap">
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default Newsletter;
