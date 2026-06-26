export type ProductType = 'contemplado' | 'programado' | 'disponivel' | 'home-equity' | 'capital-giro';
export type ClientStatus = 'lead' | 'prospect' | 'ativo' | 'inativo' | 'convertido';
export type ProposalStatus = 'rascunho' | 'enviada' | 'em-analise' | 'aprovada' | 'recusada' | 'cancelada';
export type PipelineStage = 'captacao' | 'qualificacao' | 'proposta' | 'analise' | 'fechamento' | 'pos-venda';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpfCnpj: string;
  type: 'PF' | 'PJ';
  status: ClientStatus;
  segment: string;
  assignedTo: string;
  createdAt: string;
  tags: string[];
  address?: string;
  city?: string;
  state?: string;
}

export interface Proposal {
  id: string;
  clientId: string;
  clientName: string;
  product: ProductType;
  creditValue: number;
  installments: number;
  monthlyInstallment: number;
  status: ProposalStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  notes?: string;
  administrator?: string;
}

export interface Contract {
  id: string;
  proposalId: string;
  clientId: string;
  clientName: string;
  product: ProductType;
  creditValue: number;
  status: 'rascunho' | 'assinado' | 'vigente' | 'encerrado';
  signedAt?: string;
  createdAt: string;
  expiresAt?: string;
  documentUrl?: string;
}

export interface PipelineCard {
  id: string;
  clientId: string;
  clientName: string;
  product: ProductType;
  value: number;
  stage: PipelineStage;
  probability: number;
  expectedClose: string;
  assignedTo: string;
  priority: 'baixa' | 'media' | 'alta';
  tags: string[];
}

export interface SimulationResult {
  product: ProductType;
  creditValue: number;
  installments: number;
  monthlyInstallment: number;
  totalAmount: number;
  administrationFee: number;
  reserveFund: number;
  insurance: number;
  administrator: string;
}

export interface DashboardMetrics {
  totalClients: number;
  activeProposals: number;
  signedContracts: number;
  totalCreditVolume: number;
  monthlyRevenue: number;
  conversionRate: number;
  averageTicket: number;
  pendingTasks: number;
}
