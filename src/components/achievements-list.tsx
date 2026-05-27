"use client";

import { useState } from "react";
import { AchievementProgressCard } from "./achievement-progress-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Trophy, BookOpen, UserCheck, Sparkles, FilterX } from "lucide-react";

interface Achievement {
  id: number;
  name: string;
  description: string;
  tier: string;
  imageUrl: string;
  isInverted: boolean;
  userCount: number;
  isOwned: boolean;
  achievedDate: Date | string | null;
  progress: {
    current: number;
    target: number;
  };
  percentage: number;
}

interface Stats {
  completedStudentSessions: number;
  completedTutorSessions: number;
  totalAchievements: number;
  ownedAchievements: number;
}

interface AchievementsListProps {
  achievements: Achievement[];
  stats: Stats;
}

export function AchievementsList({ achievements, stats }: AchievementsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unlocked" | "locked">("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "student" | "tutor" | "general">("all");

  // Asignar categoría a cada logro
  const getAchievementCategory = (id: number): "student" | "tutor" | "general" => {
    if ([2, 3, 4].includes(id)) return "student";
    if ([5, 6, 7].includes(id)) return "tutor";
    return "general";
  };

  // Filtrar logros según búsqueda, estado y categoría
  const filteredAchievements = achievements.filter((ach) => {
    const category = getAchievementCategory(ach.id);
    const isSecretAndLocked = ach.tier === "secret" && !ach.isOwned;
    const nameToMatch = isSecretAndLocked ? "logro secreto" : ach.name.toLowerCase();
    const descToMatch = isSecretAndLocked ? "logro secreto" : ach.description.toLowerCase();
    
    // Buscar
    const matchesSearch =
      nameToMatch.includes(searchTerm.toLowerCase()) ||
      descToMatch.includes(searchTerm.toLowerCase());

    // Estado
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "unlocked" && ach.isOwned) ||
      (statusFilter === "locked" && !ach.isOwned);

    // Categoría
    const matchesCategory =
      categoryFilter === "all" || category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  const totalPercentage = Math.round(
    (stats.ownedAchievements / stats.totalAchievements) * 100
  );

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Sección de Estadísticas Premium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-transparent border-primary/20 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Progreso General
            </CardTitle>
            <Trophy className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold tracking-tight">
                {stats.ownedAchievements} / {stats.totalAchievements}
              </span>
              <span className="text-sm font-bold text-primary">{totalPercentage}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                style={{ width: `${totalPercentage}%` }}
              />
            </div>
            <CardDescription className="text-xs">
              Logros desbloqueados del total disponible.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-500/5 to-transparent border-indigo-500/10 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tutorías como Estudiante
            </CardTitle>
            <BookOpen className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight">
              {stats.completedStudentSessions}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Sesiones completadas en las que has asistido como alumno.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-500/5 to-transparent border-violet-500/10 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tutorías dictadas como Tutor
            </CardTitle>
            <UserCheck className="h-5 w-5 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight">
              {stats.completedTutorSessions}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Sesiones completadas que has impartido a otros compañeros.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Controles de Búsqueda y Filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-6 rounded-2xl border shadow-sm">
        {/* Buscador */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar logros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 w-full"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
          {/* Filtro por Categoría */}
          <div className="flex rounded-lg border bg-muted/50 p-1 shrink-0">
            <Button
              variant={categoryFilter === "all" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setCategoryFilter("all")}
              className="h-8 text-xs px-3"
            >
              Todos
            </Button>
            <Button
              variant={categoryFilter === "student" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setCategoryFilter("student")}
              className="h-8 text-xs px-3"
            >
              Estudiante
            </Button>
            <Button
              variant={categoryFilter === "tutor" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setCategoryFilter("tutor")}
              className="h-8 text-xs px-3"
            >
              Tutor
            </Button>
            <Button
              variant={categoryFilter === "general" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setCategoryFilter("general")}
              className="h-8 text-xs px-3"
            >
              Otros
            </Button>
          </div>

          {/* Filtro por Estado */}
          <div className="flex rounded-lg border bg-muted/50 p-1 shrink-0">
            <Button
              variant={statusFilter === "all" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("all")}
              className="h-8 text-xs px-3"
            >
              Todos
            </Button>
            <Button
              variant={statusFilter === "unlocked" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("unlocked")}
              className="h-8 text-xs px-3"
            >
              Obtenidos
            </Button>
            <Button
              variant={statusFilter === "locked" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("locked")}
              className="h-8 text-xs px-3"
            >
              Bloqueados
            </Button>
          </div>

          {/* Limpiar filtros */}
          {(searchTerm !== "" || statusFilter !== "all" || categoryFilter !== "all") && (
            <Button
              variant="outline"
              size="icon"
              onClick={clearFilters}
              title="Limpiar filtros"
              className="h-9 w-9 border-dashed shrink-0"
            >
              <FilterX className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Grid de Logros */}
      {filteredAchievements.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAchievements.map((ach) => (
            <AchievementProgressCard
              key={ach.id}
              {...ach}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 border rounded-2xl bg-card/50 text-center px-4">
          <Sparkles className="h-10 w-10 text-muted-foreground/60 mb-3 animate-pulse" />
          <h3 className="text-lg font-bold tracking-tight">No se encontraron logros</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Intenta cambiar los términos de búsqueda o los filtros seleccionados.
          </p>
          <Button onClick={clearFilters} variant="outline" className="mt-4">
            Limpiar Filtros
          </Button>
        </div>
      )}
    </div>
  );
}
