"use server";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Initialize Supabase with the Service Role Key to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper function to check if user is authenticated as admin
async function checkAuth() {
  const adminSession = (await cookies()).get("admin_session");
  if (!adminSession) {
    throw new Error("Unauthorized: Harap login terlebih dahulu.");
  }
}

export async function addPackage(packageData: any) {
  try {
    await checkAuth();

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return { success: false, error: "SUPABASE_SERVICE_ROLE_KEY belum diset di .env.local" };
    }

    const { data, error } = await supabaseAdmin
      .from("travel_packages")
      .insert([packageData])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/paket");
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "Terjadi kesalahan sistem" };
  }
}

export async function deletePackage(id: string) {
  try {
    await checkAuth();

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return { success: false, error: "SUPABASE_SERVICE_ROLE_KEY belum diset di .env.local" };
    }

    const { error } = await supabaseAdmin
      .from("travel_packages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase delete error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/paket");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Terjadi kesalahan sistem" };
  }
}
