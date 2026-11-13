export default function SectionHeading({ eyebrow, title, description }: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <span className="heading-rule" aria-hidden="true" />
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
