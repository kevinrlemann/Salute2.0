-- Relatório da consulta salvo também como PDF em documentos_paciente (2026-10-17, pedido do fundador).
-- Nova origem do documento para o relatório gerado a partir da gravação da consulta.
alter type public.origem_documento add value if not exists 'relatorio_consulta';
