import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert("Erro ao cadastrar: " + error.message);
    } else {
      alert("Cadastro feito! Verifique seu email.");
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-6 max-w-md mx-auto space-y-4">
      <input className="w-full p-2 border" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="w-full p-2 border" placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="w-full bg-blue-600 text-white py-2" type="submit">Registrar</button>
    </form>
  );
}
