-- Renata com Groq: novo provedor de chave no cofre.
alter type public.provedor_integracao add value if not exists 'groq';
