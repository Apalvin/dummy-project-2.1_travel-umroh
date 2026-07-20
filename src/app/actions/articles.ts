"use server";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkAuth() {
  const adminSession = (await cookies()).get("admin_session");
  if (!adminSession) {
    throw new Error("Unauthorized: Harap login terlebih dahulu.");
  }
}

export async function addArticle(articleData: any) {
  try {
    await checkAuth();

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return { success: false, error: "SUPABASE_SERVICE_ROLE_KEY belum diset di .env.local" };
    }

    const { data, error } = await supabaseAdmin
      .from("articles")
      .insert([{
        title: articleData.title,
        description: articleData.description,
        image_url: articleData.image_url,
        content: articleData.content,
      }])
      .select();

    if (error) {
      console.error("Supabase insert error (articles):", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/artikel");
    revalidatePath("/");
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "Terjadi kesalahan sistem" };
  }
}

export async function deleteArticle(id: string) {
  try {
    await checkAuth();

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return { success: false, error: "SUPABASE_SERVICE_ROLE_KEY belum diset di .env.local" };
    }

    const { error } = await supabaseAdmin
      .from("articles")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase delete error (articles):", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Terjadi kesalahan sistem" };
  }
}
