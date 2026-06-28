'use client';

const tiers = [
  { nome: 'MEI / ME', limite: 'Até R$ 500k', taxa: '1,49% a.m.', prazo: 'Até 36 meses', color: '#16a34a', icon: '🏪' },
  { nome: 'Empresa Média', limite: 'Até R$ 5M', taxa: '1,29% a.m.', prazo: 'Até 60 meses', color: '#B8973A', icon: '🏢', destaque: true },
  { nome: 'Grande Empresa', limite: 'Acima R$ 5M', taxa: 'Negociável', prazo: 'Até 84 meses', color: '#003B7A', icon: '🏦' },
];

const docsEmpresa = ['Contrato Social atualizado', 'CNPJ ativo (mín. 2 anos)', 'Balanço patrimonial (últimos 2 anos)', 'Faturamento dos últimos 12 meses', 'Certidão negativa de débitos'];
const docsSocios = ['RG e CPF de todos os sócios', 'Comprovante de residência', 'Declaração IR (último exercício)', 'Certidão negativa individual'];

export default function CapitalGiroPage() {
  return (
    <div style={{ padding: '32px', fontFamily: "'DM Sans', sans-serif", background: '#F5F7FA', minHeight: '100vh' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Capital de Giro</h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Crédito empresarial com as melhores condições do mercado</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {tiers.map(t => (
          <div key={t.nome} style={{ background: '#fff', borderRadius: '16px', border: t.destaque ? `2px solid ${t.color}` : '1px solid #e2e8f0', padding: '28px', position: 'relative', overflow: 'hidden' }}>
            {t.destaque && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: t.color }} />}
            {t.destaque && <div style={{ position: 'absolute', top: '14px', right: '14px', background: t.color, color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px' }}>Mais buscado</div>}
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{t.icon}</div>
            <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>{t.nome}</h3>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>{t.limite}</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: t.color, fontFamily: "'Playfair Display', serif", marginBottom: '16px' }}>{t.taxa}</div>
            <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '12px', marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: '#64748b' }}>Prazo máximo</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>{t.prazo}</div>
            </div>
            <button style={{ width: '100%', padding: '11px', background: t.destaque ? t.color : '#fff', color: t.destaque ? '#fff' : '#475569', border: '1px solid', borderColor: t.destaque ? t.color : '#e2e8f0', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Solicitar Crédito</button>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '28px' }}>
        <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Documentação PJ Necessária</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {[{ titulo: 'Documentos da Empresa', items: docsEmpresa }, { titulo: 'Documentos dos Sócios', items: docsSocios }].map(section => (
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
