export const labData = {
  title: "CASE 2 — EMPRESA MIMOSA",
  description: "Reestruturação de infraestrutura Windows Server para a Mimosa Distribuidora Alimentícia. Foco em alta disponibilidade, segurança, organização do AD e auditoria.",
  network: {
    subnet: "192.168.10.0/24",
    gateway: "192.168.10.1",
    dns: "192.168.10.10 (DC01), 192.168.10.11 (DC02)",
    reservedRange: "192.168.10.1 - 192.168.10.50 (Servidores e Dispositivos)",
    dhcpRange: "192.168.10.51 - 192.168.10.200 (Estações)"
  },
  vms: [
    {
      name: "Servidor Principal (Atual)",
      hostname: "MIM-DC01",
      os: "Windows Server 2016 Std",
      ip: "192.168.10.10",
      disks: "Sistema e Dados",
      role: "AD DS, DNS, DHCP, ERP"
    },
    {
      name: "Servidor Secundário (Novo)",
      hostname: "MIM-DC02",
      os: "Windows Server 2016/2019/2022",
      ip: "192.168.10.11",
      disks: "Sistema, Dados (File Server), Logs",
      role: "DC Adicional, DHCP Failover, File Server"
    },
    {
      name: "Estações de Trabalho",
      hostname: "MIM-WS-XXX",
      os: "Windows 10 Pro",
      ip: "DHCP",
      disks: "Padrão",
      role: "Clientes (Sede, Depósito 1, Depósito 2)"
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
  stages: [
    {
      id: "stage-pre",
      title: "PRÉ-LAB: Criando o Ambiente Falho (Problema)",
      steps: [
        {
          id: "pre-1",
          text: "Configuração do Servidor Único (MIM-DC01)",
          details: "Instale todas as funções (AD, DNS, DHCP, File Server) no mesmo servidor, simulando o ambiente legado e sobrecarregado da Mimosa.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Instalar Roles Iniciais.",
                details: [
                  "Instale Active Directory Domain Services, DHCP Server e File Server."
                ],
                command: `Install-WindowsFeature AD-Domain-Services, DHCP, FS-FileServer -IncludeManagementTools`,
                automation: `# 1. Instalar Roles
Install-WindowsFeature AD-Domain-Services, DHCP, FS-FileServer -IncludeManagementTools
Write-Host "Roles instaladas. Prossiga para a promoção do domínio." -ForegroundColor Green`
              },
              {
                text: "Promover a Controlador de Domínio.",
                details: [
                  "Crie a nova floresta com o domínio 'mimosa.local'."
                ],
                command: `Install-ADDSForest -DomainName "mimosa.local" -InstallDns -Force`,
              }
            ]
          }
        },
        {
          id: "pre-2",
          text: "Gerar a 'Bagunça' no Active Directory e DHCP",
          details: "Crie usuários soltos na OU padrão (Users), um DHCP sem reservas e uma pasta pública sem segurança.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Criar usuários desorganizados.",
                details: [
                  "Crie usuários do financeiro, RH e depósito misturados na OU 'Users'."
                ],
                command: `# Criando usuários na OU padrão (Bagunça)
$Users = @("joao.financeiro", "maria.rh", "carlos.deposito", "ana.diretoria")
foreach ($user in $Users) {
    New-ADUser -Name $user -SamAccountName $user -UserPrincipalName "$user@mimosa.local" -Path "CN=Users,DC=mimosa,DC=local" -AccountPassword (ConvertTo-SecureString "Senha123!" -AsPlainText -Force) -Enabled $true
}`
              },
              {
                text: "Criar DHCP Falho.",
                details: [
                  "Crie um escopo único (192.168.10.1 a 192.168.10.254) que mistura servidores, câmeras e estações."
                ],
                command: `# DHCP sem exclusões (Tudo misturado)
Add-DhcpServerInDC -DnsName "MIM-DC01.mimosa.local" -IPAddress 192.168.10.10
Add-DhcpServerv4Scope -Name "Rede-Mimosa-Geral" -StartRange 192.168.10.1 -EndRange 192.168.10.254 -SubnetMask 255.255.255.0
Set-DhcpServerv4OptionValue -ScopeId 192.168.10.0 -OptionId 6 -Value 192.168.10.10
Set-DhcpServerv4OptionValue -ScopeId 192.168.10.0 -OptionId 3 -Value 192.168.10.1`
              },
              {
                text: "Criar File Server Inseguro.",
                details: [
                  "Crie uma pasta 'Compartilhado' com permissão total para todos, onde filmes e planilhas confidenciais se misturam."
                ],
                command: `New-Item -Path "C:\\Compartilhado" -ItemType Directory -Force
New-SmbShare -Name "Compartilhado" -Path "C:\\Compartilhado" -FullAccess "Everyone"`
              }
            ]
          }
        }
      ]
    },
    {
      id: "stage-0",
      title: "SOLUÇÃO: Entregáveis e Planejamento",
      steps: [
        {
          id: "s0-1",
          text: "Documentação Inicial",
          details: "Prepare todos os documentos de planejamento antes de tocar no servidor.",
          instructions: {
            "Equipe": [
              {
                text: "Crie a Planilha de Planejamento de IPs.",
                details: [
                  "Defina o range para servidores (ex: .10 a .20).",
                  "Defina o range para impressoras e câmeras (ex: .21 a .50).",
                  "Defina o range de DHCP para estações (ex: .51 a .200)."
                ]
              },
              {
                text: "Desenhe a Estrutura de OUs e Grupos.",
                details: [
                  "Sede: Administrativo, Financeiro, RH, Comercial, TI.",
                  "Depósitos: Depósito 1, Depósito 2.",
                  "Crie grupos globais correspondentes (ex: GG_Financeiro_RW)."
                ]
              }
            ]
          }
        }
      ]
    },
    {
      id: "stage-1",
      title: "SOLUÇÃO (Fase 1) — Reorganização do AD e Estabilização",
      steps: [
        {
          id: "s1-1",
          text: "Backup do Estado do Sistema (System State)",
          details: "Realize o backup antes de alterar o AD.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Instale o Windows Server Backup e execute o backup.",
                details: ["Faça backup do System State para um disco local dedicado ou compartilhamento seguro."],
                command: `Install-WindowsFeature Windows-Server-Backup
wbadmin start systemstatebackup -backupTarget:E:`
              }
            ]
          }
        },
        {
          id: "s1-2",
          text: "Criar Estrutura de OUs e Grupos",
          details: "Tire os usuários do contêiner padrão 'Users'.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Crie OUs por Setor.",
                details: ["Mimosa > Sede > Financeiro", "Mimosa > Depositos > Deposito1"],
                command: `New-ADOrganizationalUnit -Name "Mimosa" -Path "DC=mimosa,DC=local"
New-ADOrganizationalUnit -Name "Sede" -Path "OU=Mimosa,DC=mimosa,DC=local"
New-ADOrganizationalUnit -Name "Financeiro" -Path "OU=Sede,OU=Mimosa,DC=mimosa,DC=local"
New-ADGroup -Name "GG_Financeiro" -GroupCategory Security -GroupScope Global -Path "OU=Financeiro,OU=Sede,OU=Mimosa,DC=mimosa,DC=local"`
              }
            ]
          }
        },
        {
          id: "s1-3",
          text: "Reservas de DHCP e Reorganização do File Server",
          details: "Fixar IPs de dispositivos e criar pastas por setor.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Configurar Reservas DHCP.",
                details: ["Acesse o DHCP e crie reservas para as 5 impressoras usando seus MAC Addresses."]
              },
              {
                text: "Criar pastas no File Server.",
                details: ["Crie pastas separadas dentro de \\\\servidor\\Compartilhado (ex: Financeiro, RH, Depositos)."],
                command: `New-Item -Path "C:\\Compartilhado\\Financeiro" -ItemType Directory
New-Item -Path "C:\\Compartilhado\\Depositos" -ItemType Directory`
              }
            ]
          }
        }
      ]
    },
    {
      id: "stage-2",
      title: "SOLUÇÃO (Fase 2) — Controle de Acesso e Políticas",
      steps: [
        {
          id: "s2-1",
          text: "Permissões NTFS e Quebra de Herança",
          details: "Proteger as pastas do Financeiro e RH.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Configurar permissões na pasta Financeiro.",
                details: [
                  "Propriedades > Segurança > Avançado.",
                  "Desabilitar herança.",
                  "Remover 'Users'.",
                  "Adicionar o grupo 'GG_Financeiro' com permissão de Modificação."
                ]
              }
            ]
          }
        },
        {
          id: "s2-2",
          text: "GPOs por Setor e Mapeamento de Unidade",
          details: "Restringir painel de controle e mapear pastas.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Criar GPO para Operadores de Depósito.",
                details: [
                  "Linkar GPO na OU 'Depositos'.",
                  "User Config > Policies > Admin Templates > Control Panel > Prohibit access to Control Panel and PC settings."
                ]
              },
              {
                text: "Mapeamento Automático.",
                details: [
                  "User Config > Preferences > Windows Settings > Drive Maps.",
                  "Mapear \\\\MIM-DC01\\Compartilhado\\Financeiro (Item Level Targeting para o grupo GG_Financeiro)."
                ]
              }
            ]
          }
        }
      ]
    },
    {
      id: "stage-3",
      title: "SOLUÇÃO (Fase 3) — Alta Disponibilidade (Avançado)",
      steps: [
        {
          id: "s3-1",
          text: "Promover Segundo Controlador de Domínio (MIM-DC02)",
          details: "Eliminar o SPOF do Active Directory.",
          instructions: {
            "MIM-DC02": [
              {
                text: "Instalar AD DS e promover a DC.",
                details: ["Adicionar ao domínio existente 'mimosa.local'."],
                command: `Install-WindowsFeature AD-Domain-Services -IncludeManagementTools
Install-ADDSDomainController -DomainName "mimosa.local" -InstallDns`
              }
            ]
          }
        },
        {
          id: "s3-2",
          text: "DHCP Failover e Segundo Escopo",
          details: "Garantir distribuição de IPs se o DC01 cair.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Configurar Failover (Hot Standby).",
                details: [
                  "Botão direito no escopo IPv4 > Configure Failover.",
                  "Partner Server: MIM-DC02.",
                  "Mode: Hot Standby (MIM-DC01 como Active)."
                ],
                command: `Add-DhcpServerv4Failover -ComputerName "MIM-DC01" -Name "Mimosa-Failover" -PartnerServer "MIM-DC02" -ScopeId 192.168.10.0 -Mode HotStandby -Role Active`
              }
            ]
          }
        },
        {
          id: "s3-3",
          text: "Migrar File Server e Ativar ABE",
          details: "Mover arquivos para o DC02 e esconder pastas sem acesso.",
          instructions: {
            "MIM-DC02": [
              {
                text: "Configurar Compartilhamento com ABE.",
                details: [
                  "Server Manager > File and Storage Services > Shares.",
                  "Criar novo share e marcar 'Enable access-based enumeration'."
                ],
                command: `New-SmbShare -Name "Dados" -Path "D:\\Dados" -FolderEnumerationMode AccessBased`
              }
            ]
          }
        }
      ]
    },
    {
      id: "stage-4",
      title: "SOLUÇÃO (Fase 4) — Auditoria e Conformidade (Avançado+)",
      steps: [
        {
          id: "s4-1",
          text: "Configurar Auditoria de Acesso a Objetos",
          details: "Rastrear quem acessa as planilhas financeiras.",
          instructions: {
            "MIM-DC01": [
              {
                text: "Ativar Auditoria via GPO.",
                details: [
                  "Computer Config > Policies > Windows Settings > Security Settings > Advanced Audit Policy > Object Access.",
                  "Audit File System: Success e Failure."
                ]
              },
              {
                text: "Configurar Auditoria na Pasta (SACL).",
                details: [
                  "Propriedades da pasta Financeiro > Segurança > Avançado > Auditing.",
                  "Adicionar 'Everyone', Type: All, Permissions: Full Control."
                ]
              }
            ]
          }
        },
        {
          id: "s4-2",
          text: "Centralização de Logs (WEF)",
          details: "Encaminhar logs de segurança para um servidor central.",
          instructions: {
            "MIM-DC02": [
              {
                text: "Configurar o Collector.",
                details: ["Iniciar o serviço WinRM e criar uma Subscription do tipo Collector Initiated."],
                command: `wecutil qc`
              }
            ]
          }
        }
      ]
    }
  ]
};