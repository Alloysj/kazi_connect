import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import apiClient from "@/lib/api-client";
import { useNavigate } from "react-router";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: any) {
    console.log(values);
    setLoading(true);
    const toastL = toast.loading("Signin in... ");
    await apiClient.post('/users/login',values)
    .then(()=>{
      toast.dismiss(toastL);
      navigate('/');
    })
    .catch((res)=>{
      toast.dismiss(toastL);
      toast.error(res.message);
    })
    setLoading(false);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 flex flex-col gap-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground">Login to your account</p>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={loading} type="submit" className="w-full">Login</Button>
              <div className="justify-content-middle">
                <p>Don't have an account <a href='/register'>Register</a></p>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://img.freepik.com/premium-vector/secure-login-form-page-with-password-computer-padlock-3d-vector-icon-cartoon-minimal-style_365941-1119.jpg"
              alt="Login Illustration"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}