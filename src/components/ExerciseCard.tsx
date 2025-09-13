import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, User, ArrowRight } from "lucide-react";

interface ExerciseCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  completedBy: number;
  rating: number;
  tags: string[];
  onStart: () => void;
}

const ExerciseCard = ({
  title,
  description,
  difficulty,
  estimatedTime,
  completedBy,
  rating,
  tags,
  onStart,
}: ExerciseCardProps) => {
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
    <Card className="bg-card border-border shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Badge className={`${getDifficultyColor(difficulty)} text-xs`}>
              {difficulty}
            </Badge>
            <CardTitle className="text-lg leading-tight">{title}</CardTitle>
          </div>
          <div className="flex items-center space-x-1 text-warning">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{completedBy.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        <Button 
          onClick={onStart}
          className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all duration-300"
        >
          Start Exercise
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;