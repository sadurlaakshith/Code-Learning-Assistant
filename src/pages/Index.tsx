import Hero from "@/components/Hero";
import CodeEditor from "@/components/CodeEditor";
import ExerciseCard from "@/components/ExerciseCard";
import TutorialCard from "@/components/TutorialCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code2, Target, BookOpen, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const sampleExercises = [
    {
      id: "1",
      title: "Hello World Function",
      description: "Create your first function that returns a greeting message. Learn about function syntax, parameters, and return statements.",
      difficulty: "Beginner" as const,
      estimatedTime: "5 min",
      completedBy: 1234,
      rating: 4.8,
      tags: ["Functions", "Strings", "Basics"],
    },
    {
      id: "2", 
      title: "Array Manipulation",
      description: "Practice working with arrays by implementing common operations like filtering, mapping, and reducing data.",
      difficulty: "Intermediate" as const,
      estimatedTime: "15 min",
      completedBy: 856,
      rating: 4.6,
      tags: ["Arrays", "Methods", "Data Processing"],
    },
    {
      id: "3",
      title: "Async Programming",
      description: "Master asynchronous JavaScript with promises, async/await, and error handling in modern applications.",
      difficulty: "Advanced" as const,
      estimatedTime: "25 min", 
      completedBy: 423,
      rating: 4.9,
      tags: ["Promises", "Async/Await", "APIs"],
    },
  ];

  const sampleTutorials = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      description: "Learn the core concepts of JavaScript programming from variables to functions.",
      duration: "2 hours",
      lessons: 12,
      enrolled: 15420,
      difficulty: "Beginner" as const,
      progress: 0,
    },
    {
      id: "2",
      title: "React Development",
      description: "Build modern web applications with React hooks, components, and state management.",
      duration: "4 hours",
      lessons: 18,
      enrolled: 8934,
      difficulty: "Intermediate" as const,
      progress: 45,
    },
    {
      id: "3",
      title: "Algorithm Design",
      description: "Master data structures and algorithms for technical interviews and problem solving.",
      duration: "6 hours",
      lessons: 24,
      enrolled: 5672,
      difficulty: "Advanced" as const,
      progress: 0,
    },
  ];

  const handleExerciseStart = (title: string) => {
    toast({
      title: "Starting Exercise",
      description: `Loading "${title}" exercise...`,
    });
  };

  const handleTutorialStart = (title: string) => {
    toast({
      title: "Starting Tutorial", 
      description: `Opening "${title}" tutorial...`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Interactive Editor Section */}
        <section id="editor" className="space-y-8">
          <div className="text-center space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Interactive Learning
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Try Our Code Editor
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience real-time error detection and intelligent debugging suggestions as you code.
            </p>
          </div>
          
          <CodeEditor 
            title="Try the Interactive Editor"
            hints={[
              "Try modifying the greeting message to see real-time updates",
              "The editor will highlight syntax errors as you type",
              "Use console.log() to output values and debug your code"
            ]}
          />
        </section>

        {/* Exercises and Tutorials */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Learn by Doing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from hundreds of exercises and tutorials designed to build your programming skills.
            </p>
          </div>

          <Tabs defaultValue="exercises" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="exercises" className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Exercises</span>
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Tutorials</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="exercises" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleExercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    {...exercise}
                    onStart={() => handleExerciseStart(exercise.title)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tutorials" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleTutorials.map((tutorial) => (
                  <TutorialCard
                    key={tutorial.id}
                    {...tutorial}
                    onStart={() => handleTutorialStart(tutorial.title)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Features Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Powerful Learning Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines AI-powered analysis with interactive learning to accelerate your progress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card border-border shadow-card text-center">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold">Real-time Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get instant feedback on your code with smart error detection and suggestions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-card text-center">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold">Adaptive Challenges</h3>
                <p className="text-sm text-muted-foreground">
                  Exercises that adapt to your skill level and learning pace.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-card text-center">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold">Multiple Languages</h3>
                <p className="text-sm text-muted-foreground">
                  Learn JavaScript, Python, Java, and more with unified tools.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-card text-center">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold">Guided Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Step-by-step tutorials with hands-on practice and instant feedback.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-8 py-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Coding?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of learners who are mastering programming with our interactive platform.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg">
              View All Courses
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
