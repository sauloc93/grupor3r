'use client';

const produtos = [
  { nome: 'Residencial', taxa: '0,99% a.m.', ltvMax: '60%', prazoMax: '240 meses', destaque: true, features: ['Imóvel residencial quitado', 'LTV até 60% do valor', 'Aprovação em 10 dias úteis', 'Taxa fixa pós IPCA'] },
  { nome: 'Comercial', taxa: '1,19% a.m.', ltvMax: '50%', prazoMax: '180 meses', destaque: false, features: ['Imóvel comercial quitado', 'LTV até 50% do valor', 'Aprovação em 15 dias úteis', 'Pessoa Jurídica'] },
  { nome: 'Premium', taxa: '0,89% a.m.', ltvMax: '70%', prazoMax: '300 meses', destaque: false, features: ['Imóvel > R$ 2M', 'LTV até 70% do valor', 'Gestor dedicado', 'Taxa negociada case a case'] },
];

const docsImovel = ['Matrícula atualizada (< 30 dias)', 'IPTU do exercício atual', 'Certidão negativa de ônus', 'ART / Habite-se'];
const docsProprietario = ['RG e CPF / CNH', 'Comprovante de renda (3 últimos)', 'Comprovante de residência', 'Declaração IR (último exercício)'];

export default function HomeEquityPage() {
  return (
    <div style={{ padding: '32px', fontFamily: "'DM Sans', sans-serif", background: '#F5F7FA', minHeight: '100vh' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Home Equity</h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Crédito com garantia de imóvel — as melhores taxas do mercado</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {produtos.map(p => (
          <div key={p.nome} style={{ background: '#fff', borderRadius: '16px', border: p.destaque ? '2px solid #B8973A' : '1px solid #e2e8f0', padding: '28px', position: 'relative', overflow: 'hidden' }}>
            {p.destaque && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #B8973A, #C8962C)' }} />}
            {p.destaque && <div style={{ position: 'absolute', top: '14px', right: '14px', background: '#B8973A', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mais popular</div>}
            <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>{p.nome}</h3>
            <div style={{ fontSize: '30px', fontWeight: 700, color: '#B8973A', fontFamily: "'Playfair Display', serif", margin: '12px 0' }}>{p.taxa}</div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '10px 14px', flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>{p.ltvMax}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', marginTop: '2px' }}>LTV Máx.</div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '10px 14px', flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>{p.prazoMax}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', marginTop: '2px' }}>Prazo</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {p.features.map(f => (
                <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: '#16a34a', fontSize: '16px', flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '13px', color: '#475569' }}>{f}</span>
                </div>
              ))}
            </div>
            <button style={{ marginTop: '20px', width: '100%', padding: '11px', background: p.destaque ? '#B8973A' : '#fff', color: p.destaque ? '#fff' : '#475569', border: '1px solid', borderColor: p.destaque ? '#B8973A' : '#e2e8f0', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Simular Agora</button>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '28px' }}>
        <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Documentação Necessária</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {[{ titulo: 'Documentos do Imóvel', items: docsImovel }, { titulo: 'Documentos do Proprietário', items: docsProprietario }].map(section => (
            <div key={section.titulo}>
              <h4 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{section.titulo}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {section.items.map(item => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px' }}>
                    <span style={{ color: '#16a34a', fontSize: '14px', flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '13px', color: '#475569' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
