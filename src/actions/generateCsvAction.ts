import type { Deal } from "@/types/Deal";
import { generateCsv } from "@/utils/csv";

export async function generateCsvAction(deals: Deal[]): Promise<string>{
  return generateCsv(deals)
}