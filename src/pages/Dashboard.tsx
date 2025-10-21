import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-slate-600 dark:text-slate-300">Here's what's happening with your portfolio today.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="animate-fade-in bg-white/85 border border-black/10 backdrop-blur-lg dark:bg-slate-900/70 dark:border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-200">Total Projects</CardTitle>
              <Zap className="w-4 h-4 text-slate-500 dark:text-slate-300" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-xs text-slate-500 mt-1 dark:text-slate-300">
                <span className="text-primary">▲ 12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in bg-white/85 border border-black/10 backdrop-blur-lg dark:bg-slate-900/70 dark:border-white/10" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-200">Team Members</CardTitle>
              <Users className="w-4 h-4 text-slate-500 dark:text-slate-300" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-slate-500 mt-1 dark:text-slate-300">
                <span className="text-primary">▲ 3</span> new this month
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in bg-white/85 border border-black/10 backdrop-blur-lg dark:bg-slate-900/70 dark:border-white/10" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-200">Performance</CardTitle>
              <TrendingUp className="w-4 h-4 text-slate-500 dark:text-slate-300" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">98.7%</div>
              <p className="text-xs text-slate-500 mt-1 dark:text-slate-300">
                <span className="text-primary">▲ 2.1%</span> uptime
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="animate-fade-in bg-white/85 border border-black/10 backdrop-blur-lg dark:bg-slate-900/70 dark:border-white/10" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-300">Your latest project updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Project Alpha deployed", time: "2 hours ago" },
                  { action: "New team member added", time: "5 hours ago" },
                  { action: "Security scan completed", time: "1 day ago" },
                  { action: "API integration updated", time: "2 days ago" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-black/5 last:border-0 dark:border-white/10">
                    <span className="text-sm text-slate-700 dark:text-slate-200">{item.action}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-300">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in bg-white/85 border border-black/10 backdrop-blur-lg dark:bg-slate-900/70 dark:border-white/10" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-300">Get started with these common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-between" variant="outline">
                Create New Project
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button className="w-full justify-between" variant="outline">
                Invite Team Member
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button className="w-full justify-between" variant="outline">
                View Analytics
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button className="w-full justify-between bg-gradient-primary">
                Upgrade Plan
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
