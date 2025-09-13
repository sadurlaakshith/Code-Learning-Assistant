import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, BookOpen, Users, ArrowRight } from "lucide-react";

interface TutorialCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  enrolled: number;
  progress?: number;
  isCompleted?: boolean;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  thumbnail?: string;
  onStart: () => void;
}

const TutorialCard = ({
  title,
  description,
  duration,
  lessons,
  enrolled,
  progress = 0,
  isCompleted = false,
  difficulty,
  thumbnail,
  onStart,
}: TutorialCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-accent text-accent-foreground";
      case "Intermediate":
        return "bg-warning text-warning-foreground";
      case "Advanced":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="bg-card border-border shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Thumbnail */}
      {thumbnail ? (
        <div className="h-48 bg-gradient-primary relative overflow-hidden">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge className={`${getDifficultyColor(difficulty)} text-xs mb-2`}>
              {difficulty}
            </Badge>
            <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
          </div>
          <Button 
            size="sm"
            className="absolute top-4 right-4 bg-white/20 text-white border-white/30 hover:bg-white/30"
            onClick={onStart}
          >
            <PlayCircle className="w-4 h-4 mr-1" />
            {progress > 0 ? "Continue" : "Start"}
          </Button>
        </div>
      ) : (
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Badge className={`${getDifficultyColor(difficulty)} text-xs`}>
                {difficulty}
              </Badge>
              <CardTitle className="text-lg leading-tight">{title}</CardTitle>
            </div>
            <PlayCircle className="w-6 h-6 text-primary" />
          </div>
        </CardHeader>
      )}
      
      <CardContent className="space-y-4">
        {!thumbnail && (
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        )}
        
        {/* Progress Bar (if started) */}
        {progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center text-primary">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="text-sm font-medium">{lessons}</div>
            <div className="text-xs text-muted-foreground">Lessons</div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-center text-primary">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-sm font-medium">{enrolled.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Enrolled</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm font-medium text-primary">{duration}</div>
            <div className="text-xs text-muted-foreground">Duration</div>
          </div>
        </div>
        
        {/* Action Button */}
        {!thumbnail && (
          <Button 
            onClick={onStart}
            className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all duration-300"
          >
            {progress > 0 ? "Continue Tutorial" : "Start Tutorial"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
        
        {isCompleted && (
          <Badge className="w-full justify-center bg-accent text-accent-foreground">
            ✓ Completed
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default TutorialCard;