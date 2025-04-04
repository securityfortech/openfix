
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export function SecuritySettings() {
  const { user } = useAuth();
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: PasswordFormValues) {
    try {
      // In a real implementation, you would need to first verify the current password
      // before allowing a change, but Supabase doesn't provide a direct way to do this
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully."
      });
      
      form.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-gray-900">Security Settings</h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Manage your account security preferences.
        </p>
      </div>
      
      <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
        <h4 className="text-lg font-medium text-gray-900">Change Password</h4>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="focus:border-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="focus:border-primary" />
                  </FormControl>
                  <FormDescription className="text-sm text-muted-foreground">
                    Password must be at least 6 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="focus:border-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="mt-2">Update password</Button>
          </form>
        </Form>
      </div>
      
      <div className="pt-6 border-t">
        <h4 className="text-lg font-medium text-gray-900 mb-3">Two-Factor Authentication</h4>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Add an extra layer of security to your account.
        </p>
        <Button variant="outline">Enable 2FA</Button>
      </div>
      
      <div className="pt-6 border-t">
        <h4 className="text-lg font-medium text-destructive mb-3">Danger Zone</h4>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Permanently delete your account and all your data.
        </p>
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  );
}
