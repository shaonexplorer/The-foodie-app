import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://huwvhuxzohbseefgovbu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1d3ZodXh6b2hic2VlZmdvdmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkwMjEyOTksImV4cCI6MjAzNDU5NzI5OX0.Or28GJdTPPvpDMdNbdyRADjXOatyaS6mEEoQ5pqQetU";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getMeals() {
  let { data, error } = await supabase.from("meals").select("*");

  if (error) {
    console.log(error);
    throw new Error("data could not be loaded");
  }
  return data;
}

export async function postOrders(newOrder) {
  const { data, error } = await supabase
    .from("orders")
    .insert([newOrder])
    .select();

  if (error) {
    console.log(error);
    throw new Error("data could not be posted");
  }
  return data;
}
