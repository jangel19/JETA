import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const { user, signOut, updateUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const deriveNames = () => {
    if (!user) return { first: "", last: "" };
    if (user.firstName || user.lastName) {
      return { first: user.firstName ?? "", last: user.lastName ?? "" };
    }
    const legacy = (user.name ?? "").trim();
    if (legacy) {
      const parts = legacy.split(/\s+/);
      return { first: parts[0] ?? "", last: parts.slice(1).join(" ") };
    }
    const local = (user.email.split("@")[0] ?? "user").replace(/[._-]+/g, " ").trim();
    return { first: local ? local.charAt(0).toUpperCase() + local.slice(1) : "User", last: "" };
  };

  const initial = deriveNames();
  const [firstName, setFirstName] = useState(initial.first);
  const [lastName, setLastName] = useState(initial.last);
  const [email, setEmail] = useState(user?.email ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifyProduct, setNotifyProduct] = useState(true);
  const [notifyBilling, setNotifyBilling] = useState(false);
  const [notifySecurity, setNotifySecurity] = useState(true);

  if (!user) {
    navigate("/signin");
    return null;
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ firstName, lastName, email });
    toast({ title: "Profile updated", description: "Your information has been saved." });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast({ title: "Password too short", description: "Use at least 8 characters.", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords don't match", description: "Please confirm your new password.", variant: "destructive" });
      return;
    }
    // Simulate success
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast({ title: "Password changed", description: "Your password has been updated." });
  };

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-[1.1fr_1.6fr]">
          {/* Account info / notifications */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first">First name</Label>
                      <Input id="first" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last">Last name</Label>
                      <Input id="last" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button type="submit" className="bg-gradient-primary">Save changes</Button>
                    <Button type="button" variant="outline" onClick={() => { const d = deriveNames(); setFirstName(d.first); setLastName(d.last); setEmail(user!.email); }}>Reset</Button>
                  </div>
                </form>
                <Separator className="my-6" />
                <div className="space-y-3">
                  <div className="text-sm font-medium">Notifications</div>
                  <div className="space-y-3 text-sm">
                    <label className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">Product updates</span>
                      <Switch checked={notifyProduct} onCheckedChange={setNotifyProduct} />
                    </label>
                    <label className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">Billing emails</span>
                      <Switch checked={notifyBilling} onCheckedChange={setNotifyBilling} />
                    </label>
                    <label className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">Security alerts</span>
                      <Switch checked={notifySecurity} onCheckedChange={setNotifySecurity} />
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session</CardTitle>
                <CardDescription>Manage your current session</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-3">
                <Button variant="outline" onClick={() => navigate('/dashboard')}>Go to dashboard</Button>
                <Button
                  variant="destructive"
                  onClick={() => { signOut(); navigate('/'); }}
                >
                  Sign out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Security / stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm">Confirm new password</Label>
                    <Input id="confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="bg-gradient-primary">Update password</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
                <CardDescription>Your recent activity</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <div className="text-xs text-muted-foreground">Projects</div>
                  <div className="text-2xl font-semibold">24</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-xs text-muted-foreground">Team</div>
                  <div className="text-2xl font-semibold">12</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-xs text-muted-foreground">Uptime</div>
                  <div className="text-2xl font-semibold">98.7%</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-xs text-muted-foreground">Plan</div>
                  <div className="text-2xl font-semibold">Starter</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
