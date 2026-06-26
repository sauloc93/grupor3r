import { Client, Proposal, Contract, PipelineCard, DashboardMetrics } from '@/types';

export const PRODUCT_LABELS: Record<string, string> = {
  'contemplado': 'Consórcio Contemplado',
  'programado': 'Carta Programada',
  'disponivel': 'Carta Disponível',
  'home-equity': 'Home Equity',
  'capital-giro': 'Capital de Giro',
};

export const PRODUCT_COLORS: Record<string, string> = {
  'contemplado': '#003B7A',
  'programado': '#C8962C',
  'disponivel': '#16A34A',
  'home-equity': '#7C3AED',
  'capital-giro': '#0891B2',
};

export const ADMINISTRATORS = [
  'Porto Seguro Consórcios', 'Embracon', 'Ademicon', 'Rodobens', 'Sompo',
  'Caixa Econômica Federal', 'Banco do Brasil', 'Bradesco Consórcios',
  'Itaú Consórcios', 'Santander Consórcios',
];

export const mockClients: Client[] = [
  { id: '1', name: 'João Silva', email: 'joao@empresa.com', phone: '(11) 99999-1111', cpfCnpj: '123.456.789-00', type: 'PF', status: 'ativo', segment: 'Imóveis', assignedTo: 'Carlos Mendes', createdAt: '2024-01-10', tags: ['VIP', 'Imóvel'], city: 'São Paulo', state: 'SP' },
  { id: '2', name: 'Tech Solutions Ltda', email: 'financeiro@techsolutions.com', phone: '(11) 3333-2222', cpfCnpj: '12.345.678/0001-99', type: 'PJ', status: 'prospect', segment: 'Empresarial', assignedTo: 'Ana Lima', createdAt: '2024-02-15', tags: ['Capital de Giro'], city: 'Campinas', state: 'SP' },
  { id: '3', name: 'Maria Fernanda Costa', email: 'maria@gmail.com', phone: '(21) 98888-3333', cpfCnpj: '987.654.321-00', type: 'PF', status: 'convertido', segment: 'Veículos', assignedTo: 'Roberto Souza', createdAt: '2024-01-25', tags: ['Veículo', 'Convertido'], city: 'Rio de Janeiro', state: 'RJ' },
  { id: '4', name: 'Construtora Horizonte', email: 'diretoria@horizonte.com', phone: '(31) 3232-4444', cpfCnpj: '98.765.432/0001-11', type: 'PJ', status: 'ativo', segment: 'Home Equity', assignedTo: 'Carlos Mendes', createdAt: '2024-03-01', tags: ['Home Equity', 'PJ'], city: 'Belo Horizonte', state: 'MG' },
  { id: '5', name: 'Pedro Alves', email: 'pedro.alves@email.com', phone: '(41) 97777-5555', cpfCnpj: '456.789.123-00', type: 'PF', status: 'lead', segment: 'Imóveis', assignedTo: 'Ana Lima', createdAt: '2024-03-10', tags: ['Lead Frio'], city: 'Curitiba', state: 'PR' },
  { id: '6', name: 'Indústria Qualidade SA', email: 'compras@qualidade.com', phone: '(11) 5555-6666', cpfCnpj: '11.222.333/0001-44', type: 'PJ', status: 'ativo', segment: 'Empresarial', assignedTo: 'Roberto Souza', createdAt: '2024-02-01', tags: ['Capital de Giro', 'Empresarial'], city: 'São Paulo', state: 'SP' },
];

export const mockProposals: Proposal[] = [
  { id: 'P001', clientId: '1', clientName: 'João Silva', product: 'contemplado', creditValue: 350000, installments: 180, monthlyInstallment: 2100, status: 'aprovada', createdAt: '2024-03-01', updatedAt: '2024-03-15', assignedTo: 'Carlos Mendes', administrator: 'Embracon', notes: 'Cliente contemplado em assembleia de março.' },
  { id: 'P002', clientId: '2', clientName: 'Tech Solutions Ltda', product: 'capital-giro', creditValue: 500000, installments: 60, monthlyInstallment: 9800, status: 'em-analise', createdAt: '2024-03-05', updatedAt: '2024-03-12', assignedTo: 'Ana Lima', administrator: 'Ademicon' },
  { id: 'P003', clientId: '3', clientName: 'Maria Fernanda Costa', product: 'disponivel', creditValue: 80000, installments: 72, monthlyInstallment: 1350, status: 'enviada', createdAt: '2024-03-08', updatedAt: '2024-03-08', assignedTo: 'Roberto Souza', administrator: 'Porto Seguro Consórcios' },
  { id: 'P004', clientId: '4', clientName: 'Construtora Horizonte', product: 'home-equity', creditValue: 1200000, installments: 120, monthlyInstallment: 15200, status: 'em-analise', createdAt: '2024-03-10', updatedAt: '2024-03-14', assignedTo: 'Carlos Mendes', administrator: 'Caixa Econômica Federal' },
  { id: 'P005', clientId: '5', clientName: 'Pedro Alves', product: 'programado', creditValue: 250000, installments: 120, monthlyInstallment: 2450, status: 'rascunho', createdAt: '2024-03-12', updatedAt: '2024-03-12', assignedTo: 'Ana Lima', administrator: 'Rodobens' },
];

export const mockContracts: Contract[] = [
  { id: 'C001', proposalId: 'P001', clientId: '1', clientName: 'João Silva', product: 'contemplado', creditValue: 350000, status: 'vigente', signedAt: '2024-03-20', createdAt: '2024-03-15' },
  { id: 'C002', proposalId: 'P003', clientId: '3', clientName: 'Maria Fernanda Costa', product: 'disponivel', creditValue: 80000, status: 'assinado', signedAt: '2024-03-22', createdAt: '2024-03-18' },
  { id: 'C003', proposalId: 'P006', clientId: '6', clientName: 'Indústria Qualidade SA', product: 'capital-giro', creditValue: 300000, status: 'vigente', signedAt: '2024-02-20', createdAt: '2024-02-15' },
];

export const mockPipeline: PipelineCard[] = [
  { id: 'K1', clientId: '5', clientName: 'Pedro Alves', product: 'programado', value: 250000, stage: 'captacao', probability: 20, expectedClose: '2024-05-30', assignedTo: 'Ana Lima', priority: 'media', tags: ['Imóveis'] },
  { id: 'K2', clientId: '2', clientName: 'Tech Solutions', product: 'capital-giro', value: 500000, stage: 'qualificacao', probability: 40, expectedClose: '2024-04-30', assignedTo: 'Ana Lima', priority: 'alta', tags: ['PJ', 'Urgente'] },
  { id: 'K3', clientId: '1', clientName: 'João Silva', product: 'contemplado', value: 350000, stage: 'proposta', probability: 60, expectedClose: '2024-04-15', assignedTo: 'Carlos Mendes', priority: 'alta', tags: ['VIP'] },
  { id: 'K4', clientId: '4', clientName: 'Construtora Horizonte', product: 'home-equity', value: 1200000, stage: 'analise', probability: 75, expectedClose: '2024-04-20', assignedTo: 'Carlos Mendes', priority: 'alta', tags: ['PJ', 'Imóvel'] },
  { id: 'K5', clientId: '3', clientName: 'Maria Costa', product: 'disponivel', value: 80000, stage: 'fechamento', probability: 90, expectedClose: '2024-04-01', assignedTo: 'Roberto Souza', priority: 'alta', tags: ['Veículo'] },
  { id: 'K6', clientId: '6', clientName: 'Indústria Qualidade', product: 'capital-giro', value: 300000, stage: 'pos-venda', probability: 100, expectedClose: '2024-02-20', assignedTo: 'Roberto Souza', priority: 'baixa', tags: ['Concluído'] },
];

export const mockMetrics: DashboardMetrics = {
  totalClients: 247, activeProposals: 38, signedContracts: 124,
  totalCreditVolume: 48500000, monthlyRevenue: 185000,
  conversionRate: 34.5, averageTicket: 391129, pendingTasks: 12,
};

export const mockChartData = [
  { month: 'Jan', volume: 3200000, contratos: 8 },
  { month: 'Fev', volume: 4100000, contratos: 12 },
  { month: 'Mar', volume: 3800000, contratos: 10 },
  { month: 'Abr', volume: 5200000, contratos: 15 },
  { month: 'Mai', volume: 6100000, contratos: 18 },
  { month: 'Jun', volume: 5800000, contratos: 16 },
  { month: 'Jul', volume: 7200000, contratos: 22 },
  { month: 'Ago', volume: 6900000, contratos: 20 },
  { month: 'Set', volume: 8100000, contratos: 25 },
  { month: 'Out', volume: 7500000, contratos: 21 },
  { month: 'Nov', volume: 9200000, contratos: 28 },
  { month: 'Dez', volume: 10400000, contratos: 32 },
];

export const mockProductDistribution = [
  { name: 'Contemplado', value: 35, color: '#003B7A' },
  { name: 'Programado', value: 25, color: '#C8962C' },
  { name: 'Disponível', value: 20, color: '#16A34A' },
  { name: 'Home Equity', value: 12, color: '#7C3AED' },
  { name: 'Capital de Giro', value: 8, color: '#0891B2' },
];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('pt-BR');
