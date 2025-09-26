"use client";

import { getGamesByIds, searchGames } from "@/app/api/api";
import { useQuery } from "@tanstack/react-query";

// تعريف أنواع البيانات
interface Filter {
  filterName: string;
  option: string;
}

interface UseGetGamesParams {
  query?: string;
  page?: number;
  pageSize?: number;
  filters?: Filter[];
  isDisabled?: boolean;
}

export const useGetUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/getUser", {
        method: "GET",
        credentials: "include", // مهم عشان يبعث الكوكي
      });
      if (!res.ok) {
        return null; // أو throw new Error("Unauthorized");
      }
      return res.json();
    },
  });
  return { user, isLoading };
};

export const useGetGamesWithIds = (ids: string[]) => {
  const { data: games, isLoading } = useQuery({
    queryKey: [`games-${ids.join("-")}`],
    queryFn: () => getGamesByIds(ids),
  });
  return { games, isLoading };
};

export const useGetGames = ({
  query = "",
  page = 1,
  pageSize = 21,
  filters = [],
  isDisabled = false,
}: UseGetGamesParams) => {
  const { data: games, isLoading } = useQuery({
    queryKey: [`games-${page}-${JSON.stringify(filters)}-${query}`],
    queryFn: async () => await searchGames(query, page, filters, pageSize),
    enabled: !isDisabled,
  });
  return { games, isLoading };
};