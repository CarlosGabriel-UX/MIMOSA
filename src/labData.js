export const labData = {
  title: "CASE 2 — EMPRESA MIMOSA",
  description: "Reestruturação completa da infraestrutura Windows Server, saindo de um ambiente falho e vulnerável para uma solução com 1 servidor e VLANs (segmentação e controle).",
  executiveSummary: {
    currentScenario: {
      title: "Infraestrutura Atual — Ambiente Crítico e Vulnerável",
      subtitle: "Ambiente funcional, porém sem planejamento, sem redundância e com alto risco de parada total.",
      company: "Mimosa Distribuidora Alimentícia",
      employees: 35,
      locations: "2 depósitos + sede",
      operation: "18h/dia",
      dependency: "Dependência total da rede para emissão de notas e estoque."
    },
    problems: [
      { id: "p1", name: "SPOF (Single Point of Failure)", desc: "1 único servidor para todos os serviços (AD, DNS, DHCP, File Server, ERP).", impact: "Qualquer manutenção ou falha derruba toda a empresa.", criticality: "Crítico" },
      { id: "p2", name: "Active Directory Desorganizado", desc: "Todos os usuários e computadores soltos nas pastas padrão. Sem OUs.", impact: "Impossível aplicar políticas de segurança (GPOs) por setor.", criticality: "Alto" },
      { id: "p3", name: "File Server Sem Controle", desc: "Pasta única compartilhada sem permissões NTFS ou cotas de disco.", impact: "Vazamento de dados financeiros e disco lotado com arquivos pessoais.", criticality: "Crítico" },
      { id: "p4", name: "DHCP Mal Configurado", desc: "Distribuição dinâmica para todos, sem reservas para dispositivos fixos.", impact: "Impressoras e câmeras param de funcionar ao reiniciar.", criticality: "Médio" },
      { id: "p5", name: "Sem Auditoria", desc: "Nenhum log de acesso a arquivos ou alterações no AD habilitado.", impact: "Impossível rastrear a origem de vazamentos de informações.", criticality: "Alto" }
    ],
    businessImpact: [
      "Paradas operacionais (Down-time)",
      "Perda de produtividade",
      "Risco iminente de vazamento de dados",
      "Falta de controle administrativo",
      "Dependência extrema de uma única máquina física"
    ],
    proposedArchitecture: {
      title: "Infraestrutura Recomendada — Segmentação e Segurança (1 Servidor + VLANs)",
      servers: [
        "1 servidor físico robusto (ou 1 host com virtualização)",
        "AD DS + DNS + DHCP + File Server no mesmo servidor",
        "ERP preferencialmente isolado em VM no mesmo host (quando possível)"
      ],
      network: [
        "VLANs separadas: Servidores, Sede, Depósito 1, Depósito 2, Dispositivos",
        "Switch gerenciável (L2) + roteamento inter-VLAN (L3/Firewall/Router)"
      ],
      storage: [
        "File Server organizado hierarquicamente",
        "Permissões NTFS restritas",
        "Cotas por usuário/setor habilitadas"
      ],
      backup: [
        "Backup automático diário",
        "Estratégia 3-2-1 (Local + Nuvem)"
      ],
      security: [
        "GPOs específicas por setor",
        "Bloqueios de sistema para operação",
        "Auditoria avançada ativada"
      ]
    },
    spofNote: {
      title: "Importante: SPOF continua existindo (1 servidor)",
      text: "A solução com 1 servidor melhora segurança e organização via VLANs, GPOs e permissões, mas não elimina o risco de parada total. Para mitigar, use RAID, nobreak, peças redundantes quando possível e backups 3-2-1 com teste de restore.",
      mitigations: ["RAID (ex: RAID1/RAID10)", "Nobreak senoidal (UPS)", "Backup diário + regra 3-2-1", "Teste de restore", "Monitoramento básico e documentação"]
    },
    adStructure: `ou_mimosa
  ├── ou_sede
  │    ├── ou_administrativo
  │    │    └── ou_diretoria
  │    ├── ou_financeiro
  │    ├── ou_rh
  │    ├── ou_comercial
  │    └── ou_ti
  ├── ou_deposito1
  │    └── ou_operacao1
  └── ou_deposito2
       └── ou_operacao2`,
    namingConvention: {
      groups: "gpr_<setor> (ex: gpr_financeiro)",
      gpos: "gpo_<setor> (ex: gpo_bloqueio_usb)"
    },
    gposBySector: [
      { sector: "👔 Diretoria", rules: ["Acesso total", "Sem restrições"] },
      { sector: "💰 Financeiro / RH", rules: ["Bloquear acesso externo", "Restringir USB", "Auditoria ativa"] },
      { sector: "📦 Operação (Depósitos)", rules: ["Bloquear painel de controle", "Bloquear rede manual", "Acesso somente ao ERP"] },
      { sector: "💻 TI", rules: ["Controle total", "Acesso administrativo"] }
    ],
    fileServerStructure: `\\\\fileserver\\Dados
  ├── Diretoria
  ├── Financeiro
  ├── RH
  ├── Comercial
  ├── TI
  ├── Operacao_Dep1
  └── Operacao_Dep2`,
    dhcpImprovements: [
      "Criar reservas para Impressoras",
      "Criar reservas para Câmeras",
      "Criar reservas para Servidores",
      "Separar escopos por VLAN"
    ],
    auditAndBackup: {
      audit: ["Logon/logoff", "Acesso a arquivos (Success/Fail)", "Alterações no AD", "Benefício: Rastreabilidade completa"],
      backup: ["Backup diário automático", "Regra 3-2-1: 3 cópias, 2 mídias, 1 externa"]
    }
  },
  network: {
    subnet: "VLAN10 Servidores: 192.168.10.0/24 | VLAN20 Sede: 192.168.20.0/24 | VLAN30 Dep1: 192.168.30.0/24 | VLAN40 Dep2: 192.168.40.0/24 | VLAN50 Dispositivos: 192.168.50.0/24",
    gateway: "Inter-VLAN: 192.168.10.1 / 20.1 / 30.1 / 40.1 / 50.1",
    dns: "192.168.10.10 (MIM-DC01)",
    reservedRange: "VLAN10: 192.168.10.2-10.50 (Infra/Rede) | VLAN50: 192.168.50.10-50.50 (Impressoras/Câmeras)",
    dhcpRange: "VLAN20: 192.168.20.50-20.199 | VLAN30: 192.168.30.50-30.199 | VLAN40: 192.168.40.50-40.199"
  },
  vms: [
    {
      name: "Servidor Único (Solução)",
      hostname: "MIM-DC01",
      os: "Windows Server 2016 Std",
      ip: "VLAN10: 192.168.10.10 (Estático)",
      disks: "Sistema (C:) + Dados (D:) + Backups/Logs (E: opcional)",
      role: "AD DS, DNS, DHCP, File Server, Auditoria, ERP (se necessário)"
    },
    {
      name: "Switch Gerenciável (Infra)",
      hostname: "SW-MIM-01",
      os: "Firmware",
      ip: "VLAN10: 192.168.10.2 (Gerência)",
      disks: "N/A",
      role: "VLANs, Trunk, (Inter-VLAN via L3/Router)"
    },
    {
      name: "Estações - Sede (15x)",
      hostname: "MIM-WS-SDE-01 a 15",
      os: "Windows 10 Pro",
      ip: "VLAN20: 192.168.20.51 a 192.168.20.65 (DHCP)",
      disks: "Padrão",
      role: "Acesso Geral, Financeiro, RH, Comercial"
    },
    {
      name: "Estações - Depósito 1 (10x)",
      hostname: "MIM-WS-DP1-01 a 10",
      os: "Windows 10 Pro",
      ip: "VLAN30: 192.168.30.100 a 192.168.30.109 (DHCP)",
      disks: "Padrão",
      role: "Sistema de Estoque, Impressão"
    },
    {
      name: "Estações - Depósito 2 (10x)",
      hostname: "MIM-WS-DP2-01 a 10",
      os: "Windows 10 Pro",
      ip: "VLAN40: 192.168.40.150 a 192.168.40.159 (DHCP)",
      disks: "Padrão",
      role: "Sistema de Estoque, Impressão"
    },
    {
      name: "Impressoras e Câmeras (Dispositivos)",
      hostname: "MIM-PRT-01 a 05 / MIM-CAM-01 a 10",
      os: "Firmware Nativo",
      ip: "VLAN50: 192.168.50.21 a 192.168.50.40 (Reserva DHCP)",
      disks: "N/A",
      role: "Impressão de Etiquetas, Monitoramento"
    }
  ],
  deliverables: [
    { icon: "📋", title: "Planejamento de IPs", desc: "Tabela com endereçamento de todos os dispositivos." },
    { icon: "🖥️", title: "Planejamento de Hostnames", desc: "Padrão de nomenclatura para servidores e estações." },
    { icon: "👤", title: "Planejamento de Usuários", desc: "Lista de contas, grupos e perfis de acesso." },
    { icon: "🔐", title: "Planejamento de Senhas", desc: "Política de senhas definida e justificada." },
    { icon: "🗂️", title: "Planejamento de OUs", desc: "Estrutura de Unidades Organizacionais no AD." },
    { icon: "💾", title: "Backups Preventivos", desc: "Estratégia de backup antes de qualquer alteração." }
  ],
  equipments: [
    {
      category: "Servidores & Armazenamento",
      items: [
        { name: "Servidor Único Robusto", desc: "Servidor Rack ou Torre (ex: Dell/HP) com redundância (RAID, fontes redundantes se possível) para suportar AD/DNS/DHCP/File/ERP.", priority: "Alta" },
        { name: "NAS (Network Attached Storage)", desc: "Equipamento para rotinas de backup local isolado (ex: QNAP ou Synology de 4 baias).", priority: "Alta" },
        { name: "Nobreak (UPS)", desc: "Nobreak senoidal de 3KVA+ para manter o servidor e equipamentos de rede ativos em quedas de energia.", priority: "Crítica" }
      ]
    },
    {
      category: "Rede & Segurança",
      items: [
        { name: "Switches Gerenciáveis (L2/L3)", desc: "Substituir os switches não gerenciáveis por modelos que suportem VLANs e, se possível, roteamento inter-VLAN.", priority: "Alta" },
        { name: "Firewall / UTM", desc: "Appliance de Firewall (ex: Fortinet, pfSense ou Sophos) para controle de borda, VPN e bloqueio de ameaças externas.", priority: "Alta" }
      ]
    },
    {
      category: "Licenciamento",
      items: [
        { name: "Windows Server 2022 Standard", desc: "Licença para o servidor físico (MIM-DC01) ou para o host de virtualização.", priority: "Crítica" },
        { name: "Windows Server CALs", desc: "Licenças de Acesso de Cliente (User CAL ou Device CAL) para regularizar os acessos ao novo ambiente.", priority: "Alta" }
      ]
    }
  ],
  topologyDetails: {
    "old-stations": {
      title: "Estações (Pré-Lab)",
      description: "IPs dinâmicos sem controle. Todos misturados no mesmo escopo DHCP.",
      devices: [
        { name: "PC-FIN-01", ip: "192.168.10.15 (DHCP)", mac: "00:1A:2B:3C:4D:5E", status: "Online" },
        { name: "PC-DEP-02", ip: "192.168.10.18 (DHCP)", mac: "00:1A:2B:3C:4D:5F", status: "Online" },
        { name: "PC-RH-01", ip: "192.168.10.22 (DHCP)", mac: "00:1A:2B:3C:4D:60", status: "Offline" },
        { name: "PC-DIR-01", ip: "192.168.10.35 (DHCP)", mac: "00:1A:2B:3C:4D:61", status: "Online" }
      ]
    },
    "old-devices": {
      title: "Impressoras & Câmeras (Pré-Lab)",
      description: "Dispositivos pegando IPs aleatórios do DHCP. Causa quebra de serviço frequente.",
      devices: [
        { name: "IMP-DEP-01", ip: "192.168.10.45 (DHCP - Erro de mapeamento)", mac: "AA:BB:CC:DD:EE:01", status: "Erro" },
        { name: "CAM-EXT-01", ip: "192.168.10.50 (DHCP)", mac: "AA:BB:CC:DD:EE:02", status: "Online" },
        { name: "IMP-FIN-01", ip: "192.168.10.12 (DHCP - Conflito)", mac: "AA:BB:CC:DD:EE:03", status: "Conflito IP" }
      ]
    },
    "new-stations": {
      title: "Estações Organizadas (Solução)",
      description: "Estações em VLANs separadas (Sede/Depósitos) recebendo IP via DHCP e aplicando GPOs baseadas em OUs.",
      devices: [
        { name: "MIM-WS-SDE-01 (Fin)", ip: "VLAN20: 192.168.20.51 (DHCP)", mac: "00:1A:2B:3C:4D:5E", status: "Online - GPO Finanças" },
        { name: "MIM-WS-DP1-01 (Dep)", ip: "VLAN30: 192.168.30.100 (DHCP)", mac: "00:1A:2B:3C:4D:5F", status: "Online - GPO Bloqueio" },
        { name: "MIM-WS-DP2-01 (Dep)", ip: "VLAN40: 192.168.40.150 (DHCP)", mac: "00:1A:2B:3C:4D:62", status: "Online - GPO Bloqueio" }
      ]
    },
    "new-devices": {
      title: "Dispositivos Fixos (Solução)",
      description: "Impressoras e câmeras em VLAN dedicada com reservas no DHCP. IP nunca muda.",
      devices: [
        { name: "MIM-PRT-01 (Depósito)", ip: "VLAN50: 192.168.50.21 (Reservado)", mac: "AA:BB:CC:DD:EE:01", status: "Online - Fixo" },
        { name: "MIM-CAM-01 (Externa)", ip: "VLAN50: 192.168.50.31 (Reservado)", mac: "AA:BB:CC:DD:EE:02", status: "Online - Fixo" },
        { name: "MIM-PRT-02 (Financeiro)", ip: "VLAN50: 192.168.50.22 (Reservado)", mac: "AA:BB:CC:DD:EE:03", status: "Online - Fixo" }
      ]
    }
  },
  stages: [
    {
      id: "stage-pre",
      title: "Fase 1 — Preparação",
      steps: [
        {
          id: "pre-1",
          text: "Levantamento e Planejamento",
          details: "Mapeie todo o ambiente atual antes de qualquer alteração.",
          hint: "Não comece a mexer sem ter a tabela de IPs e a lista de usuários em mãos.",
          instructions: {
            "Equipe": [
              {
                text: "Levantamento de Ativos",
                details: [
                  "Liste todos os 35 computadores, 5 impressoras e câmeras.",
                  "Defina a janela de manutenção (fora das 18h de operação)."
                ]
              }
            ]
          }
        }
      ]
    },
    {
      id: "stage-1",
      title: "Fase 2 — Infraestrutura",
      steps: [
        {
          id: "s1-1",
          text: "Instalar Servidor Único (MIM-DC01)",
          details: "Instale o Windows Server e configure IP estático na VLAN de Servidores.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Configuração Básica",
                details: ["Nome: MIM-DC01", "VLAN10 IP: 192.168.10.10/24", "DNS: 192.168.10.10 (self)"],
                command: `Rename-Computer -NewName "MIM-DC01" -Restart`
              }
            ]
          }
        },
        {
          id: "s1-2",
          text: "Instalar Roles e Criar Domínio",
          details: "Instale AD DS/DNS/DHCP/File Server e promova o servidor para o domínio mimosa.local.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Instalar Roles e Promover Floresta",
                details: ["Crie a floresta do domínio e habilite o DNS integrado."],
                command: `Install-WindowsFeature AD-Domain-Services, DNS, DHCP, FS-FileServer -IncludeManagementTools
Install-ADDSForest -DomainName "mimosa.local" -InstallDns -Force`
              }
            ]
          }
        }
      ]
    },
    {
      id: "stage-2",
      title: "Fase 3 — Active Directory (AD)",
      steps: [
        {
          id: "s2-1",
          text: "Criar OUs e Grupos",
          details: "Estruture o AD conforme o organograma da Mimosa.",
          hint: "Crie a estrutura completa de OUs antes de mover os usuários para evitar perdas.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Criar OU Raiz e Sub-OUs",
                details: ["Crie OU_Mimosa, OU_Sede, OU_Deposito1, etc.", "Crie os grupos GPR_Financeiro, GPR_RH, etc."],
                command: `New-ADOrganizationalUnit -Name "OU_Mimosa" -Path "DC=mimosa,DC=local"
New-ADGroup -Name "GPR_Financeiro" -GroupCategory Security -GroupScope Global -Path "OU=Financeiro,OU=Sede,OU=Mimosa,DC=mimosa,DC=local"`
              }
            ]
          }
        },
        {
          id: "s2-2",
          text: "Aplicar GPOs",
          details: "Crie e vincule as políticas de segurança.",
          instructions: {
            "MIM-DC01": [
              {
                text: "GPO de Bloqueio para Depósitos",
                details: ["Bloqueie o Painel de Controle para as OUs de Depósito."],
                command: `New-GPO -Name "GPO_Bloqueio_Painel"`
              }
            ]
          }
        }
      ]
    },
    {
      id: "stage-3",
      title: "Fase 4 — File Server",
      steps: [
        {
          id: "s3-1",
          text: "Criar Estrutura e Migrar Dados",
          details: "Prepare o File Server no MIM-DC01 (organizado por setor).",
          instructions: {
            "MIM-DC01": [
              {
                text: "Criar Pastas Departamentais",
                details: ["Crie as pastas Financeiro, RH, Comercial, etc., no disco D:."],
                command: `New-Item -Path "D:\\Dados\\Financeiro" -ItemType Directory`
              }
            ]
          }
        },
        {
          id: "s3-2",
          text: "Aplicar Permissões NTFS",
          details: "Quebre a herança e restrinja acessos.",
          hint: "Sempre dê permissão para o Grupo, nunca para o Usuário individualmente.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Restringir pasta Financeiro",
                details: ["Desabilite herança e dê permissão apenas para GPR_Financeiro e System."]
              }
            ]
          }
        }
      ]
    },
    {
      id: "stage-4",
      title: "Fase 5 — Rede (DHCP)",
      steps: [
        {
          id: "s4-1",
          text: "Configurar DHCP para VLANs",
          details: "Crie escopos separados por VLAN (Sede/Depósitos) e configure as opções.",
          hint: "Para DHCP funcionar em VLANs diferentes, o roteador/switch L3 precisa ter DHCP Relay (ip helper-address) apontando para 192.168.10.10.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Criar Escopos por VLAN",
                details: ["VLAN20: 192.168.20.0/24", "VLAN30: 192.168.30.0/24", "VLAN40: 192.168.40.0/24"],
                command: `Add-DhcpServerInDC -DnsName "MIM-DC01.mimosa.local" -IPAddress 192.168.10.10
Add-DhcpServerv4Scope -Name "VLAN20-SEDE" -StartRange 192.168.20.50 -EndRange 192.168.20.199 -SubnetMask 255.255.255.0
Add-DhcpServerv4Scope -Name "VLAN30-DEP1" -StartRange 192.168.30.50 -EndRange 192.168.30.199 -SubnetMask 255.255.255.0
Add-DhcpServerv4Scope -Name "VLAN40-DEP2" -StartRange 192.168.40.50 -EndRange 192.168.40.199 -SubnetMask 255.255.255.0
Set-DhcpServerv4OptionValue -ScopeId 192.168.20.0 -DnsServer 192.168.10.10 -Router 192.168.20.1
Set-DhcpServerv4OptionValue -ScopeId 192.168.30.0 -DnsServer 192.168.10.10 -Router 192.168.30.1
Set-DhcpServerv4OptionValue -ScopeId 192.168.40.0 -DnsServer 192.168.10.10 -Router 192.168.40.1`
              }
            ]
          }
        },
        {
          id: "s4-2",
          text: "Criar Reservas",
          details: "Fixe os IPs das câmeras e impressoras na VLAN de Dispositivos.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Reservas MAC",
                details: ["Crie o escopo VLAN50 (Dispositivos) e cadastre reservas para impressoras/câmeras."],
                command: `Add-DhcpServerv4Scope -Name "VLAN50-DISPOSITIVOS" -StartRange 192.168.50.50 -EndRange 192.168.50.199 -SubnetMask 255.255.255.0
Set-DhcpServerv4OptionValue -ScopeId 192.168.50.0 -DnsServer 192.168.10.10 -Router 192.168.50.1`
              }
            ]
          }
        }
      ]
    },
    {
      id: "stage-5",
      title: "Fase 6 — Segurança",
      steps: [
        {
          id: "s5-1",
          text: "Ativar Auditoria",
          details: "Rastreie acessos e alterações críticas.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Auditoria de Logon e Arquivos",
                details: ["Habilite via GPO a auditoria de Object Access (Sucesso e Falha)."]
              }
            ]
          }
        }
      ]
    },
    {
      id: "stage-6",
      title: "Fase 7 — Backup",
      steps: [
        {
          id: "s6-1",
          text: "Automatizar e Testar Restore",
          details: "Implemente a regra 3-2-1.",
          hint: "Um backup não testado não é um backup. Faça um restore de um arquivo de teste.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Agendar Backup Diário",
                details: ["Use o Windows Server Backup para agendar cópias diárias para o NAS/Disco Externo."]
              }
            ]
          }
        }
      ]
    },
    {
      id: "stage-rollback",
      title: "EXTRAS: Scripts de Limpeza (Rollback)",
      steps: [
        {
          id: "rb-1",
          text: "Limpar Estrutura do AD e DHCP",
          details: "Remove os usuários, OUs e escopos DHCP criados durante o lab para que você possa tentar novamente do zero.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Remover usuários de teste.",
                details: ["Ajuste os logins conforme os usuários criados no seu ambiente."],
                command: `$Users = @(
  "joao.financeiro",
  "maria.rh",
  "carlos.deposito",
  "ana.diretoria"
)
foreach ($user in $Users) {
  Remove-ADUser -Identity $user -Confirm:$false -ErrorAction SilentlyContinue
}
Write-Host "Usuários removidos." -ForegroundColor Green`
              },
              {
                text: "Remover OUs criadas no lab.",
                details: ["Apaga a OU raiz OU_Mimosa e tudo dentro dela."],
                command: `Remove-ADOrganizationalUnit -Identity "OU=OU_Mimosa,DC=mimosa,DC=local" -Recursive -Confirm:$false -ErrorAction SilentlyContinue
Write-Host "Estrutura de OUs removida." -ForegroundColor Green`
              },
              {
                text: "Remover Escopo DHCP.",
                details: ["Remove o escopo principal."],
                command: `Remove-DhcpServerv4Scope -ScopeId 192.168.10.0 -Force -ErrorAction SilentlyContinue
Write-Host "Escopo DHCP removido." -ForegroundColor Green`
              },
              {
                text: "Remover Compartilhamentos e Pastas.",
                details: ["Remove a pasta C:\\Compartilhado e os shares."],
                command: `Remove-SmbShare -Name "Compartilhado" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "C:\\Compartilhado" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "Pastas e compartilhamentos removidos." -ForegroundColor Green`
              }
            ]
          }
        },
        {
          id: "rb-2",
          text: "Remover Escopos e Reservas das VLANs",
          details: "Desfaz a segmentação do DHCP (escopos por VLAN) criada no lab.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Remover escopos VLAN20/30/40/50.",
                details: ["Remove os escopos DHCP criados para segmentação."],
                command: `Remove-DhcpServerv4Scope -ScopeId 192.168.20.0 -Force -ErrorAction SilentlyContinue
Remove-DhcpServerv4Scope -ScopeId 192.168.30.0 -Force -ErrorAction SilentlyContinue
Remove-DhcpServerv4Scope -ScopeId 192.168.40.0 -Force -ErrorAction SilentlyContinue
Remove-DhcpServerv4Scope -ScopeId 192.168.50.0 -Force -ErrorAction SilentlyContinue`
              }
            ]
          }
        }
      ]
    }
  ]
};
