import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, Lock, Trophy, Users } from "lucide-react";

interface AchievementProgressCardProps {
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

export function AchievementProgressCard({
  name,
  description,
  tier,
  imageUrl,
  isInverted,
  userCount,
  isOwned,
  achievedDate,
  progress,
  percentage,
}: AchievementProgressCardProps) {
  const isSecretAndLocked = tier === "secret" && !isOwned;
  
  const displayName = isSecretAndLocked ? "Logro Secreto" : name;
  const displayDescription = isSecretAndLocked
    ? "Logro secreto. ¡Desbloquéalo para descubrir cómo obtenerlo!"
    : description;

  // Formatear fecha
  const formatDate = (dateInput: Date | string | null) => {
    if (!dateInput) return "";
    const date = new Date(dateInput);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Definir colores y estilos basados en el tier
  const tierConfig = {
    bronze: {
      label: "Bronce",
      bgClass: "from-amber-900/20 to-amber-950/30 border-amber-900/50 text-amber-500",
      badgeClass: "bg-amber-800 text-amber-100 hover:bg-amber-800/80",
      progressClass: "bg-amber-600",
    },
    silver: {
      label: "Plata",
      bgClass: "from-slate-700/20 to-slate-800/30 border-slate-700/50 text-slate-400",
      badgeClass: "bg-slate-700 text-slate-100 hover:bg-slate-700/80",
      progressClass: "bg-slate-400",
    },
    gold: {
      label: "Oro",
      bgClass: "from-yellow-600/20 to-yellow-700/30 border-yellow-600/50 text-yellow-500",
      badgeClass: "bg-yellow-600 text-yellow-500-foreground hover:bg-yellow-600/80",
      progressClass: "bg-yellow-500",
    },
    unique: {
      label: "Único",
      bgClass: "from-indigo-900/25 to-violet-950/30 border-indigo-500/30 text-indigo-400",
      badgeClass: "bg-indigo-600 text-indigo-100 hover:bg-indigo-600/80",
      progressClass: "bg-indigo-500",
    },
    secret: {
      label: "Secreto",
      bgClass: "from-purple-950/20 to-fuchsia-950/30 border-purple-500/30 text-purple-400 bg-grid",
      badgeClass: "bg-purple-700 text-purple-100 hover:bg-purple-700/80",
      progressClass: "bg-purple-500",
    },
  }[tier as "bronze" | "silver" | "gold" | "unique" | "secret"] || {
    label: tier,
    bgClass: "from-secondary/25 to-secondary/40 border-border text-foreground",
    badgeClass: "bg-secondary text-secondary-foreground",
    progressClass: "bg-primary",
  };

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-br p-6 transition-all duration-300 backdrop-blur-md",
        isOwned 
          ? "shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-foreground/20" 
          : "border-muted opacity-75 grayscale hover:grayscale-0 transition-all hover:opacity-100",
        tierConfig.bgClass
      )}
    >
      {/* Glow effect for unlocked achievements */}
      {isOwned && (
        <div className="absolute -right-12 -top-12 -z-10 h-24 w-24 rounded-full bg-foreground/5 blur-2xl transition-all duration-300" />
      )}

      {/* Header Info */}
      <div>
        <div className="flex items-start justify-between gap-4">
          {/* Badge icon */}
          <div
            className={cn(
              "relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border p-2 transition-transform duration-300 hover:scale-105",
              isOwned ? "bg-background/80 shadow-md" : "bg-muted/40"
            )}
          >
            {isSecretAndLocked ? (
              <Lock className="h-8 w-8 text-muted-foreground animate-pulse" />
            ) : (
              <Image
                src={`/achievements/${imageUrl}`}
                alt={`${displayName} icon`}
                width={48}
                height={48}
                className={cn(
                  "object-contain",
                  isInverted ? "dark:invert" : "invert"
                )}
              />
            )}
            
            {/* Lock overlay for normal achievements when locked */}
            {!isOwned && !isSecretAndLocked && (
              <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-1 shadow-sm border">
                <Lock className="h-3 w-3 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Tier and Users count */}
          <div className="flex flex-col items-end gap-1.5">
            <Badge className={cn("text-[10px] font-bold tracking-wider uppercase px-2 py-0.5", tierConfig.badgeClass)}>
              {tierConfig.label}
            </Badge>
            
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>
                {userCount} {userCount === 1 ? "usuario" : "usuarios"}
              </span>
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-4">
          <h3 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
            {displayName}
            {isOwned && <Trophy className="h-4 w-4 text-yellow-500 shrink-0" />}
          </h3>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {displayDescription}
          </p>
        </div>
      </div>

      {/* Footer Progress & Unlock Date */}
      <div className="mt-6 pt-4 border-t border-foreground/5">
        {isOwned ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 text-foreground/60" />
            <span>Desbloqueado el {formatDate(achievedDate)}</span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">Progreso</span>
              <span className="font-bold text-foreground">
                {progress.current} / {progress.target} ({percentage}%)
              </span>
            </div>
            
            {/* Custom Premium Progress Bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
              <div
                className={cn("h-full rounded-full transition-all duration-500 ease-out", tierConfig.progressClass)}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
