'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Home, Briefcase, TrendingUp, Building2, Phone, Mail, MapPin, Menu, X, Shield, Users, Star, Calculator, FileText, Zap, Award } from 'lucide-react';

const PRODUCTS = [
  { icon: CheckCircle2, title: 'Consórcio Contemplado', desc: 'Carta já contemplada disponível para uso imediato. Ideal para quem precisa do crédito agora sem esperar sorteio.', color: '#003B7A', bg: '#EFF6FF', benefits: ['Uso imediato', 'Sem juros bancários', 'Até 200 meses', 'Qualquer finalidade'] },
  { icon: TrendingUp, title: 'Carta Programada', desc: 'Planeje a aquisição de bens com parcelas reduzidas. Participe de grupos com melhores condições de contemplação.', color: '#C8962C', bg: '#FFFBEB', benefits: ['Menor custo total', 'Lance diferenciado', 'Cartas a partir de R$ 20K', 'Grupos exclusivos'] },
  { icon: Home, title: 'Carta Disponível', desc: 'Cartas disponíveis no mercado com desconto. Para imóveis residenciais, comerciais, veículos e serviços.', color: '#16A34A', bg: '#F0FDF4', benefits: ['Desconto de até 15%', 'Imóveis e veículos', 'Processo ágil', 'Assessoria completa'] },
  { icon: Building2, title: 'Home Equity', desc: 'Utilize o seu imóvel como garantia e acesse crédito com taxas muito menores que os bancos tradicionais.', color: '#7C3AED', bg: '#F5F3FF', benefits: ['Taxas a partir de 0,99%', 'Até R$ 5 milhões', 'Prazo de até 20 anos', 'Pagamento flexível'] },
  { icon: Briefcase, title: 'Capital de Giro', desc: 'Soluções de crédito para empresas que precisam de capital para crescer, expandir ou equilibrar o fluxo de caixa.', color: '#0891B2', bg: '#ECFEFF', benefits: ['Para MEI e empresas', 'Liberação em 48h', 'Sem garantia patrimonial', 'Crédito rotativo'] },
];

const TESTIMONIALS = [
  { name: 'Ricardo Almeida', role: 'Empresário', text: 'O Grupo R3R me ajudou a financiar minha nova sede através do Home Equity. Processo simples, sem burocracia e com taxas excelentes.', rating: 5 },
  { name: 'Carla Mendonça', role: 'Médica', text: 'Consegui meu consultório através do consórcio contemplado. A equipe foi excepcional do início ao fim.', rating: 5 },
  { name: 'Fábio & Patrícia', role: 'Casal', text: 'Realizamos o sonho da casa própria com a carta disponível. O atendimento personalizado fez toda a diferença!', rating: 5 },
];

function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg" style={{ background: '#003B7A' }}>R3</div>
          <div><p className="font-black text-gray-900 text-base leading-tight">Grupo R3R</p><p className="text-xs text-gray-500 leading-tight">Crédito & Consórcios</p></div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Produtos', 'Simulação', 'Como Funciona', 'Contato'].map(item => (<a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">{item}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all">Entrar</Link>
          <Link href="/login" className="text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-all hover:opacity-90" style={{ background: '#003B7A' }}>Acesso ao CRM</Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl hover:bg-gray-100">{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      {open && (<div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-3">{['Produtos', 'Simulação', 'Como Funciona', 'Contato'].map(item => (<a key={item} href="#" className="block text-sm text-gray-700 py-2">{item}</a>))}<Link href="/login" className="block text-center text-sm font-bold text-white py-3 rounded-xl mt-2" style={{ background: '#003B7A' }}>Acesso ao CRM</Link></div>)}
    </nav>
  );
}

export default function LandingPage() {
  const [simProduct, setSimProduct] = useState('contemplado');
  const [simValue, setSimValue] = useState(300000);
  const [simInstallments, setSimInstallments] = useState(120);
  const [simResult, setSimResult] = useState<null | { monthly: number; total: number }>(null);
  const calcSim = () => { const rate = ({ contemplado: 0.015, programado: 0.018, disponivel: 0.016, 'home-equity': 0.012, 'capital-giro': 0.02 } as Record<string,number>)[simProduct] || 0.016; const monthly = (simValue * (rate + 0.02)) / simInstallments + (simValue * 0.002 / 12); setSimResult({ monthly, total: monthly * simInstallments }); };
  const formatCur = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <section className="pt-32 pb-20 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003B7A 0%, #0055B3 50%, #0066CC 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 mb-6"><Star size={14} style={{ color: '#E8B84B' }} /><span className="text-white text-sm font-medium">Mais de 2.400 clientes satisfeitos</span></div>
              <h1 className="text-5xl font-black text-white leading-tight mb-6">Crédito Inteligente<br /><span style={{ color: '#E8B84B' }}>Para Cada Sonho</span></h1>
              <p className="text-blue-100 text-xl leading-relaxed mb-8">O Grupo R3R oferece soluções completas em consórcio, home equity e capital de giro. Sem juros bancários abusivos, com assessoria personalizada.</p>
              <div className="flex flex-wrap gap-4">
                <a href="#simulacao" className="inline-flex items-center gap-2 font-bold text-white px-8 py-4 rounded-2xl transition-all hover:opacity-90 pulse-gold" style={{ background: '#C8962C' }}>Simular Grátis <ArrowRight size={18} /></a>
                <a href="#produtos" className="inline-flex items-center gap-2 font-bold text-white px-8 py-4 rounded-2xl border-2 border-white/30 hover:bg-white/10 transition-all">Ver Produtos</a>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-12">
                {[{ value: 'R$ 480M+', label: 'Em crédito' }, { value: '1.200+', label: 'Contratos' }, { value: '10 anos', label: 'Experiência' }].map(stat => (<div key={stat.label}><p className="text-2xl font-black text-white">{stat.value}</p><p className="text-blue-200 text-sm">{stat.label}</p></div>))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Por que escolher R3R?</h3>
              <div className="space-y-4">
                {[{ icon: Shield, text: 'Sem juros bancários – economia de até 60% no custo total' }, { icon: Zap, text: 'Processo 100% digital com aprovação em até 48 horas' }, { icon: Users, text: 'Consultores especializados em crédito e consórcios' }, { icon: Award, text: 'Parceria com as 10 maiores administradoras do Brasil' }, { icon: Calculator, text: 'Simulação gratuita e personalizada para seu perfil' }].map(({ icon: Icon, text }) => (<div key={text} className="flex items-start gap-3"><div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#003B7A15' }}><Icon size={16} style={{ color: '#003B7A' }} /></div><p className="text-sm text-gray-700">{text}</p></div>))}
              </div>
              <Link href="/login" className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90" style={{ background: '#003B7A' }}>Acessar Plataforma <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>
      <section id="produtos" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14"><span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#C8962C' }}>Nossos Produtos</span><h2 className="text-4xl font-black text-gray-900 mt-2 mb-4">Soluções para Cada Necessidade</h2><p className="text-gray-500 max-w-xl mx-auto">Do imóvel dos sonhos ao capital para o seu negócio crescer, temos o produto certo para você.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map(({ icon: Icon, title, desc, color, bg, benefits }) => (<div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover cursor-pointer"><div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: bg }}><Icon size={24} style={{ color }} /></div><h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3><p className="text-sm text-gray-600 leading-relaxed mb-4">{desc}</p><ul className="space-y-2">{benefits.map(b => (<li key={b} className="flex items-center gap-2 text-xs text-gray-600"><CheckCircle2 size={13} style={{ color }} className="shrink-0" />{b}</li>))}</ul><button className="mt-5 w-full py-2.5 rounded-xl text-sm font-bold border-2 transition-all hover:opacity-80" style={{ borderColor: color, color }}>Saiba Mais</button></div>))}
          </div>
        </div>
      </section>
      <section id="simulacao" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14"><span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#C8962C' }}>Simulador</span><h2 className="text-4xl font-black text-gray-900 mt-2 mb-4">Calcule Sua Parcela Agora</h2></div>
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div><label className="text-sm font-semibold text-gray-700 block mb-3">Produto</label><div className="grid grid-cols-2 gap-2">{[['contemplado','Contemplado'],['programado','Programado'],['disponivel','Disponível'],['home-equity','Home Equity'],['capital-giro','Capital de Giro']].map(([k,l]) => (<button key={k} onClick={() => setSimProduct(k)} className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all border ${simProduct===k ? 'text-white border-transparent' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`} style={simProduct===k ? { background: '#003B7A' } : {}}>{l}</button>))}</div></div>
                <div><label className="text-sm font-semibold text-gray-700 block mb-2">Valor da Carta: <span style={{ color: '#003B7A' }}>{formatCur(simValue)}</span></label><input type="range" min={20000} max={2000000} step={10000} value={simValue} onChange={e => setSimValue(Number(e.target.value))} className="w-full accent-blue-800" /><div className="flex justify-between text-xs text-gray-400 mt-1"><span>R$ 20 mil</span><span>R$ 2 milhões</span></div></div>
                <div><label className="text-sm font-semibold text-gray-700 block mb-2">Parcelas</label><div className="flex flex-wrap gap-2">{[36,60,80,100,120,150,180,200].map(n => (<button key={n} onClick={() => setSimInstallments(n)} className={`px-3 py-2 rounded-xl text-sm font-medium transition-all border ${simInstallments===n ? 'text-white border-transparent' : 'bg-white border-gray-200 text-gray-600'}`} style={simInstallments===n ? { background: '#003B7A' } : {}}>{n}x</button>))}</div></div>
                <button onClick={calcSim} className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all hover:opacity-90" style={{ background: '#003B7A' }}>Calcular Simulação</button>
              </div>
              <div className="flex flex-col justify-center">
                {simResult ? (<div className="space-y-4 animate-fade-in"><div className="bg-white rounded-2xl p-6 text-center border border-gray-100"><p className="text-sm text-gray-500 mb-1">Parcela Mensal Estimada</p><p className="text-4xl font-black" style={{ color: '#003B7A' }}>{formatCur(simResult.monthly)}</p><p className="text-sm text-gray-400 mt-1">{simInstallments} parcelas</p></div><div className="grid grid-cols-2 gap-3"><div className="bg-white rounded-xl p-4 border border-gray-100 text-center"><p className="text-xs text-gray-500 mb-1">Valor da Carta</p><p className="font-bold text-gray-900">{formatCur(simValue)}</p></div><div className="bg-white rounded-xl p-4 border border-gray-100 text-center"><p className="text-xs text-gray-500 mb-1">Total do Plano</p><p className="font-bold text-gray-900">{formatCur(simResult.total)}</p></div></div><p className="text-xs text-gray-400 text-center">* Valores estimados. Consulte um especialista.</p><Link href="/login" className="block text-center py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90" style={{ background: '#C8962C' }}>Falar com Consultor <ArrowRight size={16} className="inline" /></Link></div>) : (<div className="text-center py-12"><div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#003B7A10' }}><Calculator size={36} style={{ color: '#003B7A' }} /></div><p className="text-gray-600 font-medium">Configure os parâmetros</p><p className="text-sm text-gray-400 mt-1">e clique em Calcular</p></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="como-funciona" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14"><span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#C8962C' }}>Processo</span><h2 className="text-4xl font-black text-gray-900 mt-2">Como Funciona</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[{ step: '01', icon: Calculator, title: 'Simule', desc: 'Faça uma simulação gratuita e veja as opções ideais para seu perfil.' }, { step: '02', icon: FileText, title: 'Proposta', desc: 'Nosso consultor elabora uma proposta personalizada para você.' }, { step: '03', icon: Shield, title: 'Aprovação', desc: 'Análise rápida e aprovação em até 48 horas. Sem burocracia.' }, { step: '04', icon: CheckCircle2, title: 'Libere o Crédito', desc: 'Assine digitalmente e acesse o crédito para realizar seu objetivo.' }].map(({ step, icon: Icon, title, desc }) => (<div key={step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center"><div className="text-5xl font-black mb-4 opacity-10" style={{ color: '#003B7A' }}>{step}</div><div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#003B7A10' }}><Icon size={22} style={{ color: '#003B7A' }} /></div><h3 className="font-bold text-gray-900 mb-2">{title}</h3><p className="text-sm text-gray-600">{desc}</p></div>))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14"><span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#C8962C' }}>Depoimentos</span><h2 className="text-4xl font-black text-gray-900 mt-2">O Que Dizem Nossos Clientes</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (<div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100"><div className="flex gap-1 mb-4">{Array(t.rating).fill(0).map((_, i) => <Star key={i} size={16} fill="#C8962C" style={{ color: '#C8962C' }} />)}</div><p className="text-gray-700 text-sm leading-relaxed mb-5">"{t.text}"</p><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: '#003B7A' }}>{t.name.split(' ').map(w => w[0]).join('')}</div><div><p className="font-semibold text-gray-900 text-sm">{t.name}</p><p className="text-xs text-gray-500">{t.role}</p></div></div></div>))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003B7A 0%, #0055B3 100%)' }}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-black text-white mb-4">Pronto para realizar seu objetivo?</h2>
          <p className="text-blue-100 text-lg mb-8">Fale com um consultor R3R agora e receba uma simulação personalizada sem compromisso.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/5511999999999" className="inline-flex items-center gap-2 font-bold text-white px-8 py-4 rounded-2xl transition-all hover:opacity-90" style={{ background: '#C8962C' }}>Falar no WhatsApp <ArrowRight size={18} /></a>
            <Link href="/login" className="inline-flex items-center gap-2 font-bold text-white px-8 py-4 rounded-2xl border-2 border-white/40 hover:bg-white/10 transition-all">Acessar Plataforma</Link>
          </div>
        </div>
      </section>
      <footer id="contato" className="bg-gray-900 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black" style={{ background: '#003B7A' }}>R3</div><p className="font-black text-white">Grupo R3R</p></div><p className="text-gray-400 text-sm leading-relaxed">Soluções completas em crédito, consórcio e investimentos.</p></div>
            <div><h4 className="font-bold text-white mb-4">Produtos</h4><ul className="space-y-2">{['Contemplado', 'Carta Programada', 'Carta Disponível', 'Home Equity', 'Capital de Giro'].map(p => (<li key={p}><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{p}</a></li>))}</ul></div>
            <div><h4 className="font-bold text-white mb-4">Empresa</h4><ul className="space-y-2">{['Sobre a R3R', 'Nossos Consultores', 'Blog', 'Parcerias', 'LGPD'].map(p => (<li key={p}><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{p}</a></li>))}</ul></div>
            <div><h4 className="font-bold text-white mb-4">Contato</h4><div className="space-y-3"><div className="flex items-center gap-2 text-gray-400 text-sm"><Phone size={14} style={{ color: '#C8962C' }} /><span>(11) 3000-0000</span></div><div className="flex items-center gap-2 text-gray-400 text-sm"><Mail size={14} style={{ color: '#C8962C' }} /><span>contato@grupor3r.com.br</span></div><div className="flex items-start gap-2 text-gray-400 text-sm"><MapPin size={14} style={{ color: '#C8962C' }} className="mt-0.5 shrink-0" /><span>São Paulo, SP - Brasil</span></div></div></div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2024 Grupo R3R. Todos os direitos reservados.</p>
            <div className="flex gap-6">{['Privacidade', 'Termos de Uso', 'Cookies'].map(item => (<a key={item} href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">{item}</a>))}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
