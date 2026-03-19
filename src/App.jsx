import React, { useState, useEffect } from 'react';
import { labData } from './labData';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronRight, 
  Server, 
  Network, 
  HardDrive, 
  LayoutDashboard, 
  Menu,
  X,
  Trophy,
  ArrowRight,
  Terminal,
  Monitor,
  Copy,
  Laptop,
  Download,
  Upload,
  RotateCcw,
  GraduationCap,
  Zap,
  FileCheck,
  ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Toaster, toast } from 'sonner';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function App() {
  const [activeStage, setActiveStage] = useState(labData.stages[0].id);
  const [domainName, setDomainName] = useState('');
  const [completedSteps, setCompletedSteps] = useState({});
  const [expandedStep, setExpandedStep] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [instructionMode, setInstructionMode] = useState({}); // { stepId: 'gui' | 'powershell' }
  const [activeMachineTab, setActiveMachineTab] = useState({}); // { stepId: 'SRV01' }
  const [showQuiz, setShowQuiz] = useState(null); // stageId or null
  const [showEquipments, setShowEquipments] = useState(false);

  // Load state
  useEffect(() => {
    const saved = localStorage.getItem('labProgress');
    if (saved) {
      const { completedSteps, domainName } = JSON.parse(saved);
      setCompletedSteps(completedSteps || {});
      setDomainName(domainName || '');
    }
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem('labProgress', JSON.stringify({ completedSteps, domainName }));
  }, [completedSteps, domainName]);

  const toggleStep = (stepId, e) => {
    e?.stopPropagation();
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const calculateProgress = (stageId) => {
    const stage = labData.stages.find(s => s.id === stageId);
    if (!stage) return 0;
    const total = stage.steps.length;
    const completed = stage.steps.filter(step => completedSteps[step.id]).length;
    return Math.round((completed / total) * 100);
  };

  const getTotalProgress = () => {
    const totalSteps = labData.stages.reduce((acc, stage) => acc + stage.steps.length, 0);
    const completedCount = Object.keys(completedSteps).length;
    return Math.round((completedCount / totalSteps) * 100);
  };

  const replaceVariables = (text) => {
    return text.replace(/{domainName}/g, domainName || 'SEU_DOMINIO.LOCAL');
  };

  const setMode = (stepId, mode, e) => {
    e?.stopPropagation();
    setInstructionMode(prev => ({ ...prev, [stepId]: mode }));
  };

  const setMachineTab = (stepId, machine, e) => {
    e?.stopPropagation();
    setActiveMachineTab(prev => ({ ...prev, [stepId]: machine }));
  };

  const copyToClipboard = (text, e) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success('Comando copiado!');
  };

  const handleExport = () => {
    const data = JSON.stringify({ completedSteps, domainName });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `server-lab-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('Progresso exportado com sucesso!');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const { completedSteps, domainName } = JSON.parse(event.target.result);
        setCompletedSteps(completedSteps);
        setDomainName(domainName);
        toast.success('Progresso carregado com sucesso!');
      } catch (err) {
        toast.error('Erro ao carregar arquivo de progresso.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar todo o progresso? Isso não pode ser desfeito.')) {
      setCompletedSteps({});
      setDomainName('');
      localStorage.removeItem('labProgress');
      toast.info('Progresso resetado.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
      <Toaster richColors position="top-right" theme="dark" />
      
      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <QuizModal 
            stageId={showQuiz} 
            quizData={labData.stages.find(s => s.id === showQuiz)?.quiz} 
            onClose={() => setShowQuiz(null)} 
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode='wait'>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-80 bg-slate-800/50 backdrop-blur-xl border-r border-slate-700/50 flex flex-col h-screen fixed md:relative z-20 shadow-2xl"
          >
            <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Server Lab
                </h1>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)} 
                className="md:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {/* Progress Card */}
              <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex justify-between items-end mb-2 relative z-10">
                  <span className="text-sm text-slate-400 font-medium">Progresso Total</span>
                  <span className="text-2xl font-bold text-white">{getTotalProgress()}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden relative z-10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${getTotalProgress()}%` }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Etapas</p>
                {labData.stages.map(stage => {
                  const isActive = activeStage === stage.id;
                  const progress = calculateProgress(stage.id);
                  const isCompleted = progress === 100;

                  return (
                    <button
                      key={stage.id}
                      onClick={() => setActiveStage(stage.id)}
                      className={cn(
                        "w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group relative overflow-hidden",
                        isActive 
                          ? "bg-indigo-600 shadow-lg shadow-indigo-500/20 text-white" 
                          : "hover:bg-slate-700/50 text-slate-400 hover:text-slate-200"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-lg transition-colors",
                        isActive ? "bg-white/20" : "bg-slate-800 group-hover:bg-slate-700"
                      )}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <LayoutDashboard className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-medium truncate">{stage.title}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="h-1 flex-1 bg-slate-900/50 rounded-full overflow-hidden">
                            <motion.div 
                              className={cn("h-full rounded-full", isActive ? "bg-white/70" : "bg-slate-500")}
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] opacity-70">{progress}%</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Deliverables Section */}
              {labData.deliverables && (
                <div className="space-y-2 mt-4">
                  <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <FileCheck className="w-4 h-4" /> Entregáveis
                  </p>
                  <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 space-y-3">
                    {labData.deliverables.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-start group">
                        <span className="text-lg bg-slate-800 p-1.5 rounded-lg border border-slate-700 group-hover:border-indigo-500/50 transition-colors shadow-sm">{item.icon}</span>
                        <div>
                          <h4 className="text-sm font-medium text-slate-200 group-hover:text-indigo-300 transition-colors">{item.title}</h4>
                          <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Equipments Section */}
              {labData.equipments && (
                <div className="space-y-2 mt-4">
                  <button
                    onClick={() => {
                      setShowEquipments(true);
                      if (window.innerWidth < 768) setIsSidebarOpen(false);
                    }}
                    className="w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group relative overflow-hidden bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/20 group-hover:bg-amber-500/30 transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm font-medium truncate">Compras / Melhorias</span>
                      <span className="text-[10px] opacity-70">Equipamentos sugeridos</span>
                    </div>
                  </button>
                </div>
              )}

              {/* Tools Section */}
              <div className="space-y-2">
                <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Ferramentas</p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleExport} className="flex flex-col items-center justify-center p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700/50">
                    <Download className="w-5 h-5 mb-1 text-indigo-400" />
                    <span className="text-[10px] text-slate-400">Exportar</span>
                  </button>
                  <label className="flex flex-col items-center justify-center p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700/50 cursor-pointer">
                    <Upload className="w-5 h-5 mb-1 text-emerald-400" />
                    <span className="text-[10px] text-slate-400">Importar</span>
                    <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                  </label>
                </div>
                <button onClick={handleReset} className="w-full flex items-center justify-center gap-2 p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors border border-red-500/20 mt-2">
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-xs font-medium">Resetar Progresso</span>
                </button>
              </div>

              {/* Network Summary */}
              <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-4 text-indigo-400">
                  <Network className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Rede do Lab</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-700/50 pb-2">
                    <span className="text-slate-400">Subnet</span>
                    <span className="text-slate-200 font-mono">{labData.network.subnet}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/50 pb-2">
                    <span className="text-slate-400">Gateway</span>
                    <span className="text-slate-200 font-mono">{labData.network.gateway}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/50 pb-2">
                    <span className="text-slate-400">DNS</span>
                    <span className="text-slate-200 font-mono">{labData.network.dns}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">DHCP</span>
                    <span className="text-slate-200 font-mono text-xs">{labData.network.dhcpRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-96 bg-indigo-600/10 blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-96 bg-purple-600/10 blur-[100px] -z-10 pointer-events-none" />

        {/* Mobile Header */}
        <header className="md:hidden p-4 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-indigo-500" />
            <span className="font-bold">Server Lab</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-slate-800 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
            
            {showEquipments ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-amber-400 mb-2 flex items-center gap-3">
                      <ShoppingCart className="w-8 h-8" />
                      Sugestões de Compras e Melhorias
                    </h2>
                    <p className="text-slate-400">Equipamentos e licenças recomendados para adequar a infraestrutura da Mimosa.</p>
                  </div>
                  <button 
                    onClick={() => setShowEquipments(false)}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors font-medium border border-slate-700"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Voltar ao Lab
                  </button>
                </div>

                <div className="grid gap-6">
                  {labData.equipments.map((category, idx) => (
                    <div key={idx} className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
                      <div className="p-4 bg-slate-800/80 border-b border-slate-700/50 flex items-center gap-2">
                        <h3 className="font-semibold text-white">{category.category}</h3>
                      </div>
                      <div className="p-5 space-y-4">
                        {category.items.map((item, i) => (
                          <div key={i} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-600 transition-colors">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="text-lg font-medium text-slate-200">{item.name}</h4>
                                <span className={cn(
                                  "px-2 py-0.5 text-[10px] font-bold uppercase rounded-full border",
                                  item.priority === 'Crítica' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                  item.priority === 'Alta' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                  "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                )}>
                                  Prioridade: {item.priority}
                                </span>
                              </div>
                              <p className="text-sm text-slate-400">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              labData.stages.map(stage => (
                activeStage === stage.id && (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                  {/* Stage Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{stage.title}</h2>
                      <p className="text-slate-400">Complete os passos abaixo para avançar.</p>
                    </div>
                    <div className="flex gap-3">
                      {stage.quiz && (
                        <button
                          onClick={() => setShowQuiz(stage.id)}
                          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/20"
                        >
                          <GraduationCap className="w-4 h-4" />
                          <span>Quiz</span>
                        </button>
                      )}
                      {calculateProgress(stage.id) === 100 && (
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/20"
                        >
                          <Trophy className="w-4 h-4" />
                          <span className="font-medium text-sm">Etapa Concluída!</span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Steps List */}
                  <div className="space-y-4">
                    {stage.steps.map((step, index) => {
                      const isCompleted = !!completedSteps[step.id];
                      const isExpanded = expandedStep === step.id;
                      const currentMode = instructionMode[step.id] || 'gui';
                      const machineKeys = Object.keys(step.instructions || {});
                      const currentMachine = activeMachineTab[step.id] || machineKeys[0];

                      return (
                        <motion.div
                          layout
                          key={step.id}
                          className={cn(
                            "border rounded-2xl transition-all duration-300 overflow-hidden",
                            isCompleted 
                              ? "bg-slate-800/40 border-slate-700/50" 
                              : "bg-slate-800/80 border-slate-700 hover:border-indigo-500/50 shadow-lg shadow-black/20",
                            isExpanded && "ring-2 ring-indigo-500/50 border-indigo-500 bg-slate-800"
                          )}
                        >
                          <div 
                            onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                            className="p-5 flex items-start gap-4 cursor-pointer relative group"
                          >
                            <button
                              onClick={(e) => toggleStep(step.id, e)}
                              className={cn(
                                "mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 relative",
                                isCompleted 
                                  ? "bg-green-500 border-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.4)]" 
                                  : "border-slate-500 text-transparent hover:border-indigo-400"
                              )}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>

                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h3 className={cn(
                                  "text-lg font-medium transition-colors",
                                  isCompleted ? "text-slate-500 line-through" : "text-slate-100 group-hover:text-indigo-300"
                                )}>
                                  {replaceVariables(step.text)}
                                </h3>
                                <ChevronDown className={cn(
                                  "w-5 h-5 text-slate-500 transition-transform duration-300",
                                  isExpanded ? "rotate-180 text-indigo-400" : ""
                                )} />
                              </div>
                              
                              {!isExpanded && (
                                <p className={cn("mt-1 text-sm", isCompleted ? "text-slate-600" : "text-slate-400")}>
                                  {replaceVariables(step.details)}
                                </p>
                              )}
                            </div>
                          </div>

                          <AnimatePresence>
                            {(isExpanded || (step.type === 'input' && !isCompleted)) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-slate-700/50 bg-slate-900/30"
                              >
                                <div className="p-5 pt-2">
                                  {step.type === 'input' && step.variable === 'domainName' && (
                                    <div className="mb-6 bg-indigo-900/20 p-4 rounded-xl border border-indigo-500/30">
                                      <label className="block text-sm font-medium text-indigo-300 mb-2">
                                        Configuração Obrigatória: Nome do Domínio
                                      </label>
                                      <div className="flex gap-2">
                                        <input
                                          type="text"
                                          value={domainName}
                                          onChange={(e) => setDomainName(e.target.value)}
                                          placeholder="ex: daniel.santos"
                                          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                        />
                                      </div>
                                      <p className="text-xs text-indigo-400/70 mt-2">
                                        * Este nome será aplicado automaticamente em todos os passos seguintes.
                                      </p>
                                    </div>
                                  )}

                                  {step.instructions && (
                                    <div className="space-y-6">
                                      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-700/50 pb-2 gap-4">
                                        {/* Machine Tabs */}
                                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                                          {machineKeys.map(machine => (
                                            <button
                                              key={machine}
                                              onClick={(e) => setMachineTab(step.id, machine, e)}
                                              className={cn(
                                                "px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-2 transition-all whitespace-nowrap",
                                                currentMachine === machine
                                                  ? "bg-slate-700 text-white border border-slate-600"
                                                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                              )}
                                            >
                                              {machine.includes('CLIENTE') ? <Laptop className="w-3 h-3" /> : <Server className="w-3 h-3" />}
                                              {machine}
                                            </button>
                                          ))}
                                        </div>
                                        
                                        {/* Toggle GUI / PowerShell / Automation */}
                                        <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700 shrink-0">
                                          <button
                                            onClick={(e) => setMode(step.id, 'gui', e)}
                                            className={cn(
                                              "px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 transition-all",
                                              currentMode === 'gui' 
                                                ? "bg-indigo-600 text-white shadow-sm" 
                                                : "text-slate-400 hover:text-slate-200"
                                            )}
                                          >
                                            <Monitor className="w-3 h-3" />
                                            Visual
                                          </button>
                                          <button
                                            onClick={(e) => setMode(step.id, 'powershell', e)}
                                            className={cn(
                                              "px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 transition-all",
                                              currentMode === 'powershell' 
                                                ? "bg-blue-600 text-white shadow-sm" 
                                                : "text-slate-400 hover:text-slate-200"
                                            )}
                                          >
                                            <Terminal className="w-3 h-3" />
                                            PowerShell
                                          </button>
                                          {step.instructions[currentMachine]?.some(i => i.automation) && (
                                            <button
                                              onClick={(e) => setMode(step.id, 'automation', e)}
                                              className={cn(
                                                "px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 transition-all",
                                                currentMode === 'automation' 
                                                  ? "bg-amber-600 text-white shadow-sm" 
                                                  : "text-slate-400 hover:text-slate-200"
                                              )}
                                            >
                                              <Zap className="w-3 h-3" />
                                              Auto
                                            </button>
                                          )}
                                        </div>
                                      </div>

                                      <div className="space-y-6 pl-1 min-h-[100px]">
                                        {step.instructions[currentMachine]?.map((instr, i) => (
                                          <div key={i} className="relative group/item animate-fade-in">
                                            {/* Instruction Header */}
                                            <div className="flex gap-4 text-slate-200 text-sm font-medium leading-relaxed mb-2">
                                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono text-slate-500 group-hover/item:border-indigo-500/50 group-hover/item:text-indigo-400 transition-colors">
                                                {i + 1}
                                              </span>
                                              <p className="pt-0.5">{replaceVariables(instr.text)}</p>
                                            </div>

                                            {/* Detailed Content */}
                                            <div className="ml-10 space-y-3">
                                              {currentMode === 'gui' && (
                                                <div className="text-slate-400 text-sm space-y-1 bg-slate-800/30 p-3 rounded-lg border border-slate-700/30">
                                                  {instr.details.map((detail, idx) => (
                                                    <div key={idx} className="flex items-start gap-2">
                                                      <span className="w-1 h-1 bg-slate-600 rounded-full mt-2 flex-shrink-0" />
                                                      <span>{replaceVariables(detail)}</span>
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                              
                                              {currentMode === 'powershell' && (
                                                instr.command ? (
                                                  <div className="relative group/code">
                                                    <div className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-opacity z-10">
                                                      <button 
                                                        onClick={(e) => copyToClipboard(replaceVariables(instr.command), e)}
                                                        className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-slate-300 transition-colors border border-slate-600 shadow-lg"
                                                        title="Copiar Comando"
                                                      >
                                                        <Copy className="w-3 h-3" />
                                                      </button>
                                                    </div>
                                                    <div className="rounded-lg overflow-hidden border border-slate-800 shadow-inner">
                                                      <SyntaxHighlighter 
                                                        language="powershell" 
                                                        style={vscDarkPlus}
                                                        customStyle={{ margin: 0, padding: '1rem', background: '#020617', fontSize: '0.75rem' }}
                                                      >
                                                        {replaceVariables(instr.command)}
                                                      </SyntaxHighlighter>
                                                    </div>
                                                  </div>
                                                ) : (
                                                  <div className="text-slate-500 text-xs italic p-3 border border-dashed border-slate-700 rounded-lg">
                                                    Nenhum comando PowerShell específico necessário para este passo (ação física ou de virtualizador).
                                                  </div>
                                                )
                                              )}

                                              {currentMode === 'automation' && instr.automation && (
                                                <div className="relative group/code">
                                                  <div className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-opacity z-10">
                                                    <button 
                                                      onClick={(e) => copyToClipboard(replaceVariables(instr.automation), e)}
                                                      className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-slate-300 transition-colors border border-slate-600 shadow-lg"
                                                      title="Copiar Script Completo"
                                                    >
                                                      <Copy className="w-3 h-3" />
                                                    </button>
                                                  </div>
                                                  <div className="rounded-lg overflow-hidden border border-amber-900/30 shadow-inner">
                                                    <div className="bg-amber-950/30 text-amber-200 text-[10px] px-3 py-1 border-b border-amber-900/30 font-mono">
                                                      SCRIPT AUTOMÁTICO (Copie e cole no PowerShell Admin)
                                                    </div>
                                                    <SyntaxHighlighter 
                                                      language="powershell" 
                                                      style={vscDarkPlus}
                                                      customStyle={{ margin: 0, padding: '1rem', background: '#0f0a05', fontSize: '0.75rem' }}
                                                    >
                                                      {replaceVariables(instr.automation)}
                                                    </SyntaxHighlighter>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* VM Table - Only for Stage 1 */}
                  {activeStage === 'stage-1' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-12 bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden"
                    >
                      <div className="p-4 bg-slate-800/80 border-b border-slate-700/50 flex items-center gap-2">
                        <HardDrive className="w-5 h-5 text-indigo-400" />
                        <h3 className="font-semibold text-white">Especificações das VMs</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-slate-900/50 text-slate-400 font-medium">
                            <tr>
                              <th className="px-6 py-4">VM Name</th>
                              <th className="px-6 py-4">Hostname</th>
                              <th className="px-6 py-4">OS Version</th>
                              <th className="px-6 py-4">IP Address</th>
                              <th className="px-6 py-4">Storage</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-700/50">
                            {labData.vms.map((vm, i) => (
                              <tr key={vm.name} className="hover:bg-slate-700/20 transition-colors">
                                <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                                  {vm.name}
                                </td>
                                <td className="px-6 py-4 text-slate-300 font-mono">{vm.hostname}</td>
                                <td className="px-6 py-4 text-slate-300">{vm.os}</td>
                                <td className="px-6 py-4 text-indigo-300 font-mono bg-indigo-500/5 rounded px-2 w-fit">{vm.ip}</td>
                                <td className="px-6 py-4 text-slate-400">{vm.disks}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            )))}
          </div>
        </main>
      </div>
    </div>
  );
}

function QuizModal({ stageId, quizData, onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  if (!quizData || quizData.length === 0) return null;

  const handleAnswer = (optionIndex) => {
    setSelectedOption(optionIndex);
    
    // Delay to show correct/incorrect color
    setTimeout(() => {
      if (optionIndex === quizData[currentQuestion].correct) {
        setScore(score + 1);
        toast.success('Correto!');
      } else {
        toast.error('Incorreto!');
      }

      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-500" />
            Quiz: Etapa {stageId.replace('stage-', '')}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showResult ? (
          <div>
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Questão {currentQuestion + 1} de {quizData.length}</span>
                <span>{Math.round(((currentQuestion) / quizData.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${((currentQuestion) / quizData.length) * 100}%` }}
                />
              </div>
            </div>

            <h4 className="text-lg text-slate-100 font-medium mb-6">
              {quizData[currentQuestion].question}
            </h4>

            <div className="space-y-3">
              {quizData[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selectedOption !== null}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all duration-200",
                    selectedOption === idx 
                      ? idx === quizData[currentQuestion].correct 
                        ? "bg-green-500/20 border-green-500 text-green-300"
                        : "bg-red-500/20 border-red-500 text-red-300"
                      : "bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-indigo-500/50 text-slate-300"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-indigo-400" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Quiz Completado!</h4>
            <p className="text-slate-400 mb-6">
              Você acertou <strong className="text-indigo-400">{score}</strong> de <strong className="text-slate-300">{quizData.length}</strong> questões.
            </p>
            <button 
              onClick={onClose}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full"
            >
              Fechar
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
