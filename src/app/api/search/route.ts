import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Fuse from "fuse.js";
import type { Content } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const searchDataPath = path.join(process.cwd(), "data", "search-data.json");
  const fuseIndexPath = path.join(process.cwd(), "data", "fuse-index.json");

  const searchData: Content[] = JSON.parse(
    fs.readFileSync(searchDataPath, "utf8")
  );
  const fuseIndex = JSON.parse(fs.readFileSync(fuseIndexPath, "utf8"));

  const myIndex = Fuse.parseIndex(fuseIndex);
  const fuse = new Fuse(
    searchData,
    {
      keys: ["title", "excerpt", "tags", "content"],
      includeScore: true,
      threshold: 0.3,
    },
    myIndex
  );

  const searchResults = fuse.search(query);

  return NextResponse.json({ results: searchResults });
}
