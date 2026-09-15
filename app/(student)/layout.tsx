// ponytail: fase inicial de testes, sem login obrigatório — reintroduzir o
// redirect('/login') aqui quando o curso passar a ser pago.
export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-surface">{children}</div>;
}
