/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import config from "@/config";
import { cn } from "@/lib/utils";
import { authApi, useLoginMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import {z} from "zod";

const loginSchema = z
  .object({
    email: z.email({error: "Email cannot be empty!"}),
    password: z.string({error: "Password cannot be empty!"}),
})


export function LoginForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //const form = useForm();
  const [login] = useLoginMutation();
 const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema)
    });
  
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const toastId = toast.loading("Wait for a while...")
    try {
      const res = await login(data).unwrap();
      //console.log(res);
      if (res.success) {
        toast.success("Logged in successfully", {id: toastId});
        dispatch(authApi.util.invalidateTags(["USER"]));
        
      const userRole = res?.data?.user?.role;

      // 🚀 Redirect based on role
      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "sender") {
        navigate("/sender");
      } else if (userRole === "receiver") {
        navigate("/receiver");
      } else {
        navigate("/");
      };
      }
    } 
    catch (error) {
      const err = error as { data?: { message?: string } };

      if ((err as any).data.message === "Password Does not Match!") {
          form.setError("password", {
            type: "manual",
            message: err?.data?.message || "Something went wrong",
          });
          toast.error(err?.data?.message || "Something went wrong", { id: toastId });
        }
        else if ((err as any).data.message === "User Does not Exists!") {
          form.setError("email", {
            type: "manual",
            message: err?.data?.message || "Something went wrong",
          });
          toast.error(err?.data?.message || "Something went wrong", { id: toastId });
        }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      value={field.value || ""}
                    />
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
                    <Input
                      type="password"
                      placeholder="Abc@123"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full dark:text-foreground">
              Login
            </Button>
          </form>
        </Form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button
          onClick={() => window.open(`${config.baseUrl}/auth/google`)}
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
        >
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}