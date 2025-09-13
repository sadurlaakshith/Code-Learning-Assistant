import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  title?: string;
  expectedOutput?: string;
  hints?: string[];
}

const CodeEditor = ({ 
  initialCode = `// Welcome to CodeMaster!\n// Write your code here and click Run to see the results\n\nfunction greetUser(name) {\n  return \`Hello, \${name}! Welcome to coding!\`;\n}\n\nconsole.log(greetUser("Student"));`,
  language = "javascript",
  title = "Interactive Code Editor",
  expectedOutput,
  hints = []
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "warning">("idle");
  const { toast } = useToast();

  // Simple JavaScript code analysis
  const analyzeCode = (code: string) => {
    const errors: string[] = [];
    
    // Check for common syntax errors
    if (code.includes("function") && !code.includes("{")) {
      errors.push("Missing opening brace '{' after function declaration");
    }
    
    // Count braces
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push("Mismatched braces - check your opening and closing braces");
    }
    
    // Check for semicolons
    const lines = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));
    const statementsWithoutSemicolon = lines.filter(line => 
      line.trim().endsWith(')') && !line.includes('function') && !line.includes('if') && !line.includes('for')
    );
    
    if (statementsWithoutSemicolon.length > 0) {
      errors.push("Consider adding semicolons at the end of statements");
    }

    return errors;
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    setErrors([]);
    
    // Analyze code for errors
    const analysisErrors = analyzeCode(code);
    
    if (analysisErrors.length > 0) {
      setErrors(analysisErrors);
      setStatus("error");
      setIsRunning(false);
      return;
    }

    try {
      // Simple JavaScript execution simulation
      const logs: string[] = [];
      
      // Override console.log to capture output
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        logs.push(args.map(arg => String(arg)).join(' '));
      };

      // Execute the code (in a real app, this would be in a sandboxed environment)
      eval(code);
      
      // Restore console.log
      console.log = originalLog;
      
      const result = logs.join('\n');
      setOutput(result || "Code executed successfully (no output)");
      
      // Check if output matches expected output
      if (expectedOutput && result === expectedOutput) {
        setStatus("success");
        toast({
          title: "Perfect!",
          description: "Your code produces the expected output!",
        });
      } else if (expectedOutput) {
        setStatus("warning");
      } else {
        setStatus("success");
      }
      
    } catch (error) {
      setErrors([`Runtime Error: ${error}`]);
      setStatus("error");
    }
    
    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput("");
    setErrors([]);
    setStatus("idle");
  };

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-accent" />;
      case "error":
        return <XCircle className="w-4 h-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "success":
        return <Badge className="bg-accent text-accent-foreground">Success</Badge>;
      case "error":
        return <Badge className="bg-destructive text-destructive-foreground">Error</Badge>;
      case "warning":
        return <Badge className="bg-warning text-warning-foreground">Check Output</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
      {/* Code Editor */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            {getStatusIcon()}
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge()}
            <Button
              variant="outline"
              size="sm"
              onClick={resetCode}
              className="text-muted-foreground"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button
              onClick={runCode}
              disabled={isRunning}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              <Play className="w-4 h-4 mr-1" />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border rounded-b-lg overflow-hidden">
            <Editor
              height="400px"
              defaultLanguage={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Output and Hints */}
      <div className="space-y-6">
        {/* Output */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              Output
              {status === "success" && <CheckCircle className="w-5 h-5 text-accent ml-2" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-editor text-editor-foreground rounded-lg p-4 min-h-[100px] font-mono text-sm">
              {output && (
                <div className="whitespace-pre-wrap">{output}</div>
              )}
              {errors.length > 0 && (
                <div className="space-y-2">
                  {errors.map((error, index) => (
                    <div key={index} className="text-destructive flex items-start space-x-2">
                      <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  ))}
                </div>
              )}
              {!output && errors.length === 0 && (
                <div className="text-muted-foreground">Click "Run Code" to see the output...</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Expected Output */}
        {expectedOutput && (
          <Card className="bg-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Expected Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                {expectedOutput}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Hints */}
        {hints.length > 0 && (
          <Card className="bg-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">💡 Hints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hints.map((hint, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{hint}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;