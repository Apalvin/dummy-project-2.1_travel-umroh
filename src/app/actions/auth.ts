"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (password === adminPassword) {
    // Set a secure httpOnly cookie
    (await cookies()).set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2, // 2 jam otomatis logout
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Password salah!" };
}

export async function logout() {
  (await cookies()).delete("admin_session");
  redirect("/admin/login");
}
