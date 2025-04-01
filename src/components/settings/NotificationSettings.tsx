
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(false);
  const [securityAlerts, setSecurityAlerts] = React.useState(true);
  const [weeklyDigest, setWeeklyDigest] = React.useState(true);
  
  const handleSave = () => {
    // In a real app, you would save these settings to the backend
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved."
    });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-gray-900">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Configure how you receive notifications from OpenFix.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="space-y-1">
            <Label htmlFor="email-notifications" className="font-medium text-gray-900">Email Notifications</Label>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Receive vulnerability and security alerts via email.
            </p>
          </div>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="space-y-1">
            <Label htmlFor="push-notifications" className="font-medium text-gray-900">Push Notifications</Label>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Receive notifications directly in your browser.
            </p>
          </div>
          <Switch
            id="push-notifications"
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="space-y-1">
            <Label htmlFor="security-alerts" className="font-medium text-gray-900">Security Alerts</Label>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get notified immediately about critical security issues.
            </p>
          </div>
          <Switch
            id="security-alerts"
            checked={securityAlerts}
            onCheckedChange={setSecurityAlerts}
          />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="space-y-1">
            <Label htmlFor="weekly-digest" className="font-medium text-gray-900">Weekly Digest</Label>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Receive a weekly summary of security updates.
            </p>
          </div>
          <Switch
            id="weekly-digest"
            checked={weeklyDigest}
            onCheckedChange={setWeeklyDigest}
          />
        </div>
      </div>
      
      <Button onClick={handleSave} className="mt-4">Save notification settings</Button>
    </div>
  );
}
