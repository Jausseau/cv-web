const projectStatuses = [
  { label: 'Stack', value: 'Solid + Hono' },
  { label: 'Pipeline', value: 'GitHub Actions' },
  { label: 'Runtime', value: 'Cloudflare' },
];

export function StatusPanel() {
  return (
    <section class="status-panel" aria-label="Project status">
      {projectStatuses.map((status) => (
        <div>
          <span class="status-label">{status.label}</span>
          <strong>{status.value}</strong>
        </div>
      ))}
    </section>
  );
}
