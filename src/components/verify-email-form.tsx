"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerificationCodeSchema } from "@/schemas";
import { verifyEmailCode, resendVerificationCode } from "@/actions/verification";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useToast } from "@/components/ui/use-toast";

// Cosmético únicamente: el cooldown real de 60s lo aplica el servidor
// (src/lib/verification-code.ts). Si el reloj del cliente se desincroniza, el
// mensaje de error del servidor sigue siendo la fuente de verdad.
const RESEND_COOLDOWN_SECONDS = 60;

export const VerifyEmailForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isResending, startResendTransition] = useTransition();
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);

  const form = useForm<z.infer<typeof VerificationCodeSchema>>({
    resolver: zodResolver(VerificationCodeSchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((current) => Math.max(0, current - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const submittingRef = useRef(false);

  const onSubmit = (values: z.infer<typeof VerificationCodeSchema>) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await verifyEmailCode(values);
      submittingRef.current = false;

      if (response?.error) {
        setError(response.error);
        form.resetField("code");
      }
      if (response?.success) {
        setSuccess(response.success);
        toast({ title: "Éxito", description: response.success });
        setTimeout(() => router.push("/auth/login"), 1500);
      }
    });
  };

  const onResend = () => {
    setError("");
    setSuccess("");

    startResendTransition(async () => {
      const response = await resendVerificationCode();
      if (response?.error) {
        setError(response.error);
      }
      if (response?.success) {
        setSuccess(response.success);
        setCooldown(RESEND_COOLDOWN_SECONDS);
        form.resetField("code");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Código de verificación</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  disabled={isPending}
                  onComplete={() => form.handleSubmit(onSubmit)()}
                  {...field}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button disabled={isPending} type="submit" className="w-full">
          Verificar
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={isResending || cooldown > 0}
          onClick={onResend}
        >
          {cooldown > 0 ? `Reenviar código (${cooldown}s)` : "Reenviar código"}
        </Button>
      </form>
    </Form>
  );
};
