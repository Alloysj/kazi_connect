import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast, Toaster } from "sonner";
import apiClient from "@/lib/api-client";
import { Navigate, useNavigate } from "react-router";
import { useState } from "react";

const registrationSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  occupation: z.string().min(2, "Occupation is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function RegistrationForm() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      occupation: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    setLoading(true)
    const toastL = toast.loading("signing you up... ");
    await apiClient.post('/users/register', data)
    .then((res)=>{
        navigate('/login');
    }).catch((res)=>{
      console.log(res);
      toast.dismiss(toastL);
      toast.error(res.message)
    })
    setLoading(false)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <p className="text-sm text-gray-500">Join us by filling the form below</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField name="username" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl><Input {...field} className="rounded-md" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="email" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" {...field} className="rounded-md" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="phone" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl><Input type="tel" {...field} className="rounded-md" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="occupation" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation (optional)</FormLabel>
                  <FormControl><Input {...field} className="rounded-md" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="password" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl><Input type="password" {...field} className="rounded-md" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button disabled={loading} type="submit" className="w-full bg-primary text-white rounded-md">
                Register
              </Button>

              <p className="text-sm text-center text-gray-500">
                Already have an account? <a href="/login" className="text-primary hover:underline">Login</a>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
