import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Code, BookOpen, Target, CheckCircle, Users } from "lucide-react";
import heroImage from "@/assets/hero-coding.jpg";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl">CodeMaster</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#tutorials" className="text-white/80 hover:text-white transition-colors">Tutorials</a>
            <a href="#exercises" className="text-white/80 hover:text-white transition-colors">Exercises</a>
            <a href="#editor" className="text-white/80 hover:text-white transition-colors">Editor</a>
            <Button variant="secondary" size="sm">Sign In</Button>
          </div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                AI-Powered Learning
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Master Programming with
                <span className="block bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
                  Interactive Learning
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-lg">
                Learn to code with real-time error detection, intelligent debugging suggestions, and personalized exercises that adapt to your skill level.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <BookOpen className="w-5 h-5 mr-2" />
                View Tutorials
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-white/60 text-sm">Interactive Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-white/60 text-sm">Coding Exercises</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">AI</div>
                <div className="text-white/60 text-sm">Error Detection</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-primary rounded-2xl blur-xl opacity-30" />
            <img 
              src={heroImage} 
              alt="Interactive coding environment with syntax highlighting and real-time feedback"
              className="relative w-full h-auto rounded-2xl shadow-elegant"
            />
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 mt-24">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Smart Error Detection</h3>
              <p className="text-white/70">Real-time code analysis with intelligent error highlighting and debugging suggestions.</p>
            </div>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Adaptive Exercises</h3>
              <p className="text-white/70">Personalized coding challenges that adjust to your learning pace and skill level.</p>
            </div>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Interactive Tutorials</h3>
              <p className="text-white/70">Step-by-step guided lessons with hands-on coding practice and instant feedback.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;