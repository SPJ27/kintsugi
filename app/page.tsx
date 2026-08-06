"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";

const page = () => {
  return (
    <div>
      <button
        onClick={async () => {
          await authClient.signIn.oauth2({
            providerId: "hackclub",
            callbackURL: "/dashboard",
          });
        }}
      >
        Login
      </button>
    </div>
  );
};

export default page;
