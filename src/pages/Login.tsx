import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Erro ao entrar: " + error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-6 max-w-md mx-auto space-y-4">
      <input className="w-full p-2 border" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="w-full p-2 border" placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="w-full bg-green-600 text-white py-2" type="submit">Entrar</button>
    </form>
  );
}
