import React, { FormEvent, useState, useEffect } from 'react'

import api from "../../services/api";

import { Container } from "./styles"

const Dashboard: React.FC = () => {
  const [nomeevento, setNome] = useState("")
  const [local, setLocal] = useState("")
  const [diasemana, setDia] = useState("")
  const [horario, setHora] = useState("")

  const [eventos, setEventos] = useState<any[]>([]);

  async function carregaEventos() {
    const res = await api.get("/events")
    setEventos(res.data);
  }

  useEffect(() => {
    carregaEventos()
  }, []);

  async function deletaEvento(id: number) {
    try {
      await api.delete(`events/${id}`);
    } catch (err) {
      alert("Erro ao deletar caso, tente novamente");
    }
    carregaEventos()
  }

  async function cadastrarEvento(e: FormEvent) {
    e.preventDefault();

    if (
      nomeevento === "" ||
      local === "" ||
      diasemana === "" ||
      horario === ""
    ) {
      alert("Não deixe campos em branco");
    } else {
      await api.post("/events", {
        nomeevento,
        local,
        diasemana,
        horario,
      })
        .then(() => {
          alert("Cadastrado com sucesso!");
        })
        .catch(() => {
          alert("Error ao realiza o cadastro.");
        });
    }

    setNome("");
    setLocal("");
    setDia("");
    setHora("");

    carregaEventos()
  }

  async function darLike(id: number) {
    await api.post(`events/like/${id}`)
    carregaEventos()
  }

  async function darDislike(id: number) {
    await api.post(`events/dislike/${id}`)
    carregaEventos()
  }

  return (
    <Container>
      <form onSubmit={cadastrarEvento}>
        <h1>Eventos</h1>
        <input type='text' name='nomeevento' placeholder='Nome do Evento'
          value={nomeevento}
          onChange={(e) => setNome(e.target.value)} />
        <input type='text' name='local' placeholder='Local do Evento' value={local}
          onChange={(e) => setLocal(e.target.value)} />
        <input type='text' name='diasemana' placeholder='Dia da Semana'
          value={diasemana}
          onChange={(e) => setDia(e.target.value)} />
        <input type='text' name="horario" placeholder="Horário"
          value={horario}
          onChange={(e) => setHora(e.target.value)} />
        <button type="submit">Salvar</button>
      </form>
      <div>
      <table>
        <tr>
          <th>
            Nome
          </th>
          <th>
            Local
          </th>
          <th>
            Dia
          </th>
          <th>
            Hora
          </th>
          <th>
            Opções
          </th>
        </tr>
        {eventos.map((evento) => (
          <tr key={evento.id}>
            <th>{evento.nomeevento}</th>
            <th>{evento.local}</th>
            <th>{evento.diasemana}</th>
            <th>{evento.horario}</th>
            <th>
            <button
                onClick={() => darLike(evento.id)}
                type="button"
              >
              Like - {evento.like}
            </button>
            <button
                onClick={() => darDislike(evento.id)}
                type="button"
              >
              Dislike - {evento.dislike}
            </button>
            <button
                onClick={() => deletaEvento(evento.id)}
                type="button"
              >
              Excluir
            </button>
            </th>
          </tr>
        ))}
      </table>
      </div>
    </Container>
  )
}

export default Dashboard



