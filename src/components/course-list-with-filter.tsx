"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, FilterX, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course-card";

interface Asignatura {
  id: number;
  name: string;
  school: string;
}

interface CourseListWithFilterProps {
  asignaturas: Asignatura[];
}

const SCHOOLS = [
  { id: "all", name: "Todas", fullName: "Todas las asignaturas", image: null },
  { id: "yt", name: "Nivelación", fullName: "Área de Nivelación", image: "/images/yt.png" },
  { id: "mate", name: "Matemáticas", fullName: "Ciencias Matemáticas y Computacionales", image: "/images/mate.png" },
  { id: "fis", name: "Física", fullName: "Ciencias Físicas y Nanotecnología", image: "/images/fis.png" },
  { id: "quim", name: "Química", fullName: "Ciencias Químicas e Ingeniería", image: "/images/quim.png" },
  { id: "bio", name: "Biología", fullName: "Ciencias Biológicas e Ingeniería", image: "/images/bio.png" },
  { id: "geo", name: "Geociencias", fullName: "Ciencias de la Tierra, Energía y Medio Ambiente", image: "/images/geo.png" },
  { id: "lan", name: "Idiomas", fullName: "Departamento de Lenguas", image: "/images/lan.png" },
  { id: "agro", name: "Agroindustria", fullName: "Ciencias Agrícolas y Agropecuarias", image: "/images/agro.png" },
  { id: "soc", name: "Sociales", fullName: "Ciencias Sociales y Humanidades", image: "/images/soc.png" },
];

const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export function CourseListWithFilter({ asignaturas }: CourseListWithFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<string>("all");

  const filteredAsignaturas = useMemo(() => {
    return asignaturas.filter((asignatura) => {
      const matchesSchool = selectedSchool === "all" || asignatura.school === selectedSchool;

      const normalizedSearch = normalizeText(searchTerm);
      const normalizedName = normalizeText(asignatura.name);
      const matchesSearch = normalizedName.includes(normalizedSearch);

      return matchesSchool && matchesSearch;
    });
  }, [asignaturas, selectedSchool, searchTerm]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSchool("all");
  };

  const hasActiveFilters = searchTerm !== "" || selectedSchool !== "all";

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Controles de Búsqueda y Filtros */}
      <div className="flex flex-col gap-4 bg-card p-6 rounded-2xl border shadow-sm w-full">
        {/* Fila superior: Buscador y botón de limpiar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar asignaturas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 w-full font-medium"
            />
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              title="Limpiar filtros"
              className="border-dashed h-9 px-3 w-full md:w-auto shrink-0 flex items-center gap-2"
            >
              <FilterX className="size-4" />
              Limpiar Filtros
            </Button>
          )}
        </div>

        {/* Fila inferior: Filtros por Escuela */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Filtrar por Escuela
          </span>
          <div className="flex flex-row flex-wrap gap-2 overflow-x-auto pb-1 md:overflow-visible scrollbar-thin">
            {SCHOOLS.map((school) => {
              const isActive = selectedSchool === school.id;
              return (
                <Button
                  key={school.id}
                  variant={isActive ? "secondary" : "outline"}
                  onClick={() => setSelectedSchool(school.id)}
                  title={school.fullName}
                  className={`flex items-center gap-2 h-9 px-3 text-xs rounded-full transition-all shrink-0 ${isActive ? "ring-2 ring-primary/20" : "hover:bg-muted"
                    }`}
                >
                  {school.id === "all" ? (
                    <BookOpen className={`size-[18px] transition-all ${isActive ? "scale-110" : "opacity-80"}`} />
                  ) : (
                    school.image && (
                      <Image
                        src={school.image}
                        alt={school.name}
                        width={18}
                        height={18}
                        className={`object-contain size-[18px] transition-all ${isActive ? "scale-110" : "opacity-80"
                          }`}
                      />
                    )
                  )}
                  <span>{school.name}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid de Asignaturas */}
      {filteredAsignaturas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full mt-2">
          {filteredAsignaturas.map((asignatura) => (
            <CourseCard
              id={asignatura.id}
              course={asignatura.name}
              school={asignatura.school}
              key={asignatura.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 border rounded-2xl bg-card/50 text-center px-4 mt-2">
          <BookOpen className="size-10 text-muted-foreground/60 mb-3 animate-pulse" />
          <h3 className="text-lg font-bold tracking-tight">No se encontraron asignaturas</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            No hay materias que coincidan con la búsqueda o el filtro seleccionado de esta escuela.
          </p>
          <Button onClick={clearFilters} variant="outline" className="mt-4">
            Limpiar Filtros
          </Button>
        </div>
      )}
    </div>
  );
}
