export const BentoCard: React.FC<BentoCardProps> = ({ title ,desc, icon, sizeClass = "" }) => (
  <section className={`bento-card ${sizeClass}`}>
    <div className="card-icon">{icon}</div>
    <div className="card-content">
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{desc}</p>
    </div>
  </section>
);

interface BentoCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode; // Permite strings, emojis ou ícones de bibliotecas
  sizeClass?: string;
}

