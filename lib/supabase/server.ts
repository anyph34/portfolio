import { createServerClient } from "@supabase/ssr";

export async function createServerSupabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase environment variables are missing. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {
        // This app is intentionally configured for a server-safe bootstrap flow.
      },
    },
  });
}

export async function getDashboardSummary() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: businesses, error } = await supabase.from("businesses").select("id").limit(1);

    if (error) {
      return {
        ok: false,
        message: error.message,
      };
    }

    return {
      ok: true,
      totalBusinesses: businesses?.length ?? 0,
      totalRevenue: 0,
      totalExpenses: 0,
      netProfit: 0,
      totalCustomers: 0,
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Supabase is not configured yet. Add your project credentials to run database-backed analytics.",
    };
  }
}
