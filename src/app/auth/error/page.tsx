"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { Button, Card } from "@/components/ui";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

const errorMessages: Record<string, { title: string; message: string }> = {
  Configuration: {
    title: "Configuration Error",
    message: "There is a problem with the server configuration.",
  },
  AccessDenied: {
    title: "Access Denied",
    message: "You do not have permission to sign in.",
  },
  Verification: {
    title: "Verification Failed",
    message: "The verification link has expired or has already been used.",
  },
  CredentialsSignin: {
    title: "Login Failed",
    message: "Invalid email or password.",
  },
  OAuthAccountNotLinked: {
    title: "Account Already Exists",
    message: "An account with this email already exists. Please sign in with your email and password instead of Google.",
  },
  Default: {
    title: "Authentication Error",
    message: "An error occurred during authentication.",
  },
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";
  const errorInfo = errorMessages[error] || errorMessages.Default;
  const isAccountLinked = error === "OAuthAccountNotLinked";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center text-muted hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        <Card className="p-8">
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${isAccountLinked ? "bg-warning/20" : "bg-error/20"}`}>
              <AlertTriangle className={`w-8 h-8 ${isAccountLinked ? "text-warning" : "text-error"}`} />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {errorInfo.title}
            </h1>
            <p className="text-muted mb-6">{errorInfo.message}</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/login">
                <Button variant="pro">
                  {isAccountLinked ? "Sign in with Password" : "Try Again"}
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Go Home</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ErrorContent />
    </Suspense>
  );
}
