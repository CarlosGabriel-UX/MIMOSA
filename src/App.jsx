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
  ShoppingCart,
  Network as NetworkIcon,
  Lightbulb,
  FileSpreadsheet,
  Image as ImageIcon,
  Building2,
  AlertTriangle,
  TrendingDown,
  ShieldCheck,
  Users,
  FolderTree,
  Lock,
  Presentation
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

function TopologyDiagram({ isSlide = false }) {
  return (
    <div className={cn("grid gap-4 w-full", isSlide ? "md:grid-cols-2" : "md:grid-cols-2")}>
      {/* ANTES */}
      <div className={cn(
        "bg-red-900/10 border border-red-500/20 rounded-2xl relative overflow-hidden flex flex-col",
        isSlide ? "p-4" : "p-6"
      )}>
        <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase">
          PROBLEMA (SPOF)
        </div>
        <h3 className={cn("font-bold text-red-400 flex items-center gap-2", isSlide ? "text-base mb-3" : "text-xl mb-6")}>
          <Server className={isSlide ? "w-4 h-4" : "w-5 h-5"} /> Arquitetura Antiga
        </h3>
        
        <div className="flex flex-col items-center justify-center flex-1 gap-2">
          <div className={cn(
            "bg-slate-800 border-2 border-red-500/50 rounded-xl w-full text-center relative shadow-[0_0_15px_rgba(239,68,68,0.2)]",
            isSlide ? "p-2" : "p-4"
          )}>
            <Server className={cn("text-red-400 mx-auto", isSlide ? "w-8 h-8 mb-1" : "w-12 h-12 mb-2")} />
            <h4 className={cn("font-bold text-white", isSlide ? "text-xs" : "text-sm")}>MIM-DC01</h4>
            <div className="flex flex-wrap justify-center gap-1 mt-1.5">
              <span className="text-[8px] bg-slate-700 px-1.5 py-0.5 rounded">AD DS</span>
              <span className="text-[8px] bg-slate-700 px-1.5 py-0.5 rounded text-red-300 font-bold border border-red-500/30">DHCP</span>
              <span className="text-[8px] bg-slate-700 px-1.5 py-0.5 rounded text-red-300 font-bold border border-red-500/30">Files</span>
            </div>
          </div>
          <div className={cn("w-0.5 bg-red-500/50", isSlide ? "h-3" : "h-8")}></div>
          <div className={cn("bg-slate-800 border border-slate-600 rounded-xl w-3/4 text-center", isSlide ? "p-1.5" : "p-3")}>
            <NetworkIcon className={cn("text-slate-400 mx-auto", isSlide ? "w-4 h-4 mb-0.5" : "w-6 h-6 mb-1")} />
            <span className={cn("text-slate-300 block", isSlide ? "text-[9px]" : "text-xs")}>Switch Não Gerenciável</span>
          </div>
          <div className={cn("flex w-full justify-center", isSlide ? "gap-4" : "gap-8")}>
            <div className={cn("w-0.5 bg-slate-600 rotate-[30deg] translate-x-2", isSlide ? "h-4" : "h-8")}></div>
            <div className={cn("w-0.5 bg-slate-600 -rotate-[30deg] -translate-x-2", isSlide ? "h-4" : "h-8")}></div>
          </div>
          <div className="flex justify-between w-full gap-2">
            <div className={cn("bg-slate-800/50 border border-slate-700 rounded-xl flex-1 text-center", isSlide ? "p-1.5" : "p-3")}>
              <Laptop className={cn("text-slate-400 mx-auto", isSlide ? "w-5 h-5 mb-0.5" : "w-8 h-8 mb-1")} />
              <span className="text-[9px] block text-slate-300">Estações</span>
            </div>
            <div className={cn("bg-slate-800/50 border border-slate-700 rounded-xl flex-1 text-center", isSlide ? "p-1.5" : "p-3")}>
              <Monitor className={cn("text-slate-400 mx-auto", isSlide ? "w-5 h-5 mb-0.5" : "w-8 h-8 mb-1")} />
              <span className="text-[9px] block text-slate-300">Câmeras/Imp</span>
            </div>
          </div>
        </div>
      </div>

      {/* DEPOIS */}
      <div className={cn(
        "bg-green-900/10 border border-green-500/20 rounded-2xl relative overflow-hidden flex flex-col",
        isSlide ? "p-4" : "p-6"
      )}>
        <div className="absolute top-0 right-0 bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase">
          SOLUÇÃO (ALTA DISP. + VLANs)
        </div>
        <h3 className={cn("font-bold text-green-400 flex items-center gap-2", isSlide ? "text-base mb-3" : "text-xl mb-6")}>
          <Server className={isSlide ? "w-4 h-4" : "w-5 h-5"} /> Arquitetura Nova
        </h3>
        
        <div className="flex flex-col items-center justify-center flex-1 gap-2">
          <div className="flex gap-2 w-full">
            <div className={cn(
              "bg-slate-800 border-2 border-green-500/50 rounded-xl flex-1 text-center relative shadow-[0_0_15px_rgba(34,197,94,0.1)]",
              isSlide ? "p-2" : "p-4"
            )}>
              <Server className={cn("text-green-400 mx-auto", isSlide ? "w-6 h-6 mb-1" : "w-10 h-10 mb-2")} />
              <h4 className={cn("font-bold text-white", isSlide ? "text-[10px]" : "text-sm")}>MIM-DC01</h4>
              <div className="flex flex-wrap justify-center gap-0.5 mt-1">
                <span className="text-[7px] bg-slate-700 px-1 py-0.5 rounded">AD/DNS</span>
                <span className="text-[7px] bg-slate-700 px-1 py-0.5 rounded text-blue-300 border border-blue-500/20">DHCP</span>
              </div>
            </div>
            <div className="flex items-center text-green-500/50">
              <ArrowRight className={isSlide ? "w-4 h-4" : "w-6 h-6"} />
            </div>
            <div className={cn(
              "bg-slate-800 border-2 border-green-500/50 rounded-xl flex-1 text-center relative shadow-[0_0_15px_rgba(34,197,94,0.1)]",
              isSlide ? "p-2" : "p-4"
            )}>
              <Server className={cn("text-green-400 mx-auto", isSlide ? "w-6 h-6 mb-1" : "w-10 h-10 mb-2")} />
              <h4 className={cn("font-bold text-white", isSlide ? "text-[10px]" : "text-sm")}>MIM-DC02</h4>
              <div className="flex flex-wrap justify-center gap-0.5 mt-1">
                <span className="text-[7px] bg-slate-700 px-1 py-0.5 rounded">AD/DNS</span>
                <span className="text-[7px] bg-slate-700 px-1 py-0.5 rounded text-emerald-300 border border-emerald-500/20">FileSrv</span>
              </div>
            </div>
          </div>
          <div className={cn("flex w-full justify-center", isSlide ? "gap-8 h-3" : "gap-16 h-6")}>
            <div className="w-0.5 bg-green-500/50"></div>
            <div className="w-0.5 bg-green-500/50"></div>
          </div>
          <div className={cn("bg-slate-800 border border-green-500/30 rounded-xl w-full text-center", isSlide ? "p-1.5" : "p-3")}>
            <NetworkIcon className={cn("text-green-400 mx-auto", isSlide ? "w-4 h-4 mb-0.5" : "w-6 h-6 mb-1")} />
            <span className={cn("text-slate-300 block", isSlide ? "text-[9px]" : "text-xs")}>Switch Gerenciável (VLANs)</span>
          </div>
          <div className={cn("flex w-full justify-center", isSlide ? "gap-6 h-3" : "gap-12 h-6")}>
            <div className="w-0.5 bg-slate-600 rotate-[20deg] translate-x-2"></div>
            <div className="w-0.5 bg-slate-600 -rotate-[20deg] -translate-x-2"></div>
          </div>
          <div className="flex justify-between w-full gap-2">
            <div className={cn("bg-slate-800/50 border border-green-500/30 rounded-xl flex-1 text-center", isSlide ? "p-1.5" : "p-3")}>
              <Laptop className={cn("text-green-400 mx-auto", isSlide ? "w-5 h-5 mb-0.5" : "w-6 h-6 mb-1")} />
              <span className="text-[9px] block text-slate-300">OUs/GPOs</span>
            </div>
            <div className={cn("bg-slate-800/50 border border-green-500/30 rounded-xl flex-1 text-center", isSlide ? "p-1.5" : "p-3")}>
              <Monitor className={cn("text-green-400 mx-auto", isSlide ? "w-5 h-5 mb-0.5" : "w-6 h-6 mb-1")} />
              <span className="text-[9px] block text-slate-300">Reservas IP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
  const [showDiagram, setShowDiagram] = useState(false);
  const [showOverview, setShowOverview] = useState(true); // New state for Executive Overview
  const [showSheets, setShowSheets] = useState(false);
  const [showSlides, setShowSlides] = useState(false); // New state for Slides
  const [currentSlide, setCurrentSlide] = useState(0); // Current slide index
  const [activeSheet, setActiveSheet] = useState('ips'); // 'ips' | 'users'
  const [sheetQuery, setSheetQuery] = useState('');
  const [activeDeviceModal, setActiveDeviceModal] = useState(null); // 'old-stations', 'old-devices', 'new-stations', 'new-devices'
  const [visibleHints, setVisibleHints] = useState({}); // { stepId: true/false }
  const [zoomedImage, setZoomedImage] = useState(null); // url of the image to zoom

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

  const downloadTemplate = (type) => {
    let content = '';
    let filename = '';

    if (type === 'ips') {
      content = "Dispositivo,Hostname,IP,MAC Address,Status/Reserva\nServidor Principal,,192.168.10.10,,\nServidor Secundário,,192.168.10.11,,\nImpressora Sede,,,,";
      filename = "planejamento_ips_mimosa.csv";
    } else if (type === 'usuarios') {
      content = "Nome,Sobrenome,Setor,Cargo,Login,Grupo Principal\nJoão,Silva,Financeiro,Analista,joao.silva,GG_Financeiro\nMaria,Souza,RH,Gerente,maria.souza,GG_RH";
      filename = "planejamento_usuarios_mimosa.csv";
    }

    if (content && filename) {
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success(`Template ${filename} baixado!`);
    }
  };

  const downloadCsv = (filename, header, rows) => {
    const content = [header, ...rows].join('\n');
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Planilha ${filename} baixada!`);
  };

  const exportSheetCsv = (type) => {
    if (!labData.sheets) return;

    if (type === 'ips') {
      const header = 'Grupo,Dispositivo,Hostname,VLAN,IP,MAC,Tipo,Local,Observações';
      const rows = labData.sheets.ipTable.map(r => [
        r.group,
        r.device,
        r.hostname,
        r.vlan,
        r.ip,
        r.mac,
        r.type,
        r.location,
        (r.notes || '').replaceAll('\n', ' ')
      ].map(v => `"${String(v ?? '').replaceAll('"', '""')}"`).join(','));
      downloadCsv('mimosa_tabela_ips.csv', header, rows);
      return;
    }

    if (type === 'users') {
      const header = 'Login,Nome,Setor,Local,OU,Grupo,Acesso';
      const rows = labData.sheets.usersTable.map(r => [
        r.login,
        r.displayName,
        r.sector,
        r.location,
        r.ou,
        r.group,
        (r.access || '').replaceAll('\n', ' ')
      ].map(v => `"${String(v ?? '').replaceAll('"', '""')}"`).join(','));
      downloadCsv('mimosa_lista_usuarios.csv', header, rows);
    }
  };

  const toggleHint = (stepId, e) => {
    e?.stopPropagation();
    setVisibleHints(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
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

      {/* Device Details Modal */}
      <AnimatePresence>
        {activeDeviceModal && (
          <DeviceDetailsModal 
            modalType={activeDeviceModal} 
            onClose={() => setActiveDeviceModal(null)} 
          />
        )}
      </AnimatePresence>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
            onClick={() => setZoomedImage(null)}
          >
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={zoomedImage} 
              alt="Zoomed" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-slate-700"
            />
            <button 
              className="absolute top-4 right-4 p-2 bg-slate-800/50 hover:bg-slate-700 rounded-full text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
      </AnimatePresence>

      {/* Slides Modal */}
      <AnimatePresence>
        {showSlides && (
          <SlidesView 
            currentSlide={currentSlide} 
            setCurrentSlide={setCurrentSlide} 
            onClose={() => setShowSlides(false)} 
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

              {/* Overview Button */}
              <div className="space-y-2 mb-4">
                <button
                  onClick={() => {
                    setShowOverview(true);
                    setShowDiagram(false);
                    setShowEquipments(false);
                    setShowSheets(false);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group relative overflow-hidden",
                    showOverview 
                      ? "bg-indigo-600 shadow-lg shadow-indigo-500/20 text-white" 
                      : "hover:bg-slate-700/50 text-slate-400 hover:text-slate-200"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    showOverview ? "bg-white/20" : "bg-slate-800 group-hover:bg-slate-700"
                  )}>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-medium truncate">Visão Executiva</span>
                    <span className="text-[10px] opacity-70">O problema e a solução</span>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setShowSlides(true);
                    setShowOverview(false);
                    setShowDiagram(false);
                    setShowEquipments(false);
                    setShowSheets(false);
                    setCurrentSlide(0);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group relative overflow-hidden mt-2",
                    showSlides 
                      ? "bg-indigo-600 shadow-lg shadow-indigo-500/20 text-white" 
                      : "hover:bg-slate-700/50 text-slate-400 hover:text-slate-200"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    showSlides ? "bg-white/20" : "bg-slate-800 group-hover:bg-slate-700"
                  )}>
                    <Presentation className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-medium truncate">Apresentação</span>
                    <span className="text-[10px] opacity-70">Slides do Projeto</span>
                  </div>
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Mão na Massa (Lab)</p>
                {labData.stages.map(stage => {
                  if (stage.id === 'stage-rollback') return null;

                  const isActive = activeStage === stage.id && !showEquipments && !showDiagram && !showOverview && !showSheets;
                  const progress = calculateProgress(stage.id);
                  const isCompleted = progress === 100;

                  return (
                    <button
                      key={stage.id}
                      onClick={() => {
                        setActiveStage(stage.id);
                        setShowOverview(false);
                        setShowEquipments(false);
                        setShowDiagram(false);
                        setShowSheets(false);
                        if (window.innerWidth < 768) setIsSidebarOpen(false);
                      }}
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
                {labData.stages.filter(s => s.id === 'stage-rollback').map(stage => {
                  const isActive = activeStage === stage.id && !showEquipments && !showDiagram && !showOverview && !showSheets;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => {
                        setActiveStage(stage.id);
                        setShowOverview(false);
                        setShowEquipments(false);
                        setShowDiagram(false);
                        setShowSheets(false);
                        if (window.innerWidth < 768) setIsSidebarOpen(false);
                      }}
                      className={cn(
                        "w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group relative overflow-hidden mt-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20",
                        isActive && "ring-1 ring-red-500"
                      )}
                    >
                      <div className="p-2 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-colors">
                        <RotateCcw className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-medium truncate">Scripts de Limpeza</span>
                        <span className="text-[10px] opacity-70">Desfazer Lab</span>
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
                      <div key={idx} className="flex flex-col gap-2 p-2 bg-slate-900/30 rounded-lg border border-slate-700/30">
                        <div className="flex gap-3 items-start group">
                          <span className="text-lg bg-slate-800 p-1.5 rounded-lg border border-slate-700 group-hover:border-indigo-500/50 transition-colors shadow-sm">{item.icon}</span>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-slate-200 group-hover:text-indigo-300 transition-colors">{item.title}</h4>
                            <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                        {(item.title.includes('IPs') || item.title.includes('Usuários')) && (
                          <button
                            onClick={() => downloadTemplate(item.title.includes('IPs') ? 'ips' : 'usuarios')}
                            className="ml-11 flex items-center gap-1.5 text-[10px] bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded w-fit border border-indigo-500/20 transition-colors"
                          >
                            <FileSpreadsheet className="w-3 h-3" />
                            Baixar Template
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {labData.sheets && (
                <div className="space-y-2 mt-4">
                  <button
                    onClick={() => {
                      setShowSheets(true);
                      setShowOverview(false);
                      setShowDiagram(false);
                      setShowEquipments(false);
                      if (window.innerWidth < 768) setIsSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group relative overflow-hidden border",
                      showSheets
                        ? "bg-emerald-600/30 text-emerald-100 border-emerald-500/30"
                        : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/20"
                    )}
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm font-medium truncate">Planilhas</span>
                      <span className="text-[10px] opacity-70">IPs e Usuários</span>
                    </div>
                  </button>
                </div>
              )}

              {/* Diagram Section */}
              <div className="space-y-2 mt-4">
                <button
                    onClick={() => {
                      setShowDiagram(true);
                      setShowOverview(false);
                      setShowSheets(false);
                      setShowEquipments(false);
                      if (window.innerWidth < 768) setIsSidebarOpen(false);
                    }}
                  className="w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group relative overflow-hidden bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20"
                >
                  <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                    <NetworkIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-medium truncate">Topologia de Rede</span>
                    <span className="text-[10px] opacity-70">Antes / Depois</span>
                  </div>
                </button>
              </div>

              {/* Equipments Section */}
              {labData.equipments && (
                <div className="space-y-2 mt-4">
                  <button
                    onClick={() => {
                      setShowEquipments(true);
                      setShowDiagram(false);
                      setShowOverview(false);
                      setShowSheets(false);
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
            
            {showOverview ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                {/* Hero Section */}
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <span className="text-indigo-400 font-bold tracking-wider text-sm mb-2 block">CENÁRIO ATUAL</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                      {labData.executiveSummary.currentScenario.title}
                    </h1>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl">
                      {labData.executiveSummary.currentScenario.subtitle}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                        <Building2 className="w-6 h-6 text-indigo-400 mb-2" />
                        <div className="text-sm text-slate-400">Empresa</div>
                        <div className="font-semibold text-white">{labData.executiveSummary.currentScenario.company}</div>
                      </div>
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                        <Users className="w-6 h-6 text-blue-400 mb-2" />
                        <div className="text-sm text-slate-400">Colaboradores</div>
                        <div className="font-semibold text-white">{labData.executiveSummary.currentScenario.employees}</div>
                      </div>
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                        <FolderTree className="w-6 h-6 text-emerald-400 mb-2" />
                        <div className="text-sm text-slate-400">Locais</div>
                        <div className="font-semibold text-white">{labData.executiveSummary.currentScenario.locations}</div>
                      </div>
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                        <AlertTriangle className="w-6 h-6 text-amber-400 mb-2" />
                        <div className="text-sm text-slate-400">Operação</div>
                        <div className="font-semibold text-white">{labData.executiveSummary.currentScenario.operation}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Problems Section */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                    Problemas Identificados
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {labData.executiveSummary.problems.map((prob) => (
                      <div key={prob.id} className="bg-slate-800/30 border border-slate-700/50 p-5 rounded-2xl hover:border-red-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-red-400">{prob.name}</h3>
                          <span className={cn(
                            "text-[10px] px-2 py-1 rounded font-bold uppercase",
                            prob.criticality === 'Crítico' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                          )}>{prob.criticality}</span>
                        </div>
                        <p className="text-sm text-slate-300 mb-3">{prob.desc}</p>
                        <div className="text-xs bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                          <span className="text-slate-500 block mb-1">Consequência Operacional:</span>
                          <span className="text-slate-300">{prob.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className="bg-gradient-to-br from-slate-900 to-red-950/20 border border-red-900/30 p-6 rounded-2xl">
                  <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5" /> Impacto no Negócio
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {labData.executiveSummary.businessImpact.map((impact, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Proposed Architecture */}
                <div className="bg-slate-800/50 border border-indigo-500/30 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <ShieldCheck className="w-8 h-8 text-indigo-400" />
                    <div>
                      <span className="text-indigo-400 font-bold tracking-wider text-xs block mb-1">NOVA ARQUITETURA PROPOSTA</span>
                      <h2 className="text-2xl font-bold text-white">
                        {labData.executiveSummary.proposedArchitecture.title}
                      </h2>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 h-full">
                        <h4 className="font-bold text-indigo-300 mb-3 flex items-center gap-2"><Server className="w-4 h-4"/> Servidores</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                          {labData.executiveSummary.proposedArchitecture.servers.map((item, i) => <li key={i}>• {item}</li>)}
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 h-full">
                        <h4 className="font-bold text-emerald-300 mb-3 flex items-center gap-2"><NetworkIcon className="w-4 h-4"/> Rede</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                          {labData.executiveSummary.proposedArchitecture.network.map((item, i) => <li key={i}>• {item}</li>)}
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 h-full">
                        <h4 className="font-bold text-amber-300 mb-3 flex items-center gap-2"><Lock className="w-4 h-4"/> Segurança & Dados</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                          {labData.executiveSummary.proposedArchitecture.security.map((item, i) => <li key={i}>• {item}</li>)}
                          {labData.executiveSummary.proposedArchitecture.storage.map((item, i) => <li key={i}>• {item}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {labData.executiveSummary.spofNote && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-amber-300 mb-2">{labData.executiveSummary.spofNote.title}</h3>
                        <p className="text-sm text-amber-200/80 mb-4">{labData.executiveSummary.spofNote.text}</p>
                        <div className="flex flex-wrap gap-2">
                          {labData.executiveSummary.spofNote.mitigations.map((item, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-slate-900/50 border border-slate-700/50 text-slate-200">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FolderTree className="w-5 h-5 text-emerald-400" />
                    Estrutura do Active Directory
                  </h2>
                  <div className="rounded-xl overflow-hidden border border-slate-700/50">
                    <SyntaxHighlighter
                      language="text"
                      style={vscDarkPlus}
                      customStyle={{ margin: 0, padding: '1rem', background: '#020617', fontSize: '0.75rem' }}
                    >
                      {labData.executiveSummary.adStructure}
                    </SyntaxHighlighter>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
                      <div className="text-xs text-slate-500 mb-1">Padrão de Grupos</div>
                      <div className="text-sm text-slate-200 font-mono">{labData.executiveSummary.namingConvention.groups}</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
                      <div className="text-xs text-slate-500 mb-1">Padrão de GPOs</div>
                      <div className="text-sm text-slate-200 font-mono">{labData.executiveSummary.namingConvention.gpos}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-amber-400" />
                    GPOs por Setor
                  </h2>
                  <div className="space-y-3">
                    {labData.executiveSummary.gposBySector.map((sector, i) => (
                      <div key={i} className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                        <div className="font-bold text-slate-200 mb-2">{sector.sector}</div>
                        <ul className="space-y-1 text-sm text-slate-400">
                          {sector.rules.map((rule, idx) => (
                            <li key={idx}>• {rule}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-indigo-400" />
                    File Server (Nova Estrutura)
                  </h2>
                  <div className="rounded-xl overflow-hidden border border-slate-700/50">
                    <SyntaxHighlighter
                      language="text"
                      style={vscDarkPlus}
                      customStyle={{ margin: 0, padding: '1rem', background: '#020617', fontSize: '0.75rem' }}
                    >
                      {labData.executiveSummary.fileServerStructure}
                    </SyntaxHighlighter>
                  </div>
                  <div className="mt-3 text-xs text-slate-500">
                    Regras: permissões por grupo, cotas por setor e Shadow Copy.
                  </div>
                </div>

                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <NetworkIcon className="w-5 h-5 text-blue-400" />
                    DHCP e Auditoria
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-bold text-slate-200 mb-2">DHCP (Correção)</div>
                      <ul className="space-y-1 text-sm text-slate-400">
                        {labData.executiveSummary.dhcpImprovements.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-slate-700/50 pt-4">
                      <div className="text-sm font-bold text-slate-200 mb-2">Auditoria</div>
                      <ul className="space-y-1 text-sm text-slate-400">
                        {labData.executiveSummary.auditAndBackup.audit.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-slate-700/50 pt-4">
                      <div className="text-sm font-bold text-slate-200 mb-2">Backup</div>
                      <ul className="space-y-1 text-sm text-slate-400">
                        {labData.executiveSummary.auditAndBackup.backup.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

                {/* Go to Lab Button */}
                <div className="flex flex-col md:flex-row justify-center gap-4 pt-8 border-t border-slate-700/50">
                  <button
                    onClick={() => {
                      setShowOverview(false);
                      setShowDiagram(true);
                      setShowEquipments(false);
                    }}
                    className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-200 px-8 py-4 rounded-xl font-bold text-lg border border-blue-500/30 flex items-center justify-center gap-3 transition-all hover:scale-105"
                  >
                    Ver Topologia (Antes/Depois)
                    <NetworkIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                      setShowOverview(false);
                      setActiveStage(labData.stages[0].id);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/25 flex items-center gap-3 transition-all hover:scale-105"
                  >
                    Iniciar Implementação Técnica (Lab)
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ) : showSheets ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-emerald-300 mb-2 flex items-center gap-3">
                      <FileSpreadsheet className="w-8 h-8" />
                      Planilhas do Case Mimosa
                    </h2>
                    <p className="text-slate-400">Tabela de IPs por VLAN e lista de usuários por setor.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => exportSheetCsv(activeSheet === 'ips' ? 'ips' : 'users')}
                      className="flex items-center justify-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-100 px-4 py-2 rounded-lg transition-colors font-medium border border-emerald-500/30"
                    >
                      <Download className="w-4 h-4" />
                      Baixar CSV
                    </button>
                    <button
                      onClick={() => {
                        setShowSheets(false);
                        setShowOverview(true);
                      }}
                      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors font-medium border border-slate-700"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      Voltar
                    </button>
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 flex flex-col md:flex-row gap-3 md:items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveSheet('ips')}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-semibold border transition-colors",
                        activeSheet === 'ips'
                          ? "bg-emerald-500/20 text-emerald-200 border-emerald-500/30"
                          : "bg-slate-900/30 text-slate-300 border-slate-700 hover:border-slate-500"
                      )}
                    >
                      Tabela de IPs
                    </button>
                    <button
                      onClick={() => setActiveSheet('users')}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-semibold border transition-colors",
                        activeSheet === 'users'
                          ? "bg-emerald-500/20 text-emerald-200 border-emerald-500/30"
                          : "bg-slate-900/30 text-slate-300 border-slate-700 hover:border-slate-500"
                      )}
                    >
                      Lista de Usuários
                    </button>
                  </div>
                  <div className="flex-1" />
                  <input
                    value={sheetQuery}
                    onChange={(e) => setSheetQuery(e.target.value)}
                    placeholder="Buscar..."
                    className="w-full md:w-80 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>

                {activeSheet === 'ips' ? (
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900/60 text-slate-300 font-semibold">
                          <tr>
                            <th className="px-4 py-3">Grupo</th>
                            <th className="px-4 py-3">Dispositivo</th>
                            <th className="px-4 py-3">Hostname</th>
                            <th className="px-4 py-3">VLAN</th>
                            <th className="px-4 py-3">IP</th>
                            <th className="px-4 py-3">Tipo</th>
                            <th className="px-4 py-3">Local</th>
                            <th className="px-4 py-3">Observações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                          {labData.sheets.ipTable
                            .filter(r => {
                              const q = sheetQuery.trim().toLowerCase();
                              if (!q) return true;
                              return [
                                r.group, r.device, r.hostname, r.vlan, r.ip, r.type, r.location, r.notes
                              ].join(' ').toLowerCase().includes(q);
                            })
                            .map((row, i) => (
                              <tr key={i} className="hover:bg-slate-700/20 transition-colors">
                                <td className="px-4 py-3 text-slate-200">{row.group}</td>
                                <td className="px-4 py-3 text-slate-200">{row.device}</td>
                                <td className="px-4 py-3 font-mono text-xs text-indigo-200">{row.hostname}</td>
                                <td className="px-4 py-3 font-mono text-xs text-emerald-200">{row.vlan}</td>
                                <td className="px-4 py-3 font-mono text-xs text-slate-200">{row.ip}</td>
                                <td className="px-4 py-3 text-slate-300">{row.type}</td>
                                <td className="px-4 py-3 text-slate-300">{row.location}</td>
                                <td className="px-4 py-3 text-slate-400">{row.notes}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900/60 text-slate-300 font-semibold">
                          <tr>
                            <th className="px-4 py-3">Login</th>
                            <th className="px-4 py-3">Nome</th>
                            <th className="px-4 py-3">Setor</th>
                            <th className="px-4 py-3">Local</th>
                            <th className="px-4 py-3">OU</th>
                            <th className="px-4 py-3">Grupo</th>
                            <th className="px-4 py-3">Acesso</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                          {labData.sheets.usersTable
                            .filter(r => {
                              const q = sheetQuery.trim().toLowerCase();
                              if (!q) return true;
                              return [
                                r.login, r.displayName, r.sector, r.location, r.ou, r.group, r.access
                              ].join(' ').toLowerCase().includes(q);
                            })
                            .map((row, i) => (
                              <tr key={i} className="hover:bg-slate-700/20 transition-colors">
                                <td className="px-4 py-3 font-mono text-xs text-indigo-200">{row.login}</td>
                                <td className="px-4 py-3 text-slate-200">{row.displayName}</td>
                                <td className="px-4 py-3 text-slate-300">{row.sector}</td>
                                <td className="px-4 py-3 text-slate-300">{row.location}</td>
                                <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{row.ou}</td>
                                <td className="px-4 py-3 font-mono text-[11px] text-emerald-200">{row.group}</td>
                                <td className="px-4 py-3 text-slate-400">{row.access}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : showDiagram ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-blue-400 mb-2 flex items-center gap-3">
                      <NetworkIcon className="w-8 h-8" />
                      Topologia de Rede: Antes vs Depois
                    </h2>
                    <p className="text-slate-400">Visualização da arquitetura e melhoria via segmentação (VLANs) e controle.</p>
                  </div>
                  <button 
                    onClick={() => setShowDiagram(false)}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors font-medium border border-slate-700"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Voltar ao Lab
                  </button>
                </div>

                <TopologyDiagram />
              </motion.div>
            ) : showEquipments ? (
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
                                  {/* Hint Section */}
                                  {step.hint && (
                                    <div className="mb-4">
                                      <button
                                        onClick={(e) => toggleHint(step.id, e)}
                                        className="flex items-center gap-2 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/20"
                                      >
                                        <Lightbulb className={cn("w-3.5 h-3.5 transition-transform", visibleHints[step.id] ? "text-amber-300" : "")} />
                                        {visibleHints[step.id] ? "Esconder Dica do Analista" : "Ver Dica do Analista"}
                                      </button>
                                      
                                      <AnimatePresence>
                                        {visibleHints[step.id] && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden mt-2"
                                          >
                                            <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-lg text-sm text-amber-200/80 italic flex gap-3 items-start">
                                              <span className="text-amber-500 text-lg leading-none">"</span>
                                              <p className="flex-1 pt-0.5">{step.hint}</p>
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  )}

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
                                                <div className="space-y-3">
                                                  <div className="text-slate-400 text-sm space-y-1 bg-slate-800/30 p-3 rounded-lg border border-slate-700/30">
                                                    {instr.details.map((detail, idx) => (
                                                      <div key={idx} className="flex items-start gap-2">
                                                        <span className="w-1 h-1 bg-slate-600 rounded-full mt-2 flex-shrink-0" />
                                                        <span>{replaceVariables(detail)}</span>
                                                      </div>
                                                    ))}
                                                  </div>
                                                  {instr.image && (
                                                    <div 
                                                      className="relative group/image rounded-lg overflow-hidden border border-slate-700/50 cursor-zoom-in"
                                                      onClick={() => setZoomedImage(instr.image)}
                                                    >
                                                      <img 
                                                        src={instr.image} 
                                                        alt={`Passo a passo: ${instr.text}`} 
                                                        className="w-full max-h-64 object-cover opacity-80 group-hover/image:opacity-100 transition-opacity"
                                                      />
                                                      <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                                                        <div className="bg-slate-900/80 p-2 rounded-full backdrop-blur-sm text-white flex items-center gap-2 text-xs">
                                                          <ImageIcon className="w-4 h-4" /> Ampliar Imagem
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )}
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

function SlidesView({ currentSlide, setCurrentSlide, onClose }) {
  const slides = labData.slides;
  const slide = slides[currentSlide];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const themeColors = {
    problem: {
      accent: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      glow: "bg-red-600/5",
      bullet: "bg-red-500",
      number: "bg-red-500/20 text-red-400",
      cardHover: "hover:border-red-500/50"
    },
    solution: {
      accent: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      glow: "bg-emerald-600/5",
      bullet: "bg-emerald-500",
      number: "bg-emerald-500/20 text-emerald-400",
      cardHover: "hover:border-emerald-500/50"
    },
    default: {
      accent: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/30",
      glow: "bg-indigo-600/5",
      bullet: "bg-indigo-500",
      number: "bg-indigo-500/20 text-indigo-400",
      cardHover: "hover:border-indigo-500/50"
    }
  };

  const currentTheme = themeColors[slide.theme] || themeColors.default;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col font-sans">
      {/* Slide Header */}
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <div className={cn("p-2 rounded-lg transition-colors duration-500", currentTheme.bg)}>
            <Presentation className={cn("w-5 h-5 transition-colors duration-500", currentTheme.accent)} />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] block">Projeto Mimosa</span>
            <span className="text-sm font-medium text-slate-200">Apresentação Executiva</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleFullscreen}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
            title="Tela Cheia"
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden md:inline">TELA CHEIA</span>
          </button>
          <div className="w-px h-4 bg-slate-800 mx-2" />
          <button 
            onClick={onClose}
            className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-slate-400 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-12 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.5 
            }}
            className={cn(
              "w-full max-w-6xl aspect-video bg-slate-900/50 border rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col p-12 md:p-16 relative backdrop-blur-sm transition-colors duration-500",
              currentTheme.border
            )}
          >
            {/* Background Accent */}
            <div className={cn("absolute -top-24 -right-24 w-1/2 h-1/2 rounded-full blur-[120px] opacity-20 transition-colors duration-700", currentTheme.glow)} />
            <div className={cn("absolute -bottom-24 -left-24 w-1/2 h-1/2 rounded-full blur-[120px] opacity-20 transition-colors duration-700", currentTheme.glow)} />

            <div className="mb-auto">
              <span className={cn("font-bold tracking-[0.2em] text-sm mb-4 block uppercase transition-colors duration-500", currentTheme.accent)}>
                {slide.subtitle}
              </span>
              <h2 className={cn(
                "font-bold text-white leading-tight",
                slide.type === 'intro' ? "text-5xl md:text-7xl mb-8" : "text-4xl md:text-5xl mb-12"
              )}>
                {slide.title}
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {slide.type === 'intro' && (
                <p className="text-2xl text-slate-400 max-w-2xl font-light leading-relaxed italic">
                  "{slide.content}"
                </p>
              )}

              {slide.type === 'content' && (
                <ul className="space-y-4">
                  {slide.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg md:text-xl text-slate-300">
                      <div className={cn("w-2 h-2 rounded-full shrink-0 transition-colors duration-500", currentTheme.bullet)} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {slide.type === 'list' && (
                <div className={cn(
                  "grid gap-4",
                  slide.items.length > 4 ? "md:grid-cols-2" : "grid-cols-1"
                )}>
                  {slide.items.map((item, i) => (
                    <div key={i} className={cn("flex items-center gap-4 p-4 md:p-5 bg-slate-800/30 border rounded-2xl transition-all duration-300", currentTheme.border, currentTheme.cardHover)}>
                      <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold shrink-0 text-sm md:text-base transition-colors duration-500", currentTheme.number)}>
                        {i + 1}
                      </div>
                      <span className="text-base md:text-lg text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {slide.type === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {slide.items.map((item, i) => (
                    <div key={i} className={cn(
                      "p-4 bg-slate-800/30 border rounded-2xl transition-all duration-300 flex flex-col h-full", 
                      currentTheme.border, 
                      currentTheme.cardHover,
                      i >= 3 ? "md:col-span-1" : "" // Mantém 3 colunas
                    )}>
                      <h4 className={cn("font-bold mb-1 uppercase text-xs tracking-wider transition-colors duration-500", currentTheme.accent)}>{item.title}</h4>
                      <p className="text-[11px] leading-relaxed text-slate-300 mb-3 flex-grow">{item.desc}</p>
                      
                      {item.consequence && (
                        <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                          <span className="text-[9px] font-bold text-slate-500 block mb-1 uppercase tracking-wider">Consequência:</span>
                          <span className="text-[10px] text-slate-300 leading-snug block">{item.consequence}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {slide.type === 'topology' && (
                <div className="h-full flex items-center">
                  <TopologyDiagram isSlide={true} />
                </div>
              )}

              {slide.type === 'chart' && (
                <div className="h-full flex flex-col justify-center gap-12">
                  <div className="grid md:grid-cols-2 gap-12 items-end">
                    {/* Before Bar */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">{slide.data.before.label}</span>
                        <span className={cn("text-3xl font-black", slide.data.before.color)}>
                          {slide.data.before.value} <span className="text-sm font-normal opacity-50">{slide.data.before.unit}</span>
                        </span>
                      </div>
                      <div className="h-24 bg-slate-800 rounded-2xl overflow-hidden relative border border-slate-700/50">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={cn("h-full opacity-30", slide.data.before.barColor)}
                        />
                        <div className="absolute inset-0 flex items-center px-6">
                          <AlertTriangle className={cn("w-10 h-10", slide.data.before.color)} />
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">Tempo médio de parada anual (Downtime)</p>
                    </div>

                    {/* After Bar */}
                    <div className="space-y-4 relative">
                      <div className="absolute -top-16 -right-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-2xl animate-bounce">
                        <span className="text-2xl font-black italic">-{slide.data.reduction}</span>
                        <span className="text-[10px] block font-bold">REDUÇÃO DE RISCO</span>
                      </div>

                      <div className="flex justify-between items-end mb-2">
                        <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">{slide.data.after.label}</span>
                        <span className={cn("text-3xl font-black", slide.data.after.color)}>
                          {slide.data.after.value} <span className="text-sm font-normal opacity-50">{slide.data.after.unit}</span>
                        </span>
                      </div>
                      <div className="h-24 bg-slate-800 rounded-2xl overflow-hidden relative border border-slate-700/50">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "4%" }}
                          transition={{ duration: 1, delay: 0.8 }}
                          className={cn("h-full", slide.data.after.barColor)}
                        />
                        <div className="absolute inset-0 flex items-center px-6">
                          <ShieldCheck className={cn("w-10 h-10", slide.data.after.color)} />
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">Paradas planejadas residuais</p>
                    </div>
                  </div>

                  <div className="bg-slate-800/30 border border-slate-700/50 p-6 rounded-3xl backdrop-blur-sm">
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
                        <TrendingDown className="w-6 h-6 text-indigo-400" />
                      </div>
                      <p className="text-lg text-slate-300 leading-relaxed italic">
                        "{slide.data.description}"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {slide.type === 'code' && (
                <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-inner h-full">
                  <SyntaxHighlighter
                    language="text"
                    style={vscDarkPlus}
                    customStyle={{ 
                      margin: 0, 
                      padding: '2rem', 
                      background: '#020617', 
                      fontSize: '1.1rem',
                      height: '100%',
                      lineHeight: '1.6'
                    }}
                  >
                    {slide.content}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>

            {/* Slide Number */}
            <div className="absolute bottom-12 right-12 text-slate-600 font-mono text-sm">
              {currentSlide + 1} / {slides.length}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls Overlay */}
        <div className="absolute inset-y-0 left-0 flex items-center p-4">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-4 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 rounded-full text-white transition-all disabled:opacity-0"
          >
            <ChevronRight className="w-8 h-8 rotate-180" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center p-4">
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-4 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 rounded-full text-white shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-0"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-slate-800 w-full overflow-hidden">
        <motion.div 
          className="h-full bg-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Thumbnails Footer */}
      <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between px-8 backdrop-blur-md">
        <div className="flex-1 flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold tracking-wider">
            <div className="flex gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">←</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">→</kbd>
            </div>
            <span>NAVEGAR</span>
          </div>
          <div className="w-px h-3 bg-slate-800" />
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold tracking-wider">
            <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">ESC</kbd>
            <span>SAIR</span>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto scrollbar-none justify-center flex-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                currentSlide === i 
                  ? cn("w-8", currentTheme.bullet.replace('bg-', 'bg-')) 
                  : "bg-slate-700 hover:bg-slate-600"
              )}
            />
          ))}
        </div>

        <div className="flex-1 flex justify-end items-center gap-4">
          <div className="text-slate-500 font-mono text-xs font-bold">
            {String(currentSlide + 1).padStart(2, '0')} <span className="text-slate-800">/</span> {String(slides.length).padStart(2, '0')}
          </div>
          <button 
            onClick={onClose}
            className="text-[10px] font-bold text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em] bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500"
          >
            Encerrar
          </button>
        </div>
      </div>
    </div>
  );
}

function DeviceDetailsModal({ modalType, onClose }) {
  if (!modalType || !labData.topologyDetails[modalType]) return null;

  const data = labData.topologyDetails[modalType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-700/50 bg-slate-900/50">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <NetworkIcon className="w-5 h-5 text-indigo-400" />
              {data.title}
            </h3>
            <p className="text-sm text-slate-400 mt-1">{data.description}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/50 text-slate-400 font-medium">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Dispositivo</th>
                  <th className="px-4 py-3">Endereço IP</th>
                  <th className="px-4 py-3">MAC Address</th>
                  <th className="px-4 py-3 rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {data.devices.map((device, i) => (
                  <tr key={i} className="hover:bg-slate-700/20 transition-colors group">
                    <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        device.status.includes('Online') ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : 
                        device.status.includes('Erro') || device.status.includes('Conflito') ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : 
                        "bg-slate-500"
                      )}></div>
                      {device.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      <span className={cn(
                        "px-2 py-1 rounded bg-slate-900 border",
                        device.ip.includes('Reservado') ? "border-green-500/30 text-green-300" :
                        device.ip.includes('Erro') || device.ip.includes('Conflito') ? "border-red-500/30 text-red-300" :
                        "border-slate-700 text-indigo-300"
                      )}>
                        {device.ip}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{device.mac}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "text-xs",
                        device.status.includes('Online') ? "text-green-400" : 
                        device.status.includes('Erro') || device.status.includes('Conflito') ? "text-red-400 font-bold" : 
                        "text-slate-400"
                      )}>
                        {device.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
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
