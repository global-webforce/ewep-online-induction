"use server";

import { createClient } from "@/utils/supabase/client-server";
import {
  CreateRecord,
  createSchema,
  RowRecord,
  UpdateRecord,
  updateSchema,
} from "./schemas";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export async function getAllAction() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inductions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }

  return (data ?? []) as RowRecord[];
}

export async function getAction(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inductions")
    .select("*")

    // Filters
    .eq("id", id)
    .single();

  if (error) {
    throw Error(error.message);
  }

  return data;
}

export async function createAction(values: CreateRecord) {
  const parsed = createSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const supabase = createClientAdmin();

  const { data, error } = await supabase
    .from("inductions")
    .insert(parsed.data)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateAction(id: string, values: UpdateRecord) {
  const parsed = updateSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const supabase = createClientAdmin();

  const { data, error } = await supabase
    .from("inductions")
    .update(parsed.data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
